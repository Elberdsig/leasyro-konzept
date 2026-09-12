/**
 * Elberd Sigauri, author and operator of this draft.
 *
 * The imprint and the privacy notice of this site belong to him, not to
 * leasyro. No postal address is printed: this is a private application draft
 * with no commercial purpose, so it is reachable by e-mail and the address is
 * given on request instead of being published. A marked placeholder would have
 * been worse than either option on a page a recruiter opens.
 */

export const author = {
  name: "Elberd Sigauri",
  role: "Bewerber auf die Stelle Software Developer (m/w/d)",
  email: "sigaurie@gmail.com",
  emailHref: "mailto:sigaurie@gmail.com",
  // No address in public. Private draft, no commercial use, reachable by e-mail.
  addressNote:
    "Privates Bewerbungsprojekt ohne geschäftlichen Zweck. Die Anschrift nenne ich auf Anfrage per E-Mail.",
  portfolio: "https://elberd-portfolio.sigaurie.workers.dev",
  portfolioLabel: "elberd-portfolio.sigaurie.workers.dev",
  cv: "https://elberd-cv.pages.dev",
  cvLabel: "elberd-cv.pages.dev",
  repo: "https://github.com/Elberdsig/leasyro-konzept",
  repoLabel: "github.com/Elberdsig/leasyro-konzept",
} as const;

/** Hosting of this draft. Needed for the privacy notice. */
export const hosting = {
  provider: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
  privacyUrl: "https://vercel.com/legal/privacy-policy",
} as const;
