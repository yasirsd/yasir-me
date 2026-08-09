import type { MetadataRoute } from "next";
import { getProductionSiteUrl } from "@/lib/site";
import { projects } from "@/data/projects";

/**
 * Sitemap omits /design-system.
 * When production URL is unset, returns an empty sitemap rather than inventing a domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getProductionSiteUrl();
  if (!siteUrl) return [];

  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
