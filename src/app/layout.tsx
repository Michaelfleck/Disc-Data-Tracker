import type { Metadata } from "next";
import {
  Archivo,
  Hanken_Grotesk,
  Spline_Sans_Mono,
  DM_Serif_Display,
} from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});
const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "CHAINS — Disc Golf Performance",
  description: "Analyze your disc golf game with UDisc export data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
