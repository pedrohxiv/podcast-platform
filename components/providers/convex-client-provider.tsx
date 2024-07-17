"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface Props {
  children: React.ReactNode;
}

export const ConvexClientProvider = ({ children }: Props) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};
