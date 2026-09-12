import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { conceptBanner } from "@/content/site";
import { Container } from "@/components/ui";

/**
 * The band above the header, on every page.
 *
 * It says in one line that this is a draft and where the real site is. It has
 * no close button on purpose: a visitor who lands here from a link must be
 * able to see at any moment that this is not leasyro.com. Without JavaScript
 * there is also nothing that could fail to render it.
 */
export function ConceptBanner() {
  return (
    <div className="border-b border-line bg-brand-soft text-ink">
      <Container className="flex flex-wrap items-center justify-center gap-x-2 text-center text-sm">
        <span>{conceptBanner.text}</span>
        <a
          href={conceptBanner.officialHref}
          className="tap inline-flex items-center justify-center gap-1 py-3 font-semibold text-brand-ink underline underline-offset-4 transition-colors hover:text-navy"
        >
          {conceptBanner.officialLabel}
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </a>
        <span aria-hidden="true" className="text-ink-faint">
          ·
        </span>
        <Link
          href={conceptBanner.moreHref}
          className="tap inline-flex items-center justify-center py-3 font-semibold text-brand-ink underline underline-offset-4 transition-colors hover:text-navy"
        >
          {conceptBanner.moreLabel}
        </Link>
      </Container>
    </div>
  );
}
