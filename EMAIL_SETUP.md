# Contact form email setup

The public site runs on GitHub Pages, so the email API key must stay on the server. The Render service in `render.yaml` accepts the terminal-style form and sends messages through Resend to `atifat45@gmail.com`.

## 1. Create the Render relay

1. Create a Resend account and an API key with email sending access.
2. In Render, choose **New → Blueprint** and connect the `Atifakhan/atif` repository.
3. When Render prompts for `RESEND_API_KEY`, enter the key in Render. Do not put it in GitHub, the frontend, or a message.
4. Create the service and wait for its deploy to finish. Its health check is `/health`.

The initial sender is `Atif Profile <onboarding@resend.dev>`. To send from an address on your own domain, verify that domain with Resend, then set `RESEND_FROM` in the Render service environment to an address on that domain.

## 2. Connect the Pages site to the relay

1. Copy the public Render service URL, for example `https://atif-contact-relay.onrender.com`.
2. In GitHub, open **Settings → Secrets and variables → Actions → Variables**.
3. Add a repository variable named `CONTACT_API_URL` with the value `https://YOUR-RENDER-SERVICE.onrender.com/api/contact`.
4. In GitHub Actions, run **Deploy static content to Pages** once, or push a new commit.

The form will use the relay when the Pages build includes `CONTACT_API_URL`. Until then, it opens the visitor's email app as a fallback.

Messages sent through this relay include the visitor's name, reply email, subject, and message. The reply address is set as the email's Reply-To field.
