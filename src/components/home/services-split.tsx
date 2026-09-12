import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/content/services";
import { Container, Eyebrow, Section } from "@/components/ui";

/**
 * Services as a two column split: the claim stands on the left and stays put,
 * the four services are a plain list on the right. Each entry links to its
 * anchor on /leistungen, so the home page stays short.
 */
export function ServicesSplit() {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Leistungen</Eyebrow>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            Vier Wege, wie wir mit dir arbeiten
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Du entscheidest, wo wir einsteigen: bei der Analyse, beim Bauen,
            beim Betrieb oder bei der Schulung deines Teams.
          </p>
        </div>

        <ul className="border-t border-line">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={`/leistungen#${service.id}`}
                className="group flex items-start gap-5 border-b border-line py-6 transition-colors hover:bg-paper-2"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-brand-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">
                    {service.teaser}
                  </p>
                </div>
                <ArrowRight
                  size={22}
                  weight="bold"
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-brand-ink"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
