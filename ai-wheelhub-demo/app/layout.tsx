import type { Metadata } from "next";
import { Cormorant_Garamond, Rajdhani } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AXIS — AI-Crafted Wheel Hubs",
  description:
    "Bespoke wheel hubs sculpted by AI, refined by expert craftsmanship. Design your soul's wheels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${rajdhani.variable}`}>
      <body className="bg-charcoal text-silver overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
