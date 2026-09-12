# leasyro.com, neu gedacht. Spezifikation des Konzept-Entwurfs

Stand: 12.09.2026 · Auftrag: Elberd Sigauri (Bewerbung als Software Developer bei der leasyro GmbH)

Dieses Dokument ist die Wahrheit für alles, was in diesem Repo gebaut wird. Wer hier arbeitet,
liest es zuerst. Abweichungen werden hier eingetragen, nicht still im Code gelöst.

---

## 1. Zweck

Elberd bewirbt sich bei leasyro (Stack laut Anzeige: TypeScript, Next.js, React Native, GitHub,
Vercel). Statt nur einen Lebenslauf zu schicken, zeigt er mit diesem Entwurf, wie er leasyro.com
mit genau diesem Stack sauberer bauen würde. Der Entwurf ist:

- **ein Konzept, keine Kopie.** Ein sichtbares Band auf jeder Seite sagt: „Konzept-Entwurf von
  Elberd Sigauri. Nicht die offizielle Seite, die ist leasyro.com."
- **nicht indexierbar.** `robots.txt` sperrt alles, jede Seite trägt `noindex, nofollow`.
- **respektvoll.** Marke, Logo, Farbe, Schrift, Du-Form und die drei Geschäftsbereiche bleiben.
  Der Gründer hat die Seite sichtbar selbst gebaut. Wir machen seine Seite sauber, wir ersetzen sie
  nicht durch eine fremde.
- **messbar besser.** Jede Verbesserung ist eine Zahl mit Vorher und Nachher (Abschnitt 8).

Design Read (design-taste-frontend, Abschnitt 0.B): *Redesign mit Markenerhalt einer B2B-Startup-Seite
für Mittelstands-Entscheider und Bewerber, ruhige und präzise Sprache, Tailwind v4 mit der
Markenschrift Poppins und minimaler Bewegung.* Dials: VARIANCE 5 · MOTION 2 · DENSITY 4.

---

## 2. Befund zur heutigen Seite (12.09.2026, selbst gemessen)

Messung mit Python-Playwright und System-Chrome, Desktop 1440 px und iPhone-Größe 390 px.

| Messwert | leasyro.com heute |
|---|---|
| Übertragung beim ersten Aufruf (Desktop, ohne Cache) | 2.458.521 Byte, davon 1.425.298 JavaScript |
| Größter JavaScript-Chunk | 1.359.130 Byte |
| CSS | 189.770 + 55.895 Byte (6 Dateien) |
| Schriftdateien vorgeladen | 27 woff2, alle Poppins |
| JSON-LD | keins (auch nicht auf /karriere/software-developer) |
| `<html lang>` | `de_DE` (ungültig, korrekt ist `de`) |
| hreflang x-default | zeigt auf /en, obwohl die Firma deutsch ist |
| Klickziele mobil | „Termin buchen" 32 px, „Mehr erfahren" 36 px, Menü-Button 32 px (Minimum 44) |
| Schriftgrößen mobil | 53 Elemente bei 14 px, 4 bei 12 px |
| Seitenlänge mobil | 8.398 px |
| Überschriftenstruktur | 1 h1, 5 h2, 7 h3 (in Ordnung) |
| Bilder ohne alt | 0 (in Ordnung) |
| Cookie-Banner | „Alles akzeptieren" als Primärbutton |

