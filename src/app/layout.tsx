import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ConceptBanner } from "@/components/concept-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteMeta } from "@/content/site";
import { siteUrl } from "@/lib/site";
import "./globals.css";

/**
 * Poppins is the typeface of the live site, which preloads 27 woff2 files.
 * Two weights carry every text on this draft, subset latin, served from our
 * own origin. `display: swap` means the text is readable before the font
 * arrives instead of invisible.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteMeta.title} · Konzept-Entwurf`,
    template: siteMeta.titleTemplate,
  },
  description: siteMeta.description,
  // This is a draft of somebody else's brand. It must never be indexed.
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "leasyro (Konzept-Entwurf)",
    url: siteUrl,
    title: `${siteMeta.title} · Konzept-Entwurf`,
    description: siteMeta.description,
  },
  authors: [{ name: "Elberd Sigauri" }],
};

/**
 * The browser chrome should match the top of the page, and the topmost band on
 * every route is the concept banner on brand-soft, not the white body.
 */
export const viewport: Viewport = {
  themeColor: "#e7f0ff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={poppins.variable}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-btn focus:bg-brand-ink focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <ConceptBanner />
        <SiteHeader />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
