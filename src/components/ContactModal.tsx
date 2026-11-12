import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Mail, MessageCircle, Minus, Phone, Send, Terminal, X } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SendState = 'idle' | 'sending' | 'sent' | 'error';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [sendState, setSendState] = useState<SendState>('idle');

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSendState('idle');
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendState('sending');

    const payload = { name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() };
    const apiUrl = import.meta.env.VITE_CONTACT_API_URL as string | undefined;

    if (apiUrl) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('The message relay returned an error.');
        setSendState('sent');
        return;
      } catch {
        setSendState('error');
        return;
      }
    }

    const finalSubject = encodeURIComponent(payload.subject || `Profile inquiry from ${payload.name}`);
    const finalBody = encodeURIComponent(`Hello Muhammad,\n\n${payload.message}\n\nName: ${payload.name}\nReply email: ${payload.email}`);
    window.location.href = `mailto:${PROFILE_INFO.email}?subject=${finalSubject}&body=${finalBody}`;
    setSendState('idle');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi Muhammad Atif, my name is ${name || 'a visitor'} (${email || 'no reply email'}). ${message || 'I would like to discuss a project with you.'}`);
    window.open(`https://wa.me/923149881406?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  const apiConfigured = Boolean(import.meta.env.VITE_CONTACT_API_URL);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020407]/80 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="terminal-title"
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#080d12] text-slate-200 shadow-[0_30px_100px_rgba(0,0,0,.7)]"
            initial={{ opacity: 0, y: 22, scale: .97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: .98 }}
            transition={{ duration: .22, ease: [.2, .8, .2, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Terminal title bar */}
            <div className="flex items-center justify-between border-b border-white/[.07] bg-[#10171e] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-2 border-l border-white/10 pl-3 font-mono text-[11px] text-slate-400">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  <span id="terminal-title">atif@profile: ~/contact</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close message terminal"
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[82vh] overflow-y-auto px-4 py-5 sm:px-7 sm:py-6">
              <div className="mb-5 font-mono text-xs leading-relaxed sm:text-sm">
                <p className="text-emerald-400"><span className="text-slate-500">visitor@web:~$</span> ./send_message.sh</p>
                <p className="mt-1 text-slate-400">Secure contact session initialized.</p>
                <p className="text-slate-500">Messages are addressed to <span className="text-amber-300">{PROFILE_INFO.email}</span>.</p>
              </div>

              <div className="mb-5 grid gap-2 sm:grid-cols-2">
                <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-white/[.07] bg-white/[.025] px-3 py-2 font-mono text-[11px]">
                  <span className="flex min-w-0 items-center gap-2 truncate text-slate-400"><Mail className="h-3.5 w-3.5 shrink-0 text-amber-300" />{PROFILE_INFO.email}</span>
                  <button onClick={() => copyToClipboard(PROFILE_INFO.email, 'email')} className="shrink-0 p-1 text-slate-500 hover:text-emerald-300" aria-label="Copy email">
                    {copied === 'email' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-white/[.07] bg-white/[.025] px-3 py-2 font-mono text-[11px]">
                  <span className="flex min-w-0 items-center gap-2 truncate text-slate-400"><Phone className="h-3.5 w-3.5 shrink-0 text-emerald-300" />{PROFILE_INFO.phoneDisplay}</span>
                  <button onClick={() => copyToClipboard(PROFILE_INFO.phone, 'phone')} className="shrink-0 p-1 text-slate-500 hover:text-emerald-300" aria-label="Copy phone">
                    {copied === 'phone' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {sendState === 'sent' ? (
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[.06] p-5 font-mono text-sm">
                  <p className="text-emerald-300">✓ Message delivered successfully.</p>
                  <p className="mt-2 text-xs text-slate-400">Thank you, {name}. Muhammad will receive your message at {PROFILE_INFO.email}.</p>
                  <button onClick={resetForm} className="mt-4 text-xs text-emerald-300 underline underline-offset-4">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-3.5">
                  <TerminalField label="name" prompt=">_" value={name} onChange={setName} placeholder="Your name or organization" required autoComplete="name" />
                  <TerminalField label="reply_email" prompt=">_" value={email} onChange={setEmail} placeholder="you@example.com" type="email" required autoComplete="email" />
                  <TerminalField label="subject" prompt=">_" value={subject} onChange={setSubject} placeholder="Project, consulting, or career inquiry" />
                  <div>
                    <label htmlFor="message-body" className="mb-1.5 block font-mono text-[11px] text-emerald-300"><span className="text-slate-600">input</span> message --multiline</label>
                    <div className="flex rounded-lg border border-white/10 bg-[#05090d] transition focus-within:border-emerald-400/50 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,.08)]">
                      <span aria-hidden="true" className="select-none pl-3 pt-3 font-mono text-xs text-emerald-500">&gt;_</span>
                      <textarea
                        id="message-body"
                        rows={4}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Type your message..."
                        required
                        className="min-w-0 flex-1 resize-y bg-transparent px-3 py-3 font-mono text-xs leading-relaxed text-slate-100 outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {sendState === 'error' && (
                    <p role="alert" className="font-mono text-xs text-rose-300">[error] Message could not be delivered. Please try again later.</p>
                  )}

                  <div className="flex flex-col gap-2 border-t border-white/[.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-[10px] text-slate-500">
                      {apiConfigured ? 'Email relay connected' : 'Email draft fallback until relay is configured'}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[.07] px-3.5 py-2.5 font-mono text-xs text-emerald-300 transition hover:border-emerald-300/40 hover:bg-emerald-400/[.13]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </button>
                      <button
                        type="submit"
                        disabled={sendState === 'sending'}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-200/30 bg-gradient-to-r from-amber-200 to-amber-400 px-4 py-2.5 font-mono text-xs font-semibold text-[#15120c] shadow-[0_5px_20px_rgba(232,189,112,.14)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-65"
                      >
                        <Send className="h-3.5 w-3.5" />
                        {sendState === 'sending' ? 'Sending...' : apiConfigured ? 'Send message' : 'Open email draft'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="mt-5 flex items-center justify-between border-t border-white/[.06] pt-3 font-mono text-[10px] text-slate-600">
                <span><span className="text-emerald-500">●</span> session ready</span>
                <span className="flex items-center gap-1"><Minus className="h-3 w-3" /> bash-compatible interface</span>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface TerminalFieldProps {
  label: string;
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

const TerminalField: React.FC<TerminalFieldProps> = ({ label, prompt, value, onChange, placeholder, type = 'text', required = false, autoComplete }) => (
  <div>
    <label htmlFor={`contact-${label}`} className="mb-1.5 block font-mono text-[11px] text-emerald-300"><span className="text-slate-600">input</span> {label}</label>
    <div className="flex rounded-lg border border-white/10 bg-[#05090d] transition focus-within:border-emerald-400/50 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,.08)]">
      <span aria-hidden="true" className="select-none pl-3 pt-2.5 font-mono text-xs text-emerald-500">{prompt}</span>
      <input
        id={`contact-${label}`}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-xs text-slate-100 outline-none placeholder:text-slate-600"
      />
    </div>
  </div>
);
