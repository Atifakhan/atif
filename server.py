#!/usr/bin/env python3
"""Small HTTPS email API relay for the GitHub Pages contact form."""
from email.utils import parseaddr
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import re
import time
from threading import Lock
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://atifakhan.github.io").rstrip("/")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
RESEND_FROM = os.environ.get("RESEND_FROM", "Atif Profile <onboarding@resend.dev>")
CONTACT_TO = os.environ.get("CONTACT_TO", "atifat45@gmail.com")
RATE_WINDOW = 60
RATE_LIMIT = 20
_submissions = []
_rate_lock = Lock()


def valid_email(value):
    value = value.strip()
    if len(value) > 254 or "\r" in value or "\n" in value:
        return False
    _, address = parseaddr(value)
    return bool(address and re.fullmatch(r"[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+", address))


class ContactHandler(BaseHTTPRequestHandler):
    server_version = "ContactRelay/1.0"

    def log_message(self, fmt, *args):
        # Do not log names, email addresses, or message contents.
        super().log_message(fmt, *args)

    def _headers(self, status):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
        self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def _json(self, status, payload):
        self._headers(status)
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def do_OPTIONS(self):
        origin = self.headers.get("Origin", "")
        if origin and origin != ALLOWED_ORIGIN:
            self._headers(403)
            return
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
        self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Max-Age", "600")
        self.end_headers()

    def do_GET(self):
        if self.path == "/health":
            self._json(200, {"ok": True})
        else:
            self._json(404, {"error": "Not found"})

    def do_POST(self):
        if self.path != "/api/contact":
            self._json(404, {"error": "Not found"})
            return
        if self.headers.get("Origin", "") != ALLOWED_ORIGIN:
            self._json(403, {"error": "Origin not allowed"})
            return
        if self.headers.get_content_type() != "application/json":
            self._json(415, {"error": "JSON required"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if length < 1 or length > 12000:
            self._json(413, {"error": "Message is too large"})
            return
        try:
            data = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self._json(400, {"error": "Invalid JSON"})
            return
        if not isinstance(data, dict):
            self._json(400, {"error": "Invalid message"})
            return

        # Quietly accept bot submissions without sending.
        if str(data.get("website", "")).strip():
            self._json(200, {"ok": True})
            return

        name = str(data.get("name", "")).strip()
        reply_email = str(data.get("email", "")).strip()
        subject = str(data.get("subject", "")).strip()
        body = str(data.get("message", "")).strip()
        if not name or len(name) > 120 or not valid_email(reply_email) or not body or len(body) > 8000:
            self._json(400, {"error": "Check the required fields and try again"})
            return
        if any(ord(char) < 32 and char not in "\t" for char in subject):
            self._json(400, {"error": "Invalid subject"})
            return

        now = time.time()
        with _rate_lock:
            while _submissions and now - _submissions[0] > RATE_WINDOW:
                _submissions.pop(0)
            if len(_submissions) >= RATE_LIMIT:
                self._json(429, {"error": "Please wait a minute before sending another message"})
                return
            _submissions.append(now)

        if not RESEND_API_KEY:
            self._json(503, {"error": "Email delivery is not configured"})
            return

        email_payload = {
            "from": RESEND_FROM,
            "to": [CONTACT_TO],
            "reply_to": reply_email,
            "subject": (subject or f"Profile inquiry from {name}")[:160],
            "text": (
                f"New message from your profile site\n\n"
                f"Name: {name}\n"
                f"Reply email: {reply_email}\n"
                f"Subject: {subject or '(not provided)'}\n\n"
                f"{body}\n"
            ),
        }
        request = Request(
            "https://api.resend.com/emails",
            data=json.dumps(email_payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        try:
            with urlopen(request, timeout=20) as response:
                if response.status not in (200, 201):
                    raise URLError("Email API rejected the request")
                response.read()
        except (HTTPError, URLError, TimeoutError):
            self._json(502, {"error": "Email delivery failed. Please try again later."})
            return

        self._json(200, {"ok": True})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "10000"))
    ThreadingHTTPServer(("0.0.0.0", port), ContactHandler).serve_forever()
