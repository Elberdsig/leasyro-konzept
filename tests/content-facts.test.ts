import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

// Em dash and en dash as escapes, so this file stays free of the characters
// it hunts for and cannot flag itself.
const EM_DASH = "\u2014";
const EN_DASH = "\u2013";

const contentDir = fileURLToPath(new URL("../src/content/", import.meta.url));

/** Read from disk, not hard coded: a new content file is covered at once. */
const dateien = readdirSync(contentDir)
  .filter((name) => name.endsWith(".ts"))
  .sort();

/**
 * Files that state no fact about leasyro and therefore carry no external
 * source: author.ts is Elberd's own contact data, concept-ideas.ts is his own
 * proposal and his own working log. Noted in docs/BAUBERICHT.md.
 */
const ohneFremdquelle = new Set(["author.ts", "concept-ideas.ts"]);

/** Reads every comment of a module file, block and line comments alike. */
function kommentare(dateiname: string): string {
  const text = readFileSync(contentDir + dateiname, "utf8");
  const gefunden = [
    ...(text.match(/\/\*[\s\S]*?\*\//g) ?? []),
    ...(text.match(/\/\/[^\n]*/g) ?? []),
  ];
  return gefunden.join("\n");
}

type Fund = { pfad: string; text: string };

/** Walks a module and collects every string a page could print. */
function sammleTexte(wert: unknown, pfad: string, treffer: Fund[]): void {
  if (typeof wert === "string") {
    treffer.push({ pfad, text: wert });
    return;
  }
  if (Array.isArray(wert)) {
    wert.forEach((eintrag, index) => sammleTexte(eintrag, `${pfad}[${index}]`, treffer));
    return;
  }
  if (wert !== null && typeof wert === "object") {
    for (const [schluessel, inhalt] of Object.entries(wert)) {
      sammleTexte(inhalt, `${pfad}.${schluessel}`, treffer);
    }
  }
}

const alleTexte: Fund[] = [];
for (const dateiname of dateien) {
  // The extension stays in the static part of the path, otherwise the bundler
  // cannot turn this into a glob and warns.
  const modul = await import(`../src/content/${dateiname.replace(/\.ts$/, "")}.ts`);
  sammleTexte(modul, dateiname, alleTexte);
}

describe("Inhalte in src/content", () => {
  test("die neun Module der Spezifikation sind vorhanden", () => {
    for (const erwartet of [
      "author.ts",
      "company.ts",
      "concept.ts",
      "jobs.ts",
      "quotes.ts",
      "services.ts",
      "site.ts",
      "values.ts",
      "worlds.ts",
    ]) {
      expect(dateien).toContain(erwartet);
    }
  });

  test("jede Datei mit Tatsachen über leasyro nennt Quelle und Datum im Kommentar", () => {
    for (const dateiname of dateien) {
      if (ohneFremdquelle.has(dateiname)) continue;
      const text = kommentare(dateiname);
      expect(text, `${dateiname}: kein https:// im Kommentar`).toContain("https://");
      expect(text, `${dateiname}: kein Datum 12.09.2026 im Kommentar`).toContain("12.09.2026");
    }
  });

  test("die beiden Dateien ohne Fremdquelle sind trotzdem kommentiert", () => {
    for (const dateiname of ohneFremdquelle) {
      expect(dateien, dateiname).toContain(dateiname);
      expect(kommentare(dateiname).length, dateiname).toBeGreaterThan(80);
    }
  });

  test("kein sichtbarer Text enthält einen Gedankenstrich", () => {
    const treffer = alleTexte.filter(
      (fund) => fund.text.includes(EM_DASH) || fund.text.includes(EN_DASH),
    );
    expect(treffer.map((fund) => fund.pfad)).toEqual([]);
  });

  test("kein sichtbarer Text enthält einen offenen Platzhalter", () => {
    const treffer = alleTexte.filter((fund) => fund.text.includes("[["));
    expect(treffer.map((fund) => fund.pfad)).toEqual([]);
  });

  test("es gibt überhaupt Texte zu prüfen", () => {
    expect(alleTexte.length).toBeGreaterThan(100);
  });
});
