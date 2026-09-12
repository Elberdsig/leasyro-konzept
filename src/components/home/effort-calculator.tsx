"use client";

import { useState, type ReactNode } from "react";
import { calculator, calculatorFields, weeksPerYear } from "@/content/calculator";

/**
 * The one interactive section of this draft: what manual administration costs
 * per year. Everything else on the site is a server component, and this file
 * is the only one in src/ that carries the client directive.
 *
 * Three decisions worth knowing:
 *
 * 1. No import from @/components/ui. Every named export in that file lives in
 *    one module together with next/link and a Phosphor icon, so importing even
 *    the Container from here would drag both into the client bundle. The two
 *    class strings are repeated instead, and the appointment button arrives as
 *    a ready made element through the `cta` prop, rendered on the server by
 *    the page. The client bundle of this section is therefore this file, React
 *    and nothing else.
 *
 * 2. The numbers are formatted with Intl.NumberFormat("de-DE"), the same call
 *    on the server and in the browser. German grouping of an integer is stable
 *    across ICU versions, so the first HTML and the first client render agree
 *    and there is no hydration mismatch. The euro sign is appended by hand
 *    with a non breaking space: the currency style of Intl has changed its
 *    space character between ICU versions, and that difference would show up
 *    as exactly such a mismatch.
 *
 * 3. useState is seeded with the values from the content file, so the server
 *    already renders a complete result. Without JavaScript the section still
 *    shows a filled in example calculation instead of three dead sliders.
 */

/** Deterministic on both sides: grouping only, no fraction digits. */
const zahl = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });

/** Non breaking space, so "57.960 €" never breaks across two lines. */
function euro(value: number): string {
  return `${zahl.format(value)} €`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function EffortCalculator({ cta }: { cta: ReactNode }) {
  const [people, setPeople] = useState(calculatorFields.people.start);
  const [hours, setHours] = useState(calculatorFields.hours.start);
  const [rate, setRate] = useState(calculatorFields.rate.start);

  // Rounded once, then used for both numbers, so the two figures on screen
  // really are hours times rate. With a typed 3.3 hours an unrounded value
  // would print 1.822 hours next to a sum computed from 1.821,6.
  const hoursPerYear = Math.round(people * hours * weeksPerYear);
  const costPerYear = Math.round(hoursPerYear * rate);

  return (
    <section className="reveal border-y border-line bg-brand-soft py-12 sm:py-20">
      <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-ink">{calculator.eyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            {calculator.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {calculator.lead}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-14">
          <div className="rounded-card border border-line bg-paper p-6 sm:p-8">
            <h3 className="eyebrow text-ink-faint">{calculator.formLabel}</h3>
            <div className="mt-6 flex flex-col gap-7">
              <Field
                field={calculatorFields.people}
                value={people}
                onChange={setPeople}
              />
              <Field
                field={calculatorFields.hours}
                value={hours}
                onChange={setHours}
              />
              <Field
                field={calculatorFields.rate}
                value={rate}
                onChange={setRate}
              />
            </div>
          </div>

          <div className="rounded-card border border-brand-ink bg-paper p-6 sm:p-8">
            <h3 className="eyebrow text-ink-faint">{calculator.resultTitle}</h3>

            <div aria-live="polite" className="mt-6">
              <p className="font-semibold text-ink-soft">
                {calculator.hoursLabel}
              </p>
              <p className="mt-1 text-3xl leading-none font-semibold tabular-nums text-ink sm:text-4xl">
                {zahl.format(hoursPerYear)}{" "}
                <span className="text-xl font-normal text-ink-soft sm:text-2xl">
                  {calculator.hoursUnit}
                </span>
              </p>
            </div>

            <div aria-live="polite" className="mt-7">
              <p className="font-semibold text-ink-soft">
                {calculator.costLabel}
              </p>
              <p className="mt-1 text-4xl leading-none font-semibold tabular-nums text-brand-ink sm:text-5xl">
                {euro(costPerYear)}
              </p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink-faint">
              {calculator.assumption}
            </p>

            <p className="mt-6 leading-relaxed text-ink-soft">
              {calculator.note}
            </p>

            <div className="mt-7">{cta}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One input, twice: a slider for dragging and a number field for typing.
 *
 * The visible label belongs to the number field and the slider points at the
 * same label through aria-labelledby, so both controls announce the same name
 * without a second label on screen.
 *
 * Typing clamps only against the upper bound, so a half typed number never
 * jumps. The lower bound is applied when the field loses focus, which keeps
 * the calculation valid without fighting the keyboard.
 */
function Field({
  field,
  value,
  onChange,
}: {
  field: (typeof calculatorFields)["people"];
  value: number;
  onChange: (next: number) => void;
}) {
  const labelId = `${field.id}-label`;
  const numberId = `${field.id}-zahl`;
  const hintId = `${field.id}-hinweis`;

  function read(raw: string, min: number): number {
    const parsed = Number(raw.replace(",", "."));
    return Number.isFinite(parsed) ? clamp(parsed, min, field.max) : field.start;
  }

  return (
    <div>
      <label
        id={labelId}
        htmlFor={numberId}
        className="block font-semibold text-ink"
      >
        {field.label}
      </label>

      <div className="mt-3 flex items-center gap-4">
        <input
          type="range"
          className="slider min-w-0 flex-1"
          aria-labelledby={labelId}
          aria-describedby={hintId}
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(event) => onChange(read(event.target.value, field.min))}
        />
        <input
          type="number"
          id={numberId}
          name={field.id}
          className="w-24 shrink-0 rounded-btn border border-line bg-paper px-3 py-2.5 text-right text-lg font-semibold tabular-nums text-ink transition-colors hover:border-brand-ink"
          aria-describedby={hintId}
          autoComplete="off"
          // Whole numbers get the plain number pad, halves the one with a
          // separator.
          inputMode={field.step % 1 === 0 ? "numeric" : "decimal"}
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(event) => onChange(read(event.target.value, 0))}
          onBlur={() => onChange(clamp(value, field.min, field.max))}
        />
      </div>

      <p id={hintId} className="mt-2 text-sm text-ink-faint">
        {field.hint}
      </p>
    </div>
  );
}
