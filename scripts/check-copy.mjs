#!/usr/bin/env node
/**
 * Guards the copy rules from docs/KONZEPT.md section 7.
 *
 * 1. No em dash and no en dash anywhere in src/. The live site writes in plain
 *    German punctuation and so does this draft. A dash slipped in by an editor
 *    is the single most reliable tell that a text was not written by hand.
 * 2. No open placeholders in src/content/ before a deploy. `[[MESSEN]]` holds
 *    the after-values until they are measured, `[[ANSCHRIFT` holds the address
 *    Elberd fills in himself. Both must be gone before the draft goes public.
 *    This second check only runs with CHECK_STRICT=1, so the normal build and
 *    the normal `npm run check` still pass while the markers are in place.
 * 3. No "Fachkraft". Elberd's qualification is Servicekraft, and the wrong word
 *    has shown up in generated texts before.
 */

import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const srcDir = join(root, "src");
const contentDir = join(srcDir, "content");

const strict = process.env.CHECK_STRICT === "1";

/** Collects every text file below a directory. */
async function collect(dir) {
  const found = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collect(full)));
    } else if (/\.(tsx?|css|mts|mjs)$/.test(entry.name)) {
      found.push(full);
    }
  }
  return found;
}

const files = await collect(srcDir);
const problems = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  const lines = text.split("\n");

  lines.forEach((line, index) => {
    const where = `${relative(root, file)}:${index + 1}`;

    const dash = line.indexOf("—") >= 0 ? "—" : line.indexOf("–") >= 0 ? "–" : null;
    if (dash) {
      problems.push(`${where}  Gedankenstrich "${dash}" gefunden: ${line.trim()}`);
    }

    if (/Fachkraft/.test(line)) {
      problems.push(`${where}  "Fachkraft" gefunden, korrekt ist Servicekraft: ${line.trim()}`);
    }

    if (strict && file.startsWith(contentDir)) {
      if (line.includes("[[MESSEN]]")) {
        problems.push(`${where}  offener Marker [[MESSEN]]: ${line.trim()}`);
      }
      if (line.includes("[[ANSCHRIFT")) {
        problems.push(`${where}  offener Marker [[ANSCHRIFT: ${line.trim()}`);
      }
    }
  });
}

console.log(`Textpruefung: ${files.length} Dateien in src/ gelesen.`);
console.log(
  strict
    ? "Modus: streng (Platzhalter in src/content/ sind ein Fehler)."
    : "Modus: normal (Platzhalter erlaubt, CHECK_STRICT=1 prueft sie mit).",
);

if (problems.length > 0) {
  console.error(`\n${problems.length} Fund(e):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log("Keine Gedankenstriche, keine falschen Begriffe gefunden.");
