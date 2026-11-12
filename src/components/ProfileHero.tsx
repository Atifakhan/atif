import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Linkedin, 
  Github, 
  Twitter, 
  Mail, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Maximize2,
  Sparkles,
  Shield,
  Activity,
  Radio,
  Terminal,
  Cpu
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';
import { downloadVCard } from '../utils/vcard';

interface ProfileHeroProps {
  onOpenShare: () => void;
  onOpenContact: () => void;
  activeTheme?: 'gold' | 'emerald' | 'cyan';
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ 
  onOpenShare, 
  onOpenContact,
  activeTheme = 'gold'
}) => {
  const [copied, setCopied] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="top" className="relative pt-6 pb-6 sm:pt-8 sm:pb-8 text-center">
      {/* Background radial ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-80 bg-gradient-to-b from-amber-500/15 via-stone-800/20 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-xl mx-auto px-4 flex flex-col items-center">
        {/* Animated Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 px-3 py-1 bg-stone-900/90 border border-stone-800/90 rounded-full text-xs text-stone-300 shadow-md backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] text-stone-300">
            Active: <span className="text-emerald-400 font-semibold">IOTA Solutions</span> · Network & Security Specialist
          </span>
        </motion.div>

        {/* Profile Avatar with Dynamic Animated Ring */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer mb-5" 
          onClick={() => setPhotoModalOpen(true)}
        >
          {/* Outer rotating/pulsing glow aura */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

          {/* Avatar Container */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-b from-stone-700 via-stone-900 to-stone-950 shadow-2xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
            <div className="w-full h-full rounded-full overflow-hidden bg-stone-800 relative">
              <img
                src={PROFILE_INFO.avatarUrl}
                alt="Muhammad Atif - Network Infrastructure & Security Engineer"
                className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.04]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Maximize2 className="w-6 h-6 text-stone-100 drop-shadow-md" />
              </div>
            </div>
          </div>

          {/* Verified Check Badge */}
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="absolute bottom-1 right-1 bg-stone-900 p-1 rounded-full shadow-lg border border-stone-700/80"
            title="Verified Network Infrastructure Engineer"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </motion.div>
        </motion.div>

        {/* Identity & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-stone-100 tracking-tight flex items-center justify-center gap-2">
            <span>{PROFILE_INFO.name}</span>
          </h1>

          {/* Role & Company */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-stone-300 text-sm sm:text-base font-medium">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>{PROFILE_INFO.company}</span>
            </span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span>{PROFILE_INFO.title}</span>
          </div>

          {/* Location & Status */}
          <div className="mt-1.5 flex items-center justify-center gap-1.5 text-xs text-stone-400">
            <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span>{PROFILE_INFO.location}</span>
          </div>

          {/* Bio / Summary description */}
          <p className="mt-3.5 text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg text-balance">
            {PROFILE_INFO.summary}
          </p>
        </motion.div>

        {/* Dynamic Animated Telemetry Ticker (Graphics) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-md"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-stone-300">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Cisco CCNA Routing</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-stone-300">
            <Shield className="w-3 h-3 text-amber-400" />
            <span>Enterprise Firewalls</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-stone-300">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Linux & VMware ESXi</span>
          </div>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 w-full max-w-md"
        >
          <button
            onClick={() => downloadVCard()}
            className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-stone-950" />
            <span>Save Contact (.vcf)</span>
          </button>

          <button
            onClick={onOpenContact}
            className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-850 bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700/80 font-semibold text-xs sm:text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Quick Message</span>
          </button>

          <button
            onClick={onOpenShare}
            className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-700/80 rounded-xl transition-colors"
            title="Share Profile / QR Code"
            aria-label="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={copyProfileUrl}
            className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-700/80 rounded-xl transition-colors relative"
            title="Copy Profile URL"
            aria-label="Copy Profile URL"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </motion.div>

        {/* Quick Social Icons Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap"
        >
          <a
            href="https://atifakhan.github.io/portfolio/#contact"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Main Portfolio"
            className="w-10 h-10 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-all hover:-translate-y-1 shadow-sm"
            title="Official Portfolio"
          >
            <Globe className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/muhammad-atif-06480515b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-blue-400 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-sm"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/Atifakhan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-stone-100 hover:border-stone-500/50 transition-all hover:-translate-y-1 shadow-sm"
            title="GitHub Repositories"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://x.com/atifat45?s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Twitter"
            className="w-10 h-10 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-sky-400 hover:border-sky-500/50 transition-all hover:-translate-y-1 shadow-sm"
            title="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/923149881406?text=Hi%20Muhammad%20Atif,%20I%20found%20your%20profile%20and%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chat"
            className="w-10 h-10 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all hover:-translate-y-1 shadow-sm"
            title="WhatsApp: 0314 9881406"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <a
            href="mailto:atifat45@gmail.com"
            aria-label="Direct Email"
            className="w-10 h-10 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-all hover:-translate-y-1 shadow-sm"
            title="Email: atifat45@gmail.com"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href="tel:+923149881406"
            aria-label="Direct Phone"
            className="w-10 h-10 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-teal-400 hover:border-teal-500/50 transition-all hover:-translate-y-1 shadow-sm"
            title="Call: 0314 9881406"
          >
            <Phone className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {photoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPhotoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-sm w-full bg-stone-900 border border-stone-700/80 rounded-3xl overflow-hidden shadow-2xl p-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-800">
                <img
                  src={PROFILE_INFO.avatarUrl}
                  alt="Muhammad Atif"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-stone-100">{PROFILE_INFO.name}</h3>
                <p className="text-xs text-stone-400">{PROFILE_INFO.title} at {PROFILE_INFO.company}</p>
                <div className="mt-3 flex gap-2 justify-center">
                  <button
                    onClick={() => setPhotoModalOpen(false)}
                    className="px-4 py-1.5 text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
