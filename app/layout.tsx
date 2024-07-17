import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcast Platform",
};

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <html>
      <body className={font.className}>{children}</body>
    </html>
  );
};

export default AppLayout;
