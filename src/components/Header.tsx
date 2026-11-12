import React from 'react';
import { Share2, UserCheck, Download, Sparkles } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';

interface HeaderProps {
  onOpenShare: () => void;
  onOpenGitHubGuide: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShare, onOpenGitHubGuide }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-900/80 border-b border-stone-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <a 
          href="#top" 
          className="flex items-center gap-2.5 text-stone-100 hover:text-amber-400 font-heading font-semibold text-base sm:text-lg tracking-tight transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-[1.5px] shadow-sm">
            <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-xs font-bold text-amber-400 group-hover:bg-transparent group-hover:text-stone-950 transition-colors">
              MA
            </div>
          </div>
          <span className="flex items-center gap-1.5">
            Muhammad Atif
            <UserCheck className="w-4 h-4 text-emerald-400 inline" aria-label="Verified Professional" />
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-400">
          <a href="#featured" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Featured
          </a>
          <a href="#portfolios" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Portfolios
          </a>
          <a href="#professional" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Career
          </a>
          <a href="#social" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Socials
          </a>
          <a href="#contact" className="hover:text-stone-100 transition-colors whitespace-nowrap">
            Contact
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenGitHubGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700/80 border border-stone-700/60 rounded-lg transition-colors whitespace-nowrap"
            title="Deploy to GitHub Pages Guide"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GitHub Live Guide</span>
          </button>

          <button
            onClick={() => downloadVCard()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-700 border border-stone-700/60 rounded-lg transition-colors whitespace-nowrap"
            title="Download vCard to save Muhammad to your contacts"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save Contact</span>
          </button>

          <button
            onClick={onOpenShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            title="Share this profile via QR code or link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};
