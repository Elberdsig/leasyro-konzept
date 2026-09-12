import { describe, expect, test } from "vitest";

import { comparison, comparisonNote } from "@/content/concept";

describe("Vorher-Nachher-Tabelle auf /konzept", () => {
  test("die Tabelle hat Zeilen", () => {
    expect(comparison.length).toBeGreaterThan(10);
  });

  test("keine Zeile hat eine leere Zelle", () => {
    for (const zeile of comparison) {
      expect(zeile.metric.trim().length, zeile.metric).toBeGreaterThan(0);
      expect(zeile.before.trim().length, zeile.metric).toBeGreaterThan(0);
      expect(zeile.after.trim().length, zeile.metric).toBeGreaterThan(0);
    }
  });

  test("keine Zeile steht noch auf einem Marker", () => {
    for (const zeile of comparison) {
      for (const zelle of [zeile.metric, zeile.before, zeile.after]) {
        expect(zelle).not.toContain("[[MESSEN]]");
        expect(zelle).not.toContain("[[");
      }
    }
  });

  test("jede Kennzahl kommt nur einmal vor", () => {
    const namen = comparison.map((zeile) => zeile.metric);
    expect(new Set(namen).size).toBe(namen.length);
  });

  test("die Fußnote erklärt die Messmethode", () => {
    expect(comparisonNote).toContain("12.09.2026");
    expect(comparisonNote.trim().length).toBeGreaterThan(80);
  });
});
