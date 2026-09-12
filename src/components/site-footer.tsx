import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { author } from "@/content/author";
import { company } from "@/content/company";
import { legalNav, mainNav } from "@/content/site";
import { worlds } from "@/content/worlds";
import { Container } from "@/components/ui";

/**
 * Footer.
 *
 * Three columns, then one line that separates the brand from the author of
 * this draft. No social icons: the live site links Instagram, Facebook and
 * LinkedIn, but those URLs were not verified, and an icon that leads nowhere
 * is worse than no icon.
 */
export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo-leasyro.png"
              alt="leasyro"
              width={132}
              height={37}
              className="h-[30px] w-auto brightness-0 invert"
            />
            <address className="mt-5 space-y-2 text-sm not-italic text-brand-soft">
              <p className="flex items-start gap-2">
                <MapPin
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="mt-1 shrink-0"
                />
                <span>
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                </span>
              </p>
              <p>
                <a
                  href={company.phoneHref}
                  className="tap inline-flex items-center gap-2 py-2 text-brand-soft underline underline-offset-4 transition-colors hover:text-white"
                >
                  <Phone size={16} weight="bold" aria-hidden="true" />
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="tap inline-flex items-center gap-2 py-2 text-brand-soft underline underline-offset-4 transition-colors hover:text-white"
                >
                  <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
                  {company.email}
                </a>
              </p>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:contents">
            <FooterColumn title="Bereiche">
              {worlds.map((world) => (
                <li key={world.id}>
                  <FooterLink href={world.href} external>
                    {world.name}
                  </FooterLink>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Seiten">
              <li>
                <FooterLink href="/">Startseite</FooterLink>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Rechtliches">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href={author.repo} external>
                  Quellcode
                </FooterLink>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 border-t border-white/30 pt-6 text-sm text-brand-soft">
          <p>
            © 2026 {company.name} für Marke und Inhalte. Entwurf und Umsetzung:{" "}
            {author.name}.
          </p>
          <p className="mt-2">
            Diese Seite ist ein unverbindlicher Entwurf und nicht die offizielle
            Seite. Die offizielle Seite ist{" "}
            <a
              href={company.website}
              className="tap inline-flex items-center py-2.5 font-semibold text-white underline underline-offset-4"
            >
              leasyro.com
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="eyebrow text-brand-soft">{title}</h2>
      <ul className="mt-4 flex flex-col">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const classes =
    "tap inline-flex items-center gap-1 py-2 text-white transition-colors hover:text-brand-soft hover:underline hover:underline-offset-4";

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
