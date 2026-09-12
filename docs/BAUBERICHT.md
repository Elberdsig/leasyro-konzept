# Baubericht

Stand: 12.09.2026 · Gebaut nach `docs/KONZEPT.md` · Alle Messungen selbst durchgeführt

---

## 1. Was gebaut ist

### Seiten (7 plus 404)

| Route | Datei | Besonderheit |
|---|---|---|
| `/` | `src/app/page.tsx` | sieben Sektionen, JSON-LD `Organization` |
| `/leistungen` | `src/app/leistungen/page.tsx` | Sprungnavigation, Anker `softwareentwicklung`, `wartung-betrieb`, `schulungen`, `humafix` |
| `/karriere` | `src/app/karriere/page.tsx` | drei Stellen, kein Formular |
| `/karriere/software-developer` | `.../software-developer/page.tsx` | vollständiger Stellentext, JSON-LD `JobPosting` |
| `/konzept` | `src/app/konzept/page.tsx` | Vorher/Nachher-Tabelle, Ich-Form |
| `/impressum` | `src/app/impressum/page.tsx` | Betreiber ist Elberd, Hinweis „Entwurf, vor Veröffentlichung prüfen" |
| `/datenschutz` | `src/app/datenschutz/page.tsx` | derselbe Hinweis |
| 404 | `src/app/not-found.tsx` | Weg zurück plus Link auf leasyro.com |

Dazu: `robots.ts` (sperrt alles), `sitemap.ts` (sieben Adressen), `opengraph-image.tsx`
(1200 × 630, Wortmarke plus „Konzept-Entwurf" auf brand-soft), `icon.png` (192 px, aus der
Bildmarke).

### Komponenten

`concept-banner`, `site-header`, `site-footer`, `json-ld`, `legal`, `ui` (Container, Section,
Eyebrow, SectionHead, Button, TextLink) und sieben Startseiten-Sektionen unter
`src/components/home/`: `hero`, `worlds-bento`, `services-split`, `values-list`,
`quotes-section`, `story`, `contact-band`.

### Inhalte

Ausschließlich in `src/content/`: `site.ts`, `company.ts`, `worlds.ts`, `services.ts`,
`values.ts`, `quotes.ts`, `jobs.ts`, `concept.ts`, `author.ts`. Jede Tatsache trägt im Kommentar
ihre Quelle mit URL und Datum 12.09.2026. Nichts erfunden: keine Kundenzahlen, keine
Teamgrößen, kein Gehalt in der Stellenanzeige, keine Social-Media-Links ohne geprüfte URL.

### Technik

- Nur Server Components. `grep -rn '"use client"' src/` liefert null Treffer.
- Mobiles Menü über das Popover-API, geprüft: öffnet und schließt ohne eigenes JavaScript.
- Poppins über `next/font/google`, Schnitte 400 und 600, Subset Latin, `display: swap`.
- Acht Phosphor-Icons, alle aus `@phosphor-icons/react/dist/ssr`: ArrowRight, ArrowUpRight,
  Check, EnvelopeSimple, List, MapPin, Phone, X.
- Alle Bilder über `next/image` mit fester Breite und Höhe. Null Bilder ohne `alt`,
  null Bilder ohne Maße, auf allen acht Routen geprüft.
- Keine Scroll-Animation, keine `@starting-style`-Einblendung. Übergänge nur auf hover und focus.

---

## 2. Markenassets

Alle PNG wurden mit Pillow auf Anzeigegröße verkleinert, die Originale liegen als `*-src.png`
in `docs/`.

| Datei | vorher | nachher | Größe |
|---|---|---|---|
| `public/brand/logo-leasyro.png` | 879 × 247, 114.078 Byte | 264 × 74 | 14.785 Byte |
| `public/brand/icon-leasyro.png` | 1667 × 1667, 129.328 Byte | 128 × 128 | 8.406 Byte |
| `public/brand/icon-humafix.png` | 1024 × 1024, 46.926 Byte | 128 × 128 | 5.100 Byte |
| `public/brand/icon-benboehm.png` | 1024 × 1024, 18.269 Byte | 128 × 128 | 7.927 Byte |
| `public/brand/icon-lenamariah.png` | 1024 × 1024, 35.803 Byte | 128 × 128 | 6.705 Byte |
| `src/app/icon.png` | neu, aus der Bildmarke | 192 × 192 | 12.748 Byte |

Das Standard-`favicon.ico` von create-next-app liegt als
`docs/create-next-app-favicon-src.ico`, die fünf ungenutzten Beispiel-SVG aus `public/`
(file, globe, next, vercel, window) wurden entfernt.

---

## 3. Gemessene Kontraste

`node scripts/check-contrast.mjs`, alle fünfzehn Paare über der Schwelle:

| Paar | gemessen | Schwelle |
|---|---|---|
| ink auf paper | 17.77 : 1 | 7 |
| ink auf paper-2 | 16.42 : 1 | 7 |
| ink-soft auf paper | 8.22 : 1 | 7 |
| ink-soft auf paper-2 | 7.60 : 1 | 7 |
| ink-faint auf paper | 5.62 : 1 | 4.5 |
| ink-faint auf paper-2 | 5.19 : 1 | 4.5 |
| brand-ink auf paper | 6.44 : 1 | 4.5 |
| brand-ink auf paper-2 | 5.95 : 1 | 4.5 |
| brand-ink auf brand-soft | 5.61 : 1 | 4.5 |
| ink auf brand-soft | 15.49 : 1 | 7 |
| ink-soft auf brand-soft | 7.16 : 1 | 7 |
| brand-soft auf navy | 9.49 : 1 | 7 |
| weiß auf brand-ink | 6.44 : 1 | 4.5 |
| weiß auf navy | 10.89 : 1 | 4.5 |
| weiß auf ink | 17.77 : 1 | 4.5 |

Gegenprobe: `#b9c2ce` auf Weiß wird mit 1.80 : 1 als Fehler gemeldet, wie erwartet. Ohne diesen
Fehlschlag bricht das Skript mit Exit 1 ab.