Gestalterisch: acht identische Werte-Kacheln (4 × 2), drei identische Bild-Text-Wechsel für die
drei Bereiche, zwei Zitat-Karten mit Sternen, eine Überschrift, die ein Gag ist („Ob Software oder
Unterwäsche") und dem Geschäftsführer nicht sagt, was er hier bekommt.

Was gut ist und bleibt: die drei Bereiche als Klammer, die Du-Form, das Versprechen
„maßgeschneidert", die echten Kundenzitate, Poppins, das Blau, Impressum vollständig.

---

## 3. Marke (aus der Live-Seite extrahiert)

- Logo: `public/brand/logo-leasyro.png` (879 × 247, Wortmarke mit Bildmarke), `icon-leasyro.png`.
  Beide werden auf Anzeigegröße × 2 verkleinert ausgeliefert, nie in Originalgröße.
- Blau der Seite: `#0d6efd`. Dunkles Blau des Heros: `#19348F`. Tinte: `#1a202c`.
  Humafix-Violett `#8b5cf6`, Lena-Mariah-Rosé `#95575c` (nur als Akzent der jeweiligen Kachel).
- Schrift: Poppins. Wir laden **genau zwei Schnitte** (400, 600) über `next/font/google`,
  Subset `latin`, `display: swap`. Kein Google-Aufruf zur Laufzeit.
- Tonfall: Du-Form, kurze Sätze, konkret. Keine Superlative ohne Beleg.

---

## 4. Design-Tokens (in `src/app/globals.css` unter `@theme`, sonst nirgends)

Helle Seite, ein Thema, kein Dark Mode (die Live-Seite hat einen Umschalter, wir verzichten
bewusst: doppelte Prüfarbeit ohne Nutzen für die Zielgruppe, steht so im Konzept-Text).

```
--color-paper      #ffffff   Grund
--color-paper-2    #f4f6fa   ruhige Flächen, Wechsel zwischen Sektionen
--color-ink        #12172a   Fließtext, Überschriften
--color-ink-soft   #4b5567   Sekundärtext (muss ≥ 7:1 auf paper sein)
--color-ink-faint  #5f6878   Labels (muss ≥ 4.5:1 auf paper und paper-2 sein)
--color-brand      #0d6efd   nur für Flächen, Linien, große Zeichen; NIE für kleinen Text
--color-brand-ink  #0a58ca   Links, Buttons (weißer Text darauf muss ≥ 4.5:1 sein; messen!)
--color-brand-soft #e7f0ff   Hervorhebungsflächen
--color-navy       #19348F   Zitate, Fußzeile, Akzentlinien
--color-line       #d9dee8   Trennlinien
--radius-card      12px      ein Radius-System, sonst 6px für Buttons, 999px für Pills
```

Jeder Kontrast wird mit `scripts/check-contrast.mjs` gemessen. Das Skript enthält eine
Gegenprobe: ein absichtlich zu schwacher Wert muss als Fehler gemeldet werden, sonst ist die
Messung wertlos (Lehre aus ZurStruktur, 10.09.2026). Die gemessenen Werte stehen als Kommentar
über dem `@theme`-Block.

---

## 5. Seiten und Struktur

Slugs bleiben wie auf leasyro.com (Redesign-Protokoll 11.F): `/`, `/leistungen`, `/karriere`,
`/karriere/software-developer`, `/impressum`, `/datenschutz`. Neu: `/konzept`.
Externe Ziele bleiben extern: Termin → `https://leasyro.com/termin`, Shop → `https://leasyro.com/shop`,
Humafix → humafix.com, Ben Böhm → benboehm.com, Lena Mariah → lenamariah.com.

### Konzept-Band (auf jeder Seite, über dem Header)
Eine Zeile, ruhig, brand-soft: „Konzept-Entwurf von Elberd Sigauri für leasyro. Nicht die
offizielle Seite: leasyro.com" mit Link auf `/konzept`. Kein JavaScript, nicht wegklickbar.

### Header
Logo links, Navigation: Leistungen · Karriere · Konzept, rechts ein Primärbutton „Termin buchen"
(extern). Mobil: Menü über das Popover-API (`popovertarget`), kein JavaScript. Höhe ≤ 72 px.

### Startseite `/`
1. **Hero.** Eyebrow (die Klammer, kurz), H1 (Nutzen für den Betrieb, ≤ 2 Zeilen Desktop),
   Untertitel ≤ 20 Wörter, zwei Buttons: „Termin buchen" (extern) und „Leistungen ansehen".
   Kein Bild, keine Kacheln im Hero. Die H1 hängt an keiner Animation.
2. **Drei Bereiche.** Asymmetrisches Raster: Ben Böhm (Software für den Mittelstand) groß,
   Humafix mittel, Lena Mariah als schmale Zeile. Jede Zelle: Bereichs-Icon
   (`public/brand/icon-*.png`), Name, ein Satz Vision, Link zur echten Seite.
   Nicht drei gleiche Karten.
3. **Leistungen.** Zweispaltig, links Überschrift und ein Satz, rechts eine Liste der vier
   Leistungen (Softwareentwicklung, Wartung und Betrieb, Schulungen, Humafix) mit je einem
   Satz und Link auf den Anker in `/leistungen`.
4. **Werte.** Vier statt acht: Maßgeschneidert, Nachhaltig, Inklusiv, Transparent. Zweispaltige
   Textliste ohne Kacheln, je zwei Sätze. Die anderen vier Werte gehen im Text der Bereiche auf.
5. **Kundenstimmen.** Die zwei echten Zitate (Rico H., Geschäftsführer; Helena G., Gründerin)
   als typografische Zitate, keine Karten, keine Sterne, keine Fotos.
6. **Die Geschichte.** Ein Absatz (Quelle: Live-Seite), Gründer Benjamin Böhm mit Link auf
   benboehm.com. Kein Foto.
7. **Kontakt.** Termin buchen (extern), Telefon +49 30 665038520, support@leasyro.com,
   Kurfürstendamm 194, 10707 Berlin. Alles aus dem Impressum der Live-Seite.

Layout-Familien: Hero (zentriert), Bento (asymmetrisch), Zweispalter mit Liste, Textliste,
Zitatblock, Kontaktband. Keine zwei aufeinanderfolgenden Sektionen mit derselben Familie.

### `/leistungen`
Vier Abschnitte mit Anker-IDs `softwareentwicklung`, `wartung-betrieb`, `schulungen`, `humafix`.
Texte aus der Live-Seite, gekürzt und entschlackt, keine neuen Behauptungen. Jeder Abschnitt
endet mit einem Link „Termin buchen" (extern). Layout: Sprungnavigation oben, dann Abschnitte
im Wechsel von Volltext und Zweispalter.

### `/karriere`
Die drei offenen Stellen der Live-Seite (Software Developer zuerst, Video-Cutter, Sales & Growth
Manager) als Liste mit Titel, Bereich, einem Satz, Link. Kein eigenes Formular: der Button
„Jetzt bewerben" führt auf `https://leasyro.com/karriere` (ehrlich statt Formular ohne Backend).

### `/karriere/software-developer`
Der vollständige Stellentext der Live-Seite (Aufgaben, Qualifikation, Benefits, Bewerbungsweg),
sauber strukturiert. **JSON-LD `JobPosting`** mit allen Feldern, die die Live-Seite hergibt
(title, description, datePosted 2025-12-12, hiringOrganization, jobLocation Berlin,
jobLocationType TELECOMMUTE, employmentType FULL_TIME/PART_TIME). Kein Gehalt erfinden.

### `/konzept`
Die eigentliche Bewerbungsseite. Aufbau:
1. Warum dieser Entwurf (drei Sätze).
2. Vorher/Nachher-Tabelle mit den Messwerten aus Abschnitt 2 und den Nachher-Werten (werden
   nach dem Build gemessen und hier eingetragen; bis dahin steht `[[MESSEN]]`).
3. Was sich geändert hat und warum (Liste, je ein Satz).
4. Was bewusst gleich blieb.
5. Stack und Arbeitsweise (Next.js 16, Tailwind 4, Server Components, zwei Schriftdateien,
   JSON-LD, Kontrast gemessen, Klickziele 44 px), Link auf das öffentliche GitHub-Repo.
6. Über Elberd: drei Sätze, Link Portfolio `https://elberd-portfolio.sigaurie.workers.dev`,
   Link Online-Lebenslauf `https://elberd-cv.pages.dev`. Keine erfundenen Zahlen.
7. Kontakt: E-Mail-Link (Elberds Adresse steht in `src/content/author.ts`).

### `/impressum`, `/datenschutz`
Gehören zum **Betreiber des Entwurfs** (Elberd), nicht zu leasyro. Impressum: Elberd Sigauri,
Anschrift als gekennzeichneter Platzhalter (trägt Elberd ein, wie im Portfolio), E-Mail.
Datenschutz: keine Cookies, kein Tracking, keine Formulare, Hosting bei Vercel mit Server-Logs.
Beide Seiten tragen den Hinweis „Entwurf, vor Veröffentlichung prüfen".

### Fußzeile
Drei Spalten: die drei Bereiche mit Links · Seiten · Rechtliches. Darunter „© 2026 leasyro GmbH
(Marke) · Entwurf: Elberd Sigauri". Keine Social-Icons ohne echte Ziele; die Live-Seite hat
Instagram, Facebook, LinkedIn, aber ohne geprüfte URLs setzen wir keine.

---

## 6. Technik

- Next.js 16 (App Router, `src/`), React 19, TypeScript strict, Tailwind 4 (`@tailwindcss/postcss`).
- **Alle Seiten sind Server Components.** Kein `"use client"` im Marketing. Mobiles Menü über
  Popover-API. Keine Scroll-Animationen. Übergänge nur auf Hover/Focus.
- Inhalte ausschließlich in `src/content/*.ts` (site, company, worlds, services, values, quotes,
  jobs, concept, author). Jede Tatsache trägt im Kommentar ihre Quelle (URL, Datum).
- `src/lib/site.ts`: `siteUrl` aus `NEXT_PUBLIC_SITE_URL` (Fallback `http://localhost:3000`).
- Metadata: `lang="de"`, Titel-Template `%s · leasyro (Konzept)`, `robots: noindex, nofollow`,
  `robots.ts` sperrt alle Crawler, `sitemap.ts` vorhanden (Übung für den Reviewer, nicht für
  Google), `opengraph-image.tsx` erzeugt.
- JSON-LD: `Organization` (leasyro, Daten aus dem Impressum) auf der Startseite, `JobPosting`
  auf der Stellenseite. Über eine Komponente `JsonLd`, JSON in `<script type="application/ld+json">`.
- Icons: `@phosphor-icons/react` (Regular), höchstens acht verschiedene, keine handgezeichneten
  SVG-Pfade. Bereichs-Icons sind die vorhandenen PNGs.
- Bilder über `next/image` mit fester Breite und Höhe, damit CLS 0 bleibt.
- Kein Formular, keine API-Route, keine Umgebungsgeheimnisse.
- ESLint (next), `npm run build` muss ohne Warnung durchlaufen.
- `scripts/check-contrast.mjs` (Tokens gegen Gründe, mit Gegenprobe) und
  `scripts/check-copy.mjs` (kein `—` und kein `–` in `src/`, keine `[[MESSEN]]`-Marker vor dem
  Deploy, keine „Fachkraft"-Falle). Beide laufen in `npm run check`.

---

## 7. Textregeln (für den Text-Agenten)

- Du-Form wie die Live-Seite. Kurze Sätze. Konkret statt „innovativ", „revolutionär", „seamless".
- **Kein Gedankenstrich (— oder –) auf der ganzen Seite.** Punkt, Komma oder Doppelpunkt.
- Keine erfundenen Tatsachen: keine Kundenzahlen, Jahreszahlen, Zertifikate, Teamgrößen. Alles,
  was auf der Seite steht, gibt es auf leasyro.com, benboehm.com, humafix.com oder im
  Handelsregister. Quelle im Kommentar der Content-Datei.
- Die drei Bereiche behalten ihre Claims: „Die digitale Revolution für die Pflege" (Humafix),
  „Maßgeschneidert statt Mittelmaß" (Ben Böhm), „Lingerie mit Hingabe" (Lena Mariah).
- Der Hero-Gag „Ob Software oder Unterwäsche" darf als Eyebrow überleben, nicht als H1.
- H1 der Startseite sagt dem Mittelstands-Geschäftsführer, was er bekommt. Vorschlag:
  „Software, die zu deinem Betrieb passt. Nicht umgekehrt." Der Text-Agent darf verbessern.
- Absätze ≤ 25 Wörter, Zitate ≤ 3 Zeilen, Buttons ≤ 3 Wörter.
- Auf `/konzept` schreibt Elberd in der Ich-Form, freundlich, ohne die Live-Seite herabzusetzen:
  „So würde ich es bauen", nicht „eure Seite ist schlecht".

---

## 8. Zielwerte (werden nach dem Build gemessen und in `/konzept` eingetragen)

| Messwert | Ziel |
|---|---|
| Übertragung beim ersten Aufruf | < 300 KB |
| Schriftdateien | 2 |
| JavaScript im Marketing | nur Next-Runtime, kein eigener Client-Code |
| Lighthouse mobil (Performance, Accessibility, Best Practices, SEO) | je ≥ 95 |
| Klickziele | alle ≥ 44 × 44 px |
| Kontrast Fließtext | ≥ 7:1, Labels ≥ 4.5:1, gemessen |
| `lang` | `de` |
| JSON-LD | Organization + JobPosting, gültig |
| Seitenlänge mobil Startseite | < 5.000 px |

---

## 9. Was bewusst nicht gebaut wird

- Kein Dark Mode, keine Sprachumschaltung (die Live-Seite hat beides; im Konzept-Text erklärt:
  erst Substanz, dann Varianten).
- Kein Shop, kein Termin-Widget, keine Formulare. Alles verlinkt auf die echten Ziele.
- Keine Fotos von Personen. Rechte liegen bei leasyro.
- Keine Analytics, kein Cookie-Banner (weil nichts gesetzt wird).

---

## 10. Ablauf

1. Repo öffentlich auf GitHub, Vercel-Projekt `leasyro-konzept`, Deploy von `main`.
2. Opus baut nach dieser Spezifikation (Struktur, Komponenten, Tokens, Skripte, erste Texte
   aus den Quellen).
3. Sonnet überarbeitet ausschließlich `src/content/*.ts` nach Abschnitt 7.
4. Hauptsitzung misst (Playwright, Lighthouse, Kontrast, Klickziele), trägt Nachher-Werte in
   `/konzept` ein, deployt, prüft live, schreibt Vault und Anschreiben nach.
