#!/usr/bin/env node
/**
 * Measures the WCAG contrast of the design tokens in src/app/globals.css.
 *
 * Why a script and not a guess: the accent of the live site (#0d6efd) carries
 * 3.1 : 1 on white, which is below the 4.5 : 1 a small link needs. Every pair
 * that text can end up in is measured here, so a later colour change fails the
 * build instead of quietly hurting readability.
 *
 * The last block is a counter-check. A pair that is known to be too weak must
 * be reported as a failure. If it passes, the measurement itself is broken and
 * the script exits 1 (lesson from ZurStruktur, 10.09.2026).
 *
 * The maths and the pair list live in scripts/lib/contrast.mjs so tests/ can
 * measure with the same code. Behaviour of this script is unchanged.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { contrast, onDark, pairs, readTokens, weakProbe, white } from "./lib/contrast.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const cssPath = join(here, "..", "src", "app", "globals.css");

const css = await readFile(cssPath, "utf8");
const tokens = readTokens(css);

let failed = 0;
const width = 26;

console.log("Kontraste der Tokens aus src/app/globals.css\n");

for (const pair of pairs) {
  const fg = tokens.get(pair.fg);
  const bg = tokens.get(pair.bg);
  if (!fg || !bg) {
    console.error(`FEHLER  ${pair.label}: Token fehlt in globals.css`);
    failed += 1;
    continue;
  }
  const ratio = contrast(fg, bg);
  const ok = ratio >= pair.min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? "ok    " : "FEHLER"}  ${pair.label.padEnd(width)} ${ratio.toFixed(2)} : 1  (mindestens ${pair.min})`,
  );
}

for (const pair of onDark) {
  const bg = tokens.get(pair.bg);
  if (!bg) {
    console.error(`FEHLER  ${pair.label}: Token fehlt in globals.css`);
    failed += 1;
    continue;
  }
  const ratio = contrast(white, bg);
  const ok = ratio >= pair.min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? "ok    " : "FEHLER"}  ${pair.label.padEnd(width)} ${ratio.toFixed(2)} : 1  (mindestens ${pair.min})`,
  );
}

// Counter-check: this pair is known to be far too weak. If the measurement
// calls it good, the measurement is wrong and nothing above can be trusted.
const probeFg = weakProbe.fg;
const probeBg = weakProbe.bg;
const probeRatio = contrast(probeFg, probeBg);
if (probeRatio >= 4.5) {
  console.error(
    `\nFEHLER  Gegenprobe: ${probeFg} auf Weiss wurde mit ${probeRatio.toFixed(2)} : 1 als ausreichend gemeldet.`,
  );
  console.error("        Die Messung erkennt schwache Paare nicht. Abbruch.");
  process.exit(1);
}
console.log(
  `\nGegenprobe bestanden: ${probeFg} auf Weiss faellt mit ${probeRatio.toFixed(2)} : 1 durch, wie erwartet.`,
);

if (failed > 0) {
  console.error(`\n${failed} Paar(e) unter der Schwelle. Tokens anpassen.`);
  process.exit(1);
}

console.log("Alle Paare ueber der Schwelle.");
