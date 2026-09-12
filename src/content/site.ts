/**
 * Navigation and the standing texts of the frame around every page.
 *
 * Slugs follow the live site so a reviewer can compare page against page.
 * Source of the slugs: https://leasyro.com, read 12.09.2026.
 */

export type NavItem = {
  label: string;
  href: string;
};

/** Main navigation, three entries, nothing hidden behind a dropdown. */
export const mainNav: NavItem[] = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Karriere", href: "/karriere" },
  { label: "Konzept", href: "/konzept" },
];

/** Legal pages. They belong to Elberd as operator of this draft, not to leasyro. */
export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export const siteMeta = {
  title: "leasyro, neu gedacht",
  description:
    "Unverbindlicher Redesign-Entwurf für leasyro.com von Elberd Sigauri. Nicht die offizielle Seite.",
  titleTemplate: "%s · leasyro (Konzept)",
} as const;

/** The band above the header. It is on every page and stays there. */
export const conceptBanner = {
  text: "Konzept-Entwurf von Elberd Sigauri für leasyro. Nicht die offizielle Seite:",
  officialLabel: "leasyro.com",
  officialHref: "https://leasyro.com",
  moreLabel: "Was das ist",
  moreHref: "/konzept",
} as const;
