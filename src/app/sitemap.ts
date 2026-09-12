import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * All seven routes of the draft.
 *
 * robots.txt blocks every crawler, so this file is not a bid for a search
 * result. It is here because a reviewer should see that the route is built
 * correctly, and because the moment a site does want to be indexed, the file
 * is already right.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1 },
    { path: "/leistungen", priority: 0.9 },
    { path: "/karriere", priority: 0.9 },
    { path: "/karriere/software-developer", priority: 0.8 },
    { path: "/konzept", priority: 0.8 },
    { path: "/impressum", priority: 0.2 },
    { path: "/datenschutz", priority: 0.2 },
  ] as const;

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
