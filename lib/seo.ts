import type { Metadata } from "next";
import { getProductionSiteUrl, siteConfig } from "@/lib/site";

const titleDefault = `${siteConfig.name} | ${siteConfig.role}`;

/**
 * Metadata helpers that refuse to publish localhost/invented domains.
 * When no production site URL is configured, absolute metadata is omitted.
 */
export function createRootMetadata(): Metadata {
  const productionUrl = getProductionSiteUrl();

  const metadata: Metadata = {
    title: {
      default: titleDefault,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    keywords: [
      "Senior Frontend Engineer",
      "React",
      "TypeScript",
      "React Native",
      "Frontend Architecture",
      "Accessibility",
      "Performance",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      title: titleDefault,
      description: siteConfig.description,
      siteName: siteConfig.name,
      ...(productionUrl ? { url: productionUrl } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description: siteConfig.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  if (productionUrl) {
    metadata.metadataBase = new URL(productionUrl);
    metadata.alternates = { canonical: "/" };
  }

  return metadata;
}

export function createNoIndexMetadata(title: string): Metadata {
  return {
    title,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}
