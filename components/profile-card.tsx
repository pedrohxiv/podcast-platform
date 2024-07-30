"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useAudio } from "@/components/providers/audio-provider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Id } from "@/convex/_generated/dataModel";

interface Podcast {
  audioDuration: number;
  author: string;
  authorId: string;
  authorImageUrl: string;
  description: string;
  title: string;
  user: Id<"users">;
  views: number;
  voicePrompt: string;
  voiceType: string;
  _creationTime: number;
  _id: Id<"podcasts">;
  audioStorageId?: Id<"_storage">;
  audioUrl?: string;
  imagePrompt?: string;
  imageStorageId?: Id<"_storage">;
  imageUrl?: string;
}

interface Props {
  imageUrl?: string;
  listeners: number;
  name: string;
  podcasts: Podcast[];
}

export const ProfileCard = ({ listeners, name, podcasts, imageUrl }: Props) => {
  const [randomPodcast, setRandomPodcast] = useState<Podcast | null>(null);

  const { setAudio } = useAudio();

  const playRandomPodcast = () => {
    const randomIndex = Math.floor(Math.random() * podcasts.length);

    setRandomPodcast(podcasts[randomIndex]);
  };

  useEffect(() => {
    if (randomPodcast) {
      setAudio({
        audioUrl: randomPodcast.audioUrl || "",
        author: randomPodcast.author,
        imageUrl: randomPodcast.imageUrl || "",
        podcastId: randomPodcast._id,
        title: randomPodcast.title,
      });
    }
  }, [randomPodcast, setAudio]);

  if (!imageUrl) {
    return <ProfileCardSkeleton />;
  }

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        height={250}
        width={250}
        alt="podcaster"
        className="aspect-square rounded-lg"
        priority
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              height={15}
              width={15}
              alt="verified"
              className="h-auto w-auto"
            />
            <h2 className="text-14 font-medium text-white-2">
              Verified Creator
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {name}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            height={24}
            width={24}
            alt="headphone"
          />
          <h2 className="text-16 font-semibold text-white-1">
            {listeners} &nbsp;
            <span className="font-normal text-white-2">monthly listeners</span>
          </h2>
        </figure>
        {podcasts.length > 0 && (
          <Button
            onClick={playRandomPodcast}
            className="text-16 bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              height={20}
              width={20}
              alt="random play"
            />
            &nbsp; Play a random podcast
          </Button>
        )}
      </div>
    </div>
  );
};

export const ProfileCardSkeleton = () => {
  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Skeleton className="size-[250px]" />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Skeleton className="size-[15px]" />
            <Skeleton className="h-[15px] w-[105px]" />
          </figure>
          <Skeleton className="h-10 w-64 mt-2" />
        </div>
        <figure className="flex gap-3 py-6 mt-1">
          <Skeleton className="size-[24px]" />
          <Skeleton className="h-[24px] w-52" />
        </figure>
        <Skeleton className="h-10 w-52" />
      </div>
    </div>
  );
};
