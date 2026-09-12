# Sitzungen

## 12.09.2026, ab 12:04 — Befund, Konzept, Aufbau
Live-Seite gemessen (Desktop und iPhone-Größe, Playwright mit System-Chrome): 2,46 MB
Übertragung, 27 Schriftdateien, kein JSON-LD, `lang="de_DE"`, Klickziele 32 bis 36 px.
Konzept mit Markenerhalt beschlossen, Elberd hat um 12:12 das Go gegeben. Repo angelegt,
Spezifikation in `docs/KONZEPT.md`, Markenassets in `public/brand/`.

## 12.09.2026, 12:30 bis 13:10 — Bau, Messung, Deploy
Opus hat nach der Spec gebaut (Baubericht `docs/BAUBERICHT.md`). Hauptsitzung: Werteliste ohne
Nummern (axe `definition-list`), Eyebrows auf der Startseite von sieben auf zwei reduziert,
Nachher-Werte mit demselben Skript wie die Vorher-Messung gemessen und in `src/content/concept.ts`
eingetragen. Lighthouse mobil 99/100/100/66 (SEO-Abzug = noindex, absichtlich), Live-Seite zum
Vergleich 71/89/96/100. Deploy: `vercel deploy --prod` (Projekt `leasyro-konzept`, Team elberd),
live unter https://leasyro-konzept.vercel.app, dreimal HTTP 200, robots `Disallow: /`.
GitHub-Repo konnte nicht angelegt werden (Auto-Modus blockiert Veröffentlichung), Elberd macht das.
