import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { MotionProvider } from "@/motion/provider";
import { createRootMetadata } from "@/lib/seo";
import "@/styles/globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata = createRootMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <div className="relative min-h-dvh">
            <main id="main-content">{children}</main>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
