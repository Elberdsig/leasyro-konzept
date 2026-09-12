import Image from "next/image";
import { worlds } from "@/content/worlds";
import { Container, Section, SectionHead, TextLink } from "@/components/ui";

/**
 * The three areas, in three different sizes.
 *
 * The live site shows three identical image-and-text blocks, which tells a
 * visitor nothing about where to start. Here Benjamin Böhm takes the largest
 * cell because that is the area a mittelstand customer arrives for, Humafix
 * follows, and Lena Mariah gets a slim row of its own. Same three areas, same
 * claims, different weight.
 */
export function WorldsBento() {
  const [benboehm, humafix, lena] = worlds;

  return (
    <Section tone="paper-2">
      <Container>
        <SectionHead
          eyebrow="Drei Bereiche"
          title="Ein Unternehmen, drei Arten von Arbeit"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          <WorldCard world={benboehm} size="gross" className="md:col-span-3" />
          <WorldCard world={humafix} size="mittel" className="md:col-span-2" />
          <WorldCard world={lena} size="zeile" className="md:col-span-5" />
        </div>
      </Container>
    </Section>
  );
}

type CardProps = {
  world: (typeof worlds)[number];
  size: "gross" | "mittel" | "zeile";
  className?: string;
};

function WorldCard({ world, size, className = "" }: CardProps) {
  const frame =
    "relative flex overflow-hidden rounded-card border border-line bg-paper";

  // The accent rule is the only place the area colours appear. They are never
  // used for text, so they never need to clear a contrast threshold.
  const accentRule = (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[3px]"
      style={{ background: world.accent }}
    />
  );

  if (size === "zeile") {
    return (
      <article className={`${frame} flex-col gap-4 p-6 sm:flex-row sm:items-center ${className}`}>
        {accentRule}
        <Image
          src={world.icon}
          alt={world.iconAlt}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {world.name}
            <span className="font-normal text-ink-faint"> · {world.claim}</span>
          </h3>
          <p className="mt-1 text-ink-soft">{world.vision}</p>
        </div>
        <TextLink href={world.href} external className="shrink-0">
          {world.linkLabel}
        </TextLink>
      </article>
    );
  }

  const large = size === "gross";

  return (
    <article className={`${frame} flex-col ${large ? "p-6 sm:p-8" : "p-6"} ${className}`}>
      {accentRule}
      <Image
        src={world.icon}
        alt={world.iconAlt}
        width={large ? 64 : 52}
        height={large ? 64 : 52}
        className={large ? "h-16 w-16" : "h-13 w-13"}
      />
      <h3 className={`mt-5 font-semibold ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
        {world.name}
      </h3>
      <p className={`mt-2 font-semibold text-brand-ink ${large ? "text-lg" : "text-base"}`}>
        {world.claim}
      </p>
      {/* Only the large cell carries the longer text. The two smaller ones
          stop after the vision: the home page introduces the three areas, the
          areas explain themselves on their own sites. */}
      <p className={`mt-4 leading-relaxed text-ink-soft ${large ? "text-lg" : ""}`}>
        {world.vision}
      </p>
      {large ? (
        <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{world.text}</p>
      ) : null}
      <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-4">
        <TextLink href={world.href} external>
          {world.linkLabel}
        </TextLink>
        {world.appointmentHref ? (
          <TextLink href={world.appointmentHref} external>
            Termin buchen
          </TextLink>
        ) : null}
      </div>
    </article>
  );
}
