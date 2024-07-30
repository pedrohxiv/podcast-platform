"use client";

import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAudio } from "@/components/providers/audio-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface Props {
  audioStorageId: Id<"_storage">;
  audioUrl: string;
  author: string;
  authorId: string;
  authorImageUrl: string;
  imageStorageId: Id<"_storage">;
  imageUrl: string;
  isOwner: boolean;
  podcastId: Id<"podcasts">;
  title: string;
}

export const PodcastDetailPlayer = ({
  audioStorageId,
  audioUrl,
  author,
  authorId,
  authorImageUrl,
  imageStorageId,
  imageUrl,
  isOwner,
  podcastId,
  title,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();

  const deletePodcast = useMutation(api.podcasts.deletePodcast);
  const updatePodcastViews = useMutation(api.podcasts.updatePodcastViews);

  const { toast } = useToast();
  const { setAudio } = useAudio();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deletePodcast({
        audioStorageId,
        imageStorageId,
        podcastId,
      });

      router.push("/");
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with deleting your podcast.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePlay = async () => {
    await updatePodcastViews({ podcastId });

    setAudio({
      audioUrl,
      author,
      imageUrl,
      podcastId,
      title,
    });
  };

  if (!imageUrl || !authorImageUrl) {
    return <PodcastDetailPlayerSkeleton />;
  }

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 w-full max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          height={250}
          width={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
          priority
        />
        <div className="flex w-full flex-col flex-1 gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <div className="flex flex-row w-full items-center justify-between">
              <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1 flex-1">
                {title}
              </h1>
              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-fit" disabled={isDeleting}>
                    <Image
                      src="/icons/three-dots.svg"
                      width={24}
                      height={24}
                      alt="Three dots icon"
                      className="cursor-pointer h-auto w-auto"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom">
                    <DropdownMenuItem
                      className="text-white-1 gap-2 cursor-pointer bg-black-6"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Image
                        src="/icons/delete.svg"
                        width={16}
                        height={16}
                        alt="Delete icon"
                      />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <figure
              className={cn("flex cursor-pointer items-center gap-2", {
                "cursor-default": isDeleting,
              })}
              onClick={() => !isDeleting && router.push(`/profile/${authorId}`)}
            >
              <Image
                src={authorImageUrl}
                height={30}
                width={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
          </article>
          <Button
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
            onClick={handlePlay}
            disabled={isDeleting}
          >
            <Image
              src="/icons/Play.svg"
              height={20}
              width={20}
              alt="random play"
            />
            &nbsp; Play podcast
          </Button>
        </div>
      </div>
    </div>
  );
};

export const PodcastDetailPlayerSkeleton = () => {
  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 w-full max-md:items-center md:flex-row">
        <Skeleton className="size-[250px]" />
        <div className="flex w-full flex-col flex-1 gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <div className="flex flex-row w-full items-center justify-between">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="size-[24px]" />
            </div>
            <figure className="flex cursor-pointer items-center gap-2 mt-2">
              <Skeleton className="size-[30px] rounded-full" />
              <Skeleton className="h-6 w-28" />
            </figure>
          </article>
          <Skeleton className="h-10 w-full max-w-[250px]" />
        </div>
      </div>
    </div>
  );
};
