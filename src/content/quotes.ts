/**
 * The two real customer quotes of the live site.
 *
 * Source: https://leasyro.com, read 12.09.2026. Verbatim, only the first quote
 * lost its run-up ("Insgesamt lässt sich die Zusammenarbeit mit der leasyro
 * GmbH wie folgt zusammenfassen:") so it fits in three lines.
 * No further quotes exist, so no further quotes are shown.
 */

export type Quote = {
  text: string;
  author: string;
  role: string;
};

export const quotes: Quote[] = [
  {
    text: "Die Zusammenarbeit mit der leasyro GmbH war professionell, schnell und kundenorientiert.",
    author: "Rico H.",
    role: "Geschäftsführer",
  },
  {
    text: "Die App und die anderen neuen digitalen Implementierungen werden mir in Zukunft so viel Zeit, Arbeit und Budget sparen.",
    author: "Helena G.",
    role: "Gründerin",
  },
];

/**
 * The founding story, one paragraph.
 * Source: https://leasyro.com, read 12.09.2026.
 */
export const story = {
  eyebrow: "Die Geschichte",
  title: "Aus einer Idee wurden drei Bereiche",
  text: "Aus der Idee, den Mittelstand zu digitalisieren, ist ein Unternehmen mit drei Bereichen geworden: von der maßgeschneiderten Beratung bis zur Pflege-App. Wir glauben daran, dass jeder Mensch Produkte verdient, die wirklich zu ihm passen.",
  founderLabel: "Gründer und Geschäftsführer",
  founderName: "Benjamin Böhm",
  founderHref: "https://benboehm.com",
} as const;
