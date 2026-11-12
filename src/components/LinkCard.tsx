import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Layers, 
  Sparkles, 
  Linkedin, 
  Github, 
  Briefcase, 
  Twitter, 
  Facebook, 
  Instagram, 
  MessageSquare, 
  Video, 
  MessageCircle, 
  Mail, 
  Phone,
  ExternalLink,
  Copy,
  Check,
  Star,
  ArrowUpRight
} from 'lucide-react';
import { SocialLink } from '../data/profileData';

const ICONS_MAP: Record<string, React.ElementType> = {
  Globe,
  Layers,
  Sparkles,
  Linkedin,
  Github,
  Briefcase,
  Twitter,
  Facebook,
  Instagram,
  MessageSquare,
  Video,
  MessageCircle,
  Mail,
  Phone,
};

interface LinkCardProps {
  link: SocialLink;
  onCopySuccess?: (title: string) => void;
  index?: number;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onCopySuccess, index = 0 }) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = ICONS_MAP[link.icon] || Globe;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    if (onCopySuccess) onCopySuccess(link.title);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -2, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      className="relative group"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          block w-full p-4 sm:p-4.5 rounded-2xl transition-all duration-300
          bg-gradient-to-b from-stone-900/90 to-stone-950/90
          border ${link.featured 
            ? 'border-amber-500/40 hover:border-amber-400 shadow-md shadow-amber-500/5 hover:shadow-amber-500/10' 
            : 'border-stone-800/90 hover:border-stone-700 shadow-sm hover:shadow-lg'}
          relative overflow-hidden
        `}
      >
        {/* Animated subtle shimmer line for featured cards */}
        {link.featured && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20" />
        )}

        {/* Ambient subtle background light on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-center gap-3.5 sm:gap-4 relative z-10">
          {/* Card Icon */}
          <div className={`
            w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-inner
            ${link.featured 
              ? 'bg-amber-400/10 text-amber-400 border border-amber-500/30 group-hover:bg-amber-400/20' 
              : 'bg-stone-800/90 text-stone-300 border border-stone-700/60 group-hover:text-amber-400 group-hover:border-stone-600 group-hover:bg-stone-800'}
          `}>
            <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-stone-100 group-hover:text-amber-300 transition-colors truncate">
                {link.title}
              </h3>
              {link.featured && (
                <span className="shrink-0 flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  Featured
                </span>
              )}
            </div>

            <p className="text-xs text-stone-400 mt-0.5 line-clamp-1 leading-relaxed group-hover:text-stone-300 transition-colors">
              {link.subtitle}
            </p>

            {/* Highlights unboxed metadata */}
            {link.highlights && link.highlights.length > 0 && (
              <div className="mt-1.5 hidden sm:flex items-center gap-1.5 text-[11px] text-stone-500 truncate">
                {link.highlights.map((h, i) => (
                  <React.Fragment key={h}>
                    <span className="truncate">{h}</span>
                    {i < link.highlights!.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Action Affordances */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
              title={`Copy link to ${link.title}`}
              aria-label={`Copy link to ${link.title}`}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <div className="p-2 text-stone-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};
