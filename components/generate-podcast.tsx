"use client";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { voiceCategories } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  audio: string;
  isSubmitting: boolean;
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  setAudioDuration: React.Dispatch<React.SetStateAction<number>>;
  setAudioStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
  setVoicePrompt: React.Dispatch<React.SetStateAction<string>>;
  setVoiceType: React.Dispatch<React.SetStateAction<string | null>>;
  voicePrompt: string;
  voiceType: string;
}

export const GeneratePodcast = ({
  audio,
  isSubmitting,
  setAudio,
  setAudioDuration,
  setAudioStorageId,
  setVoicePrompt,
  setVoiceType,
  voicePrompt,
  voiceType,
}: Props) => {
  const [isAiPodcast, setIsAiPodcast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generatePodcast = useAction(api.openai.generateAudioAction);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const audioRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadFiles(generateUploadUrl);
  const { toast } = useToast();

  const handleAudio = async (blob: Blob, filename: string) => {
    setAudio("");

    try {
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
        description: "There was a problem with creating podcast.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAudio = async () => {
    setIsLoading(true);

    try {
      const response = await generatePodcast({
        voice: voiceType,
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });

      handleAudio(blob, `podcast-${uuid()}.mp3`);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with generating podcast.",
      });

      setIsLoading(false);
    }
  };

  const uploadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const files = e.target.files;

      if (!files) {
        return;
      }

      const file = files[0];

      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      setVoiceType("owner");

      handleAudio(blob, file.name);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with uploading audio.",
      });

      setIsLoading(false);
    } finally {
    }
  };

  return (
    <>
      <div className="generate_div">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiPodcast(true)}
          className={cn({ "bg-black-6": isAiPodcast })}
          disabled={isSubmitting || isLoading}
        >
          Use AI to generate podcast
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiPodcast(false)}
          className={cn({ "bg-black-6": !isAiPodcast })}
          disabled={isSubmitting || isLoading}
        >
          Upload custom audio
        </Button>
      </div>
      {isAiPodcast ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              Select AI Voice
            </Label>
            <Select onValueChange={(value) => setVoiceType(value)}>
              <SelectTrigger
                className="text-16 w-full border-none bg-black-1 text-gray-1 focus:ring-orange-1"
                disabled={isSubmitting || isLoading}
              >
                <SelectValue
                  placeholder="Select AI Voice"
                  className="placeholder:text-gray-1"
                />
              </SelectTrigger>
              <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                {voiceCategories.map((category) => (
                  <SelectItem
                    key={category}
                    className="capitalize focus:bg-orange-1 cursor-pointer"
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
              {voiceType && (
                <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
              )}
            </Select>
          </div>
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
              disabled={isSubmitting || isLoading}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              type="submit"
              onClick={generateAudio}
              className="text-16 bg-orange-1 py-4 font-bold text-white-1 transition-all duration-500 hover:opacity-80 focus-visible:ring-orange-1"
              disabled={!voiceType || !voicePrompt || isSubmitting || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn("image_div cursor-pointer", {
            "cursor-not-allowed opacity-50": isSubmitting || isLoading,
          })}
          onClick={() => audioRef.current?.click()}
        >
          <Input
            type="file"
            accept="audio/*"
            className="hidden"
            ref={audioRef}
            onChange={(e) => uploadAudio(e)}
            disabled={isSubmitting || isLoading}
          />
          {!isLoading ? (
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/icons/upload-image.svg"
                height={40}
                width={40}
                alt="upload"
              />
              <h2 className="text-12 font-bold text-orange-1">
                Click to Upload
              </h2>
              <p className="text-12 font-normal text-gray-1">
                MP3, WAV, OGG (max. 10MB)
              </p>
            </div>
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              <Loader2 className="size-5 animate-spin mr-2" />
              Uploading...
            </div>
          )}
        </div>
      )}
      {audio && (
        <div className="relative flex-center w-full mt-5 group">
          <audio
            controls
            src={audio}
            autoPlay
            className="mt-5"
            onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
          />
          <Button
            variant="outline"
            type="button"
            className="absolute p-2 top-0.5 ml-[280px] hidden group-hover:block bg-white-1 rounded-full border-none"
            onClick={() => setAudio("")}
            disabled={isSubmitting || isLoading}
          >
            <X className="size-5 text-orange-1" />
          </Button>
        </div>
      )}
    </>
  );
};
