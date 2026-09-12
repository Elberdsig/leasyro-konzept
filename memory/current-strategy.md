# Aktuelle Strategie
*Stand: 12.09.2026, 19:40*

## Ein Satz für Menschen
Alles ist fertig und geprüft: Entwurf live, Repo öffentlich, Impressum ohne Platzhalter, Texte
geschrieben. Es fehlt nur noch, dass Elberd die Konzept-Seite liest und die Bewerbung abschickt.

## Etappen
| Etappe | Fertig, wenn |
|---|---|
| 1. Repo und Spezifikation | ✅ 12.09., öffentlich seit 17:32 |
| 2. Bau | ✅ 12.09., zweiter Durchgang 19:30 (Rechner, Bewegung, Tests, CI, Audit) |
| 3. Text | ✅ Seite und Anschreiben (zwei Varianten) |
| 4. Messung | ✅ 12.09., Werte auf `/konzept` und in KONZEPT.md Abschnitt 11 |
| 5. Live | ✅ 12.09., zuletzt 17:40 neu deployt, alle Routen HTTP 200 |
| 6. Bewerbung | **offen: Elberd schickt ab** |

## Live-Werte, zuletzt selbst gemessen (12.09.2026, 17:30)
Lighthouse mobil gegen die veröffentlichte Seite: Performance 100, Barrierefreiheit 100,
Best Practices 100, SEO 66 (einziger Abzug ist die absichtliche noindex-Sperre).
Largest Contentful Paint 0,9 s. Übertragung 240 KB gegen 2,5 MB bei leasyro.com.

## Wenn leasyro sich meldet
Die Seite nennt in Impressum und Fußzeile ausdrücklich: „Auf Wunsch der leasyro GmbH nehme ich
diesen Entwurf umgehend offline." Das gilt. Abschalten geht über das Vercel-Projekt
`leasyro-konzept` (Team elberd), das Repo kann dabei privat gestellt werden.
