import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #18181b 0%, #09090b 100%)",
          borderRadius: "8px",
          border: "1.5px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: "900",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.5px",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.9)",
          }}
        >
          K
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
