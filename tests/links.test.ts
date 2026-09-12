import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

import * as site from "@/content/site";

const appDir = fileURLToPath(new URL("../src/app/", import.meta.url));

/** Derives the list of routes from the page.tsx files below src/app. */
function routen(ordner: string, prefix = ""): string[] {
  const gefunden: string[] = [];
  for (const eintrag of readdirSync(ordner, { withFileTypes: true })) {
    if (eintrag.isDirectory()) {
      gefunden.push(...routen(`${ordner}${eintrag.name}/`, `${prefix}/${eintrag.name}`));
    } else if (eintrag.name === "page.tsx") {
      gefunden.push(prefix === "" ? "/" : prefix);
    }
  }
  return gefunden;
}

const vorhandeneRouten = routen(appDir).sort();

type Fund = { pfad: string; text: string };

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

const texte: Fund[] = [];
sammleTexte(site, "site.ts", texte);

const interne = texte.filter((fund) => fund.text.startsWith("/"));
const externe = texte.filter((fund) => fund.text.startsWith("http"));

describe("Links im Rahmen der Seite", () => {
  test("src/app liefert die sieben Routen der Spezifikation", () => {
    for (const route of [
      "/",
      "/datenschutz",
      "/impressum",
      "/karriere",
      "/karriere/software-developer",
      "/konzept",
      "/leistungen",
    ]) {
      expect(vorhandeneRouten).toContain(route);
    }
  });

  test("jeder interne Link in site.ts zeigt auf eine vorhandene Route", () => {
    expect(interne.length).toBeGreaterThan(0);
    for (const fund of interne) {
      expect(vorhandeneRouten, `${fund.pfad} zeigt auf ${fund.text}`).toContain(fund.text);
    }
  });

  test("Navigation und Fußzeile sind vollständig verlinkt", () => {
    expect(site.mainNav.map((eintrag) => eintrag.href)).toEqual([
      "/leistungen",
      "/karriere",
      "/konzept",
    ]);
    expect(site.legalNav.map((eintrag) => eintrag.href)).toEqual(["/impressum", "/datenschutz"]);
    for (const eintrag of [...site.mainNav, ...site.legalNav]) {
      expect(eintrag.label.trim().length).toBeGreaterThan(0);
    }
  });

  test("jeder externe Link beginnt mit https", () => {
    expect(externe.length).toBeGreaterThan(0);
    for (const fund of externe) {
      expect(fund.text.startsWith("https://"), `${fund.pfad}: ${fund.text}`).toBe(true);
    }
  });
});
