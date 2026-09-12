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
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const cssPath = join(here, "..", "src", "app", "globals.css");

/** Parses every `--color-name: #rrggbb;` declaration out of the stylesheet. */
function readTokens(css) {
  const tokens = new Map();
  const pattern = /--color-([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g;
  let match;
  while ((match = pattern.exec(css)) !== null) {
    tokens.set(match[1], match[2].toLowerCase());
  }
  return tokens;
}

function channel(value) {
  const srgb = value / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const clean = hex.replace("#", "");
  const r = channel(parseInt(clean.slice(0, 2), 16));
  const g = channel(parseInt(clean.slice(2, 4), 16));
  const b = channel(parseInt(clean.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const light = Math.max(luminance(a), luminance(b));
  const dark = Math.min(luminance(a), luminance(b));
  return (light + 0.05) / (dark + 0.05);
}

const css = await readFile(cssPath, "utf8");
const tokens = readTokens(css);

const white = "#ffffff";

/** Every pair that visible text actually lands in, with its required ratio. */
const pairs = [
  { label: "ink auf paper", fg: "ink", bg: "paper", min: 7 },
  { label: "ink auf paper-2", fg: "ink", bg: "paper-2", min: 7 },
  { label: "ink-soft auf paper", fg: "ink-soft", bg: "paper", min: 7 },
  { label: "ink-soft auf paper-2", fg: "ink-soft", bg: "paper-2", min: 7 },
  { label: "ink-faint auf paper", fg: "ink-faint", bg: "paper", min: 4.5 },
  { label: "ink-faint auf paper-2", fg: "ink-faint", bg: "paper-2", min: 4.5 },
  { label: "brand-ink auf paper", fg: "brand-ink", bg: "paper", min: 4.5 },
  { label: "brand-ink auf paper-2", fg: "brand-ink", bg: "paper-2", min: 4.5 },
  { label: "brand-ink auf brand-soft", fg: "brand-ink", bg: "brand-soft", min: 4.5 },
  { label: "ink auf brand-soft", fg: "ink", bg: "brand-soft", min: 7 },
  { label: "ink-soft auf brand-soft", fg: "ink-soft", bg: "brand-soft", min: 7 },
  // Secondary text in the footer and in the quote band sits on navy.
  { label: "brand-soft auf navy", fg: "brand-soft", bg: "navy", min: 7 },
];

/** Pairs where the foreground is plain white, not a token. */
const onDark = [
  { label: "weiss auf brand-ink", bg: "brand-ink", min: 4.5 },
  { label: "weiss auf navy", bg: "navy", min: 4.5 },
  { label: "weiss auf ink", bg: "ink", min: 4.5 },
];

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
const probeFg = "#b9c2ce";
const probeBg = white;
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
