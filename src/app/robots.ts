import type { MetadataRoute } from "next";

/**
 * Nothing here is ever crawled.
 *
 * This site carries somebody else's brand. If a search engine indexed it, a
 * customer could land on a draft while looking for leasyro. The block is
 * absolute and has no exception, and every page additionally sends
 * `noindex, nofollow` through the metadata in the root layout.
 *
 * There is no sitemap reference on purpose: a sitemap that invites a crawler
 * would work against the rule above. The sitemap route exists for a human
 * reviewer, see src/app/sitemap.ts.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
