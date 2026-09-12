/**
 * Elberd Sigauri, author and operator of this draft.
 *
 * The imprint and the privacy notice of this site belong to him, not to
 * leasyro. The postal address is a marked placeholder: an imprint needs a real
 * address, and Elberd fills that in himself before anything goes public.
 * `npm run check` with CHECK_STRICT=1 refuses to pass while the marker is here.
 */

export const author = {
  name: "Elberd Sigauri",
  role: "Bewerber auf die Stelle Software Developer (m/w/d)",
  email: "sigaurie@gmail.com",
  emailHref: "mailto:sigaurie@gmail.com",
  // Placeholder on purpose. Elberd enters the real address before publishing.
  address: "[[ANSCHRIFT: trägt Elberd ein]]",
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
