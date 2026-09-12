import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/json-ld";
import { company, externalLinks } from "@/content/company";
import { developerJob } from "@/content/jobs";
import { Button, Container, Eyebrow, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: developerJob.title,
  description:
    "Softwareentwicklung mit TypeScript, Next.js und React Native bei leasyro in Berlin. Konzept-Entwurf der Stellenseite.",
};

/**
 * The full developer posting, plus the JobPosting markup the live site is
 * missing. Without that markup a posting does not appear in Google for Jobs,
 * which is the single biggest free reach a small company gives away.
 *
 * No salary is stated on the live site, so baseSalary is absent here. An
 * invented number would be the worst possible kind of wrong.
 * Source: https://leasyro.com/karriere/software-developer, 12.09.2026.
 */
const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: developerJob.title,
  description: [
    developerJob.intro,
    developerJob.introSecond,
    `Aufgaben: ${developerJob.tasks.join(". ")}.`,
    `Qualifikation: ${developerJob.requirements.join(". ")}.`,
  ].join(" "),
  datePosted: developerJob.datePosted,
  employmentType: ["FULL_TIME", "PART_TIME"],
  hiringOrganization: {
    "@type": "Organization",
    name: company.name,
    sameAs: company.website,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: company.country,
    },
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Deutschland",
  },
  directApply: false,
  industry: "Softwareentwicklung",
  inLanguage: "de",
};

export default function SoftwareDeveloperPage() {
  return (
    <>
      <JsonLd data={jobPostingJsonLd} />

      <Section as="div" className="border-b border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>
              {developerJob.area} · {developerJob.employment}
            </Eyebrow>
            <h1 className="mt-3 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              {developerJob.title}
            </h1>
            <p className="mt-5 text-ink-faint">
              {developerJob.location} · veröffentlicht am 12.12.2025 ·
              aktualisiert am 26.08.2026
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {developerJob.intro}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {developerJob.introSecond}
            </p>
            <div className="mt-8">
              <Button href={externalLinks.careers} external>
                Jetzt bewerben
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Deine Aufgaben
              </h2>
              <ul className="mt-6 space-y-3">
                {developerJob.tasks.map((task) => (
                  <ListItem key={task}>{task}</ListItem>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Das bringst du mit
              </h2>
              <ul className="mt-6 space-y-3">
                {developerJob.requirements.map((requirement) => (
                  <ListItem key={requirement}>{requirement}</ListItem>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Das bekommst du
          </h2>
          <div className="mt-8 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {developerJob.benefitGroups.map((group) => (
              <div key={group.title}>
                <h3 className="eyebrow text-ink-faint">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {developerJob.application.title}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              {developerJob.application.lead}
            </p>
            <ul className="mt-6 space-y-3">
              {developerJob.application.items.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={externalLinks.careers} external>
                Jetzt bewerben
              </Button>
              <p className="text-ink-soft">
                Die Bewerbung läuft über{" "}
                <TextLink href={externalLinks.careers} external inline>
                  leasyro.com/karriere
                </TextLink>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Check
        size={20}
        weight="bold"
        aria-hidden="true"
        className="mt-1 shrink-0 text-brand-ink"
      />
      <span className="leading-relaxed text-ink-soft">{children}</span>
    </li>
  );
}
