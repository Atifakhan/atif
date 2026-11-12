export interface SocialLink {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: 'portfolio' | 'professional' | 'social' | 'contact';
  icon: string;
  featured?: boolean;
  badge?: string;
  highlights?: string[];
  thumbnail?: string;
  color?: string;
}

export interface ProfileInfo {
  name: string;
  handle: string;
  title: string;
  company: string;
  summary: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  location: string;
  status: string;
  avatarUrl: string;
  skills: string[];
  certifications: string[];
}

export const PROFILE_INFO: ProfileInfo = {
  name: "Muhammad Atif",
  handle: "@atifat45",
  title: "Network Infrastructure & Security Engineer",
  company: "IOTA Solutions",
  summary: "Specializing in Cisco enterprise networking, next-gen firewalls, VMware virtualization, Linux server administration, and hybrid cloud IT infrastructure with full-stack development capability.",
  email: "atifat45@gmail.com",
  phone: "+923149881406",
  phoneDisplay: "0314 9881406",
  location: "Islamabad, Pakistan · Available Worldwide",
  status: "Available for Consultations & Engineering Projects",
  avatarUrl: "assets/aistudio/image_42d9e173.png",
  skills: [
    "Cisco Routing & Switching",
    "Enterprise Firewalls",
    "VMware vSphere & ESXi",
    "Linux Systems (Ubuntu / RHEL)",
    "Cloud Infrastructure",
    "Network Security & VPNs",
    "Full-Stack Development",
    "Docker & Containerization"
  ],
  certifications: [
    "Cisco Certified Network Associate (CCNA)",
    "Fortinet & Firewall Specialist",
    "Linux Server Administrator"
  ]
};

