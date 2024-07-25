"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface Audio {
  audioUrl: string;
  author: string;
  imageUrl: string;
  podcastId: string;
  title: string;
}

interface Context {
  audio: Audio | undefined;
  setAudio: React.Dispatch<React.SetStateAction<Audio | undefined>>;
}

interface Props {
  children: React.ReactNode;
}

const AudioContext = createContext<Context | undefined>(undefined);

export const AudioProvider = ({ children }: Props) => {
  const [audio, setAudio] = useState<Audio | undefined>();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/create-podcast") {
      setAudio(undefined);
    }
  }, [pathname]);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }

  return context;
};
