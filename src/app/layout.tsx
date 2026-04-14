import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const sourceSans3 = Source_Sans_3({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Special Surprise 💜",
  description: "A heartfelt experience crafted with love, just for you.",
  keywords: ["love", "romantic", "special", "surprise", "experience"],
  authors: [{ name: "Joshua Muasya" }],
  creator: "Joshua Muasya",
  openGraph: {
    title: "A Special Surprise 💜",
    description: "A heartfelt experience crafted with love, just for you.",
    type: "website",
    images: [
      {
        url: "/emma.jpeg",
        width: 800,
        height: 600,
        alt: "A special moment",
      },
    ],
  },
  themeColor: "#6A0DAD", // your purple vibe
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", sourceSans3.variable, playfairDisplayHeading.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