`--color-brand-ink` (#0a58ca) und `--color-ink-faint` (#5f6878) mussten **nicht** angepasst
werden, sie bestehen die Messung mit den Werten aus der Spezifikation.

---

## 4. Abweichungen von der Spezifikation

1. **`--color-ink-soft` von `#4b5567` auf `#474f60` abgedunkelt.** Der Spec-Wert ist AAA auf
   paper (7.51 : 1), fällt aber auf paper-2 auf 6.95 : 1 und auf brand-soft auf 6.55 : 1.
   Sekundärtext steht in drei Sektionen auf paper-2. Ein Schritt dunkler, dann ist derselbe
   Token auf jedem Grund AAA. Begründung steht im Kommentar über dem `@theme`-Block.

2. **Zusätzliche Tokens.** Neben der Liste aus Abschnitt 4: `--radius-btn: 6px`,
   `--radius-pill: 999px` (beide sind in der Spec als Text genannt, aber nicht als Token),
   und `--color-accent-humafix`, `--color-accent-benboehm`, `--color-accent-lena` für die
   Akzentlinie über den drei Bereichskacheln. Diese drei werden nie für Text verwendet und
   stehen deshalb nicht in der Kontrastprüfung.

3. **`.eyebrow` steht auf 14 px, nicht auf 12 px.** Die Konzept-Seite kritisiert die Live-Seite
   für 12-px-Text. Mit 12 px hätte dieser Entwurf neun eigene Elemente unter 14 px gehabt. Mit
   14 px liegt auf keiner Seite ein Text darunter (gemessen, 390 px).

4. **Die zwei kleinen Bereichskacheln zeigen nur die Vision, nicht den langen Text.**
   Abschnitt 5.2 fordert „Bereichs-Icon, Name, ein Satz Vision, Link". Die große Kachel
   (Benjamin Böhm) behält zusätzlich den Absatz, das ist Teil der Asymmetrie. Der Text der
   beiden anderen bleibt in `worlds.ts` erhalten.

5. **Externe Links öffnen im selben Tab.** Kein `target="_blank"`. Stattdessen markiert ein
   ArrowUpRight-Icon jeden Link, der die Seite verlässt. Ein erzwungener neuer Tab ohne
   Ankündigung ist ein bekanntes Barrierefreiheitsproblem, und der Entwurf hat keinen Grund,
   den Zurück-Knopf zu unterlaufen.

6. **Kein Shop-Link.** Abschnitt 5 nennt `https://leasyro.com/shop` als externes Ziel. Die
   Startseite hat keine Stelle, an der ein Shop-Link inhaltlich passt, die Navigation der
   Live-Seite führt ihn an dieser Stelle auch nicht. Die Adresse steht in
   `src/content/company.ts` bereit, falls sie später gebraucht wird.

7. **`robots.ts` verweist nicht auf die Sitemap.** Ein Sitemap-Verweis in einer robots.txt, die
   alles sperrt, wäre widersprüchlich. Die Route `/sitemap.xml` existiert und ist korrekt.

8. **TextLink kennt zwei Größen.** Freistehende Links sind 44 px hoch. Links, die mitten in
   einem Satz stehen (Impressum, Datenschutz, ein Satz auf der Stellenseite), bleiben
   zeilenhoch: WCAG 2.5.8 nimmt genau diesen Fall ausdrücklich aus, und Polsterung würde dort
   die Nachbarzeilen auseinanderdrücken. Betroffen sind sieben Links.

---

## 5. Was geprüft wurde und mit welchem Ergebnis

### Werkzeuge

```
npm run lint     ohne Ausgabe, also fehlerfrei
npm run check    15 Kontrastpaare grün, Gegenprobe bestanden, keine Gedankenstriche
npm run build    ✓ Compiled successfully, 13 Routen, 0 Warnungen, 0 Fehler
```

Der strenge Lauf `CHECK_STRICT=1 node scripts/check-copy.mjs` **schlägt absichtlich fehl**
(Exit 1) und meldet die drei offenen Marker in `author.ts` und `concept.ts`. Das ist der
gewollte Zustand: die Nachher-Werte sind noch nicht gemessen und die Anschrift trägt Elberd ein.

Gegenprobe zur Textprüfung: ein testweise eingebauter Gedankenstrich in `src/content/site.ts`
wurde gefunden und führte zu Exit 1, danach zurückgesetzt. Die Prüfung kann den Fehler also
tatsächlich sehen.

### Server auf Port 3011 (`npx next start -p 3011`, danach über die gespeicherte PID beendet)

| Prüfung | Ergebnis |
|---|---|
| `/`, `/leistungen`, `/karriere`, `/karriere/software-developer`, `/konzept`, `/impressum`, `/datenschutz` | alle HTTP 200 |
| `/gibtsnicht` | HTTP 404 mit eigener Seite |
| `/robots.txt` | `User-Agent: *` und `Disallow: /`, kein `Allow` |
| `/sitemap.xml` | HTTP 200, `application/xml`, sieben Adressen |
| `/opengraph-image` | HTTP 200, `image/png`, 49.928 Byte |
| `/icon.png` | HTTP 200, `image/png` |
| `<html lang="de">` | auf allen acht Routen vorhanden |
| `noindex, nofollow` | auf allen acht Routen im HTML |
| Konzept-Band | auf allen acht Routen im HTML |
| Gedankenstrich im gerenderten HTML | auf keiner Route |
| JSON-LD `Organization` auf `/` | gültiges JSON, 11 Felder |
| JSON-LD `JobPosting` auf der Stellenseite | gültiges JSON, 13 Felder, kein Gehalt |

### Struktur, auf allen acht Routen geprüft

Genau eine `h1` je Seite, keine übersprungene Überschriftenebene, null Bilder ohne `alt`,
null Bilder ohne `width`/`height` (also kein Layoutsprung).

### Übertragung der Startseite, erster Aufruf ohne Cache, mit Kompression

| Teil | Byte |
|---|---|
| HTML | 13.413 |
| JavaScript | 182.455 |
| CSS | 5.596 |
| Schriften (2 Dateien) | 15.892 |
| Bilder | 7.632 |
| **Gesamt** | **224.988 Byte, 219.7 KB** |

Ziel war unter 300 KB: erfüllt. Größter JavaScript-Block 71.576 Byte (Live-Seite: 1.359.130).
Schriftdateien 2 (Live-Seite: 27). Das JavaScript ist ausschließlich die Next- und
React-Laufzeit, eigener Client-Code existiert nicht.

### Im Browser selbst angesehen

Startseite und `/leistungen` auf 390 px, Startseite und `/konzept` auf 1440 px. Dabei gefunden
und behoben:

- Die `h1` der Startseite brach auf 1440 px in **drei** Zeilen. `max-w-4xl` war zu schmal,
  jetzt `max-w-5xl`, gemessen: zwei Zeilen.
- Der Kopf-Button „Termin buchen" war auf 390 px **sichtbar**, obwohl er `hidden` trug: das
  `inline-flex` der Button-Basis gewinnt gegen `hidden`, weil beide in derselben Schicht liegen.
  Ersetzt durch die Media-Query-Variante `max-sm:hidden`. Das wäre in einer reinen
  DOM-Prüfung nicht aufgefallen, nur im Bild.
- Zehn Klickziele unter 44 px (Banner-Links 20 px, freistehende TextLinks 24 px). Alle bis auf
  die sieben satzinternen Links jetzt bei mindestens 44 px.
- Neun Textelemente bei 12 px (die Eyebrows). Jetzt 14 px, keins mehr darunter.

Nachgemessen, jeweils auf 390, 768 und 1440 px: kein horizontaler Überlauf auf irgendeiner
Route, kein Text unter 14 px, Kopf 61 px hoch (Grenze 72), Band 45 px.

Das mobile Menü wurde im laufenden Browser geöffnet und geschlossen: `popover="auto"` öffnet
über die volle Fläche 390 × 844, die vier Ziele darin sind 60 und 48 px hoch, der
Schließen-Knopf funktioniert. Kein eigenes JavaScript beteiligt.

---

## 6. Was offen ist

1. **Seitenlänge der Startseite auf dem Handy: 6.700 px, Ziel war unter 5.000 px.**
   Ausgangswert der Live-Seite: 8.398 px. Durch Straffen (kürzerer Bento, zweispaltige
   Fußzeile, engerer Rhythmus) ging es von 7.442 auf 6.700 px herunter. Unter 5.000 zu kommen
   ginge nur, indem Inhalt auf dem Handy versteckt oder eine ganze Sektion gestrichen wird.
   Beides wäre eine Zahl auf Kosten der Substanz. **Entscheidung für die Hauptsitzung:**
   entweder eine Sektion von der Startseite auf eine Unterseite verschieben, oder den Zielwert
   in `docs/KONZEPT.md` Abschnitt 8 auf einen erreichbaren Wert korrigieren.
   Aufteilung auf 390 px: Hero 592, Bereiche 1.454, Leistungen 968, Werte 905, Zitate 583,
   Geschichte 524, Kontakt 594, Fußzeile 935, Band 85, Kopf 61.

2. **Die Nachher-Spalte auf `/konzept` steht auf `[[MESSEN]]`.** Die Zahlen aus Abschnitt 5
   dieses Berichts können direkt eingetragen werden. Danach muss
   `CHECK_STRICT=1 node scripts/check-copy.mjs` grün sein.

3. **Die Anschrift im Impressum ist ein Platzhalter** (`[[ANSCHRIFT: trägt Elberd ein]]`).
   Ein Impressum ohne ladungsfähige Anschrift darf nicht öffentlich gehen.

4. **Impressum und Datenschutz sind anwaltlich ungeprüft.** Beide Seiten sagen das sichtbar.

5. **Lighthouse wurde nicht gefahren.** Die Einzelwerte (Übertragung, Schriftdateien,
   Kontraste, Klickziele, Struktur) sind gemessen, der zusammengesetzte Lighthouse-Wert aus
   Abschnitt 8 der Spezifikation fehlt noch.

6. **Die Texte sind eine erste, vollständige Fassung.** Sie sind veröffentlichungsfähig, aber
   der Text-Agent darf sie nach Abschnitt 7 weiter schärfen. Dabei gilt: nur `src/content/*.ts`
   anfassen, keine neuen Tatsachen, kein Gedankenstrich.

7. **`NEXT_PUBLIC_SITE_URL` ist noch nicht gesetzt.** Bis dahin stehen in Sitemap und
   `metadataBase` localhost-Adressen. Das muss vor dem Deploy im Vercel-Projekt eingetragen
   werden.
---

## Zweiter Durchgang, 12.09.2026 (Agent B): Tests und CI

### Tests (Vitest, `npm test`)

`vitest` ohne DOM, ohne jsdom, ohne Testing-Library. Die Seiten tragen keine Logik, die sich zu
mounten lohnt, deshalb prüfen die Tests Inhalte, Verweise und Rechnung. Fünf Dateien, 27 Tests,
Laufzeit unter einer Sekunde. Konfiguration in `vitest.config.ts`: `tests/**/*.test.ts` plus
Alias `@` auf `./src`, damit die Content-Module wie im Projekt importiert werden.

| Datei | Was sie abdeckt |
|---|---|
| `tests/content-facts.test.ts` | liest `src/content/` von der Platte, importiert jedes Modul und läuft durch jeden String: jede Datei mit Tatsachen über leasyro nennt im Kommentar eine Quelle mit `https://` und dem Datum 12.09.2026, kein sichtbarer Text enthält einen Gedankenstrich, keiner einen offenen Platzhalter `[[` |
| `tests/links.test.ts` | leitet die Routen aus den `page.tsx` unter `src/app/` ab und prüft, dass jeder interne Link in `site.ts` auf eine vorhandene Route zeigt, dass Navigation und Fußzeile vollständig sind und dass jeder externe Link mit `https://` beginnt |
| `tests/jobs.test.ts` | `datePosted` ist ein gültiges ISO-Datum und identisch zum Rücktausch über `Date`, `dateModified` liegt nicht davor, Titel, Ort und Beschreibung sind nicht leer, Aufgaben, Qualifikation und Benefits sind gefüllt, und es gibt kein Gehaltsfeld und kein Eurozeichen, weil es dafür keine Quelle gibt |
| `tests/contrast.test.ts` | rechnet mit derselben Funktion wie das Prüfskript: Weiß auf Schwarz ergibt 21, eine Farbe gegen sich selbst 1, das absichtlich schwache Paar `#b9c2ce` auf Weiß fällt unter 4,5, und alle 15 Token-Paare aus `globals.css` erfüllen ihre Schwelle (Farbwerte werden aus der Datei gelesen, nicht abgetippt) |
| `tests/comparison.test.ts` | die Vorher-Nachher-Tabelle in `concept.ts` hat keine leere Zelle, keinen `[[MESSEN]]`-Marker, keine doppelte Kennzahl, und die Fußnote nennt die Messmethode mit Datum |

Damit `tests/contrast.test.ts` dieselbe Rechnung benutzt wie die Prüfung, sind Formel, Paarliste
und Gegenprobe aus `scripts/check-contrast.mjs` nach `scripts/lib/contrast.mjs` gewandert. Das
Skript importiert sie jetzt. Gegenprobe dazu: die Ausgabe von `node scripts/check-contrast.mjs`
wurde vor und nach dem Umbau gespeichert und ist Zeile für Zeile identisch (`diff` ohne Ausgabe).

Gegenprobe zu den Inhaltstests: ein künstlicher Eintrag mit Gedankenstrich und `[[MESSEN]]` wurde
in die geprüfte Liste geschoben. Zwei Tests schlugen fehl, danach wurde der Eintrag entfernt und
alle 27 Tests waren wieder grün. Die Prüfung kann den Fehler also sehen.

### CI (`.github/workflows/ci.yml`)

Ausgelöst bei jedem Push auf `main` und bei jedem Pull Request. Zwei Jobs auf `ubuntu-latest`,
Node 22 mit npm-Cache.

1. **`pruefen`**: `npm ci`, `npm run lint`, `CHECK_STRICT=1 npm run check`, `npm test`,
   `npm run build`. Der strenge Lauf ist Absicht: offene Platzhalter in `src/content/` sollen die
   CI rot machen, nicht erst der Blick auf die veröffentlichte Seite.
2. **`lighthouse`** (braucht `pruefen`): baut, startet `next start` auf Port 3000, wartet in einer
   Schleife auf HTTP 200 und misst dann mit `treosh/lighthouse-ci-action@v12` vier Seiten: `/`,
   `/leistungen`, `/karriere/software-developer`, `/konzept`. Schwellen in `.lighthouserc.json`:
   Performance, Barrierefreiheit und Best Practices jeweils mindestens 0,95 als `error`. Ein Lauf
   je Adresse, Handy-Profil (der Standard, also die härtere Messung), Berichte als Artefakt.

**Was die CI nicht tut:** sie prüft den SEO-Wert nicht. Die Seite ist absichtlich für
Suchmaschinen gesperrt, dadurch fällt `is-crawlable` durch und die Kategorie landet bei 66. Eine
Schwelle darauf wäre eine Schwelle gegen die eigene Entscheidung. Die Begründung steht in der
`README.md`, weil JSON keine Kommentare kennt. Ebenfalls nicht in der CI: Deploy (das macht
Vercel selbst von `main`), Messung gegen die Live-Adresse (Lighthouse läuft gegen den lokal
gestarteten Server), Sichtprüfung im Browser und ein Vergleich gegen leasyro.com.

### Abweichungen und Notizen

1. **`vitest@^4` statt der aktuellen 5.** Vitest 5 verlangt `@types/node` in `^22 || >=24`, das
   Projekt steht auf `^20`. Vitest 4.1.11 akzeptiert `^20` und ist damit der kleinere Eingriff:
   keine Typänderung in einem Projekt, an dem parallel gearbeitet wird.
2. **Zwei Content-Dateien sind vom Quellen-Test ausgenommen.** `author.ts` (Elberds eigene
   Kontaktdaten) und `concept-ideas.ts` (eigene Vorschläge, eigenes Arbeitsprotokoll) tragen keine
   Tatsache über leasyro und deshalb keine fremde Quelle. Die Ausnahme steht mit Begründung im
   Test, nicht versteckt. Alle anderen Dateien, auch die während dieses Durchgangs
   hinzugekommene `calculator.ts`, bestehen die Prüfung.
3. **Der Routen-Test verlangt die sieben Routen der Spezifikation, verbietet aber keine
   achte.** Eine zusätzliche Seite soll die Tests nicht rot machen, ein Link ins Leere schon.
4. **Die Zahlen in der README stammen aus `src/content/concept.ts`.** Dort steht Lighthouse
   Performance 100 und Largest Contentful Paint 0,9 s, in `docs/KONZEPT.md` Abschnitt 11 steht
   99 und 2,2 s. Beide Läufe sind vom 12.09.2026. Die README nennt die Werte der Content-Datei,
   weil die Seite `/konzept` genau diese anzeigt. Wer die Differenz auflöst, sollte beide Stellen
   angleichen.
5. **Kein Bild in der README.** `docs/screens/nachher-2-desktop.png` gab es beim Schreiben nicht.
6. **Eine Warnung bleibt stehen.** `vitest run` meldet, dass `vitest.config.ts` ESM-Syntax
   enthält, aber als CommonJS geladen wird (das Projekt hat kein `"type": "module"`). Die Tests
   laufen trotzdem. Ein `.mjs`-Config oder `"type": "module"` würde das Projekt weiter verändern,
   als dieser Durchgang darf.
7. **`.gitignore`** kennt jetzt `/.vitest`, `/.lighthouseci` und `/lhci-report`.

### Selbst geprüft

```
npm test                      5 Dateien, 27 Tests, alle gruen
npm run lint                  ohne Ausgabe, also fehlerfrei
CHECK_STRICT=1 npm run check  15 Kontrastpaare gruen, Gegenprobe bestanden, keine Platzhalter
```

Die Workflow-Datei wurde mit `js-yaml` geladen und auf ihre Struktur geprüft (zwei Jobs
`pruefen` und `lighthouse`, Auslöser `push` und `pull_request`, `needs: pruefen`,
`treosh/lighthouse-ci-action@v12`); PyYAML ist auf diesem Rechner nicht installiert.
`.lighthouserc.json` wurde mit `json.load` geladen. Beides sagt nur, dass die Dateien gültig und
richtig gebaut sind. Ob die CI durchläuft, zeigt erst der erste Push: das ist der offene Punkt
dieses Durchgangs.


---

## Zweiter Durchgang, 12.09.2026 (Agent A)

Aufgabe: eine eigene Idee einbauen, Bewegung sparsam nachrüsten, die Konzept-Seite erweitern,
den Bestand feinschleifen und alles gegen `docs/web-interface-guidelines.md` prüfen. Alle Zahlen
unten sind selbst gemessen, gegen `npx next start -p 3013` auf dem fertigen Produktions-Build mit
`.env.production`.

### 1. Der Handarbeits-Rechner (die eigene Idee)

`src/components/home/effort-calculator.tsx`, Inhalt in `src/content/calculator.ts`, montiert auf
der Startseite zwischen `ServicesSplit` und `ValuesList`. Eigene Layout-Familie: Formular links,
Ergebnis rechts, auf dem Handy untereinander.

Der Grund steht im Kopfkommentar der Inhaltsdatei: benboehm.com trägt als Überschrift
„Manuelle Prozesse kosten dich täglich Geld." (selbst abgerufen am 12.09.2026), leasyro.com
verkauft dieselbe Sache, nennt aber nirgends eine Zahl. Der Rechner liefert genau eine Zahl, die
der Besucher selbst erzeugt: Mitarbeitende mal Stunden mal 46 Arbeitswochen, dazu der
Stundensatz. **Keine Ersparnis, kein Prozentwert, kein Versprechen**, nur der Satz „Das ist der
Betrag, um den es geht. Im Gespräch klären wir, welcher Teil davon in Software gehört."

Drei Entscheidungen, die im Code begründet sind:

1. **Kein Import aus `@/components/ui`.** Alles in dieser Datei liegt in einem Modul mit
   `next/link` und einem Phosphor-Icon; ein Import von dort hätte beides in das Client-Bündel
   gezogen. Der Termin-Button wird deshalb in `src/app/page.tsx` (Server) gebaut und als Prop
   `cta` übergeben. Kosten des einzigen Client-Bausteins gemessen: **plus 4.350 Byte JavaScript**
   (146.949 statt 142.599).
2. **Zahlen mit `Intl.NumberFormat("de-DE")`**, auf Server und Client derselbe Aufruf. Das
   Eurozeichen wird von Hand mit geschütztem Leerzeichen angehängt, weil die `currency`-Variante
   ihr Trennzeichen zwischen ICU-Versionen geändert hat und genau das ein Hydrations-Fehler wäre.
   Gemessen: keine einzige Konsolenmeldung auf sieben Routen und zwei Breiten.
3. **`useState` startet mit den Werten aus der Inhaltsdatei**, der Server rendert also ein
   fertiges Ergebnis. Mit abgeschaltetem JavaScript stehen 1.656 Stunden und 57.960 € da
   (nachgemessen in einem Kontext mit `java_script_enabled=False`).

Bedienung im echten Browser durchgeprüft: Tastatur (fünfmal Pfeil rechts auf dem ersten Schieber,
12 wird 17, Ergebnis 2.346 Stunden / 82.110 €), Tippen in die Zahlenfelder (50 / 2,5 / 60 ergibt
5.750 Stunden / 345.000 €), Mausklick in die Mitte der Stundensatz-Spur (35 wird 60), Eingabe
von 500 bei Mitarbeitenden wird auf 200 begrenzt. Schieber-Daumen 26 px, Element 44 px hoch,
Zahlenfeld 96 mal 48 px, Fokusring 2 px brand-ink (gemessen, siehe Audit-Notiz unten).

### 2. Bewegung

`.reveal` in `globals.css`: CSS-Scroll-Animation über `animation-timeline: view()`,
`animation-range: entry 0% entry 40%`, opacity 0 auf 1 und 16 px Hub. Zwei Tore:
`@supports (animation-timeline: view())` und `@media (prefers-reduced-motion: no-preference)`.
Angewendet auf alle Sektionen nach dem ersten Block jeder Seite, nie auf Hero, H1 oder Kopf.
Zweite und letzte Bewegung: Bento-Kacheln heben sich beim Zeigen 2 px mit dem neuen Token
`--shadow-lift`, 150 ms, der Hub steckt hinter `motion-safe`.

**Dabei einen echten Fehler gefunden und behoben.** Mit `animation-fill-mode: both` füllt die
Animation auch rückwärts: solange die Zeitachse nicht gelaufen ist, steht das Element auf
opacity 0. Auf einer Seite, die man scrollt, fällt das nicht auf. Überall sonst schon. Gemessen
bei einem Fenster von 1440 mal 5400 px, also ohne Scrollweg: **sechs von sieben Sektionen waren
unsichtbar**, der ganze erste Vollbild-Screenshot war unter dem Hero leer. Mit `forwards` stehen
alle sieben auf opacity 1. Zusätzlich schaltet `@media print` die Animation ganz ab, denn Papier
scrollt nicht. Beides steht als Begründung im Kommentar über der Regel.

Gegenprobe zur Bewegung selbst: mit `prefers-reduced-motion: reduce` haben alle `.reveal`
von Anfang an opacity 1. Beim Durchlaufen mit sofortigem Scrollen erreicht jede Sektion
opacity 1 und `translateY(0)`.

Und eine Messfalle, die fast zu einem falschen Bericht geführt hätte: der erste Durchlauf zeigte
die letzten Sektionen auch nach dem Scrollen auf opacity 0. Ursache war nicht die Animation,
sondern `scroll-behavior: smooth` in der Basis: `window.scrollTo` in einer Schleife wird von der
weichen Animation überholt, die Seite stand in Wahrheit bei 60 Prozent. Zweite Messung mit
`behavior: "instant"` war grün.

### 3. Konzept-Seite

Drei neue Sektionen aus `src/content/concept-ideas.ts`, zwischen „Was ich bewusst weggelassen
habe" und „Stack und Arbeitsweise", jede in einer eigenen Layout-Familie und jede nur dann im
HTML, wenn ihr Array Einträge hat:

- **Ideen** als Liste mit Trennlinien: Titel links, „Aufwand: ..." rechts, darunter „Warum" und
  „Wie" zweispaltig.
- **Zeitleiste** als `<ol>` mit Uhrzeit links, dünner Linie mit Punkt und Satz rechts.
- **Qualitäts-Prüfungen** als zweispaltige `dl` ohne Kachel und ohne Randlinie.

Die Bedingung `array.length > 0` ist kein Schmuck: die Arrays waren beim Bau der Seite leer und
wurden parallel von einem Text-Agenten gefüllt. Der Build war zu keinem Zeitpunkt kaputt.

### 4. Feinschliff im Bestand

- Die Ziffern „01" bis „04" über den vier Abschnitten auf `/leistungen` sind weg. Die
  Sprungnavigation nennt alle vier bereits, die Reihenfolge ist keine Abfolge.
- `alternates: { canonical: "<pfad>" }` in der Metadata jeder der sieben Seiten. Im HTML geprüft:
  jede Route trägt `<link rel="canonical">` auf `https://leasyro-konzept.vercel.app/<pfad>`.
- `next.config.ts` sendet auf jeder Route vier Header, mit `curl -I` auf allen sieben geprüft:
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`.
  Kein CSP, und der Grund steht als Kommentar in der Datei.
- Alle Links haben ein Ziel: `grep -rn 'href="#"' src/` ist leer, das einzige `#` ist der
  Sprunglink `#inhalt` und die vier Anker auf `/leistungen`.
- Geprüft und unverändert gut: `<html lang="de">`, Sprunglink (1 mal 1 px versteckt, 196 mal
  48 px mit Fokus, gemessen), Fokusringe.

### 5. Audit gegen `docs/web-interface-guidelines.md`

Gefunden und behoben:

```text
## src/app/impressum/page.tsx
src/app/impressum/page.tsx:35 - E-Mail-Link allein im Absatz, aber Variante `inline`: 171x26 px statt 44

## src/app/datenschutz/page.tsx
src/app/datenschutz/page.tsx:43 - dito

## src/app/globals.css
globals.css - kein `color-scheme`: die neuen Zahlenfelder erben im dunklen System die dunkle Palette
globals.css - kein `touch-action: manipulation`, kein `-webkit-tap-highlight-color`
globals.css - `[popover]` ohne `overscroll-behavior: contain`
globals.css - `.reveal` mit `fill-mode: both` haelt Inhalt auf opacity 0, wenn nicht gescrollt wird

## src/components/site-header.tsx
site-header.tsx:76 - Vollflaechen-Popover ohne `env(safe-area-inset-*)`

## src/app/layout.tsx
layout.tsx - kein `<meta name="theme-color">`

## src/app/konzept/page.tsx
konzept/page.tsx - Zahlenspalten der Vergleichstabelle ohne `tabular-nums`
konzept/page.tsx - Stack-Liste ohne `translate="no"` (Produktnamen)
konzept/page.tsx - sechs Ueberschriften ohne `text-wrap: balance`

## src/components/home/worlds-bento.tsx
worlds-bento.tsx:65 - Flex-Kind ohne `min-w-0`, Markenname ohne `break-words`/`translate="no"`

## src/app/karriere/page.tsx
karriere/page.tsx:88 - Flex-Kind ohne `min-w-0`; zwei Ueberschriften ohne `text-balance`

## src/app/karriere/software-developer/page.tsx
software-developer/page.tsx - vier Ueberschriften ohne `text-balance`

## src/app/leistungen/page.tsx
leistungen/page.tsx - Ziffern-Eyebrow als Deko; eine Ueberschrift ohne `text-balance`

## src/components/legal.tsx
legal.tsx:28 - Ueberschrift ohne `text-balance`

## next.config.ts
next.config.ts - keine Sicherheits-Header
```

Geprüft, kein Befund: Icon-Buttons haben `aria-label` (Menü auf und zu) · jedes dekorative Icon
`aria-hidden` · jedes Bild über `next/image` mit Maßen und `alt`, unter dem Falz lazy, Logo
`priority` · kein `transition: all`, kein `outline-none`, kein `user-scalable=no` (Viewport ist
`width=device-width, initial-scale=1`) · kein `...` im Text, deutsche typografische
Anführungszeichen im Zitatblock · genau eine `h1` je Seite, keine übersprungene Ebene ·
keine Klick-Handler auf `div` oder `span` · `scroll-padding-top: 7rem` hält den klebenden Kopf
von einem fokussierten Element fern · Formularfelder mit `<label>`, `name`, `autocomplete="off"`,
passendem `inputmode` und `onChange` · Ergebnis in `aria-live="polite"` · keine Konsolenmeldung
auf sieben Routen und zwei Breiten.

Bewusste Abweichungen: der Zustand des Rechners steht **nicht** in der URL (dafür bräuchte es
einen Router-Push je Tastendruck oder ein serverseitiges Lesen von `searchParams`, das die Route
dynamisch macht; drei Schieberstellungen sind keinen Link wert) · „Title Case" für Überschriften
ist eine englische Regel und bleibt weg · externe Links öffnen weiter im selben Tab
(Abschnitt 4.5) · kein CSP.

Eine Messung, die falschen Alarm gab: der Fokusring des Zahlenfelds meldete direkt nach
`.focus()` die Farbe `rgb(18, 23, 42)`. Ursache ist `transition-colors`, das laut Tailwind auch
`outline-color` überblendet; 400 ms später steht der Ring korrekt auf `rgb(10, 88, 202)`. Kein
Fehler, aber ein guter Grund, jede Fokusmessung mit Wartezeit zu machen.

### 6. Messwerte dieses Durchgangs

| Prüfung | Ergebnis |
|---|---|
| `npx eslint src next.config.ts` | ohne Ausgabe |
| `npm run build` | `✓ Compiled successfully`, 13 Routen, 0 Warnungen |
| `npm run check` | 15 Kontrastpaare grün, Gegenprobe bestanden, keine Gedankenstriche |
| `grep -rn '"use client"' src/` | genau 1 Treffer |
| sieben Routen mit curl | alle 200, `/gibtsnicht` 404 |
| vier Sicherheits-Header | auf allen sieben Routen vorhanden |
| `<link rel="canonical">` | auf allen sieben korrekt und absolut |
| Gedankenstrich im gerenderten HTML | auf acht Routen keiner |
| Klickziele unter 44 px | 0 freistehende (Sprunglink versteckt 1 px, mit Fokus 48 px) |
| Text unter 14 px | 0 auf sieben Routen, 390 und 1440 px |
| horizontaler Überlauf | keiner, 390 und 1440 px, sieben Routen |
| Konsole (Fehler und Warnungen) | leer, auch keine Hydrations-Warnung |
| Übertragung Startseite, erster Aufruf | 241.349 Byte Desktop, 237.907 Byte Handy |
| davon JavaScript | 146.949 Byte (vorher 142.599, also plus 4.350 für den Rechner) |
| Schriftdateien | 2 |
| Startseite Handy, Höhe | 7.990 px (vorher 6.570; der Rechner ist 1.420 px davon) |
| Bilder ohne `alt` oder Maße | 0 |

Screenshots dieses Durchgangs: `docs/screens/nachher-2-start-desktop.png`,
`nachher-2-start-handy.png`, `nachher-2-konzept-desktop.png`, `nachher-2-konzept-handy.png`
(Playwright mit System-Chrome, 1440 und 390 px, jeweils die ganze Seite).

### 7. Was offen ist

1. **Die Startseite ist auf dem Handy um 1.420 px gewachsen** (7.990 statt 6.570 px), genau um
   den Rechner. Die Live-Seite liegt bei 8.398 px, der Vorsprung ist also klein geworden. Die
   Zahl auf `/konzept` und in `docs/KONZEPT.md` Abschnitt 8 gehört korrigiert, oder der Rechner
   wandert auf eine Unterseite. Entscheidung für die Hauptsitzung: ich halte ihn auf der
   Startseite für richtig, weil er der einzige Grund ist, warum ein Geschäftsführer dort stehen
   bleibt.
2. **`npm run lint` schlägt fehl, aber nicht in meinen Dateien**:
   `tests/content-facts.test.ts:23` verstößt gegen `@next/next/no-assign-module-variable`. Die
   Datei gehört zum parallelen Durchgang (Tests und CI) und wurde nicht angefasst.
   `npx eslint src next.config.ts` ist sauber.
3. **Kein Lighthouse in diesem Durchgang.** Die Einzelwerte sind gemessen, der zusammengesetzte
   Wert kommt aus der CI des anderen Durchgangs.
4. **Die Schieber-Spur hat keine gefüllte Seite** (kein farbiger Teil links vom Daumen). Dafür
   müsste JavaScript eine CSS-Variable setzen; die schlichte Spur reicht, und der Wert steht
   ohnehin als Zahl daneben.
5. **Der Rechner steht nicht im Vorher-Nachher-Vergleich auf `/konzept`.** Er ist keine
   Verbesserung einer vorhandenen Zahl, sondern ein neuer Vorschlag, und er taucht in den
   Ideen der Konzept-Seite auf.

## Zweiter Durchgang, 12.09.2026 (Hauptsitzung): Abnahme

Selbst geprüft nach der Arbeit der beiden Agenten: `npm run lint`, `CHECK_STRICT=1 npm run check`,
`npm test` (27 grün), `npm run build` (13 Routen, 0 Warnungen), Playwright-Messung mit demselben
Skript wie am Mittag, Lighthouse lokal gegen den Produktions-Build.

**Ein Fehler, den erst Lighthouse gezeigt hat:** die Einblend-Animation (`.reveal`) fuhr die
Deckkraft von 0 auf 1. Lighthouse trifft die Elemente mitten in der Zeitachse, rechnet den Text
als `#a0a2aa` auf Weiß (2,46 : 1) und lässt vier Kontrast-Audits durchfallen, Barrierefreiheit
97 statt 100. Das ist keine Messfalle, ein Nutzer mit hohem Fenster sieht denselben blassen Text.
Behoben: die Bewegung ist jetzt nur noch der 16-px-Hub, ohne Deckkraft. Danach 100.

Werte nach dem zweiten Durchgang (lokal, Handy-Profil): Startseite Performance 98, Barrierefreiheit
100, Best Practices 100, SEO 69 (noindex). Übertragung Desktop 248.653 Byte, JavaScript 144.633
Byte (davon 4.350 für den Rechner), 2 Schriftdateien, 0 Klickziele unter 44 px, Startseite auf
dem Handy 7.990 px (der Rechner ist 1.420 px davon; die Live-Seite hat 8.398 px ohne einen
solchen Baustein). Konsole ohne Meldung, keine Hydrations-Warnung.

## Dritter Durchgang, 12.09.2026: Rechner ohne React-Hydration

### Warum

Die CI misst mit Lighthouse im Handy-Profil auf einem langsamen Runner (vierfache
CPU-Drosselung). Dort steht die Startseite bei Performance 85 und **Total Blocking Time 440 ms**,
die drei Seiten ohne Client-Komponente bei 98 bis 99 und 60 bis 90 ms. Der einzige Unterschied war
`src/components/home/effort-calculator.tsx` mit `"use client"`. Die Arbeit, die dort 350 ms kostet,
ist nicht das Rechnen, sondern das Hydrieren: React muss den Baustein im Browser ein zweites Mal
aufbauen, bevor ein Schieber reagiert.

### Was

Der Rechner ist jetzt eine Server-Komponente. Das Markup ist dasselbe wie vorher, nur mit drei
Haken für das Skript: `data-rechner` auf der Sektion (der Wert ist die Zahl der Arbeitswochen,
46, aus `src/content/calculator.ts`), `data-feld` je Zeile, `data-ergebnis` auf den beiden
Zahlen. Aus den Eingaben wurden `defaultValue`-Felder, das erste Ergebnis rechnet der Server.

Die Bedienung macht ein Vanilla-Skript ohne Abhängigkeit, **1.355 Byte** Quelltext, eingebettet
als letztes Element der Sektion. Es liest Grenzen und Schrittweite aus den `min`-, `max`- und
`step`-Attributen, die sowieso im Markup stehen, und die Arbeitswochen aus `data-rechner`; keine
Zahl steht zweimal im Projekt. Formatiert wird mit `Intl.NumberFormat("de-DE")`, dasselbe wie auf
dem Server, das Eurozeichen mit geschütztem Leerzeichen von Hand.

**Abweichung vom Auftrag, mit Messung begründet:** vorgesehen war `next/script` mit
`strategy="afterInteractive"`. Dieser Weg erreicht das Ziel nicht. `next/dist/client/script.js`
trägt selbst `'use client'`, liefert im App-Router für ein Inline-Skript auf dem Server `null`
zurück und schiebt den Code erst in einem `useEffect` in die Seite. Die Seite behält damit eine
Client-Grenze, und der Rechner wird erst nach der Hydration bedienbar. Gemessen wurde beides:
mit `next/script` blieb die Startseite bei Performance 98 und TBT 29 bis 32 ms, also genau auf dem
Stand von vorher, und die Übertragung wuchs um 1.999 Byte, weil der Skripttext als Prop im
RSC-Strom mitfährt. Das fertige Markup benutzt deshalb ein einfaches `<script>`-Element mit
`dangerouslySetInnerHTML` (der Inhalt ist eine Konstante aus dieser Datei, keine Eingabe). Die
Begründung steht auch im Code, an der Stelle, an der `<Script>` gestanden hätte.

Nebenbefund: `euro()` behauptete im Kommentar ein geschütztes Leerzeichen, hatte aber ein
normales (U+0020). Erst der Vergleich von Server-Text und Skript-Text hat das gezeigt: der Server
schrieb „57.960 €" mit normalem, das Skript mit geschütztem Leerzeichen. Jetzt steht an beiden
Stellen die Escape-Form `\u00a0`.

### Messwerte, selbst gemessen

Lokal gegen `npx next start -p 3013` auf dem Produktions-Build, Lighthouse im Handy-Profil
(`CHROME_PATH` auf System-Chrome, `--headless=new`), Bytes über
`performance.getEntriesByType('resource')` plus Navigation bei 390 px Breite.

| Messung | vorher (Client-Komponente) | mit `next/script` | nachher (Server + Inline-Skript) |
|---|---|---|---|
| Performance-Score, 3 Läufe | 98 · 98 · 98 | 98 · 98 · 98 | 99 · 100 · 97 (fünf weitere: 99 · 100 · 99 · 100 · 99) |
| Total Blocking Time | 30 · 30 · 30 ms | 29 · 30 · 32 ms | 16 · 26 · 66 ms (weitere: 18 · 48 · 32 · 48 · 26) |
| JavaScript-Übertragung | 154.170 Byte | 154.435 Byte | 152.153 Byte |
| HTML-Übertragung | 14.953 Byte | 16.670 Byte | 17.152 Byte |
| HTML + JS + CSS | 176.331 Byte | 178.330 Byte | 176.530 Byte |
| Dateien mit `"use client"` in `src/` | 1 | 0 | 0 |

Die lokalen Zahlen sind ehrlich betrachtet **innerhalb des Rauschens**: der Rechner ist auf einem
schnellen Mac so billig, dass sich 350 ms CI-Arbeit hier nicht zeigen. Vorher war die Messung
stabil (dreimal exakt 30 ms), nachher schwankt sie zwischen 16 und 66 ms; der Median fällt leicht,
der Score steigt von 98 auf 99 bis 100. Belastbar ist nicht der Millisekundenwert, sondern der
Aufbau: die Seite hat keine Client-Komponente mehr und ist damit gebaut wie die drei Seiten, die in
der CI 98 bis 99 stehen. Ob die 440 ms wirklich verschwinden, entscheidet der nächste CI-Lauf, und
das ist der Wert, der zählt.

### Gegenprobe, damit die Messung den Fehler sehen könnte

1. **Alle sieben Framework-Chunks blockiert** (`page.route("**/_next/static/chunks/**.js", abort)`):
   fünfmal Pfeil rechts auf dem ersten Schieber ergibt weiter 2.346 Stunden und 82.110 €. React
   startet in diesem Lauf nie. Die alte Fassung wäre hier tot gewesen. Das ist der eigentliche
   Beweis, nicht der Score.
2. **Ohne JavaScript** (`java_script_enabled=False`): 1.656 Stunden und 57.960 € stehen im HTML.
3. **Bedienung in echtem Chrome bei 390 px**: Tastatur (fünfmal Pfeil rechts, 12 wird 17, 2.346
   Stunden / 82.110 €), Tippen 50 / 2,5 / 60 (5.750 Stunden / 345.000 €, Schieber folgt auf 2.5),
   Eingabe 500 im ersten Feld wird sofort auf 200 begrenzt (23.000 Stunden / 1.380.000 €),
   Stundensatz 0 zeigt während des Tippens 0 € und springt beim Verlassen des Feldes auf die
   Untergrenze 15. Beide `aria-live`-Bereiche und der Satz über die 46 Arbeitswochen stehen
   unverändert. `page.on("console")` und `page.on("pageerror")`: keine einzige Meldung.
4. `npm run lint`, `npm test` (27 grün), `CHECK_STRICT`-freier `npm run check`, `npm run build`
   (13 Routen, 0 Warnungen).

### Was offen ist

1. **Der CI-Lauf ist der Beweis.** Lokal ist die Verbesserung nicht messbar, weil die Maschine zu
   schnell ist. Erst der Lighthouse-Job mit vierfacher Drosselung sagt, ob die Startseite jetzt
   bei den anderen Seiten liegt. Bis dahin ist die Zahl 440 ms unverändert der letzte gemessene
   Stand.
2. **Das Skript ist nicht getestet.** Vitest läuft ohne DOM, der Skripttext ist eine Zeichenkette
   in einer TSX-Datei. Geprüft wird er heute nur im Browser, von Hand. Wer das absichern will,
   braucht jsdom oder einen Playwright-Test in der CI.
3. **Die Zahl 46 steht jetzt in einem Attribut.** Wer `weeksPerYear` ändert, ändert Server-Text
   und Skript in einem Schritt, das ist beabsichtigt. Wer aber das Attribut aus dem Markup
   entfernt, bricht das Skript still: es findet die Wurzel nicht und tut nichts. Ein Test darauf
   fehlt.
