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

## 12.09.2026, 17:28 bis 17:50 — abschickfertig gemacht
Elberd wollte abschicken. Vorher drei Dinge selbst geprüft und erledigt: (1) GitHub-Repo
angelegt und gepusht, öffentlich, der Link „Quellcode" auf der Seite war bis dahin ein 404.
(2) Der Platzhalter `[[ANSCHRIFT: trägt Elberd ein]]` stand **sichtbar live** auf
`/impressum`. Gelöst ohne Elberds Anschrift: E-Mail als Kontakt plus ein ehrlicher Satz, damit
`CHECK_STRICT=1` grün läuft und kein Personaler einen unfertigen Kasten sieht. (3) Anzeige
gegengeprüft: „Software Developer" steht unter den drei offenen Stellen, nicht unter den vier
inaktiven. Danach neu deployt, Lighthouse gegen die Live-Seite: 100/100/100/66, LCP 0,9 s.
Anschreiben auf die Live-Zahlen gebracht (rund 2,5 MB statt 2,46, Lighthouse ergänzt).
Zählung verschickte Bewerbungen weiterhin **0**, das entscheidet Elberd.

## 12.09.2026, 17:55 bis 19:40 — zweiter Durchgang auf Elberds Wunsch („alles verbessern, eigene Idee")
Vorab skills.sh (meistinstallierter Design-Skill: Vercels web-design-guidelines, ins Repo unter
`docs/web-interface-guidelines.md`) und awwwards gesichtet; von dort nur übernommen, was zur
B2B-Zielgruppe passt (Typohierarchie, Weißraum, sparsame, begründete Bewegung), nicht die
Agentur-Effekte. Drei Agenten parallel mit disjunkten Dateilisten: Opus A (Rechner, Bewegung,
Konzept-Sektionen, Audit mit 16 Befunden), Opus B (27 Vitest-Tests, GitHub Actions mit Lighthouse,
README), Sonnet (fünf Ideen, Zeitleiste, Prüfungen). Zwei echte Fehler nur durch Messung gefunden:
(1) Einblendung mit Deckkraft ließ vier Kontrast-Audits durchfallen, jetzt nur noch Hub;
(2) die CI zeigte 440 ms Blockierzeit durch die React-Hydration des Rechners, Umbau auf
Server-Komponente plus 1.355-Byte-Skript, kein `"use client"` mehr. Lighthouse-CI auf Median aus
drei Läufen, Performance-Schwelle 0,90 (Runner-Varianz 85 bis 99 gemessen). Live geprüft.
