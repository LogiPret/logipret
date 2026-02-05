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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://logipret.com";

export const viewport: Viewport = {
  themeColor: "#0055FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Logipret | Marketing & Software Solutions for Real Estate Brokers",
    template: "%s | Logipret",
  },
  description:
    "Lead generation and software solutions for Canadian real estate and mortgage brokers. Boost your business with LogiText SMS automation.",
  keywords: [
    "real estate software",
    "mortgage broker solutions",
    "lead generation",
    "SMS marketing",
    "Canadian real estate",
    "LogiText",
    "broker automation",
    "real estate marketing",
  ],
  authors: [{ name: "Logipret" }],
  creator: "Logipret",
  publisher: "Logipret",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: "fr_CA",
    url: siteUrl,
    siteName: "Logipret",
    title: "Logipret | Marketing & Software Solutions for Real Estate Brokers",
    description:
      "Lead generation and software solutions for Canadian real estate and mortgage brokers. Boost your business with LogiText SMS automation.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Logipret Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logipret | Marketing & Software Solutions for Real Estate Brokers",
    description:
      "Lead generation and software solutions for Canadian real estate and mortgage brokers.",
    images: ["/logo.png"],
    creator: "@logipret",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
  },
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
