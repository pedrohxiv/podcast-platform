"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GeneratePodcast } from "@/components/generate-podcast";
import { GenerateThumbnail } from "@/components/generate-thumbnail";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Id } from "@/convex/_generated/dataModel";
import { createPodcastSchema } from "@/lib/validations";

const CreatePodcastPage = () => {
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [voicePrompt, setVoicePrompt] = useState<string>("");
  const [voiceType, setVoiceType] = useState<string | null>(null);

  const form = useForm<z.infer<typeof createPodcastSchema>>({
    resolver: zodResolver(createPodcastSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof createPodcastSchema>) {
    console.log(values);
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="Give your podcast a name"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="Write a short podcast description"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-2">
            <GeneratePodcast
              audio={audioUrl}
              setAudio={setAudioUrl}
              setAudioDuration={setAudioDuration}
              setAudioStorageId={setAudioStorageId}
              setVoicePrompt={setVoicePrompt}
              setVoiceType={setVoiceType}
              voicePrompt={voicePrompt}
              voiceType={voiceType!}
              isSubmitting={isSubmitting}
            />
            <GenerateThumbnail
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImage={setImageUrl}
              setImagePrompt={setImagePrompt}
              setImageStorageId={setImageStorageId}
              isSubmitting={isSubmitting}
            />
            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:opacity-80 focus-visible:ring-orange-1"
                disabled={
                  !form.getValues("title") ||
                  !form.getValues("description") ||
                  !audioUrl ||
                  !imageUrl ||
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit & Publish"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcastPage;
