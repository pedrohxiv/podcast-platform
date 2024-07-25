import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { ConvexClerkProvider } from "@/components/providers/convex-clerk-provider";
import "@/styles/globals.css";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcast Platform",
  description: "Generate your podcasts using AI",
  icons: { icon: "/icons/logo.svg" },
};

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <html>
      <ConvexClerkProvider>
        <body className={font.className}>{children}</body>
      </ConvexClerkProvider>
    </html>
  );
};

export default AppLayout;
