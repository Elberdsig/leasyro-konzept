import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The small set of building blocks every page uses.
 *
 * All of these are server components. Nothing in this file reaches for state,
 * effects or the browser, and nothing animates on load. Transitions exist only
 * on hover and focus, where they cannot hide content from a reader.
 */

/** One content width for the whole site, so nothing drifts between pages. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[72rem] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

type Tone = "paper" | "paper-2" | "navy" | "brand-soft";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  navy: "bg-navy text-white",
  "brand-soft": "bg-brand-soft text-ink",
};

/** A page section with one vertical rhythm and one of four grounds. */
export function Section({
  children,
  tone = "paper",
  id,
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag
      id={id}
      className={`${toneClass[tone]} py-12 sm:py-20 ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Small label above a headline. Never the only carrier of meaning. */
export function Eyebrow({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "faint" | "light";
}) {
  const color =
    tone === "brand"
      ? "text-brand-ink"
      : tone === "light"
        ? "text-white/80"
        : "text-ink-faint";
  return <p className={`eyebrow ${color}`}>{children}</p>;
}

/** Section headline plus optional lead, used by most sections. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  eyebrowTone,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  eyebrowTone?: "brand" | "faint" | "light";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

const buttonBase =
  "tap inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3 text-base font-semibold whitespace-nowrap transition-colors";

const buttonVariant = {
  primary: "bg-brand-ink text-white hover:bg-navy",
  secondary: "border border-line bg-paper text-ink hover:border-brand-ink hover:text-brand-ink",
  onDark: "bg-white text-navy hover:bg-brand-soft",
} as const;

/**
 * Button that is always a link. There is no form on this site, so there is no
 * reason for a <button> anywhere outside the mobile menu.
 */
export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariant;
  external?: boolean;
  className?: string;
}) {
  const classes = `${buttonBase} ${buttonVariant[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
        <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight size={18} weight="bold" aria-hidden="true" />
    </Link>
  );
}

/**
 * Text link.
 *
 * By default it is a standalone control and keeps a 44 px tall touch target
 * through its padding. `inline` turns that off for a link that sits inside a
 * sentence, where extra padding would push the surrounding lines apart.
 * WCAG 2.5.8 exempts exactly that case ("the target is in a sentence").
 */
export function TextLink({
  href,
  children,
  external = false,
  inline = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  inline?: boolean;
  className?: string;
}) {
  const target = inline ? "" : "min-h-[44px] py-2.5";
  const classes = `inline-flex items-center gap-1 font-semibold text-brand-ink underline underline-offset-4 transition-colors hover:text-navy ${target} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
