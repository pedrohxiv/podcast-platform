import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  setAudioStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
  voicePrompt: string;
  voiceType: string;
}

export const useGeneratePodcast = ({
  setAudio,
  setAudioStorageId,
  voicePrompt,
  voiceType,
}: Props) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const { startUpload } = useUploadFiles(generateUploadUrl);
  const { toast } = useToast();

  const generatePodcast = async () => {
    setIsGenerating(true);

    setAudio("");

    if (!voicePrompt) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please provide a voiceType to generate a podcast.",
      });

      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });

      const filename = `podcast-${uuid()}.mp3`;

      const file = new File([blob], filename, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);

      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });

      setAudio(audioUrl!);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with creating a podcast.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePodcast,
    isGenerating,
  };
};
