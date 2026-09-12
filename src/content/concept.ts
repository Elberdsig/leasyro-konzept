/**
 * Everything the /konzept page says. Written in Elberd's own voice.
 *
 * The "before" column holds measurements taken on 12.09.2026 with
 * Python-Playwright and system Chrome against https://leasyro.com, desktop
 * 1440 px and phone 390 px. They are recorded in docs/KONZEPT.md section 2.
 * The "after" column stays [[MESSEN]] until this draft is built and measured
 * the same way. `npm run check` with CHECK_STRICT=1 refuses to pass while a
 * marker is still in the file, so nothing can go public half measured.
 */

export const MEASURE_PENDING = "[[MESSEN]]";

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
    before: "2.458.521 Byte",
    after: MEASURE_PENDING,
  },
  {
    metric: "Davon JavaScript",
    before: "1.425.298 Byte",
    after: MEASURE_PENDING,
  },
  {
    metric: "Größter JavaScript-Block",
    before: "1.359.130 Byte",
    after: MEASURE_PENDING,
  },
  {
    metric: "CSS",
    before: "245.665 Byte in 6 Dateien",
    after: MEASURE_PENDING,
  },
  {
    metric: "Vorgeladene Schriftdateien",
    before: "27 woff2, alle Poppins",
    after: MEASURE_PENDING,
  },
  {
    metric: "Strukturierte Daten (JSON-LD)",
    before: "keine, auch nicht bei der Stellenanzeige",
    after: MEASURE_PENDING,
  },
  {
    metric: "Sprachangabe im HTML",
    before: "de_DE, ungültig",
    after: MEASURE_PENDING,
  },
  {
    metric: "hreflang x-default",
    before: "zeigt auf /en",
    after: MEASURE_PENDING,
  },
  {
    metric: "Kleinste Klickziele auf dem Handy",
    before: "32 px, Minimum sind 44 px",
    after: MEASURE_PENDING,
  },
  {
    metric: "Sehr kleine Schrift auf dem Handy",
    before: "53 Elemente mit 14 px, 4 mit 12 px",
    after: MEASURE_PENDING,
  },
  {
    metric: "Seitenlänge der Startseite auf dem Handy",
    before: "8.398 px",
    after: MEASURE_PENDING,
  },
  {
    metric: "Überschriftenstruktur",
    before: "1 h1, 5 h2, 7 h3, in Ordnung",
    after: MEASURE_PENDING,
  },
  {
    metric: "Bilder ohne Alternativtext",
    before: "0, in Ordnung",
    after: MEASURE_PENDING,
  },
  {
    metric: "Cookie-Banner",
    before: "Alles akzeptieren als Primärbutton",
    after: MEASURE_PENDING,
  },
];

export const comparisonNote =
  "Gemessen am 12.09.2026 mit Playwright und System-Chrome, Desktop 1440 px und Handy 390 px. Die Nachher-Werte trage ich mit demselben Skript ein, sobald dieser Entwurf steht.";

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
