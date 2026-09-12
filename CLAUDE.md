# leasyro-konzept — Projekt-CLAUDE.md
*Stand: 12.09.2026 · Es gelten zusätzlich die globalen Arbeitsregeln in `~/.claude/CLAUDE.md`*

@AGENTS.md

## Was dieser Ordner ist
Ein **unverbindlicher Redesign-Entwurf für leasyro.com**, gebaut von Elberd Sigauri als Teil seiner
Bewerbung auf die Stelle „Software Developer (m/w/d)" bei der leasyro GmbH, Berlin. Kein
Auftrag von leasyro, keine offizielle Seite. Jede Seite trägt ein sichtbares Konzept-Band und ist
für Suchmaschinen gesperrt.

## Ziel
Mit dem Stack der Stellenanzeige (TypeScript, Next.js, GitHub, Vercel) zeigen, wie leasyro.com
messbar besser wird: weniger Übertragung, zwei statt 27 Schriftdateien, strukturierte Daten,
Klickziele 44 px, gemessene Kontraste. Spezifikation und Befund: `docs/KONZEPT.md`.

## Stack
- Next.js 16 (App Router, `src/`), React 19, TypeScript, Tailwind 4 (Tokens nur in `globals.css`)
- Poppins über `next/font/google`, zwei Schnitte, lokal ausgeliefert
- Nur Server Components. Mobiles Menü über das Popover-API. Kein eigener Client-Code.
- Inhalte in `src/content/*.ts`, jede Tatsache mit Quelle im Kommentar
- Deploy: Vercel, Projekt `leasyro-konzept`, von `main`

## Entscheidungen
| Datum | Entscheidung | Warum |
|---|---|---|
| 12.09.2026 | Markenerhalt statt neuer Optik | Der Gründer hat die Seite selbst gebaut. Eine fremde Optik wirkt als Angriff, eine saubere Fassung seiner Marke als Hilfe. |
| 12.09.2026 | Sichtbares Konzept-Band + noindex | Sonst wäre es die Nachahmung einer echten Firma. |
| 12.09.2026 | Kein Dark Mode, keine Sprachumschaltung, keine Formulare | Erst Substanz, dann Varianten. Formulare ohne Backend täuschen. |
| 12.09.2026 | Impressum/Datenschutz gehören Elberd | Betreiber des Entwurfs ist Elberd, nicht leasyro. |
| 12.09.2026 | Repo öffentlich | Erstes öffentliches Repo und Code-Nachweis für die Bewerbung. |

## Memory Map
- `memory/project-brief.md` — Ausgangslage, Stelle, Befund in Kurzform
- `memory/current-strategy.md` — Etappen bis zur Bewerbung
- `memory/decisions.md` — Entscheidungen mit Grund
- `memory/next-actions.md` — was nur Elberd erledigen kann
- `memory/bugs-and-risks.md` — offene Lücken und Risiken
- `memory/session-summaries.md` — was in welcher Sitzung entstand

## Referenzen
- Live-Seite: https://leasyro.com · Stelle: https://leasyro.com/karriere/software-developer
- Stellennotiz im Vault: `02 Projekte/Bewerbung/Jobs/2026-09-11 leasyro Software Developer.md`
- Vorher-Screenshots: `docs/vorher-desktop.png`, `docs/vorher-mobil.png`
- Vorlagen aus eigener Arbeit: `~/Code/ZurStruktur Objektservice GmbH/web` (Tokens, robots, content)

## Overrides
- **Keine erfundenen Tatsachen** über leasyro. Nur was auf leasyro.com, benboehm.com, humafix.com
  oder im Handelsregister steht.
- **Kein Gedankenstrich** (— oder –) in sichtbarem Text. `npm run check` bricht sonst ab.
- Texte und Commits auf Deutsch, Code-Kommentare auf Englisch.
