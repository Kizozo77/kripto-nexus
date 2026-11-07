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
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #4338ca 100%)",
          borderRadius: "8px",
          border: "1.5px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "0 2px 6px rgba(37, 99, 235, 0.4)",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: "900",
            fontFamily: "sans-serif",
            letterSpacing: "-1px",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
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
