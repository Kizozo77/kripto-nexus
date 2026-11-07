import "./globals.css";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata = {
  title: "KRIPTO-NEXUS | Enterprise Cryptography Suite",
  description: "Platform eksplorasi 4 kategori dan 12 algoritma kriptografi modern kelompok 3.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${mono.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
