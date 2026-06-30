import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { getCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: getCanonicalUrl(ROUTES.home), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: getCanonicalUrl(ROUTES.about), lastModified, changeFrequency: "monthly", priority: 0.9 },
    {
      url: getCanonicalUrl(ROUTES.experience),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { url: getCanonicalUrl(ROUTES.process), lastModified, changeFrequency: "monthly", priority: 0.8 },
    {
      url: getCanonicalUrl(ROUTES.services),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: getCanonicalUrl(ROUTES.contact), lastModified, changeFrequency: "monthly", priority: 0.95 },
  ];
}
