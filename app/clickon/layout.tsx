import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClickOn",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClickonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
