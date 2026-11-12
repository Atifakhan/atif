import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Layers, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  Server, 
  Cpu
} from 'lucide-react';
import { SocialLink } from '../data/profileData';

interface FeaturedShowcaseCardProps {
  link: SocialLink;
  onCopySuccess?: (title: string) => void;
  accentColor?: string;
}

export const FeaturedShowcaseCard: React.FC<FeaturedShowcaseCardProps> = ({ 
  link, 
  onCopySuccess,
  accentColor = 'amber'
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    if (onCopySuccess) onCopySuccess(link.title);
    setTimeout(() => setCopied(false), 2000);
  };

  // Icon selector
  const renderIcon = () => {
    switch (link.id) {
      case 'main-portfolio':
        return <Activity className="w-5 h-5 text-amber-400" />;
      case 'hatchable-expertise':
        return <Server className="w-5 h-5 text-amber-400" />;
      case 'community-portfolio':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      default:
        return <Globe className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl p-[1px] bg-gradient-to-b from-stone-700/80 via-stone-800 to-stone-900 group shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
    >
      {/* Animated subtle glow on hover */}
      <div 
        className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent blur-md transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <div className="relative rounded-2xl bg-gradient-to-b from-stone-900/95 via-stone-900/98 to-stone-950 p-5 overflow-hidden">
        {/* Animated subtle grid pattern */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#44403c_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" 
        />

        {/* Ambient Top Light Beam */}
        <div className="absolute -top-12 left-1/4 w-1/2 h-24 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Card Top Row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-stone-800/90 border border-stone-700/80 flex items-center justify-center shadow-inner group-hover:border-amber-500/50 group-hover:bg-stone-800 transition-colors">
                {renderIcon()}
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-amber-400/90 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  {link.badge || "Featured Showcase"}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-heading text-stone-100 group-hover:text-amber-300 transition-colors">
                  {link.title}
                </h3>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 rounded-lg transition-colors"
                title="Copy Link URL"
                aria-label="Copy Link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-stone-400 group-hover:text-amber-400 hover:bg-stone-800/80 rounded-lg transition-colors"
                title="Open in new tab"
                aria-label="Open Link"
              >
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed mb-4">
            {link.subtitle}
          </p>

          {/* Interactive animated preview graphic widget */}
          <div className="mb-4 p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 relative overflow-hidden">
            {link.id === 'main-portfolio' && (
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-stone-300 font-semibold">Live Enterprise Topologies</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <span>Routing: BGP / OSPF</span>
                  <span>·</span>
                  <span className="text-emerald-400">Online</span>
                </div>
              </div>
            )}

            {link.id === 'hatchable-expertise' && (
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-stone-300 font-semibold">Security & VMware Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <span>Firewall Audits</span>
                  <span>·</span>
                  <span className="text-amber-400">Certified</span>
                </div>
              </div>
            )}

            {link.id === 'community-portfolio' && (
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-stone-300 font-semibold">Supabase & Cloud Platform</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <span>Full-Stack Tech</span>
                  <span>·</span>
                  <span className="text-cyan-400">Ready</span>
                </div>
              </div>
            )}
          </div>

          {/* Tags / highlights */}
          {link.highlights && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-800/80">
              {link.highlights.map((tag) => (
                <span 
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-stone-800/80 text-[11px] font-medium text-stone-300 border border-stone-700/60"
                >
                  {tag}
                </span>
              ))}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Visit Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
