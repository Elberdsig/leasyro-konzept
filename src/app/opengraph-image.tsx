import { ImageResponse } from "next/og";

/**
 * Preview image for links to this draft.
 *
 * It carries the word mark and, right underneath, the words "Konzept-Entwurf".
 * A preview that only showed the brand would look like the real site in a chat
 * window, which is exactly what must not happen.
 */

export const alt =
  "leasyro, Konzept-Entwurf von Elberd Sigauri, nicht die offizielle Seite";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#e7f0ff",
          padding: "96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#0a58ca",
          }}
        >
          leasyro
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: 64,
            fontWeight: 700,
            color: "#12172a",
          }}
        >
          Konzept-Entwurf
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 32,
            color: "#474f60",
          }}
        >
          Ein unverbindlicher Redesign-Entwurf von Elberd Sigauri.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: 32,
            color: "#474f60",
          }}
        >
          Die offizielle Seite ist leasyro.com
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            height: 8,
            width: 240,
            background: "#0d6efd",
          }}
        />
      </div>
    ),
    size,
  );
}
