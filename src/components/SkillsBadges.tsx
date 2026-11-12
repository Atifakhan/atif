import React from 'react';
import { motion } from 'motion/react';
import { Shield, Server, Network, Terminal, Cloud, Lock, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

const SKILL_ICONS: Record<string, React.ElementType> = {
  "Cisco Routing & Switching": Network,
  "Enterprise Firewalls": Shield,
  "VMware vSphere & ESXi": Server,
  "Linux Systems (Ubuntu / RHEL)": Terminal,
  "Cloud Infrastructure": Cloud,
  "Network Security & VPNs": Lock,
  "Full-Stack Development": Cpu,
  "Docker & Containerization": Database
};

export const SkillsBadges: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 my-6">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="bg-stone-900/80 backdrop-blur-md border border-stone-800/90 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden"
      >
        {/* Subtle decorative circuit corner */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

        <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-300 font-mono">
              Core Technical Competencies
            </h2>
          </div>
          <span className="text-[11px] text-amber-400/90 font-mono bg-stone-800/80 px-2 py-0.5 rounded-md border border-stone-700/60">
            {PROFILE_INFO.skills.length} Domains
          </span>
        </div>

        <div className="flex flex-wrap gap-2 relative z-10">
          {PROFILE_INFO.skills.map((skill, index) => {
            const Icon = SKILL_ICONS[skill] || Shield;
            return (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-850 bg-stone-900 border border-stone-700/60 text-xs font-medium text-stone-200 hover:text-amber-300 hover:border-amber-500/50 hover:bg-stone-800 transition-all cursor-default shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{skill}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications preview strip */}
        <div className="mt-3.5 pt-3.5 border-t border-stone-800/80 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-stone-400 relative z-10">
          <span className="text-stone-400 font-semibold text-[11px] font-mono uppercase tracking-wide">
            Industry Credentials:
          </span>
          {PROFILE_INFO.certifications.map((cert) => (
            <span key={cert} className="inline-flex items-center gap-1 text-stone-300 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{cert}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
