import { SITE } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "#person",
        name: SITE.person,
        alternateName: [SITE.alsoKnownAs, SITE.name],
        jobTitle: SITE.roleTitle,
        description: SITE.tagline,
        email: SITE.email,
        telephone: SITE.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Google Ads",
          "Search Engine Optimization",
          "Performance Marketing",
          "B2B SaaS Marketing",
        ],
      },
      {
        "@type": "ProfessionalService",
        name: `${SITE.person} — ${SITE.roleDetail}`,
        description: SITE.heroTagline,
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        provider: { "@id": "#person" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
