/**
 * Everything the /konzept page says. Written in Elberd's own voice.
 *
 * The "before" column holds measurements taken on 12.09.2026 with
 * Python-Playwright and system Chrome against https://leasyro.com, desktop
 * 1440 px and phone 390 px. They are recorded in docs/KONZEPT.md section 2.
 * The "after" column was filled on 12.09.2026 from the same script run
 * against the built draft (see docs/BAUBERICHT.md and docs/KONZEPT.md 8).
 */

export const conceptIntro = {
  eyebrow: "Konzept",
  title: "So würde ich leasyro.com bauen",
  paragraphs: [
    "Ich bewerbe mich bei leasyro als Software Developer. Statt nur einen Lebenslauf zu schicken, habe ich eure Startseite mit dem Stack aus der Stellenanzeige neu gebaut: TypeScript, Next.js, GitHub, Vercel.",
    "Das hier ist ein Entwurf, kein Auftrag und keine Kritik. Die Marke, das Blau, die Schrift, die Du-Form und die drei Bereiche bleiben genau so. Ich habe nur die Technik darunter aufgeräumt und die Texte gekürzt.",
    "Jede Verbesserung ist eine Zahl mit Vorher und Nachher. Wenn eine Zahl nicht besser ist, steht sie trotzdem in der Tabelle.",
  ],
} as const;

export type ComparisonRow = {
  metric: string;
  before: string;
  after: string;
};

/** Source of every "before" value: own measurement 12.09.2026, docs/KONZEPT.md. */
export const comparison: ComparisonRow[] = [
  {
    metric: "Übertragung beim ersten Aufruf, Desktop ohne Cache",
    before: "2.513.200 Byte",
    after: "240.645 Byte",
  },
  {
    metric: "Davon JavaScript",
    before: "1.425.298 Byte",
    after: "142.599 Byte, nur die Next- und React-Laufzeit",
  },
  {
    metric: "Größter JavaScript-Block",
    before: "1.359.130 Byte",
    after: "71.576 Byte",
  },
  {
    metric: "CSS",
    before: "245.665 Byte in 6 Dateien",
    after: "5.607 Byte in 1 Datei",
  },
  {
    metric: "Vorgeladene Schriftdateien",
    before: "27 woff2, alle Poppins",
    after: "2 woff2, Poppins 400 und 600",
  },
  {
    metric: "Strukturierte Daten (JSON-LD)",
    before: "keine, auch nicht bei der Stellenanzeige",
    after: "Organization auf der Startseite, JobPosting auf der Stellenseite",
  },
  {
    metric: "Sprachangabe im HTML",
    before: "de_DE, ungültig",
    after: "de",
  },
  {
    metric: "hreflang x-default",
    before: "zeigt auf /en",
    after: "keins, die Seite ist einsprachig",
  },
  {
    metric: "Kleinste Klickziele auf dem Handy",
    before: "32 px, Minimum sind 44 px",
    after: "44 px, Ausnahme sind 7 Links mitten im Satz",
  },
  {
    metric: "Sehr kleine Schrift auf dem Handy",
    before: "53 Elemente mit 14 px, 4 mit 12 px",
    after: "nichts unter 14 px, 21 Elemente mit 14 px",
  },
  {
    metric: "Seitenlänge der Startseite auf dem Handy",
    before: "8.398 px",
    after: "6.570 px",
  },
  {
    metric: "Überschriftenstruktur",
    before: "1 h1, 5 h2, 7 h3, in Ordnung",
    after: "1 h1, 9 h2, 7 h3, in Ordnung",
  },
  {
    metric: "Bilder ohne Alternativtext",
    before: "0, in Ordnung",
    after: "0, in Ordnung",
  },
  {
    metric: "Lighthouse mobil, Performance",
    before: "71, Largest Contentful Paint 11,2 s",
    after: "100, Largest Contentful Paint 0,9 s",
  },
  {
    metric: "Lighthouse mobil, Barrierefreiheit",
    before: "89",
    after: "100",
  },
  {
    metric: "Lighthouse mobil, Best Practices",
    before: "96",
    after: "100",
  },
  {
    metric: "Lighthouse mobil, SEO",
    before: "100",
    after: "66, einziger Abzug ist die absichtliche Sperre für Suchmaschinen",
  },
  {
    metric: "Cookie-Banner",
    before: "Alles akzeptieren als Primärbutton",
    after: "keiner, weil nichts gesetzt wird",
  },
];

export const comparisonNote =
  "Beide Spalten habe ich am 12.09.2026 mit demselben Skript gemessen: Playwright mit System-Chrome, Desktop 1440 px und Handy 390 px, dazu Lighthouse 13 auf dem Handy-Profil, jeweils gegen die veröffentlichte Seite. Die Übertragung zählt alle Antworten des ersten Aufrufs ohne Cache.";

export type ChangeItem = {
  title: string;
  text: string;
};

