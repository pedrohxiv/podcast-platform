"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import { EmptyState } from "@/components/empty-state";
import { PodcastCard } from "@/components/podcast-card";
import { PodcastDetailPlayer } from "@/components/podcast-detail-player";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  params: { id: Id<"podcasts"> };
}

const PodcastPage = ({ params }: Props) => {
  const { user } = useUser();

  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId: params.id,
  });
  const similarPodcasts = useQuery(api.podcasts.getPodcastsByVoiceType, {
    podcastId: params.id,
  });

  const isOwner = user?.id === podcast?.authorId;

  if (!podcast) {
    return (
      <div className="flex-center h-screen w-full">
        <Loader2 className="animate-spin text-orange-1 size-7" />
      </div>
    );
  }

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Current Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            height={24}
            width={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>
      <PodcastDetailPlayer
        audioStorageId={podcast.audioStorageId!}
        audioUrl={podcast.audioUrl!}
        imageStorageId={podcast.imageStorageId!}
        imageUrl={podcast.imageUrl!}
        isOwner={isOwner}
        podcastId={podcast._id}
        {...podcast}
      />
      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        {podcast?.description}
      </p>
      {podcast?.voicePrompt && podcast.imagePrompt && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-18 font-bold text-white-1">Transcription</h1>
            <p className="text-16 font-medium text-white-2">
              {podcast.voicePrompt}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
            <p className="text-16 font-medium text-white-2">
              {podcast.imagePrompt}
            </p>
          </div>
        </div>
      )}
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts?.map(({ description, _id, imageUrl, title }) => (
              <PodcastCard
                key={_id}
                description={description}
                imageUrl={imageUrl!}
                podcastId={_id}
                title={title}
              />
            ))}
          </div>
        ) : (
          <>
            <EmptyState
              title="No similar podcasts found"
              buttonLink="/discover"
              buttonText="Discover more podcasts"
            />
          </>
        )}
      </section>
    </section>
  );
};

export default PodcastPage;
