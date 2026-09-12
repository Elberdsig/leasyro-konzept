import type { Metadata } from "next";
import { author } from "@/content/author";
import { company } from "@/content/company";
import { Container, Eyebrow, Section, TextLink } from "@/components/ui";
import { DraftNotice, LegalBlock } from "@/components/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum des Konzept-Entwurfs. Betreiber ist Elberd Sigauri, nicht die leasyro GmbH.",
};

/**
 * Imprint of the draft.
 *
 * The operator of this site is Elberd, not leasyro. Confusing the two would be
 * the one mistake that turns a respectful draft into an impersonation, so the
 * separation is stated twice: at the top and again under "Marke und Inhalte".
 */
export default function ImpressumPage() {
  return (
    <Section as="div">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Rechtliches</Eyebrow>
          <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
            Impressum
          </h1>

          <DraftNotice />

          <LegalBlock title="Anbieter dieser Seite">
            <p>{author.name}</p>
            <p>
              <TextLink href={author.emailHref} inline>{author.email}</TextLink>
            </p>
            <p>{author.addressNote}</p>
          </LegalBlock>

          <LegalBlock title="Verantwortlich für den Inhalt">
            <p>
              {author.name}. Diese Seite ist ein privates Bewerbungsprojekt
              ohne wirtschaftliches Interesse. Sie wirbt nicht, verkauft nichts
              und sammelt keine Daten.
            </p>
          </LegalBlock>

          <LegalBlock title="Marke und Inhalte">
            <p>
              Name, Logo, Farben und Texte stammen von der {company.name},{" "}
              {company.street}, {company.postalCode} {company.city},
              eingetragen beim {company.registerCourt} unter{" "}
              {company.registerNumber}, vertreten durch{" "}
              {company.managingDirector}. Die Rechte daran liegen bei der{" "}
              {company.name}.
            </p>
            <p>
              Dieser Entwurf ist weder beauftragt noch autorisiert. Die
              offizielle Seite ist{" "}
              <TextLink href={company.website} external inline>
                leasyro.com
              </TextLink>
              . Auf Wunsch der {company.name} nehme ich diesen Entwurf
              umgehend offline.
            </p>
          </LegalBlock>

          <LegalBlock title="Haftung für Links">
            <p>
              Diese Seite verlinkt auf externe Angebote. Für deren Inhalte sind
              ausschließlich deren Betreiber verantwortlich. Zum Zeitpunkt der
              Verlinkung am 12.09.2026 waren keine Rechtsverstöße erkennbar.
            </p>
          </LegalBlock>

          <LegalBlock title="Urheberrecht">
            <p>
              Der Quellcode dieses Entwurfs stammt von {author.name} und liegt
              öffentlich unter{" "}
              <TextLink href={author.repo} external inline>
                {author.repoLabel}
              </TextLink>
              . Er steht unter keiner Lizenz, die eine Nutzung der Marke
              leasyro erlaubt.
            </p>
          </LegalBlock>
        </div>
      </Container>
    </Section>
  );
}
