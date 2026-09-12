import { quotes } from "@/content/quotes";
import { Container, Eyebrow, Section } from "@/components/ui";

/**
 * The two real customer quotes, set as typography.
 *
 * No cards, no stars, no stock photos. The live site has exactly two quotes,
 * so this draft shows exactly two. A rating that nobody gave is not shown.
 */
export function QuotesSection() {
  return (
    <Section tone="navy">
      <Container>
        <Eyebrow tone="light">Kundenstimmen</Eyebrow>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          {quotes.map((quote) => (
            <figure key={quote.author}>
              <blockquote className="text-2xl leading-snug font-semibold text-balance sm:text-3xl">
                <p>
                  <span aria-hidden="true">„</span>
                  {quote.text}
                  <span aria-hidden="true">“</span>
                </p>
              </blockquote>
              <figcaption className="mt-5 text-brand-soft">
                {quote.author}, {quote.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
