import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface FooterProps {
  onOpenGitHubGuide: () => void;
  onOpenShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGitHubGuide, onOpenShare }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-stone-850 border-stone-800/80 bg-stone-900/40 py-10 px-4 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Scroll back to top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition-colors mb-6"
          title="Scroll to top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Identity & Status */}
        <div className="flex items-center gap-2 text-stone-200 font-heading font-semibold text-base">
          <span>{PROFILE_INFO.name}</span>
          <span className="text-stone-600" aria-hidden="true">·</span>
          <span className="text-xs text-amber-400 font-normal">{PROFILE_INFO.title}</span>
        </div>

        <p className="mt-1 text-xs text-stone-400 max-w-sm">
          {PROFILE_INFO.company} · {PROFILE_INFO.location}
        </p>

        {/* Action Links */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-stone-400">
          <button
            onClick={onOpenShare}
            className="hover:text-amber-400 transition-colors"
          >
            QR Code & Share
          </button>
          <span className="text-stone-700" aria-hidden="true">·</span>
          <button
            onClick={onOpenGitHubGuide}
            className="hover:text-amber-400 transition-colors"
          >
            GitHub Pages Deploy Guide
          </button>
          <span className="text-stone-700" aria-hidden="true">·</span>
          <a
            href="mailto:atifat45@gmail.com"
            className="hover:text-amber-400 transition-colors"
          >
            atifat45@gmail.com
          </a>
          <span className="text-stone-700" aria-hidden="true">·</span>
          <a
            href="tel:+923149881406"
            className="hover:text-amber-400 transition-colors"
          >
            {PROFILE_INFO.phoneDisplay}
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-stone-850/80 w-full max-w-md flex flex-col items-center gap-1.5 text-[11px] text-stone-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {PROFILE_INFO.name}. All rights reserved.</span>
          </div>
          <p className="text-stone-600">
            Professional Profile & Links Hub · Enterprise IT & Security Engineering
          </p>
        </div>
      </div>
    </footer>
  );
};
