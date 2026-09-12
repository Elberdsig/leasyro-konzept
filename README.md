# leasyro.com, neu gedacht

Das hier ist ein unverbindlicher Redesign-Entwurf für leasyro.com, gebaut von Elberd Sigauri als
Teil seiner Bewerbung auf die Stelle „Software Developer (m/w/d)" bei der leasyro GmbH. Es ist
nicht die offizielle Seite: die steht unter [leasyro.com](https://leasyro.com), und Marke, Logo,
Farben und Texte gehören der leasyro GmbH. Der Entwurf ist weder beauftragt noch autorisiert, für
Suchmaschinen vollständig gesperrt, und jede Seite trägt ein sichtbares Band, das genau das sagt.

Warum es ihn gibt, was sich geändert hat und was gemessen wurde, steht auf der Seite `/konzept`.
Die vollständige Spezifikation liegt in [`docs/KONZEPT.md`](docs/KONZEPT.md), der Baubericht in
[`docs/BAUBERICHT.md`](docs/BAUBERICHT.md).

## Lokal starten

```bash
npm install
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) im Browser öffnen.

Für einen Produktionslauf:

```bash
npm run build
npm run start
```

Die Umgebungsvariable `NEXT_PUBLIC_SITE_URL` setzt die Basisadresse für `metadataBase`, die
Sitemap und das Vorschaubild. Ohne sie fällt alles auf `http://localhost:3000` zurück. Es gibt
keine weiteren Umgebungsvariablen und keine Geheimnisse.

## Prüfen

```bash
npm run lint     # ESLint mit der Next-Konfiguration
npm run check    # Kontraste und Textregeln
npm run build    # muss ohne Warnung durchlaufen
```

`npm run check` besteht aus zwei Skripten:

- `scripts/check-contrast.mjs` liest die Farb-Tokens aus `src/app/globals.css` und rechnet jeden
  Kontrast nach, den ein Text auf dieser Seite treffen kann. Fließtext muss über 7:1 liegen,
  Labels über 4.5:1. Das Skript enthält eine Gegenprobe: ein absichtlich zu schwaches Paar muss
  durchfallen, sonst bricht die Prüfung ab. Eine grüne Messung, die den Fehler gar nicht sehen
  kann, ist keine Messung.
- `scripts/check-copy.mjs` sucht in `src/` nach Gedankenstrichen (— und –), die hier nirgends
  vorkommen dürfen. Mit `CHECK_STRICT=1` prüft es zusätzlich, ob in `src/content/` noch offene
  Platzhalter stehen (`[[MESSEN]]` für die noch nicht gemessenen Nachher-Werte, `[[ANSCHRIFT`
  für die Anschrift im Impressum). Vor einer Veröffentlichung muss dieser strenge Lauf grün sein.

## Stack

- Next.js 16 mit App Router und `src/`-Ordner, React 19, TypeScript strict
- Tailwind 4, alle Farben und Radien als Tokens in `src/app/globals.css`, sonst nirgends
- Nur Server Components. Kein einziges `"use client"`, kein eigener Client-Code. Das mobile Menü
  läuft über das Popover-API des Browsers.
- Poppins über `next/font/google`, zwei Schnitte (400 und 600), Subset Latin, lokal ausgeliefert
- `@phosphor-icons/react` über den SSR-Einstiegspunkt, acht verschiedene Icons
- Inhalte ausschließlich in `src/content/*.ts`, jede Tatsache mit Quelle und Datum im Kommentar
- JSON-LD für `Organization` auf der Startseite und `JobPosting` auf der Stellenseite
- Deploy über Vercel von `main`
