import type { MetadataRoute } from "next";
import { getProductionSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getProductionSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system", "/design-system/"],
    },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
