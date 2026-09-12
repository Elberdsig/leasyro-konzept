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
