/**
 * The three open positions of the live site.
 *
 * Source: https://leasyro.com/karriere and
 * https://leasyro.com/karriere/software-developer, read 12.09.2026.
 * The developer posting was published 12.12.2025 and last changed 26.08.2026.
 * No salary is stated on the live site, so none is stated here and none goes
 * into the JSON-LD.
 */

export type Job = {
  slug: string | null;
  title: string;
  area: string;
  employment: string;
  teaser: string;
};

export const jobs: Job[] = [
  {
    slug: "software-developer",
    title: "Software Developer (m/w/d)",
    area: "Entwicklung",
    employment: "Festanstellung und Werkstudium",
    teaser:
      "Werde Teil des Entwicklerteams und baue Softwarelösungen für unsere Kunden.",
  },
  {
    slug: null,
    title: "Video-Cutter (m/w/d)",
    area: "Marketing",
    employment: "Werkstudium",
    teaser:
      "Du schneidest unsere YouTube-Videos und erstellst kurze Beiträge für Social Media.",
  },
  {
    slug: null,
    title: "Sales und Growth Manager (m/w/d)",
    area: "Vertrieb",
    employment: "Festanstellung",
    teaser:
      "Du gewinnst neue Kunden und pflegst bestehende Geschäftsbeziehungen.",
  },
];

export const careersIntro = {
  eyebrow: "Karriere",
  title: "Drei offene Stellen",
  lead: "Wir arbeiten remote first, mit einem Co-Working-Space in Berlin. Bewerbungen laufen über die offizielle Seite.",
} as const;

/**
 * The full developer posting.
 * Source: https://leasyro.com/karriere/software-developer, read 12.09.2026.
 */
export const developerJob = {
  slug: "software-developer",
  title: "Software Developer (m/w/d)",
  area: "Entwicklung",
  employment: "Festanstellung und Werkstudium",
  location: "Berlin, remote first",
  datePosted: "2025-12-12",
  dateModified: "2026-08-26",
  intro:
    "Wir sind ein junges Startup aus Berlin und entwickeln digitale Lösungen für mittelständische Unternehmen. Unser Fokus liegt auf effizienten Prozessen, smarter Software und pragmatischer Digitalisierung. Im Team arbeiten wir eng zusammen und geben dir echte Verantwortung.",
  introSecond:
    "Ab sofort suchen wir eine:n Softwareentwickler:in (m/w/d) in Festanstellung und als Werkstudent:in. Wir bieten flexible Arbeitszeiten und viel Raum für fachliche und persönliche Weiterentwicklung.",
  tasks: [
    "Entwicklung und Weiterentwicklung unserer webbasierten Softwarelösungen",
    "Umsetzung neuer Funktionen von der Konzeption bis zum produktiven Einsatz",
    "Zusammenarbeit mit dem Team an fachlichen Anforderungen",
    "Optimierung bestehender Anwendungen, Prozesse und Systemarchitekturen",
    "Analyse und Behebung von Fehlern sowie Verbesserung der Softwarequalität",
    "Unterstützung bei Planung und Umsetzung technischer Projekte",
    "Dokumentation von Entwicklungen und technischen Entscheidungen",
    "Mitwirkung an unseren internen Entwicklungsstandards",
  ],
  requirements: [
    "Studium in Informatik, Wirtschaftsinformatik oder einer vergleichbaren Richtung, oder eine gleichwertige praktische Qualifikation",
    "Erste praktische Erfahrung in der Softwareentwicklung",
    "Gute Kenntnisse in TypeScript, Next.js, React Native, GitHub und Vercel",
    "Strukturierte und lösungsorientierte Arbeitsweise",
    "Interesse an skalierbaren und sauberen Softwarelösungen",
    "Teamfähigkeit und Bereitschaft, Verantwortung zu übernehmen",
    "Analytisches Denkvermögen",
    "Sehr gute Deutsch- und Englischkenntnisse",
  ],
  benefitGroups: [
    {
      title: "Finanziell",
      items: [
        "Bonuszahlungen und Erfolgsbeteiligung",
        "Betriebliche Altersvorsorge",
        "Zuschüsse über die Givve Card",
      ],
    },
    {
      title: "Arbeitszeit",
      items: [
        "Flexible Arbeitszeiten",
        "Homeoffice und Remote",
        "Teilzeitmodelle",
        "30 Urlaubstage",
      ],
    },
    {
      title: "Weiterbildung",
      items: [
        "Weiterbildungsbudget",
        "Karrieregespräche",
        "Fortbildungen und Zertifikate",
      ],
    },
    {
      title: "Kultur",
      items: [
        "Flache Hierarchien und Mitspracherecht",
        "Feedback-System",
        "Team-Events",
        "Regelmäßige Zufriedenheitsumfrage",
      ],
    },
    {
      title: "Büro",
      items: [
        "Remote first",
        "Co-Working-Space in Berlin am Ku'damm",
        "Fahrradstellplätze und Loungebereich",
        "Weltweite Arbeitsmöglichkeiten",
      ],
    },
    {
      title: "Zusätzlich",
      items: ["Deutschlandticket", "Firmenlaptop und Firmenhandy"],
    },
  ],
  application: {
    title: "So bewirbst du dich",
    lead: "Schick uns mit deiner Bewerbung bitte:",
    items: [
      "Links zu relevanten Projekten: GitHub, Portfolio, veröffentlichte Anwendungen",
      "Arbeitsproben",
      "Ein kurzes Vorstellungsvideo ist ein Pluspunkt",
    ],
  },
} as const;
