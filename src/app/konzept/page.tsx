import type { Metadata } from "next";
import { Check, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { author } from "@/content/author";
import {
  aboutElberd,
  changes,
  comparison,
  comparisonNote,
  conceptIntro,
  kept,
  omitted,
  stack,
} from "@/content/concept";
import { Container, Eyebrow, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Das Konzept",
  description:
    "Warum es diesen Entwurf gibt, was sich geändert hat und was gemessen wurde. Von Elberd Sigauri.",
};

/**
 * The page this whole repository exists for.
 *
 * Written in the first person. The tone is "this is how I would build it",
 * never "your site is bad". The founder built the live site himself, and that
 * deserves respect, not a teardown.
 */
export default function KonzeptPage() {
  return (
    <>
      <Section as="div" className="border-b border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{conceptIntro.eyebrow}</Eyebrow>
            <h1 className="mt-3 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              {conceptIntro.title}
            </h1>
            {conceptIntro.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-5 text-lg leading-relaxed text-ink-soft"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Vorher und nachher
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">{comparisonNote}</p>

          <div className="mt-8 overflow-x-auto rounded-card border border-line bg-paper">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <caption className="sr-only">
                Messwerte der heutigen Seite und dieses Entwurfs im Vergleich
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Messwert
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    leasyro.com heute
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Dieser Entwurf
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.metric} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="px-5 py-4 align-top font-normal text-ink"
                    >
                      {row.metric}
                    </th>
                    <td className="px-5 py-4 align-top text-ink-soft">
                      {row.before}
                    </td>
                    <td className="px-5 py-4 align-top font-semibold text-brand-ink">
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Was ich geändert habe
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
            {changes.map((change) => (
              <div key={change.title}>
                <dt className="text-lg font-semibold">{change.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">
                  {change.text}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Was gleich geblieben ist
              </h2>
              <ul className="mt-6 space-y-3">
                {kept.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={20}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-brand-ink"
                    />
                    <span className="leading-relaxed text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Was ich bewusst weggelassen habe
              </h2>
              <dl className="mt-6 space-y-5">
                {omitted.map((item) => (
                  <div key={item.title}>
                    <dt className="font-semibold">{item.title}</dt>
                    <dd className="mt-1 leading-relaxed text-ink-soft">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Stack und Arbeitsweise
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Genau der Stack aus eurer Stellenanzeige. Der Quellcode liegt
                öffentlich auf GitHub, jeder Schritt ist im Verlauf nachlesbar.
              </p>
              <p className="mt-5">
                <TextLink href={author.repo} external>
                  {author.repoLabel}
                </TextLink>
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="rounded-card border border-line bg-paper-2 px-4 py-3 text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="light">{aboutElberd.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-2xl leading-tight font-semibold text-balance sm:text-3xl">
              {aboutElberd.title}
            </h2>
            {aboutElberd.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-5 text-lg leading-relaxed text-brand-soft"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={author.portfolio}
                className="tap inline-flex items-center py-2 font-semibold text-white underline underline-offset-4 transition-colors hover:text-brand-soft"
              >
                Portfolio
              </a>
              <a
                href={author.cv}
                className="tap inline-flex items-center py-2 font-semibold text-white underline underline-offset-4 transition-colors hover:text-brand-soft"
              >
                Lebenslauf
              </a>
              <a
                href={author.repo}
                className="tap inline-flex items-center py-2 font-semibold text-white underline underline-offset-4 transition-colors hover:text-brand-soft"
              >
                Quellcode
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <section className="border-t border-line bg-brand-soft py-14">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Kontakt</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Schreib mir
            </h2>
            <p className="mt-3 text-ink-soft">{aboutElberd.contactLead}</p>
            <p className="mt-6">
              <a
                href={author.emailHref}
                className="tap inline-flex items-center gap-3 rounded-btn bg-brand-ink px-5 py-3 font-semibold text-white transition-colors hover:bg-navy"
              >
                <EnvelopeSimple size={20} weight="bold" aria-hidden="true" />
                {author.email}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
