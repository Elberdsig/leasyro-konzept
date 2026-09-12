# leasyro.com, neu gedacht

[![Prüfen](https://github.com/Elberdsig/leasyro-konzept/actions/workflows/ci.yml/badge.svg)](https://github.com/Elberdsig/leasyro-konzept/actions/workflows/ci.yml)

Das hier ist ein unverbindlicher Redesign-Entwurf für leasyro.com, gebaut von Elberd Sigauri als
Teil seiner Bewerbung auf die Stelle „Software Developer (m/w/d)" bei der leasyro GmbH. Es ist
nicht die offizielle Seite: die steht unter [leasyro.com](https://leasyro.com). Marke, Logo,
Farben und Inhalte gehören der leasyro GmbH. Der Entwurf ist weder beauftragt noch autorisiert,
für Suchmaschinen vollständig gesperrt, und jede Seite trägt ein sichtbares Band, das genau das
sagt. Live liegt er unter
[leasyro-konzept.vercel.app](https://leasyro-konzept.vercel.app), die Begründung samt
Vorher-Nachher-Tabelle auf
[leasyro-konzept.vercel.app/konzept](https://leasyro-konzept.vercel.app/konzept).

## Messwerte

Beide Spalten wurden am 12.09.2026 mit demselben Skript gemessen: Playwright mit System-Chrome,
Desktop 1440 px und Handy 390 px, dazu Lighthouse auf dem Handy-Profil. Quelle der Zahlen:
`src/content/concept.ts`, dieselbe Tabelle, die die Seite `/konzept` anzeigt.

| Messwert | leasyro.com | dieser Entwurf |
|---|---|---|
| Übertragung beim ersten Aufruf, Desktop ohne Cache | 2.513.200 Byte | 240.645 Byte |
| davon JavaScript | 1.425.298 Byte | 142.599 Byte, nur die Next- und React-Laufzeit |
| Vorgeladene Schriftdateien | 27 woff2 | 2 woff2, Poppins 400 und 600 |
| Lighthouse mobil, Performance | 71 | 100 |
| Lighthouse mobil, Barrierefreiheit | 89 | 100 |
| Lighthouse mobil, Best Practices | 96 | 100 |
| Largest Contentful Paint, mobil | 11,2 s | 0,9 s |

Der SEO-Wert liegt bei 66. Das ist kein Fehler, sondern die Folge der Sperre: `robots.txt`
verbietet alles und jede Seite trägt `noindex, nofollow`, deshalb zieht Lighthouse den Punkt
„is-crawlable" ab. Genau diese Kategorie wird in `.lighthouserc.json` bewusst nicht geprüft
(JSON kennt keine Kommentare, deshalb steht die Begründung hier). Barrierefreiheit und Best
Practices müssen dort jeweils über 0,95 liegen, Performance über 0,90, jeweils als Median aus
drei Läufen. Die niedrigere Performance-Schwelle ist gemessen, nicht geraten: der GitHub-Runner
liefert für dieselbe Seite 85 bis 99, lokal und live liegt sie bei 98 bis 100. Schlägt eine
Schwelle fehl, schlägt die CI fehl.

## Was hier anders ist

- **Server Components, kein eigenes Client-JavaScript.** Einzige Ausnahme ist der kleine Rechner
  auf der Startseite. Das mobile Menü läuft über das Popover-API des Browsers, nicht über eine
  eigene Datei.
- **Zwei Schriftdateien statt 27.** Poppins über `next/font/google`, Schnitte 400 und 600, Subset
  Latin, lokal ausgeliefert. Kein Aufruf bei Google zur Laufzeit.
- **Farben als Tokens mit gemessenen Kontrasten.** Alle Farben stehen in
  `src/app/globals.css`, jedes Paar, in dem Text landen kann, ist nachgerechnet. Fließtext liegt
  über 7:1, Labels über 4.5:1.
- **Strukturierte Daten.** JSON-LD `Organization` auf der Startseite, `JobPosting` auf der
  Stellenseite. Ohne das erscheint eine Stelle nicht in der Google-Jobsuche.
- **Klickziele ab 44 px.** Ausgenommen sind sieben Links mitten im Satz, für die WCAG 2.5.8
  ausdrücklich eine Ausnahme macht.
- **Prüfskripte statt Bauchgefühl.** Zwei Skripte messen Kontraste und Textregeln, eines davon
  mit eingebauter Gegenprobe.
- **Tests.** Fünf Dateien unter `tests/` prüfen Inhalte, Links, Stellenanzeige, Kontrastrechnung
  und die Vorher-Nachher-Tabelle.
- **CI mit Lighthouse.** Jeder Push auf `main` und jeder Pull Request läuft durch Lint,
  Prüfskripte, Tests, Bau und danach Lighthouse auf vier Seiten.

## Lokal starten

```bash
npm install
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) im Browser öffnen. Für einen Produktionslauf:

```bash
npm run build
npm run start
```

Die Umgebungsvariable `NEXT_PUBLIC_SITE_URL` setzt die Basisadresse für `metadataBase`, die
Sitemap und das Vorschaubild. Ohne sie fällt alles auf `http://localhost:3000` zurück. Es gibt
keine weiteren Umgebungsvariablen und keine Geheimnisse.

## Prüfen

```bash
npm run check    # Kontraste und Textregeln
npm test         # Vitest, fünf Dateien
npm run build    # muss ohne Warnung durchlaufen
```

`npm run check` besteht aus zwei Skripten:

- `scripts/check-contrast.mjs` liest die Farb-Tokens aus `src/app/globals.css` und rechnet jeden
  Kontrast nach, den ein Text auf dieser Seite treffen kann. Das Skript enthält eine Gegenprobe:
  ein absichtlich zu schwaches Paar muss durchfallen, sonst bricht die Prüfung ab. Eine grüne
  Messung, die den Fehler gar nicht sehen kann, ist keine Messung. Die Rechnung selbst liegt in
  `scripts/lib/contrast.mjs`, damit die Tests mit demselben Code messen.
- `scripts/check-copy.mjs` sucht in `src/` nach Gedankenstrichen, die hier nirgends vorkommen
  dürfen. Mit `CHECK_STRICT=1` prüft es zusätzlich, ob in `src/content/` noch offene Platzhalter
  stehen. Vor einer Veröffentlichung muss dieser strenge Lauf grün sein, und die CI fährt ihn so.

`npm test` läuft ohne Browser und ohne DOM. Die Seiten tragen keine Logik, die sich zu mounten
lohnt, also prüfen die Tests das, woran ein Entwurf wirklich scheitert: fehlende Quellen in den
Inhalten, Links auf Routen, die es nicht gibt, ein ungültiges Datum in der Stellenanzeige, eine
Kontrastrechnung, die schwache Paare durchlässt, und leere Zellen in der Vorher-Nachher-Tabelle.

## Struktur

```
src/app         Routen, Layout, robots.ts, sitemap.ts, Tokens in globals.css
src/components  Rahmen (Band, Kopf, Fußzeile) und die Sektionen der Startseite
src/content     alle Texte und Zahlen, jede Tatsache mit Quelle im Kommentar
scripts         Prüfskripte für Kontrast und Textregeln, Rechnung in scripts/lib
tests           Vitest, fünf Dateien
docs            Spezifikation und Baubericht
```

## Dokumente

- [`docs/KONZEPT.md`](docs/KONZEPT.md): die Spezifikation. Befund der heutigen Seite, Marke,
  Tokens, Seitenaufbau, Textregeln, Zielwerte.
- [`docs/BAUBERICHT.md`](docs/BAUBERICHT.md): was gebaut wurde, was gemessen wurde, welche
  Abweichungen es gibt und was offen ist.

## Stack

- Next.js 16 mit App Router und `src/`-Ordner, React 19, TypeScript strict
- Tailwind 4, alle Farben und Radien als Tokens in `src/app/globals.css`
- Poppins über `next/font/google`, zwei Schnitte, lokal ausgeliefert
- `@phosphor-icons/react` über den SSR-Einstiegspunkt
- Vitest für die Tests, GitHub Actions für Lint, Prüfskripte, Bau und Lighthouse
- Deploy über Vercel von `main`
