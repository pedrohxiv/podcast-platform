import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import "@/styles/globals.css";

const font = Inter({ subsets: ["latin"] });

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
      <body className={font.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
};

export default AppLayout;
