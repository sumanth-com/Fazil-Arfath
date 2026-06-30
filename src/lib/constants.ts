export const SITE = {
  name: "Mr. Fazil",
  ctaLabel: "Let's Connect",
  person: "Mohammed Fazil Arfath",
  personShort: "Fazil",
  alsoKnownAs: "Fazil Arfath",
  role: "Digital Marketing",
  roleTitle: "Sr. Digital Marketing Specialist",
  roleDetail: "Google Ads & SEO Expert",
  tagline:
    "Data-driven strategies that improve visibility, generate quality leads, and deliver measurable growth.",
  heroTagline:
    "Turning data into growth—one optimized campaign at a time.",
  heroHighlights: [
    "8+ Years Experience",
    "56+ Clients",
    "Google Ads Certified",
  ] as const,
  email: "arfath.fazil@gmail.com",
  phone: "+91 9066249066",
  linkedin: "https://www.linkedin.com/in/arfath-fazil",
  location: "Bangalore, India",
  status: "Available for work & freelance",
  focus: "Performance Marketing • SEO • Google Ads",
  responseTime: "Within 24 hours",
  certification: "Google Ads Certified",
  aboutHeading: "GROWTH THROUGH",
  aboutHeadingAccent: "PERFORMANCE",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const SECTION_NUMBERS = {
  about: "01",
  experience: "02",
  process: "03",
  services: "04",
  contact: "05",
} as const;

export const RIBBON_ITEMS = [
  "Google Ads Certified",
  "Performance marketing",
  "SEO & organic growth",
  "B2B SaaS specialist",
  "Measurable ROI",
  "Available for projects",
] as const;

export const STATS = [
  { value: 8, suffix: "+", label: "Years Experience", icon: "experience" as const },
  { value: 56, suffix: "+", label: "Clients Served", icon: "clients" as const },
  { value: 60, suffix: "+", label: "Campaigns Launched", icon: "campaigns" as const },
  {
    value: 0,
    suffix: "",
    label: "SaaS & Tech Focus",
    icon: "focus" as const,
    display: "B2B",
  },
] as const;

export const EXPERIENCE = [
  {
    id: "01",
    company: "Dataplatr",
    logoKey: "dataplatr",
    role: "Sr. Digital Marketing Specialist",
    period: "2023 – Present",
    category: "B2B SaaS • Performance Marketing",
    description:
      "Leading performance marketing and SEO for B2B SaaS clients. Managing Google Ads for qualified leads with data-driven SEO and continuous campaign optimization.",
  },
  {
    id: "02",
    company: "TYASuite",
    logoKey: "tyasuite",
    role: "Digital Marketing Specialist",
    period: "2021 – 2023",
    category: "Google Ads • Meta Ads • SEO",
    description:
      "Executed performance marketing on Google Ads and Meta Ads. Drove SEO and keyword research initiatives that improved organic reach and lead quality.",
  },
  {
    id: "03",
    company: "iTCart",
    logoKey: "itcart",
    role: "Performance Marketing Executive",
    period: "2019 – 2021",
    category: "E-Commerce • ROI Focus",
    description:
      "Ran end-to-end digital campaigns for e-commerce tech. Managed Google Ads and social media with ROI focus, landing page optimization, and Google Analytics tracking.",
  },
  {
    id: "04",
    company: "Upnet",
    logoKey: "upnet",
    role: "Digital Marketing Executive",
    period: "2017 – 2019",
    category: "Campaigns • SEO • Analytics",
    description:
      "Handled campaign setup, keyword research, SEO audits, and reporting. Built foundational expertise in Google Ads, analytics, and content strategy.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover & Audit",
    description:
      "Review your website, ad accounts, competitors, and keyword gaps to uncover quick wins and long-term growth opportunities.",
    icon: "audit" as const,
  },
  {
    number: "02",
    title: "Strategy & Setup",
    description:
      "Build Google Ads structure, conversion tracking, GA4 events, and SEO foundations aligned to your lead and revenue goals.",
    icon: "strategy" as const,
  },
  {
    number: "03",
    title: "Launch & Optimize",
    description:
      "Execute campaigns with ongoing bid, keyword, ad copy, and landing page improvements for better leads and lower CPA.",
    icon: "optimize" as const,
  },
  {
    number: "04",
    title: "Report & Scale",
    description:
      "Share Looker Studio dashboards, clear monthly insights, and scaling plans so you know what to invest in next.",
    icon: "scale" as const,
  },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "Google Ads Management",
    description:
      "Campaign setup, keyword research, bid strategy, and ongoing optimization for better leads and lower CPA.",
    items: [
      "Search & Display Campaigns",
      "Keyword Research",
      "Bid Strategy & Optimization",
      "Lead Quality Improvement",
    ],
    icon: "search",
  },
  {
    number: "02",
    title: "SEO & Content Strategy",
    description:
      "Technical SEO, on-page optimization, and content planning to drive consistent organic traffic growth.",
    items: [
      "Technical SEO Audits",
      "Keyword Research",
      "On-Page Optimization",
      "Content Planning",
    ],
    icon: "screen",
  },
  {
    number: "03",
    title: "Performance Marketing",
    description:
      "Meta Ads, audience targeting, and creative testing with ROI-focused optimization across paid channels.",
    items: [
      "Meta Ads Management",
      "Audience Targeting",
      "Creative Testing",
      "ROI Optimization",
    ],
    icon: "cube",
  },
  {
    number: "04",
    title: "Analytics & Reporting",
    description:
      "GA4 setup, conversion tracking, dashboards, and actionable insights to guide smarter decisions.",
    items: [
      "GA4 & Conversion Tracking",
      "Looker Studio Dashboards",
      "Attribution Modelling",
      "Data-Driven Insights",
    ],
    icon: "hexagon",
  },
  {
    number: "05",
    title: "Conversion Optimization",
    description:
      "Landing page analysis, A/B testing, and funnel optimization to turn more traffic into qualified leads.",
    items: [
      "Landing Page Analysis",
      "A/B Testing",
      "Funnel Optimization",
      "UX Improvements",
    ],
    icon: "code",
  },
  {
    number: "06",
    title: "B2B SaaS Lead Generation",
    description:
      "Pipeline-focused campaigns for SaaS and technology brands using LinkedIn Ads, audience targeting, and full-funnel lead nurturing.",
    items: [
      "LinkedIn Ads",
      "SaaS Funnel Strategy",
      "Lead Qualification",
      "Account-Based Targeting",
    ],
    icon: "briefcase",
  },
] as const;

