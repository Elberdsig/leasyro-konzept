/**
 * The three areas of leasyro.
 *
 * Names, claims, visions and links are taken from the live site.
 * Source: https://leasyro.com, read 12.09.2026. The claims stay word for word,
 * they are the brand. The body texts are shortened, nothing is added.
 */

export type World = {
  id: string;
  name: string;
  claim: string;
  vision: string;
  text: string;
  href: string;
  appointmentHref?: string;
  linkLabel: string;
  icon: string;
  iconAlt: string;
  /** CSS colour token for the rule above the cell. Never used for text. */
  accent: string;
};

export const worlds: World[] = [
  {
    id: "benboehm",
    name: "Benjamin Böhm",
    // Claim verbatim from https://leasyro.com, 12.09.2026
    claim: "Maßgeschneidert statt Mittelmaß",
    vision: "Weniger Papierkram. Mehr Klarheit. Mehr Automatisierung.",
    text: "Wir begleiten dein Unternehmen zur digitalen Effizienz: mit umfassender Analyse, individueller Software und persönlicher Betreuung. Unser hybrider Ansatz ersetzt manuelle Arbeit durch smarte Lösungen.",
    href: "https://benboehm.com",
    appointmentHref: "https://benboehm.com/termin",
    linkLabel: "benboehm.com",
    icon: "/brand/icon-benboehm.png",
    iconAlt: "Bildmarke Benjamin Böhm",
    accent: "var(--color-accent-benboehm)",
  },
  {
    id: "humafix",
    name: "Humafix",
    // Claim verbatim from https://leasyro.com, 12.09.2026
    claim: "Die digitale Revolution für die Pflege",
    vision: "Pflege braucht Zeit für Menschen, nicht für Dokumente.",
    text: "Eine smarte App, die Prozesse automatisiert, Mitarbeitende entlastet und Patienten in den Fokus rückt. Einsatzplanung, Dokumentation und Abrechnung in einer Lösung.",
    href: "https://humafix.com",
    appointmentHref: "https://humafix.com/termin",
    linkLabel: "humafix.com",
    icon: "/brand/icon-humafix.png",
    iconAlt: "Bildmarke Humafix",
    accent: "var(--color-accent-humafix)",
  },
  {
    id: "lenamariah",
    name: "Lena Mariah",
    // Claim verbatim from https://leasyro.com, 12.09.2026
    claim: "Lingerie mit Hingabe",
    vision:
      "Alle können Unterwäsche tragen, die wirklich passt. Man muss nur verstehen, worauf es ankommt.",
    text: "Wir helfen Menschen, ihre richtige Größe und Passform zu finden. Mit Videos und persönlichen Sessions zeigen wir, worauf es ankommt.",
    href: "https://lenamariah.com",
    linkLabel: "lenamariah.com",
    icon: "/brand/icon-lenamariah.png",
    iconAlt: "Bildmarke Lena Mariah",
    accent: "var(--color-accent-lena)",
  },
];
