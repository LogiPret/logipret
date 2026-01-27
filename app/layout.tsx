import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  themeColor: "#0055FF",
};

export const metadata: Metadata = {
  title: "Logipret | Solutions Marketing & Logiciels Immobiliers",
  description:
    "Generation de leads et solutions logicielles pour les courtiers canadiens.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0055FF] via-[#0033AA] to-[#001133] min-h-screen text-white selection:bg-white selection:text-brand-blue">
        {children}
      </body>
    </html>
  );
}
