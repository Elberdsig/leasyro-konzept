import type { Metadata } from "next";
import { author, hosting } from "@/content/author";
import { Container, Eyebrow, Section, TextLink } from "@/components/ui";
import { DraftNotice, LegalBlock } from "@/components/legal";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Diese Seite setzt keine Cookies, misst nichts und hat keine Formulare.",
};

/**
 * Privacy notice.
 *
 * Short, because the site really does almost nothing: no cookies, no
 * analytics, no embeds, no forms, no fonts loaded from a third party. What
 * remains are the server logs of the host.
 */
export default function DatenschutzPage() {
  return (
    <Section as="div">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Rechtliches</Eyebrow>
          <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
            Datenschutz
          </h1>

          <DraftNotice />

          <LegalBlock title="Kurz gesagt">
            <p>
              Diese Seite setzt keine Cookies, misst nichts, bindet nichts von
              Dritten ein und hat kein Formular. Die Schriftart wird von diesem
              Server ausgeliefert, nicht von Google. Es gibt also nichts, dem du
              zustimmen müsstest.
            </p>
          </LegalBlock>

          <LegalBlock title="Verantwortlich">
            <p>{author.name}</p>
            <p>{author.address}</p>
            <p>
              <TextLink href={author.emailHref} inline>{author.email}</TextLink>
            </p>
          </LegalBlock>

          <LegalBlock title="Server-Protokolle beim Hosting">
            <p>
              Gehostet wird bei {hosting.provider}, {hosting.address}. Beim
              Aufruf einer Seite verarbeitet der Anbieter technisch notwendige
              Daten: IP-Adresse, Zeitpunkt, aufgerufene Adresse, übertragene
              Datenmenge, Browser und Betriebssystem.
            </p>
            <p>
              Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO. Das
              berechtigte Interesse ist der sichere und stabile Betrieb der
              Seite. Diese Daten werden nicht mit anderen Quellen
              zusammengeführt und nicht für Werbung verwendet.
            </p>
            <p>
              Datenschutzerklärung des Hosters:{" "}
              <TextLink href={hosting.privacyUrl} external inline>
                vercel.com/legal/privacy-policy
              </TextLink>
            </p>
          </LegalBlock>

          <LegalBlock title="Was diese Seite nicht tut">
            <p>
              Kein Tracking, keine Analytics, keine Werbenetzwerke, keine
              Social-Media-Einbettungen, keine Karten, keine Videos, kein
              Newsletter, kein Konto, keine Zahlung.
            </p>
          </LegalBlock>

          <LegalBlock title="Externe Links">
            <p>
              Von hier führen Links zu leasyro.com, benboehm.com, humafix.com,
              lenamariah.com und GitHub. Sobald du einem Link folgst, gilt die
              Datenschutzerklärung der jeweiligen Seite.
            </p>
          </LegalBlock>

          <LegalBlock title="Deine Rechte">
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit und
              Widerspruch. Schreib mir dafür einfach eine E-Mail an{" "}
              <TextLink href={author.emailHref} inline>{author.email}</TextLink>.
            </p>
            <p>
              Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde
              beschweren. Zuständig ist die Behörde deines Wohnorts.
            </p>
          </LegalBlock>
        </div>
      </Container>
    </Section>
  );
}
