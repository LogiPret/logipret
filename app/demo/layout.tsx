import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo - Watch LogiText in Action",
  description:
    "Watch the LogiText demo video and see how SMS automation can transform your real estate or mortgage business. Learn how to generate more leads with automated messaging.",
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "Demo - Watch LogiText in Action",
    description:
      "See how LogiText SMS automation works for real estate professionals.",
    url: "/demo",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
