import type { Metadata } from "next";
import { DM_Serif_Text, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookHouse - Discover Shelves That Feel Like You",
  description: "A curated book discovery platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSerifText.variable} ${playfairDisplay.variable} bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
