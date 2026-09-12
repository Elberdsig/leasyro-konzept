import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { externalLinks } from "@/content/company";
import { careersIntro, jobs } from "@/content/jobs";
import { Button, Container, Eyebrow, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Karriere",
  description:
    "Drei offene Stellen bei leasyro. Konzept-Entwurf, Bewerbungen laufen über leasyro.com.",
};

/**
 * Careers page.
 *
 * No application form. This is a draft, and a form without a backend would
 * swallow a real application. Every apply button goes to the careers page of
 * the live site.
 */
export default function KarrierePage() {
  return (
    <>
      <Section as="div" className="border-b border-line">
        <Container>
          <Eyebrow>{careersIntro.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            {careersIntro.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {careersIntro.lead}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <ul className="border-t border-line">
            {jobs.map((job) => (
              <li key={job.title} className="border-b border-line">
                {job.slug ? (
                  <Link
                    href={`/karriere/${job.slug}`}
                    className="group flex flex-col gap-4 py-7 transition-colors hover:bg-paper-2 sm:flex-row sm:items-center"
                  >
                    <JobText job={job} />
                    <ArrowRight
                      size={24}
                      weight="bold"
                      aria-hidden="true"
                      className="shrink-0 text-brand-ink"
                    />
                  </Link>
                ) : (
                  <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center">
                    <JobText job={job} />
                    <TextLink href={externalLinks.careers} external>
                      Zur Anzeige
                    </TextLink>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="border-t border-line bg-brand-soft py-14">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Nichts Passendes dabei?</h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              Initiativbewerbungen gehen den gleichen Weg wie alle anderen: über
              die offizielle Karriereseite.
            </p>
          </div>
          <Button href={externalLinks.careers} external>
            Jetzt bewerben
          </Button>
        </Container>
      </section>
    </>
  );
}

function JobText({ job }: { job: (typeof jobs)[number] }) {
  return (
    <div className="flex-1">
      <p className="eyebrow text-ink-faint">
        {job.area} · {job.employment}
      </p>
      <h2 className="mt-3 text-xl font-semibold transition-colors group-hover:text-brand-ink sm:text-2xl">
        {job.title}
      </h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
        {job.teaser}
      </p>
    </div>
  );
}
