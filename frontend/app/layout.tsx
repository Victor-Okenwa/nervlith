import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/components/language/language-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutProvider } from "./layoutProvider";

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nervlith (formally Mint Gate) — CKB-Native DAO launcher",
  description:
    "Nervlith (formally Mint Gate). Build · Govern · Belong. A CKB-native DAO launcher that replaces a centralized forum with cells the chain can verify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <TooltipProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
