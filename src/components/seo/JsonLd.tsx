import { SITE } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import {
  GEO,
  SECTION_SEO,
  SITE_URL,
  getBreadcrumbSchema,
  getCanonicalUrl,
  type SectionKey,
} from "@/lib/seo";

type JsonLdProps = {
  section?: SectionKey;
};

export function JsonLd({ section = "home" }: JsonLdProps) {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const businessId = `${SITE_URL}/#business`;
  const pagePath =
    section === "home" ? ROUTES.home : ROUTES[section as Exclude<SectionKey, "home">];
  const pageUrl = getCanonicalUrl(pagePath);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.person,
        alternateName: [SITE.alsoKnownAs, SITE.name],
        jobTitle: SITE.roleTitle,
        description: SITE.tagline,
        email: `mailto:${SITE.email}`,
        telephone: SITE.phone,
        url: SITE_URL,
        sameAs: [SITE.linkedin, `https://wa.me/${SITE.phone.replace(/\D/g, "")}`],
        image: `${SITE_URL}/assets/fazil.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: GEO.locality,
          addressRegion: GEO.region,
          addressCountry: GEO.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        knowsAbout: [
          "Google Ads",
          "Search Engine Optimization",
          "Performance Marketing",
          "Meta Ads",
          "B2B SaaS Marketing",
          "Conversion Rate Optimization",
          "Google Analytics",
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: SITE.certification,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: `${SITE.person} — ${SITE.roleDetail}`,
        description: SITE.heroTagline,
        url: SITE_URL,
        email: SITE.email,
        telephone: SITE.phone,
        priceRange: "$$",
        areaServed: [
          {
            "@type": "City",
            name: GEO.locality,
            containedInPlace: {
              "@type": "State",
              name: GEO.region,
            },
          },
          {
            "@type": "Country",
            name: GEO.country,
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: GEO.locality,
          addressRegion: GEO.region,
          addressCountry: GEO.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        provider: { "@id": personId },
        serviceType: [
          "Google Ads Management",
          "SEO Strategy",
          "Performance Marketing",
          "Analytics & Reporting",
          "Conversion Optimization",
          "B2B SaaS Lead Generation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE.name,
        alternateName: SITE.person,
        url: SITE_URL,
        description: SITE.tagline,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: section === "home" ? SECTION_SEO.home.title : SECTION_SEO[section].title,
        description:
          section === "home"
            ? SECTION_SEO.home.description
            : SECTION_SEO[section].description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: "en-IN",
      },
      getBreadcrumbSchema(section),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
