import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";

import { profile } from "@/data/profile";
import { personJsonLd, websiteJsonLd, siteUrl } from "@/lib/seo";

/**
 * Fonts — Geist Sans only, latin subset, variable weight (100-900),
 * self-hosted at build time via `next/font/google`. No runtime request
 * to Google.
 *
 * Mono is served from the system `ui-monospace` stack (see `--font-mono`
 * in tokens.css). The site's mono usage is small (eyebrows, timeline
 * years, metadata) and the system stack — SF Mono on macOS/iOS, Cascadia
 * on Windows, Ubuntu Mono on Linux — renders it correctly without an
 * extra network payload. Removing Geist Mono cut 6 font files and ~70 KB
 * of woff2 subset payload from the build.
 */
const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://yasir.dev"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.snapshotBio,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name }],
  keywords: [
    "Senior Frontend Engineer",
    "React",
    "TypeScript",
    "React Native",
    "Next.js",
    "Accessibility",
    "Performance",
    "Hyderabad",
    "Yasir Syed",
  ],
  openGraph: {
    type: "profile",
    url: siteUrl("/"),
    title: `${profile.name} — ${profile.role}`,
    description: profile.snapshotBio,
    siteName: `${profile.name}`,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.snapshotBio,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl("/") },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070708" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Root layout stays chrome-free. The site chrome (ScrollProgress
            + FloatingNav + MobileNav) lives in `(site)/layout.tsx`, and
            /qa/baseline* routes opt out of it entirely so JS/TBT
            attribution is clean. Motion is loaded lazily inside those
            chrome islands only. Reduced-motion is honoured via CSS
            (hero-enter, chip-swap) and useReducedMotion() where needed. */}
        <main
          id="main"
          tabIndex={-1}
          className="pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0"
        >
          {children}
        </main>

        <script
          type="application/ld+json"
          // Server-rendered JSON-LD is safe here — inputs are static profile data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