export const SERVICES_HIGHLIGHT = {
  quote:
    "Precision drives pipeline — Google Ads, SEO, and performance marketing engineered for B2B SaaS brands that demand qualified leads, scalable growth, and measurable revenue.",
  highlightWords: [
    "Precision",
    "pipeline",
    "Google",
    "SEO",
    "B2B",
    "SaaS",
    "growth",
    "revenue",
  ],
  caption:
    "Driving measurable growth • 8+ years • Google Ads Certified",
} as const;

export const HERO_SERVICES = [
  {
    number: "01",
    title: "Google Ads",
    description:
      "Campaign management that increases conversions and reduces CPA.",
    icon: "search",
  },
  {
    number: "02",
    title: "SEO Strategy",
    description:
      "Targeted SEO that improves traffic and organic lead quality.",
    icon: "screen",
  },
  {
    number: "03",
    title: "Performance Marketing",
    description:
      "ROI-focused paid campaigns across Google, Meta, and LinkedIn.",
    icon: "cube",
  },
  {
    number: "04",
    title: "Analytics & CRO",
    description:
      "GA4 tracking, reporting, and conversion optimization that scales results.",
    icon: "code",
  },
] as const;

export const TOOLS = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "SEO",
  "GA4",
  "HubSpot",
  "Looker Studio",
  "A/B Testing",
  "Attribution Modelling",
  "CRO",
  "Email Automation",
  "Content Strategy",
] as const;

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutExpo: [0.87, 0, 0.13, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  spring: { type: "spring" as const, stiffness: 100, damping: 20 },
};
