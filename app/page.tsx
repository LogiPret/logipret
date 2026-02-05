import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Logipret offers lead generation and software solutions for Canadian real estate and mortgage brokers. Discover LogiText SMS automation and boost your business.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Logipret | Marketing & Software Solutions for Real Estate Brokers",
    description:
      "Lead generation and software solutions for Canadian real estate and mortgage brokers.",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
