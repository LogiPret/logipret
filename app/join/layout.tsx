import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Logipret - Start Your Free Trial",
  description:
    "Join Logipret and start generating more leads for your real estate or mortgage business. Get personalized insights and see your potential revenue growth.",
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: "Join Logipret - Start Your Free Trial",
    description:
      "Calculate your potential revenue and join thousands of brokers using Logipret.",
    url: "/join",
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
