import { story } from "@/content/quotes";
import { Container, Section, TextLink } from "@/components/ui";

/**
 * The founding story, one paragraph, no photo.
 * Source: https://leasyro.com, 12.09.2026.
 */
export function Story() {
  return (
    <Section className="reveal">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            {story.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
            {story.text}
          </p>
          <div className="mt-8 border-l-2 border-brand pl-5">
            <p className="eyebrow text-ink-faint">{story.founderLabel}</p>
            <p className="mt-2">
              <TextLink href={story.founderHref} external>
                {story.founderName}
              </TextLink>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
