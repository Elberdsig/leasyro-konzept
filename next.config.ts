import type { NextConfig } from "next";

/**
 * Response headers for every route.
 *
 * Four headers a static marketing site should always send, and they cost
 * nothing: no MIME sniffing, no referrer leaking a full URL to another origin,
 * no camera, microphone or location for a page that never asks, and no
 * framing of this draft inside somebody else's page.
 *
 * Deliberately no Content-Security-Policy. Next injects inline scripts for
 * hydration, so a useful CSP needs a per request nonce, which in turn makes
 * every route dynamic. That trade is wrong for a page whose only script is the
 * framework runtime. It is written here so the next reader does not think the
 * header was forgotten.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
