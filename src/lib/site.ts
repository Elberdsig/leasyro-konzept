/**
 * One place that knows where this draft lives.
 *
 * Vercel sets NEXT_PUBLIC_SITE_URL in the project settings. Without it every
 * absolute URL (metadataBase, sitemap, JSON-LD) falls back to localhost, which
 * is exactly what a local build should produce.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

/** Absolute URL for a path inside this draft. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
