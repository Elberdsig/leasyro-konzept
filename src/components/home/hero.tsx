import { externalLinks } from "@/content/company";
import { Button, Container, Eyebrow } from "@/components/ui";

/**
 * Hero.
 *
 * No image, no tiles, no animation. The h1 is plain text in the first HTML the
 * browser receives, so it is readable the moment the page paints.
 *
 * The joke of the live site ("Ob Software oder Unterwäsche") is good, but it
 * does not answer the question a managing director arrives with. It survives
 * as the line above the headline; the headline itself names the benefit.
 * Source of the joke: https://leasyro.com, 12.09.2026.
 */
export function Hero() {
  return (
    <section className="border-b border-line bg-paper py-14 sm:py-24">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow>Ob Software oder Unterwäsche</Eyebrow>

        {/* max-w-5xl, not 4xl: at 4xl the headline broke into three lines on a
            1440 px desktop. Measured 12.09.2026. */}
        <h1 className="mt-5 max-w-5xl text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl lg:text-6xl">
          Software, die zu deinem Betrieb passt. Nicht umgekehrt.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Wir sehen uns deine Abläufe an, bauen die passende Anwendung und
          bleiben nach dem Start an deiner Seite.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={externalLinks.appointment} external>
            Termin buchen
          </Button>
          <Button href="/leistungen" variant="secondary">
            Leistungen ansehen
          </Button>
        </div>
      </Container>
    </section>
  );
}
