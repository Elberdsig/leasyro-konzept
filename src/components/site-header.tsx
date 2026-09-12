import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { externalLinks } from "@/content/company";
import { mainNav } from "@/content/site";
import { Button, Container } from "@/components/ui";

const MENU_ID = "hauptmenue";

/**
 * Header of the draft.
 *
 * The mobile menu is a native popover. `popovertarget` opens and closes it in
 * the browser itself, so the whole site ships without a single line of client
 * JavaScript and the menu still works if a script would have failed to load.
 * Every target in here is at least 44 px high and wide.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <Container className="flex h-[60px] items-center justify-between gap-4">
        <Link
          href="/"
          className="tap -ml-1 flex items-center rounded-btn px-1"
          aria-label="leasyro, Startseite des Entwurfs"
        >
          <Image
            src="/brand/logo-leasyro.png"
            alt="leasyro"
            width={132}
            height={37}
            priority
            className="h-[30px] w-auto sm:h-[34px]"
          />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap inline-flex items-center rounded-btn px-4 font-semibold text-ink transition-colors hover:text-brand-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={externalLinks.appointment}
            external
            className="px-4 py-2 text-sm max-sm:hidden"
          >
            Termin buchen
          </Button>

          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="show"
            className="tap inline-flex items-center justify-center rounded-btn border border-line text-ink transition-colors hover:border-brand-ink hover:text-brand-ink md:hidden"
            aria-label="Menü öffnen"
          >
            <List size={24} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <div
        id={MENU_ID}
        popover="auto"
        className="inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-paper p-0 text-ink"
      >
        <div className="flex h-[60px] items-center justify-between border-b border-line px-5">
          <span className="eyebrow text-ink-faint">Menü</span>
          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            className="tap -mr-2 inline-flex items-center justify-center rounded-btn text-ink transition-colors hover:text-brand-ink"
            aria-label="Menü schließen"
          >
            <X size={24} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navigation, mobil" className="px-5 py-4">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className="tap flex items-center py-4 text-lg font-semibold text-ink transition-colors hover:text-brand-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button
            href={externalLinks.appointment}
            external
            className="mt-6 w-full"
          >
            Termin buchen
          </Button>
        </nav>
      </div>
    </header>
  );
}
