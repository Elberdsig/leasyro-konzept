import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

import { contrast, onDark, pairs, readTokens, weakProbe, white } from "../scripts/lib/contrast.mjs";

const css = readFileSync(fileURLToPath(new URL("../src/app/globals.css", import.meta.url)), "utf8");
const tokens = readTokens(css);

describe("Kontrastmessung", () => {
  test("Weiß auf Schwarz ergibt 21 zu 1", () => {
    expect(contrast(white, "#000000")).toBeCloseTo(21, 6);
  });

  test("ein Farbwert gegen sich selbst ergibt 1 zu 1", () => {
    expect(contrast("#0a58ca", "#0a58ca")).toBeCloseTo(1, 6);
  });

  test("ein absichtlich schwaches Paar fällt durch", () => {
    // Counter-check: a measurement that cannot see a bad pair proves nothing.
    expect(contrast(weakProbe.fg, weakProbe.bg)).toBeLessThan(weakProbe.max);
  });

  test("globals.css liefert alle Tokens, die geprüft werden", () => {
    for (const paar of pairs) {
      expect(tokens.get(paar.fg), paar.fg).toBeTruthy();
      expect(tokens.get(paar.bg), paar.bg).toBeTruthy();
    }
    for (const paar of onDark) {
      expect(tokens.get(paar.bg), paar.bg).toBeTruthy();
    }
  });

  test("jedes Token-Paar erfüllt seine Schwelle", () => {
    expect(pairs.length + onDark.length).toBe(15);
    for (const paar of pairs) {
      const wert = contrast(tokens.get(paar.fg), tokens.get(paar.bg));
      expect(wert, `${paar.label}: ${wert.toFixed(2)} zu 1`).toBeGreaterThanOrEqual(paar.min);
    }
    for (const paar of onDark) {
      const wert = contrast(white, tokens.get(paar.bg));
      expect(wert, `${paar.label}: ${wert.toFixed(2)} zu 1`).toBeGreaterThanOrEqual(paar.min);
    }
  });

  test("Fließtext liegt über AAA, nicht nur über AA", () => {
    expect(contrast(tokens.get("ink"), tokens.get("paper"))).toBeGreaterThanOrEqual(7);
  });
});
