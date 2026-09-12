/**
 * Four values instead of eight.
 *
 * Source: https://leasyro.com, read 12.09.2026. The live site lists eight
 * values in eight identical tiles: Nachhaltigkeit, Individualität, Diversität
 * und Inklusion, Transparenz und Integrität, Effizienz, Qualität,
 * Partnerschaft, Verbindung. Four of them say almost the same thing as another
 * four, so this draft keeps four and lets the rest live in the area texts.
 * The wording of the kept four stays close to the original.
 */

export type Value = {
  title: string;
  text: string;
};

export const values: Value[] = [
  {
    title: "Maßgeschneidert",
    // Live: "Individualität" + "Qualität"
    text: "Wir passen alles an deine Anforderungen an, damit du genau das bekommst, was du brauchst. Gut genug ist uns zu wenig.",
  },
  {
    title: "Nachhaltig",
    // Live: "Nachhaltigkeit" + "Partnerschaft"
    text: "Wir denken langfristig und schaffen Substanz statt Verschleiß. Wir bleiben von der Idee bis zum laufenden Betrieb an deiner Seite.",
  },
  {
    title: "Inklusiv",
    // Live: "Diversität & Inklusion" + "Verbindung"
    text: "Wir entwickeln Produkte, die niemanden ausschließen. Barrierefreiheit ist Standard, kein Extra.",
  },
  {
    title: "Transparent",
    // Live: "Transparenz & Integrität" + "Effizienz"
    text: "Wir stehen zu unserem Wort und kommunizieren offen. Für uns zählt nicht der Output, sondern was am Ende wirkt.",
  },
];

export const valuesIntro = {
  eyebrow: "Haltung",
  title: "Vier Sätze, an denen du uns messen kannst",
} as const;
