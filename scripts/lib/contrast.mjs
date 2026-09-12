/**
 * Contrast maths and the token pairs this draft measures.
 *
 * Extracted from scripts/check-contrast.mjs on 12.09.2026 so the test suite
 * can call exactly the code the check script runs. The formulas, the pair
 * list and the counter-check value are unchanged, the script only imports
 * them now instead of defining them itself.
 */

/** Plain white, used wherever a button or a dark band carries white letters. */
export const white = "#ffffff";

/** Parses every `--color-name: #rrggbb;` declaration out of the stylesheet. */
export function readTokens(css) {
  const tokens = new Map();
  const pattern = /--color-([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g;
  let match;
  while ((match = pattern.exec(css)) !== null) {
    tokens.set(match[1], match[2].toLowerCase());
  }
  return tokens;
}

export function channel(value) {
  const srgb = value / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex) {
  const clean = hex.replace("#", "");
  const r = channel(parseInt(clean.slice(0, 2), 16));
  const g = channel(parseInt(clean.slice(2, 4), 16));
  const b = channel(parseInt(clean.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const light = Math.max(luminance(a), luminance(b));
  const dark = Math.min(luminance(a), luminance(b));
  return (light + 0.05) / (dark + 0.05);
}

/** Every pair that visible text actually lands in, with its required ratio. */
export const pairs = [
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
export const onDark = [
  { label: "weiss auf brand-ink", bg: "brand-ink", min: 4.5 },
  { label: "weiss auf navy", bg: "navy", min: 4.5 },
  { label: "weiss auf ink", bg: "ink", min: 4.5 },
];

/**
 * Deliberately too weak. The check script and the test both require this pair
 * to fail: a measurement that cannot see a bad pair is worthless.
 */
export const weakProbe = { fg: "#b9c2ce", bg: white, max: 4.5 };
