/**
 * The four services.
 *
 * Source: https://leasyro.com/leistungen, read 12.09.2026.
 * Texts are shortened and de-fluffed. No new claim was added, in particular
 * no numbers, no customer counts and no certificates.
 */

export type Service = {
  /** Anchor id on /leistungen. Also the target of the home page links. */
  id: string;
  title: string;
  /** One sentence, used on the home page. */
  teaser: string;
  /** Full text, used on /leistungen. */
  text: string;
  /** Label above the list of points. */
  pointsLabel: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "softwareentwicklung",
    title: "Softwareentwicklung",
    teaser: "Individuelle Anwendungen statt Standardlösungen, die nie ganz passen.",
    text: "Wir bauen Software, die Probleme löst: effizient, skalierbar und zukunftssicher. Statt Standardlösungen entwickeln wir Anwendungen, die zu deinen Anforderungen passen. Wir arbeiten eng mit dir zusammen und verwandeln deine Ideen in funktionierende Produkte.",
    pointsLabel: "So arbeiten wir",
    points: [
      "Schnelle und flexible Entwicklung",
      "Moderne Technologien",
      "Nahtlose Integration in bestehende Systeme",
      "Modularer Aufbau",
    ],
  },
  {
    id: "wartung-betrieb",
    title: "Wartung und Betrieb",
    teaser: "Nach dem Go-Live bleibt jemand zuständig: wir.",
    text: "Auch nach dem Go-Live sind wir für dich da. Wir kümmern uns um den stabilen Betrieb deiner Software, integrieren neue Funktionen und sorgen dafür, dass alles läuft. Regelmäßige Updates, Monitoring und persönlicher Austausch halten deine Anwendung sicher und performant.",
    pointsLabel: "Was dazugehört",
    points: [
      "Regelmäßige Sicherheitsupdates",
      "Cloud-Infrastruktur",
      "Beratung, Entwicklung und Betrieb aus einer Hand",
      "Persönlicher Support",
    ],
  },
  {
    id: "schulungen",
    title: "Schulungen",
    teaser: "Praxisnahe Workshops, damit dein Team die neuen Werkzeuge auch nutzt.",
    text: "Mit praxisnahen Schulungen und Workshops bringen wir dein Team auf den neuesten Stand: bei neuen Technologien, modernen Entwicklungsprozessen oder digitalen Werkzeugen im Alltag.",
    pointsLabel: "Themen",
    points: [
      "Coding: Sprachen, Frameworks, Werkzeuge",
      "Office: Word, Excel, Automatisierung im Alltag",
      "Individuelle Schulungen nach Bedarf",
      "DevSecOps: Sicherheit von Anfang an mitdenken",
    ],
  },
  {
    id: "humafix",
    title: "Humafix",
    teaser: "Die eigene App für ambulante Pflegedienste, vom Einsatzplan bis zur Abrechnung.",
    text: "Humafix ist eine digitale Lösung für ambulante Pflegedienste. Vom Einsatzplan bis zur GKV-Abrechnung werden alle Abläufe in einer App gebündelt und automatisiert. Wir entwickeln Humafix gemeinsam mit den Menschen, die sie später nutzen.",
    pointsLabel: "Module",
    points: [
      "Einsatzplanung",
      "Management",
      "Abrechnung",
      "Administration",
      "Kommunikation",
      "Automatisierung",
    ],
  },
];

/** Short intro above the four sections on /leistungen. */
export const servicesIntro = {
  eyebrow: "Leistungen",
  title: "Vier Wege, wie wir mit dir arbeiten",
  lead: "Von der ersten Analyse bis zum laufenden Betrieb. Du entscheidest, wo wir einsteigen.",
} as const;