export const changes: ChangeItem[] = [
  {
    title: "Die Überschrift sagt, was der Betrieb bekommt",
    text: "Der Gag über Software und Unterwäsche ist gut, aber er beantwortet die Frage eines Geschäftsführers nicht. Er steht jetzt als Zeile über der Überschrift, die Überschrift selbst nennt den Nutzen.",
  },
  {
    title: "Vier Werte statt acht",
    text: "Acht gleich große Kacheln lesen sich wie eine Liste, die niemand zu Ende liest. Vier Werte in einer Textliste bleiben hängen. Der Rest steht in den Texten der drei Bereiche.",
  },
  {
    title: "Die drei Bereiche sind unterschiedlich groß",
    text: "Drei gleiche Bild-Text-Blöcke geben keine Reihenfolge vor. Jetzt führt Benjamin Böhm als größte Fläche, Humafix folgt, Lena Mariah steht als eigene Zeile darunter.",
  },
  {
    title: "Zwei Schriftdateien statt 27",
    text: "Poppins wird über next/font geladen, nur die Schnitte 400 und 600, nur Latin, lokal ausgeliefert. Kein Aufruf bei Google zur Laufzeit.",
  },
  {
    title: "Kein Client-JavaScript im Marketing",
    text: "Alle Seiten sind Server Components. Das mobile Menü läuft über das Popover-API des Browsers. Es gibt keinen eigenen Client-Code, der geladen werden müsste.",
  },
  {
    title: "Strukturierte Daten für Firma und Stelle",
    text: "Die Startseite liefert ein Organization-Objekt, die Stellenseite ein JobPosting mit Titel, Datum, Arbeitgeber und Ort. Ohne das erscheint eine Stelle nicht in der Google-Jobsuche.",
  },
  {
    title: "Klickziele ab 44 px",
    text: "Auf der heutigen Seite sind der Termin-Button, der Menü-Button und Mehr erfahren zwischen 32 und 36 px groß. Hier ist jedes Klickziel mindestens 44 px hoch und breit.",
  },
  {
    title: "Kontraste gemessen, nicht geschätzt",
    text: "Ein Skript liest die Farben aus der CSS-Datei und rechnet jeden Kontrast nach. Fließtext liegt über 7:1, Labels über 4.5:1. Das Skript enthält eine Gegenprobe, damit eine kaputte Messung auffällt.",
  },
  {
    title: "Sprachangabe korrigiert",
    text: "Die heutige Seite schreibt lang=de_DE. Gültig ist de. Für Vorleseprogramme ist das der Unterschied zwischen deutscher und englischer Aussprache.",
  },
  {
    title: "Kein Cookie-Banner, weil nichts gesetzt wird",
    text: "Ohne Analytics und ohne Einbettungen braucht es keine Einwilligung. Das spart einen Klick und eine Rechtsfrage.",
  },
];

export const kept: string[] = [
  "Die Marke: Logo, das Blau und die Bildmarken der drei Bereiche.",
  "Poppins als Schrift.",
  "Die Du-Form und den freundlichen Ton.",
  "Die drei Bereiche als Klammer des Unternehmens.",
  "Die beiden echten Kundenzitate, mit demselben Wortlaut.",
  "Die Adressen der Seiten, damit man Seite gegen Seite vergleichen kann.",
  "Die Claims der drei Bereiche, Wort für Wort.",
];

export const omitted: ChangeItem[] = [
  {
    title: "Dark Mode",
    text: "Ein zweites Thema verdoppelt die Prüfarbeit bei Kontrast und Bildern. Für eine Marketing-Seite bringt das keinen Nutzen, der die Arbeit trägt.",
  },
  {
    title: "Sprachumschaltung",
    text: "Die heutige Seite hat eine englische Fassung, deren x-default auf /en zeigt. Eine zweite Sprache lohnt erst, wenn die deutsche sitzt.",
  },
  {
    title: "Formulare und Termin-Widget",
    text: "Ein Formular ohne Backend täuscht. Alle Schaltflächen führen auf die echten Ziele bei leasyro.com.",
  },
  {
    title: "Fotos von Personen",
    text: "Die Rechte liegen bei leasyro. Für einen Entwurf reicht Typografie.",
  },
];

export const stack: string[] = [
  "Next.js 16 mit App Router, React 19, TypeScript strict",
  "Tailwind 4, alle Farben als Tokens in einer Datei",
  "Nur Server Components, kein use client",
  "Poppins über next/font, zwei Schnitte, lokal ausgeliefert",
  "next/image mit fester Breite und Höhe, damit nichts springt",
  "JSON-LD für Organization und JobPosting",
  "Zwei Prüfskripte: Kontrast und Textregeln, beide in npm run check",
  "Öffentliches Repo, Deploy über Vercel von main",
];

export const aboutElberd = {
  eyebrow: "Über mich",
  title: "Warum ich programmieren gelernt habe",
  paragraphs: [
    "Ich habe einen Sicherheitsdienst mitgegründet. Der hatte ein Problem mit der Dienstplanung, und keine der Lösungen am Markt hat gepasst. Also habe ich programmieren gelernt und WachFlow gebaut: eine SaaS für Dienstplanung, Zeiterfassung und Wachbuch.",
    "WachFlow läuft täglich in genau diesem Sicherheitsdienst. Der Stack ist Next.js, TypeScript, Supabase, Vercel und Cloudflare, also sehr nah an dem, was in eurer Stellenanzeige steht.",
    "Ich habe nicht studiert, ich habe Fachabitur. Was ich kann, steht im Code. Deshalb dieser Entwurf statt einer weiteren Zeile im Lebenslauf.",
  ],
  contactLead: "Fragen zum Entwurf oder zur Bewerbung gehen am besten per E-Mail.",
} as const;
