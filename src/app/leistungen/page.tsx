import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { externalLinks } from "@/content/company";
import { services, servicesIntro } from "@/content/services";
import { Button, Container, Eyebrow, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Softwareentwicklung, Wartung und Betrieb, Schulungen und Humafix. Konzept-Entwurf für leasyro.com.",
  alternates: { canonical: "/leistungen" },
};

/**
 * Services page.
 *
 * A jump list on top, then the four sections alternating between full text and
 * a two column split, so the page never reads as four identical blocks. The
 * anchor ids match the links from the home page.
 */
export default function LeistungenPage() {
  return (
    <>
      <Section as="div" className="border-b border-line">
        <Container>
          <Eyebrow>{servicesIntro.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            {servicesIntro.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {servicesIntro.lead}
          </p>

          <nav aria-label="Sprung zu einer Leistung" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="tap inline-flex items-center rounded-pill border border-line bg-paper px-4 font-semibold text-ink transition-colors hover:border-brand-ink hover:text-brand-ink"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {services.map((service, index) => {
        const split = index % 2 === 1;
        return (
          <Section
            key={service.id}
            id={service.id}
            tone={split ? "paper-2" : "paper"}
            className="reveal scroll-mt-28"
          >
            <Container>
              <div
                className={
                  split
                    ? "grid gap-10 lg:grid-cols-2 lg:gap-16"
                    : "max-w-3xl"
                }
              >
                <div>
                  {/* No "01" .. "04" above these headings. The number carried
                      no information: the jump navigation above already names
                      all four, and the order is not a sequence to follow. */}
                  <h2 className="text-2xl leading-tight font-semibold text-balance sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                    {service.text}
                  </p>
                </div>

                <div className={split ? "" : "mt-8"}>
                  <h3 className="eyebrow text-ink-faint">
                    {service.pointsLabel}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <Check
                          size={20}
                          weight="bold"
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-brand-ink"
                        />
                        <span className="text-ink-soft">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7">
                    <TextLink href={externalLinks.appointment} external>
                      Termin buchen
                    </TextLink>
                  </p>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <section className="reveal border-t border-line bg-brand-soft py-14">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-balance">
              Passt eine davon zu dir?
            </h2>
            <p className="mt-2 text-ink-soft">
              Im ersten Gespräch klären wir, was du wirklich brauchst.
            </p>
          </div>
          <Button href={externalLinks.appointment} external>
            Termin buchen
          </Button>
        </Container>
      </section>
    </>
  );
}
