import { values, valuesIntro } from "@/content/values";
import { Container, Eyebrow, Section } from "@/components/ui";

/**
 * Four values as running text, not as tiles.
 *
 * The live site lists eight values in eight identical boxes. Eight equal boxes
 * read as one grey block, so nothing is remembered. Four entries with a
 * hanging numeral read as a list somebody wrote on purpose.
 */
export function ValuesList() {
  return (
    <Section tone="paper-2">
      <Container>
        <Eyebrow>{valuesIntro.eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          {valuesIntro.title}
        </h2>

        <dl className="mt-10 grid gap-x-14 gap-y-9 sm:grid-cols-2">
          {values.map((value, index) => (
            <div key={value.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="shrink-0 text-2xl leading-none font-semibold text-brand"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <dt className="text-xl font-semibold">{value.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">
                  {value.text}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
