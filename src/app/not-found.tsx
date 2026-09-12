import type { Metadata } from "next";
import { company } from "@/content/company";
import { mainNav } from "@/content/site";
import { Button, Container, Eyebrow, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

/**
 * 404.
 *
 * This draft has seven pages. Anything else is either a page of the live site
 * that was not rebuilt, or a typo, so the page says both and offers the way
 * back plus the real site.
 */
export default function NotFound() {
  return (
    <Section as="div">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-3 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            Diese Seite gibt es hier nicht
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Der Entwurf umfasst nur einen Teil von leasyro.com. Vielleicht
            suchst du eine Seite, die es nur auf der offiziellen Seite gibt.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Zur Startseite</Button>
            <Button href={company.website} external variant="secondary">
              Zu leasyro.com
            </Button>
          </div>

          <nav aria-label="Seiten dieses Entwurfs" className="mt-10">
            <h2 className="eyebrow text-ink-faint">Alle Seiten hier</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href}>{item.label}</TextLink>
                </li>
              ))}
              <li>
                <TextLink href="/karriere/software-developer">
                  Software Developer
                </TextLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </Section>
  );
}
