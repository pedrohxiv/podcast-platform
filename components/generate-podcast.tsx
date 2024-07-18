"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Id } from "@/convex/_generated/dataModel";
import { useGeneratePodcast } from "@/hooks/use-generate-podcast";

interface Props {
  audio: string;
  isSubmitting: boolean;
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  setAudioDuration: React.Dispatch<React.SetStateAction<number>>;
  setAudioStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
  setVoicePrompt: React.Dispatch<React.SetStateAction<string>>;
  voicePrompt: string;
  voiceType: string | null;
}

export const GeneratePodcast = ({
  audio,
  isSubmitting,
  setAudio,
  setAudioDuration,
  setAudioStorageId,
  setVoicePrompt,
  voicePrompt,
  voiceType,
}: Props) => {
  const { generatePodcast, isGenerating } = useGeneratePodcast({
    setAudio,
    setAudioStorageId,
    voicePrompt,
    voiceType,
  });

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class focus-visible:ring-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={voicePrompt}
          onChange={(e) => setVoicePrompt(e.target.value)}
          disabled={isSubmitting || isGenerating}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 py-4 font-bold text-white-1 transition-all duration-500 hover:opacity-80 focus-visible:ring-orange-1"
          disabled={isSubmitting || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-5 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {audio && (
        <audio
          controls
          src={audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  );
};
