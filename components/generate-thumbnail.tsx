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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface Props {
  isSubmitting: boolean;
  image: string;
  imagePrompt: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setImagePrompt: React.Dispatch<React.SetStateAction<string>>;
  setImageStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
}

export const GenerateThumbnail = ({
  isSubmitting,
  image,
  imagePrompt,
  setImage,
  setImagePrompt,
  setImageStorageId,
}: Props) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateThumbnail = useAction(api.openai.generateImageAction);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);

  const imageRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadFiles(generateUploadUrl);
  const { toast } = useToast();

  const handleImage = async (blob: Blob, filename: string) => {
    setImage("");

    try {
      const file = new File([blob], filename, { type: "image/png" });

      const uploaded = await startUpload([file]);

      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });

      setImage(imageUrl!);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with creating thumbnail.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async () => {
    setIsLoading(true);

    try {
      const response = await generateThumbnail({ prompt: imagePrompt });

      const blob = new Blob([response], { type: "image/png" });

      handleImage(blob, `thumbnail-${uuid()}.png`);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with generating thumbnail.",
      });

      setIsLoading(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const files = e.target.files;

      if (!files) {
        return;
      }

      const file = files[0];

      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with uploading image.",
      });

      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="generate_div">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn({ "bg-black-6": isAiThumbnail })}
          disabled={isSubmitting || isLoading}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn({ "bg-black-6": !isAiThumbnail })}
          disabled={isSubmitting || isLoading}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              className="input-class focus-visible:ring-orange-1"
              placeholder="Provide text to generate thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              disabled={isSubmitting || isLoading}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              type="submit"
              onClick={generateImage}
              className="text-16 bg-orange-1 py-4 font-bold text-white-1 transition-all duration-500 hover:opacity-80 focus-visible:ring-orange-1"
              disabled={!imagePrompt || isSubmitting || isLoading}
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
          onClick={() => imageRef.current?.click()}
        >
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
            disabled={isSubmitting || isLoading}
          />
          {!isLoading ? (
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/icons/upload-image.svg"
                height={40}
                width={40}
                alt="upload"
                className="h-auto w-auto"
              />
              <h2 className="text-12 font-bold text-orange-1">
                Click to Upload
              </h2>
              <p className="text-12 font-normal text-gray-1">
                SVG, PNG, JPG or GIF (max. 1080x1080px)
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
      {image && (
        <div className="relative flex-center w-full mt-5 group">
          <Image src={image} height={200} width={200} alt="thumbnail" />
          <Button
            variant="outline"
            type="button"
            className="absolute p-2 top-0.5 ml-[160px] hidden group-hover:block bg-white-1 rounded-full border-none"
            onClick={() => setImage("")}
            disabled={isSubmitting || isLoading}
          >
            <X className="size-5 text-orange-1" />
          </Button>
        </div>
      )}
    </>
  );
};
