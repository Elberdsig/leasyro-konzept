import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

// Node environment only. The pages carry no client code worth mounting, so the
// suite checks content, links, tokens and the contrast maths, not the DOM.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
