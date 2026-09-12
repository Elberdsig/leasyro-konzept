/**
 * Second half of the /konzept page: what Elberd would build next for leasyro,
 * how this draft came to be, and which checks keep it honest.
 *
 * Facts only. Every idea refers to something visible on leasyro.com,
 * benboehm.com or humafix.com on 12.09.2026, or to something built in this
 * repository. The timeline comes from the git history and the session log of
 * 12.09.2026. A text agent fills the copy; the shapes below are the contract
 * the page renders against.
 */

export type Idea = {
  /** Short, concrete title. No filler verbs. */
  title: string;
  /** Why this matters for leasyro, one or two sentences, with the observable fact it rests on. */
  why: string;
  /** What Elberd would build, one or two sentences, concrete stack. */
  how: string;
  /** Honest effort estimate for one developer. */
  effort: "ein Tag" | "wenige Tage" | "ein bis zwei Wochen";
};

export type TimelineStep = {
  /** Clock time on 12.09.2026, e.g. "12:04". */
  when: string;
  /** What happened, one sentence. */
  what: string;
};

export type QualityGate = {
  title: string;
  /** What the check does and what happens when it fails. */
  text: string;
};

export const ideasIntro = {
  title: "Was ich als Nächstes bauen würde",
  lead: "Fünf Dinge, die mir auf leasyro.com heute fehlen, jeweils mit dem Grund und dem Aufwand.",
} as const;

/**
 * Source of every fact: leasyro.com, benboehm.com, humafix.com, jeweils
 * eigene Prüfung am 12.09.2026. Reihenfolge: wertvollste Idee zuerst.
 */
export const ideas: Idea[] = [
  {
    title: "Fallstudien auf leasyro.com holen",
    why: "Benboehm.com zeigt drei Fallstudien: SchuBiL, L&B als Lieferant der Deutschen Bahn und Spreewaldring. Leasyro.com zeigt keine einzige, nur zwei Zitate, obwohl es dieselben Projekte und denselben Gründer sind.",
    how: "Ich würde je Fallstudie eine eigene Route bauen, mit Article-JSON-LD und Inhalten aus einer eigenen Content-Datei, ähnlich wie hier die Stellenseite mit JobPosting-Schema.",
    effort: "wenige Tage",
  },
  {
    title: "Alle Stellen mit JobPosting-Schema",
    why: "Leasyro.com/karriere zeigt drei offene Stellen ohne strukturierte Daten. Ohne JobPosting-Schema erscheinen sie nicht bei Google for Jobs, das ist kostenlose Reichweite, die liegen bleibt.",
    how: "Ich würde für jede Stelle ein JobPosting-Objekt einbauen, genau so, wie ich es in diesem Entwurf für die Entwicklerstelle gebaut habe.",
    effort: "ein Tag",
  },
  {
    title: "Humafix eine echte Produktseite geben",
    why: "Humafix ist das Produkt mit der größten Reichweite, weil es sich an Pflegedienste richtet. Auf leasyro.com ist es ein Absatz und ein Link.",
    how: "Ich würde eine eigene Seite mit den sechs Modulen bauen: Einsatzplanung, Management, Abrechnung, Administration, Kommunikation, Automatisierung, dazu einen Demo-Zugang und SoftwareApplication-JSON-LD.",
    effort: "ein bis zwei Wochen",
  },
  {
    title: "Der Handarbeits-Rechner als Einstieg ins Gespräch",
    why: "Benboehm.com schreibt, manuelle Prozesse kosten täglich Geld, nennt aber keine Zahl. Ein Geschäftsführer kann diesen Satz nicht auf den eigenen Betrieb anwenden.",
    how: "Ich würde den Rechner aus diesem Entwurf übernehmen, Mitarbeitende mal Stunden mal Stundensatz, dahinter ein Kontaktformular mit serverseitigem Versand und Spam-Schutz ohne Cookies.",
    effort: "wenige Tage",
  },
  {
    title: "Zwei Sprachen richtig oder eine Sprache ehrlich",
    why: "Leasyro.com hat eine englische Fassung, aber hreflang x-default zeigt auf /en, obwohl Firma und Kunden deutsch sind, und lang steht auf dem ungültigen de_DE.",
    how: "Ich würde entweder eine saubere Lokalisierung mit korrekten hreflang-Paaren bauen oder nur Deutsch anbieten, bis sich englische Nachfrage messen lässt.",
    effort: "ein Tag",
  },
];

