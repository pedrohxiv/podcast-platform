import { useState } from "react";

import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  setAudioStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
  voicePrompt: string;
  voiceType: string | null;
}

export const useGeneratePodcast = ({
  setAudio,
  setAudioStorageId,
  voicePrompt,
  voiceType,
}: Props) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generatePodcast = async () => {
    setIsGenerating(true);

    setAudio("");

    if (!voicePrompt) {
      return setIsGenerating(false);
    }

    try {
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePodcast,
    isGenerating,
  };
};