export const PROFILE_LINKS: SocialLink[] = [
  // --- Portfolios & Key Hubs ---
  {
    id: "main-portfolio",
    title: "Official Engineering Portfolio",
    subtitle: "Case studies, live network topologies, security designs & contact hub",
    url: "https://atifakhan.github.io/portfolio/#contact",
    category: "portfolio",
    icon: "Globe",
    featured: true,
    badge: "Primary Portfolio",
    highlights: ["Interactive Projects", "Network Deployments", "Direct Contact"],
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "hatchable-expertise",
    title: "Technical Expertise & Services Showcase",
    subtitle: "Complete service portfolio, infrastructure solutions & advisory",
    url: "https://muhammad-atif.hatchable.site/",
    category: "portfolio",
    icon: "Layers",
    featured: true,
    badge: "Expertise Hub",
    highlights: ["Infrastructure Strategy", "Security Auditing", "Service Catalogue"],
    color: "from-amber-600 to-orange-700"
  },
  {
    id: "community-portfolio",
    title: "Community Builder & Supabase Platform",
    subtitle: "Developer initiatives, tech community projects & modern cloud databases",
    url: "https://atifakhan.github.io/atifakhan-supabase-portfolio/",
    category: "portfolio",
    icon: "Sparkles",
    featured: false,
    badge: "Cloud & Dev",
    highlights: ["Supabase Integrations", "Developer Community", "Open Systems"],
    color: "from-emerald-600 to-teal-700"
  },

  // --- Professional Profiles ---
  {
    id: "linkedin",
    title: "LinkedIn Profile",
    subtitle: "Professional network, career timeline at IOTA Solutions & endorsements",
    url: "https://www.linkedin.com/in/muhammad-atif-06480515b",
    category: "professional",
    icon: "Linkedin",
    featured: true,
    badge: "Verified Profile",
    highlights: ["Experience Timeline", "Recommendations", "Professional Connect"],
    color: "from-sky-700 to-blue-800"
  },
  {
    id: "github",
    title: "GitHub Repositories",
    subtitle: "Open-source projects, automation scripts, config templates & web apps",
    url: "https://github.com/Atifakhan",
    category: "professional",
    icon: "Github",
    featured: false,
    badge: "@Atifakhan",
    highlights: ["Public Repositories", "Network Automation", "Code Contributions"],
    color: "from-zinc-700 to-neutral-900"
  },
  {
    id: "asani-profile",
    title: "Asani.pk Verified Profile",
    subtitle: "Verified tech specialist profile, service inquiries & professional feedback",
    url: "https://asani.pk/profile/muhammad-atif-10",
    category: "professional",
    icon: "Briefcase",
    featured: false,
    badge: "Platform Verified",
    highlights: ["Verified Profile", "Regional Network", "Direct Booking"],
    color: "from-purple-700 to-violet-900"
  },

  // --- Social & Media Platforms ---
  {
    id: "x-twitter",
    title: "X (Twitter) Profile",
    subtitle: "Thoughts on network security, IT infrastructure, Linux tips & tech updates",
    url: "https://x.com/atifat45?s=09",
    category: "social",
    icon: "Twitter",
    featured: false,
    badge: "@atifat45",
    highlights: ["Tech Insights", "Infosec Updates", "Discussions"],
    color: "from-slate-800 to-zinc-950"
  },
  {
    id: "facebook",
    title: "Facebook Page",
    subtitle: "Personal updates, technology news, professional journey & network",
    url: "https://www.facebook.com/atifat12khan",
    category: "social",
    icon: "Facebook",
    featured: false,
    badge: "@atifat12khan",
    highlights: ["Social Network", "News & Articles", "Community"],
    color: "from-blue-600 to-blue-800"
  },
  {
    id: "instagram",
    title: "Instagram Profile",
    subtitle: "Behind the scenes, engineering lifestyle, tech snapshots & highlights",
    url: "https://www.facebook.com/atifat12khan",
    category: "social",
    icon: "Instagram",
    featured: false,
    badge: "Social",
    highlights: ["Visual Stories", "Engineering Life", "Creative"],
    color: "from-fuchsia-600 to-rose-600"
  },
  {
    id: "reddit",
    title: "Reddit Community Profile",
    subtitle: "Active contributor across sysadmin, networking, Linux & tech forums",
    url: "https://www.reddit.com/user/FederalClub2215/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    category: "social",
    icon: "MessageSquare",
    featured: false,
    badge: "u/FederalClub2215",
    highlights: ["Technical Q&A", "Community Discussions", "Troubleshooting"],
    color: "from-orange-600 to-red-700"
  },
  {
    id: "tiktok",
    title: "TikTok Tech Shorts",
    subtitle: "Quick tech explainers, hardware setups & networking tips in bite-sized videos",
    url: "https://www.tiktok.com/@user_atif0",
    category: "social",
    icon: "Video",
    featured: false,
    badge: "@user_atif0",
    highlights: ["Tech Shorts", "Hardware Demos", "Tutorials"],
    color: "from-cyan-600 to-pink-600"
  },

  // --- Contact & Inquiries ---
  {
    id: "whatsapp",
    title: "WhatsApp Direct Chat",
    subtitle: "Instant messaging for project consultations, urgent inquiries & direct chat",
    url: "https://wa.me/923149881406?text=Hi%20Muhammad%20Atif,%20I%20found%20your%20profile%20and%20would%20like%20to%20connect.",
    category: "contact",
    icon: "MessageCircle",
    featured: true,
    badge: "+92 314 9881406",
    highlights: ["Instant Response", "Voice & Chat", "Available Worldwide"],
    color: "from-emerald-500 to-green-700"
  },
  {
    id: "direct-email",
    title: "Official Email Inquiry",
    subtitle: "Send direct project briefs, RFPs, job opportunities or advisory requests",
    url: "mailto:atifat45@gmail.com?subject=Inquiry%20from%20Portfolio%20Profile",
    category: "contact",
    icon: "Mail",
    featured: true,
    badge: "atifat45@gmail.com",
    highlights: ["Business Inquiries", "RFPs & Consultations", "Confidential"],
    color: "from-amber-600 to-yellow-700"
  },
  {
    id: "phone-call",
    title: "Direct Phone Call",
    subtitle: "0314 9881406 · International calling: +92 314 9881406",
    url: "tel:+923149881406",
    category: "contact",
    icon: "Phone",
    featured: false,
    badge: "Direct Line",
    highlights: ["Voice Call", "Business Hours", "Urgent Matters"],
    color: "from-teal-600 to-cyan-800"
  }
];