export const timelineIntro = {
  title: "Wie dieser Entwurf entstanden ist",
  lead: "Ein Arbeitstag, 12.09.2026. Die Zeiten stammen aus dem Git-Verlauf und meinem eigenen Sitzungsprotokoll.",
} as const;

/** Source: git history and memory/session-summaries.md, 12.09.2026. Chronological. */
export const timeline: TimelineStep[] = [
  {
    when: "12:04",
    what: "Ich habe die Live-Seite gemessen, mit Playwright auf Desktop und Handy.",
  },
  {
    when: "12:12",
    what: "Ich habe das Konzept festgelegt: Die Marke bleibt, die Technik wird sauber.",
  },
  {
    when: "12:14",
    what: "Ich habe das Repo angelegt und die Spezifikation geschrieben.",
  },
  {
    when: "12:30",
    what: "Ich habe die sieben Seiten, die Tokens und die Prüfskripte gebaut.",
  },
  {
    when: "13:02",
    what: "Ich habe das erste Deploy auf Vercel gemacht.",
  },
  {
    when: "13:10",
    what: "Ich habe die Nachher-Werte mit demselben Skript gemessen und eingetragen.",
  },
  {
    when: "17:32",
    what: "Ich habe das Repo öffentlich gemacht.",
  },
  {
    when: "17:40",
    what: "Ich habe das Impressum bereinigt, neu deployt und Lighthouse gegen die Live-Seite auf 100, 100 und 100 gebracht.",
  },
  {
    when: "18:00 bis 19:30",
    what: "Zweiter Durchgang: der Handarbeits-Rechner, sparsame Bewegung, Tests, eine CI mit Lighthouse und ein Audit gegen die Web Interface Guidelines von Vercel.",
  },
];

export const qualityIntro = {
  title: "Was den Entwurf ehrlich hält",
  lead: "Prüfungen, die bei jedem Commit laufen. Schlägt eine fehl, wird nicht veröffentlicht.",
} as const;

/** Source: scripts/check-contrast.mjs, scripts/check-copy.mjs, package.json, docs/BAUBERICHT.md, 12.09.2026. */
export const qualityGates: QualityGate[] = [
  {
    title: "Kontrastprüfung mit Gegenprobe",
    text: "Ein Skript rechnet jeden Farbkontrast der Tokens nach. Ein absichtlich zu schwaches Paar muss dabei durchfallen, sonst bricht das Skript selbst mit einem Fehler ab: Eine Messung, die den Fehler nicht sehen kann, zählt nicht.",
  },
  {
    title: "Textprüfung",
    text: "Ein Skript durchsucht alle Inhalte nach Gedankenstrichen und offenen Platzhaltern. Findet es einen, bricht der Build ab.",
  },
  {
    title: "Tests mit Vitest",
    text: "Die Tests prüfen, dass jede Inhaltsdatei einen Quellkommentar trägt, dass interne Links auf echte Routen zeigen, dass die Stellendaten gültig sind und dass die Vergleichstabelle vollständig ist.",
  },
  {
    title: "GitHub Actions bei jedem Push",
    text: "Bei jedem Push laufen Lint, die Prüfskripte, die Tests und der Build automatisch. Schlägt einer fehl, sieht man es sofort im Pull Request.",
  },
  {
    title: "Lighthouse in der CI",
    text: "Lighthouse läuft in der CI auf vier Seiten, dreimal je Seite, Median. Schwellen: 95 für Barrierefreiheit und Best Practices, 90 für Performance, weil der Runner langsamer ist als ein Handy. Unterschreitet ein Wert die Schwelle, schlägt der Lauf fehl.",
  },
  {
    title: "Vorher und Nachher mit demselben Skript",
    text: "Die Vergleichstabelle auf dieser Seite nutzt für beide Spalten dasselbe Messskript. So kann sich die Tabelle nicht selbst schönrechnen.",
  },
];
