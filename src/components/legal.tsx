import type { ReactNode } from "react";

/**
 * Shared pieces of the two legal pages.
 *
 * The notice is deliberately loud. Both texts are a first draft written by a
 * developer, not by a lawyer, and nobody should mistake them for checked
 * boilerplate.
 */
export function DraftNotice() {
  return (
    <p className="mt-8 rounded-card border border-brand-ink bg-brand-soft px-5 py-4 font-semibold text-ink">
      Entwurf, vor Veröffentlichung prüfen. Dieser Text ist noch nicht
      anwaltlich geprüft und die Anschrift ist ein Platzhalter.
    </p>
  );
}

export function LegalBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
