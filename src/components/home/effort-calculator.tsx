import type { ReactNode } from "react";
import { calculator, calculatorFields, weeksPerYear } from "@/content/calculator";

/**
 * What manual administration costs per year. The one interactive section of
 * this draft, and it carries no client directive: the markup including the
 * first result is rendered on the server, and a small script without any
 * dependency wires the three controls afterwards. There is no React component
 * in the browser for this section, so nothing about it has to hydrate.
 *
 * Four decisions worth knowing:
 *
 * 1. No import from @/components/ui. Every named export in that file lives in
 *    one module together with next/link and a Phosphor icon. The two class
 *    strings are repeated instead, and the appointment button arrives as a
 *    ready made element through the `cta` prop, rendered on the server by the
 *    page.
 *
 * 2. The numbers are formatted with Intl.NumberFormat("de-DE"), the same call
 *    on the server and in the script. German grouping of an integer is stable
 *    across ICU versions, so the first HTML and the first update agree. The
 *    euro sign is appended by hand with a non breaking space: the currency
 *    style of Intl has changed its space character between ICU versions, and
 *    that difference would show up as a jump on the first drag.
 *
 * 3. The server renders the values from the content file, so the section shows
 *    a filled in example calculation even without JavaScript, instead of three
 *    dead sliders.
 *
 * 4. The script reads everything it needs from the DOM: the working weeks from
 *    `data-rechner` on the section, the bounds from the min and max attributes
 *    of each slider. No number is written twice, so the content file stays the
 *    single source.
 */

/** Deterministic in both places: grouping only, no fraction digits. */
const zahl = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });

/**
 * Non breaking space, so "57.960 €" never breaks across two lines, and
 * written as an escape so the same character is certain to be in both places:
 * the previous version had a plain space here while the comment claimed a
 * protected one, and the script would then have replaced the space silently on
 * the first drag.
 */
function euro(value: number): string {
  return `${zahl.format(value)}\u00a0€`;
}

/**
 * The interaction, as plain JavaScript. Kept small on purpose: it finds the
 * section, wires slider and number field of every row in both directions,
 * clamps against the attributes already in the markup and rewrites the two
 * results. Typing clamps only against the upper bound, so a half typed number
 * never jumps; the lower bound is applied when the field loses focus, which
 * keeps the calculation valid without fighting the keyboard.
 */
const rechnerSkript = `
(function () {
  var w = document.querySelector("[data-rechner]");
  if (!w) return;
  var wochen = +w.getAttribute("data-rechner");
  var nf = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
  var std = w.querySelector("[data-ergebnis=stunden]");
  var kosten = w.querySelector("[data-ergebnis=kosten]");
  var f = [];
  function zeige() {
    var h = Math.round(f[0].v * f[1].v * wochen);
    std.textContent = nf.format(h);
    kosten.textContent = nf.format(Math.round(h * f[2].v)) + "\\u00a0\\u20ac";
  }
  Array.prototype.forEach.call(w.querySelectorAll("[data-feld]"), function (e) {
    var s = e.querySelector("input[type=range]");
    var n = e.querySelector("input[type=number]");
    var d = { v: +s.value, min: +s.min, max: +s.max };
    f.push(d);
    s.addEventListener("input", function () {
      d.v = +s.value;
      n.value = s.value;
      zeige();
    });
    n.addEventListener("input", function () {
      if (n.value === "") return;
      var r = Number(n.value.replace(",", "."));
      if (!isFinite(r)) return;
      if (r > d.max) {
        r = d.max;
        n.value = r;
      }
      d.v = r;
      s.value = r;
      zeige();
    });
    n.addEventListener("blur", function () {
      d.v = Math.min(d.max, Math.max(d.min, d.v));
      n.value = d.v;
      s.value = d.v;
      zeige();
    });
  });
})();
`;

export function EffortCalculator({ cta }: { cta: ReactNode }) {
  const people = calculatorFields.people.start;
  const hours = calculatorFields.hours.start;
  const rate = calculatorFields.rate.start;

  // Rounded once, then used for both numbers, so the two figures on screen
  // really are hours times rate. With a typed 3.3 hours an unrounded value
  // would print 1.822 hours next to a sum computed from 1.821,6. The script
  // rounds in the same order.
  const hoursPerYear = Math.round(people * hours * weeksPerYear);
  const costPerYear = Math.round(hoursPerYear * rate);

  return (
    <section
      data-rechner={weeksPerYear}
      className="reveal border-y border-line bg-brand-soft py-12 sm:py-20"
    >
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
              <Field field={calculatorFields.people} />
              <Field field={calculatorFields.hours} />
              <Field field={calculatorFields.rate} />
            </div>
          </div>

          <div className="rounded-card border border-brand-ink bg-paper p-6 sm:p-8">
            <h3 className="eyebrow text-ink-faint">{calculator.resultTitle}</h3>

            <div aria-live="polite" className="mt-6">
              <p className="font-semibold text-ink-soft">
                {calculator.hoursLabel}
              </p>
              <p className="mt-1 text-3xl leading-none font-semibold tabular-nums text-ink sm:text-4xl">
                <span data-ergebnis="stunden">{zahl.format(hoursPerYear)}</span>{" "}
                <span className="text-xl font-normal text-ink-soft sm:text-2xl">
                  {calculator.hoursUnit}
                </span>
              </p>
            </div>

            <div aria-live="polite" className="mt-7">
              <p className="font-semibold text-ink-soft">
                {calculator.costLabel}
              </p>
              <p
                data-ergebnis="kosten"
                className="mt-1 text-4xl leading-none font-semibold tabular-nums text-brand-ink sm:text-5xl"
              >
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

      {/*
        Plain script element, last inside the section, so every control it
        wires already exists when it runs. Measured alternative: the same code
        in <Script id="rechner" strategy="afterInteractive"> from next/script.
        That module carries the client directive itself, renders null on the
        server and injects the script in an effect, so the page would keep a
        client boundary and the calculator would only start working after React
        has hydrated. The numbers of both variants are in docs/BAUBERICHT.md.
      */}
      <script id="rechner" dangerouslySetInnerHTML={{ __html: rechnerSkript }} />
    </section>
  );
}

/**
 * One input, twice: a slider for dragging and a number field for typing.
 *
 * The visible label belongs to the number field and the slider points at the
 * same label through aria-labelledby, so both controls announce the same name
 * without a second label on screen. `data-feld` is what the script looks for.
 */
function Field({ field }: { field: (typeof calculatorFields)["people"] }) {
  const labelId = `${field.id}-label`;
  const numberId = `${field.id}-zahl`;
  const hintId = `${field.id}-hinweis`;

  return (
    <div data-feld={field.id}>
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
          defaultValue={field.start}
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
          defaultValue={field.start}
        />
      </div>

      <p id={hintId} className="mt-2 text-sm text-ink-faint">
        {field.hint}
      </p>
    </div>
  );
}
