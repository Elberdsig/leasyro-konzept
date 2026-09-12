import type { ReactNode } from "react";

/**
 * Shared pieces of the two legal pages.
 *
 * The notice is deliberately visible. Both texts were written by a developer,
 * not by a lawyer, and nobody should mistake them for checked boilerplate.
 * It no longer mentions a placeholder address: none is printed any more.
 */
export function DraftNotice() {
  return (
    <p className="mt-8 rounded-card border border-brand-ink bg-brand-soft px-5 py-4 font-semibold text-ink">
      Dieser Text ist von mir selbst geschrieben und nicht anwaltlich geprüft.
      Er gehört zu einem privaten Bewerbungsprojekt, nicht zur leasyro GmbH.
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
