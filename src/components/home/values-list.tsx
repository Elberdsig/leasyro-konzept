import { values, valuesIntro } from "@/content/values";
import { Container, Section } from "@/components/ui";

/**
 * Four values as running text, not as tiles.
 *
 * The live site lists eight values in eight identical boxes. Eight equal boxes
 * read as one grey block, so nothing is remembered. Four entries with a thin
 * brand rule read as a list somebody wrote on purpose. No numerals: they were
 * decoration, and the dl must contain only dt/dd groups (axe: definition-list).
 */
export function ValuesList() {
  return (
    <Section tone="paper-2" className="reveal">
      <Container>
        <h2 className="max-w-2xl text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          {valuesIntro.title}
        </h2>

        <dl className="mt-10 grid gap-x-14 gap-y-9 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="border-l-2 border-brand pl-5">
              <dt className="text-xl font-semibold">{value.title}</dt>
              <dd className="mt-2 leading-relaxed text-ink-soft">
                {value.text}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
