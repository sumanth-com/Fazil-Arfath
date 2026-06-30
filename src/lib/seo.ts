import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fazil-arfath.vercel.app";

export const GEO = {
  locality: "Bangalore",
  region: "Karnataka",
  regionCode: "IN-KA",
  country: "India",
  countryCode: "IN",
  latitude: 12.9716,
  longitude: 77.5946,
} as const;

export type SectionKey =
  | "home"
  | "about"
  | "experience"
  | "process"
  | "services"
  | "contact";

type SectionSeo = {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  breadcrumb: string;
};

const GEO_PHRASE = "Bangalore, Karnataka, India";

export const SECTION_SEO: Record<SectionKey, SectionSeo> = {
  home: {
    title: `${SITE.person} — ${SITE.roleTitle} | ${SITE.name}`,
    description: `${SITE.tagline} Hire a Google Ads and SEO expert in ${GEO_PHRASE} for B2B SaaS and technology brands. 8+ years driving measurable growth.`,
    keywords: [
      "Mohammed Fazil Arfath",
      "Mr Fazil digital marketing",
      "Google Ads expert Bangalore",
      "SEO specialist India",
      "performance marketing consultant",
      "B2B SaaS marketing Bangalore",
      "digital marketing freelancer Karnataka",
    ],
    path: ROUTES.home,
    breadcrumb: "Home",
  },
  about: {
    title: `About ${SITE.person} — ${SITE.roleDetail}`,
    description: `Learn about ${SITE.person}, a ${SITE.roleTitle} in ${GEO_PHRASE} with 8+ years helping B2B SaaS and tech companies grow through Google Ads, SEO, and performance marketing.`,
    keywords: [
      "about Fazil Arfath",
      "digital marketing specialist Bangalore",
      "Google Ads certified marketer India",
      "B2B marketing expert Karnataka",
      "SEO consultant Bangalore",
    ],
    path: ROUTES.about,
    breadcrumb: "About",
  },
  experience: {
    title: `Work Experience — ${SITE.person}`,
    description: `Explore ${SITE.person}'s digital marketing career across Dataplatr, TYASuite, iTCart, and Upnet. Sr. specialist in Google Ads, SEO, and lead generation from ${GEO_PHRASE}.`,
    keywords: [
      "Fazil Arfath experience",
      "digital marketing career India",
      "Google Ads specialist resume",
      "B2B SaaS marketing experience Bangalore",
      "performance marketing professional",
    ],
    path: ROUTES.experience,
    breadcrumb: "Experience",
  },
  process: {
    title: `Marketing Process — ${SITE.roleDetail}`,
    description: `Discover ${SITE.name}'s 4-step framework: audit, strategy, launch, and scale. Google Ads and SEO process built for B2B SaaS growth in ${GEO_PHRASE} and across India.`,
    keywords: [
      "digital marketing process",
      "Google Ads strategy framework",
      "SEO audit process Bangalore",
      "performance marketing methodology",
      "B2B lead generation process",
    ],
    path: ROUTES.process,
    breadcrumb: "Process",
  },
  services: {
    title: `Services — Google Ads, SEO & Performance Marketing`,
    description: `Core services by ${SITE.person}: Google Ads management, SEO strategy, Meta Ads, analytics, CRO, and B2B SaaS lead generation. Based in ${GEO_PHRASE}, serving clients across India.`,
    keywords: [
      "Google Ads management Bangalore",
      "SEO services India",
      "performance marketing agency freelancer",
      "Meta Ads specialist Karnataka",
      "B2B SaaS lead generation services",
      "conversion rate optimization India",
    ],
    path: ROUTES.services,
    breadcrumb: "Services",
  },
  contact: {
    title: `Contact ${SITE.name} — Let's Grow Together`,
    description: `Contact ${SITE.person}, ${SITE.roleTitle} in ${GEO_PHRASE}. Email, WhatsApp, or LinkedIn. Available for freelance and full-time opportunities. Responds ${SITE.responseTime.toLowerCase()}.`,
    keywords: [
      "contact digital marketing expert Bangalore",
      "hire Google Ads specialist India",
      "freelance SEO consultant Karnataka",
      "Mohammed Fazil Arfath contact",
      "digital marketing freelancer Bangalore",
    ],
    path: ROUTES.contact,
    breadcrumb: "Contact",
  },
};

export function getCanonicalUrl(path: string) {
  const base = SITE_URL.replace(/\/$/, "");
  return path === "/" ? base : `${base}${path}`;
}

export function createSectionMetadata(section: SectionKey): Metadata {
  const seo = SECTION_SEO[section];
  const url = getCanonicalUrl(seo.path);

  return {
    title: {
      absolute: seo.title,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: SITE.person, url: SITE.linkedin }],
    creator: SITE.person,
    publisher: SITE.name,
    category: "Digital Marketing",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: `@${SITE.personShort}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": GEO.regionCode,
      "geo.placename": GEO.locality,
      "geo.position": `${GEO.latitude};${GEO.longitude}`,
      ICBM: `${GEO.latitude}, ${GEO.longitude}`,
    },
  };
}

export function getBreadcrumbSchema(section: SectionKey) {
  const seo = SECTION_SEO[section];
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: SECTION_SEO.home.breadcrumb,
      item: getCanonicalUrl(ROUTES.home),
    },
  ];

  if (section !== "home") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: seo.breadcrumb,
      item: getCanonicalUrl(seo.path),
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
