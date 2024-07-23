"use client";

import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const { toast } = useToast();

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

  const handlePlay = () => {};

  if (!imageUrl || !authorImageUrl) {
    return (
      <div className="flex-center h-screen w-full">
        <Loader2 className="animate-spin text-orange-1 size-7" />
      </div>
    );
  }

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          height={250}
          width={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {title}
            </h1>
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
      {isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-fit" disabled={isDeleting}>
            <Image
              src="/icons/three-dots.svg"
              width={24}
              height={24}
              alt="Three dots icon"
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem
              className="text-white-1 gap-2 cursor-pointer bg-black-6 hover:bg-black-2"
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
  );
};
