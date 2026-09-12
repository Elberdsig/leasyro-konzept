/**
 * Copy, defaults and assumptions for the effort calculator on the home page.
 *
 * Why this section exists: leasyro sells digitalisation, and the sister brand
 * of the founder opens with exactly that argument. The headline of
 * benboehm.com on 12.09.2026 reads "Manuelle Prozesse kosten dich täglich
 * Geld." (checked by fetching the page). leasyro.com carries the same promise
 * but never puts a number next to it. A visitor has to guess how much his own
 * paperwork costs, and guessing ends the thought.
 *
 * So the draft adds one number the visitor produces himself. It promises no
 * saving, because nobody can promise a saving before looking at the processes.
 * It only names the amount that is on the table.
 *
 * Sources for the copy: https://leasyro.com and https://benboehm.com, both
 * read 12.09.2026. The three default values are not claims about any customer,
 * they are a starting point the visitor drags away from, and the page says so.
 */

export type CalculatorField = {
  /** Used for the input id and the name attribute. */
  id: string;
  /** Visible label. Carries the unit, so the number needs no suffix. */
  label: string;
  /** Range hint under the control, e.g. "1 bis 200". */
  hint: string;
  min: number;
  max: number;
  step: number;
  /** Value rendered on the server, so the section works without JavaScript. */
  start: number;
};

/**
 * Working weeks per year. 52 weeks minus roughly six weeks of holiday, public
 * holidays and sick days. A round, conservative figure, and it is printed
 * under the result so nobody has to trust it blindly.
 */
export const weeksPerYear = 46;

export const calculatorFields: {
  people: CalculatorField;
  hours: CalculatorField;
  rate: CalculatorField;
} = {
  people: {
    id: "mitarbeitende",
    label: "Mitarbeitende",
    hint: "1 bis 200",
    min: 1,
    max: 200,
    step: 1,
    start: 12,
  },
  hours: {
    id: "stunden",
    label: "Stunden je Person und Woche für manuelle Verwaltung",
    hint: "0,5 bis 20 Stunden, in halben Stunden",
    min: 0.5,
    max: 20,
    step: 0.5,
    start: 3,
  },
  rate: {
    id: "stundensatz",
    label: "Stundensatz in Euro",
    hint: "15 bis 150 Euro",
    min: 15,
    max: 150,
    step: 1,
    start: 35,
  },
};

export const calculator = {
  eyebrow: "Rechner",
  title: "Was kostet dich Handarbeit?",
  lead:
    "Zettel, Doppeleingaben, Listen in fünf Dateien. Zieh die drei Schieber auf deinen Betrieb und sieh, was dabei im Jahr zusammenkommt.",
  formLabel: "Angaben zu deinem Betrieb",
  resultTitle: "Das kommt zusammen",
  hoursLabel: "Stunden pro Jahr",
  hoursUnit: "Stunden",
  costLabel: "Kosten pro Jahr",
  assumption: `Gerechnet mit ${weeksPerYear} Arbeitswochen im Jahr. Urlaub, Feiertage und Krankheit sind abgezogen.`,
  note:
    "Das ist der Betrag, um den es geht. Im Gespräch klären wir, welcher Teil davon in Software gehört.",
  cta: "Termin buchen",
} as const;
