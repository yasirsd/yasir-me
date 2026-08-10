import { profile } from "@/data/profile";

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://yasir.dev";

export function siteUrl(path = "/"): string {
  const trimmed = SITE_URL.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${trimmed}${p}`;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: siteUrl("/"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    sameAs: [profile.linkedin],
    description: profile.snapshotBio,
    knowsAbout: profile.knowsAbout,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url: siteUrl("/"),
    inLanguage: "en",
    author: { "@type": "Person", name: profile.name },
  };
}
