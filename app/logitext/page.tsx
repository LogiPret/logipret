import type { Metadata } from "next";
import { LogitextContent } from "@/components/logitext/LogitextContent";

export const metadata: Metadata = {
  title: "LogiText - SMS Automation for Real Estate Brokers",
  description:
    "LogiText is an intelligent SMS automation platform for real estate and mortgage brokers. Generate leads, engage clients, and close more deals with automated text messaging.",
  keywords: [
    "LogiText",
    "SMS automation",
    "real estate SMS",
    "mortgage broker texting",
    "lead generation",
    "client engagement",
    "automated messaging",
  ],
  alternates: {
    canonical: "/logitext",
  },
  openGraph: {
    title: "LogiText - SMS Automation for Real Estate Brokers",
    description:
      "Generate leads and engage clients with intelligent SMS automation designed for real estate professionals.",
    url: "/logitext",
  },
};

export default function LogitextPage() {
  return <LogitextContent />;
}
