import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  Briefcase, 
  Globe, 
  MessageSquare, 
  PhoneCall, 
  Share2, 
  Check, 
  Layers, 
  Compass, 
  CheckCircle2, 
  ExternalLink,
  Github,
  Palette,
  Terminal,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { PROFILE_INFO, PROFILE_LINKS, SocialLink } from './data/profileData';
import { Header } from './components/Header';
import { ProfileHero } from './components/ProfileHero';
import { SkillsBadges } from './components/SkillsBadges';
import { LinkCard } from './components/LinkCard';
import { FeaturedShowcaseCard } from './components/FeaturedShowcaseCard';
import { NetworkCanvas } from './components/NetworkCanvas';
import { ShareModal } from './components/ShareModal';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

type FilterCategory = 'all' | 'portfolio' | 'professional' | 'social' | 'contact';
type ThemeAccent = 'gold' | 'emerald' | 'cyan';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState<ThemeAccent>('gold');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [githubGuideOpen, setGithubGuideOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filter links based on category & search term
  const filteredLinks = useMemo(() => {
    return PROFILE_LINKS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Grouped links for "All" view
  const portfolioLinks = useMemo(() => PROFILE_LINKS.filter(l => l.category === 'portfolio'), []);
  const professionalLinks = useMemo(() => PROFILE_LINKS.filter(l => l.category === 'professional'), []);
  const socialLinks = useMemo(() => PROFILE_LINKS.filter(l => l.category === 'social'), []);
  const contactLinks = useMemo(() => PROFILE_LINKS.filter(l => l.category === 'contact'), []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950 relative overflow-x-hidden">
      {/* Animated Cybersecurity & Network Routing Canvas in the background */}
      <NetworkCanvas theme={activeTheme} />

      {/* Top Header */}
      <Header 
        onOpenShare={() => setShareModalOpen(true)}
        onOpenGitHubGuide={() => setGithubGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Profile Hero Header with Portrait & Animated Metrics */}
        <ProfileHero 
          onOpenShare={() => setShareModalOpen(true)}
          onOpenContact={() => setContactModalOpen(true)}
          activeTheme={activeTheme}
        />

        {/* Technical Competencies Badges */}
        <SkillsBadges />

        {/* Search & Filter Toolbar with Sticky Blur */}
        <div className="mt-6 mb-6 sticky top-16 z-30 py-2.5 backdrop-blur-xl bg-stone-950/85 border-b border-stone-850">
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search portfolios, social profiles, skills..."
                className="w-full bg-stone-900/90 border border-stone-800 focus:border-amber-400/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Accent Theme Switcher Button */}
            <div className="flex items-center p-1 bg-stone-900 border border-stone-800 rounded-xl shrink-0">
              <button
                onClick={() => setActiveTheme('gold')}
                className={`w-6 h-6 rounded-lg transition-transform ${activeTheme === 'gold' ? 'scale-110 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                title="Gold / Executive Amber"
              >
                <div className="w-full h-full rounded-lg bg-amber-400" />
              </button>
              <button
                onClick={() => setActiveTheme('emerald')}
                className={`w-6 h-6 rounded-lg ml-1 transition-transform ${activeTheme === 'emerald' ? 'scale-110 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                title="Cyber Emerald"
              >
                <div className="w-full h-full rounded-lg bg-emerald-400" />
              </button>
              <button
                onClick={() => setActiveTheme('cyan')}
                className={`w-6 h-6 rounded-lg ml-1 transition-transform ${activeTheme === 'cyan' ? 'scale-110 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                title="Hyper Cyan / Cloud"
              >
                <div className="w-full h-full rounded-lg bg-cyan-400" />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              All Links ({PROFILE_LINKS.length})
            </button>
            <button
              onClick={() => setActiveCategory('portfolio')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === 'portfolio'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              Portfolios ({portfolioLinks.length})
            </button>
            <button
              onClick={() => setActiveCategory('professional')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === 'professional'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              Career & Tech ({professionalLinks.length})
            </button>
            <button
              onClick={() => setActiveCategory('social')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === 'social'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              Socials ({socialLinks.length})
            </button>
            <button
              onClick={() => setActiveCategory('contact')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === 'contact'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              Contact ({contactLinks.length})
            </button>
          </div>
        </div>

        {/* Links Display */}
        {activeCategory !== 'all' || searchQuery ? (
          /* Filtered or Searched View */
          <div className="space-y-3">
            {filteredLinks.length === 0 ? (
              <div className="text-center py-12 px-4 bg-stone-900/60 rounded-2xl border border-stone-800">
                <Compass className="w-8 h-8 text-stone-500 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-stone-300">No matching profiles or links</h4>
                <p className="text-xs text-stone-500 mt-1">Try another search term or reset filters.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-3 px-3 py-1.5 text-xs text-amber-400 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredLinks.map((link, idx) => (
                <LinkCard 
                  key={link.id} 
                  link={link} 
                  index={idx}
                  onCopySuccess={(title) => showToast(`Copied link to ${title}`)} 
                />
              ))
            )}
          </div>
        ) : (
          /* Structured Executive Categorized View */
          <div className="space-y-9">
            {/* Section 1: Flagship Featured Portfolios (Rich Animated Showcase Cards) */}
            <section id="featured">
              <div className="flex items-center justify-between mb-3.5 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-300 font-mono">
                    Flagship Portfolios & Platforms
                  </h2>
                </div>
                <span className="text-[11px] text-stone-500 font-mono">Live Showcases</span>
              </div>

              <div className="space-y-4">
                {portfolioLinks.map((link) => (
                  <FeaturedShowcaseCard 
                    key={link.id} 
                    link={link} 
                    onCopySuccess={(title) => showToast(`Copied link to ${title}`)} 
                  />
                ))}
              </div>
            </section>

            {/* Section 2: Career & Professional Networks */}
            <section id="professional">
              <div className="flex items-center justify-between mb-3.5 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-sky-400/20 text-sky-400 flex items-center justify-center">
                    <Briefcase className="w-3 h-3" />
                  </div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-300 font-mono">
                    Professional & Engineering Profiles
                  </h2>
                </div>
                <span className="text-[11px] text-stone-500 font-mono">Verified Networks</span>
              </div>
              <div className="space-y-3">
                {professionalLinks.map((link, idx) => (
                  <LinkCard 
                    key={link.id} 
                    link={link} 
                    index={idx}
                    onCopySuccess={(title) => showToast(`Copied link to ${title}`)} 
                  />
                ))}
              </div>
            </section>

            {/* Section 3: Social & Media Channels */}
            <section id="social">
              <div className="flex items-center justify-between mb-3.5 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-purple-400/20 text-purple-400 flex items-center justify-center">
                    <MessageSquare className="w-3 h-3" />
                  </div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-300 font-mono">
                    Social Channels & Tech Communities
                  </h2>
                </div>
                <span className="text-[11px] text-stone-500 font-mono">Public Channels</span>
              </div>
              <div className="space-y-3">
                {socialLinks.map((link, idx) => (
                  <LinkCard 
                    key={link.id} 
                    link={link} 
                    index={idx}
                    onCopySuccess={(title) => showToast(`Copied link to ${title}`)} 
                  />
                ))}
              </div>
            </section>

            {/* Section 4: Direct Inquiries & Contact */}
            <section id="contact">
              <div className="flex items-center justify-between mb-3.5 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center">
                    <PhoneCall className="w-3 h-3" />
                  </div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-300 font-mono">
                    Direct Contact & Rapid Inquiries
                  </h2>
                </div>
                <span className="text-[11px] text-stone-500 font-mono">Instant Connect</span>
              </div>
              <div className="space-y-3">
                {contactLinks.map((link, idx) => (
                  <LinkCard 
                    key={link.id} 
                    link={link} 
                    index={idx}
                    onCopySuccess={(title) => showToast(`Copied link to ${title}`)} 
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* GitHub Live Deploy Notice Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-900/90 to-stone-850/90 border border-stone-800 text-stone-300 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 shadow-inner">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                  <span>Host this Profile Live on GitHub Pages</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-semibold">100% Free</span>
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Ready to deploy on <code className="text-amber-300 font-mono">https://atifakhan.github.io/links</code>. Automated GitHub Actions workflow is already packaged in this project.
                </p>
              </div>
            </div>
            <button
              onClick={() => setGithubGuideOpen(true)}
              className="shrink-0 px-3.5 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 rounded-xl transition-all hover:scale-105 whitespace-nowrap shadow-sm"
            >
              View Instructions
            </button>
          </div>
        </motion.div>
      </main>

      {/* Global Footer */}
      <Footer 
        onOpenGitHubGuide={() => setGithubGuideOpen(true)}
        onOpenShare={() => setShareModalOpen(true)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 px-4 py-2 bg-stone-900 border border-amber-400/70 text-stone-100 text-xs font-semibold rounded-xl shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
      />

      <GitHubDeployModal 
        isOpen={githubGuideOpen} 
        onClose={() => setGithubGuideOpen(false)} 
      />

      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </div>
  );
}
