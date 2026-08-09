/**
 * Central typed site configuration.
 *
 * Production URL strategy:
 * - Prefer NEXT_PUBLIC_SITE_URL when it is a valid absolute http(s) URL
 * - Development may fall back to localhost for local absolute links
 * - Production never invents a domain and never publishes localhost / 127.0.0.1
 *   as canonical or Open Graph metadata (see lib/seo.ts)
 */

export type SiteConfig = {
  name: string;
  shortName: string;
  role: string;
  email: string;
  location: string;
  linkedIn: string;
  description: string;
  resumePath: string;
  resumeDownloadName: string;
  portraits: {
    formal: string;
    sunset: string;
  };
  /** Absolute site origin when safely available; otherwise null */
  siteUrl: string | null;
  /** True when siteUrl points at a local development host */
  isLocalSiteUrl: boolean;
};

function normalizeSiteUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().replace(/\/$/, "");
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local")
  );
}

function resolveSiteUrl(): { siteUrl: string | null; isLocalSiteUrl: boolean } {
  const fromEnv = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  if (fromEnv) {
    const hostname = new URL(fromEnv).hostname;
    return { siteUrl: fromEnv, isLocalSiteUrl: isLocalHost(hostname) };
  }

  if (process.env.NODE_ENV === "development") {
    return { siteUrl: "http://localhost:3000", isLocalSiteUrl: true };
  }

  // Production without an explicit URL: omit rather than invent.
  return { siteUrl: null, isLocalSiteUrl: false };
}

const { siteUrl, isLocalSiteUrl } = resolveSiteUrl();

export const siteConfig: SiteConfig = {
  name: "Yasir Syed",
  shortName: "Yasir",
  role: "Senior Frontend Engineer",
  email: "syedyasir1450@gmail.com",
  location: "Hyderabad, India",
  linkedIn: "https://www.linkedin.com/in/yasir-syed10/",
  description:
    "Senior Frontend Engineer building high-performance, accessible product interfaces with React, TypeScript, and React Native.",
  resumePath: "/resume/yasir-resume.pdf",
  resumeDownloadName: "Yasir-Syed-Resume.pdf",
  portraits: {
    formal: "/images/portrait/yasir-formal.png",
    sunset: "/images/portrait/yasir-sunset.png",
  },
  siteUrl,
  isLocalSiteUrl,
};

/** Absolute URL safe for production metadata (never localhost). */
export function getProductionSiteUrl(): string | null {
  if (!siteConfig.siteUrl || siteConfig.isLocalSiteUrl) return null;
  return siteConfig.siteUrl;
}
