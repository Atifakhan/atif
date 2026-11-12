import React, { useState } from 'react';
import { X, Mail, MessageCircle, Phone, Send, Copy, Check, User, FileText } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = encodeURIComponent(subject || `Inquiry for Muhammad Atif from ${name || 'Portfolio Visitor'}`);
    const finalBody = encodeURIComponent(`Hello Muhammad,\n\n${message}\n\nBest regards,\n${name}`);
    window.location.href = `mailto:${PROFILE_INFO.email}?subject=${finalSubject}&body=${finalBody}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi Muhammad Atif, my name is ${name || 'a visitor'}. ${message || 'I would like to discuss a project with you.'}`);
    window.open(`https://wa.me/923149881406?text=${text}`, '_blank');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h2 className="text-base font-bold font-heading">Get in Touch with Muhammad</h2>
            <p className="text-xs text-stone-400">Available for network security consulting, contracts & full-time roles</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Contact Info Strip */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-stone-850 bg-stone-800/60 border border-stone-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate text-stone-300">{PROFILE_INFO.email}</span>
            </div>
            <button
              onClick={() => copyToClipboard(PROFILE_INFO.email, 'email')}
              className="text-stone-400 hover:text-stone-100 p-1"
              title="Copy email"
            >
              {copied === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-850 bg-stone-800/60 border border-stone-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate text-stone-300">{PROFILE_INFO.phoneDisplay}</span>
            </div>
            <button
              onClick={() => copyToClipboard(PROFILE_INFO.phone, 'phone')}
              className="text-stone-400 hover:text-stone-100 p-1"
              title="Copy phone"
            >
              {copied === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSendEmail} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Your Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe / Organization"
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Subject / Project Scope</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Network infrastructure redesign / Advisory request"
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Message</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide a brief description of your requirements, timeline, or inquiry..."
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
              required
            />
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-xl shadow-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send via Email Client</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-100 font-semibold text-xs rounded-xl transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
