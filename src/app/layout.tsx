import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/site-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SimRacing.gg",
    template: "%s | SimRacing.gg",
  },
  description:
    "News-first sim racing media platform with competitive data and editorial coverage.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
