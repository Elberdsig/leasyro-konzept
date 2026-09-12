import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { company, externalLinks } from "@/content/company";
import { Button, Container, Eyebrow } from "@/components/ui";

/**
 * Contact band.
 *
 * No form. A form without a backend is a promise nobody keeps, so the button
 * goes to the real appointment page of leasyro. Phone, mail and address come
 * from the imprint of the live site.
 * Source: https://leasyro.com/impressum, 12.09.2026.
 */
export function ContactBand() {
  return (
    <section className="reveal border-t border-line bg-brand-soft py-14 sm:py-16">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Eyebrow>Kontakt</Eyebrow>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            Ein Gespräch sagt mehr als ein Angebot
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Buch dir einen Termin oder ruf einfach an. Wir sagen dir ehrlich, ob
            wir die Richtigen sind.
          </p>
          <div className="mt-7">
            <Button href={externalLinks.appointment} external>
              Termin buchen
            </Button>
          </div>
        </div>

        <address className="not-italic">
          <ul className="space-y-1 text-ink-soft">
            <li>
              <a
                href={company.phoneHref}
                className="tap inline-flex items-center gap-3 py-2 text-ink transition-colors hover:text-brand-ink"
              >
                <Phone size={20} weight="bold" aria-hidden="true" className="text-brand-ink" />
                {company.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="tap inline-flex items-center gap-3 py-2 text-ink transition-colors hover:text-brand-ink"
              >
                <EnvelopeSimple size={20} weight="bold" aria-hidden="true" className="text-brand-ink" />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3 py-2">
              <MapPin size={20} weight="bold" aria-hidden="true" className="mt-0.5 text-brand-ink" />
              <span>
                {company.street}
                <br />
                {company.postalCode} {company.city}
              </span>
            </li>
          </ul>
        </address>
      </Container>
    </section>
  );
}
