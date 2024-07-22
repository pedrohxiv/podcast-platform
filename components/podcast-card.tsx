import Image from "next/image";

import { Id } from "@/convex/_generated/dataModel";

interface Props {
  description: string;
  imageUrl: string;
  podcastId: Id<"podcasts">;
  title: string;
}

export const PodcastCard = ({
  description,
  imageUrl,
  podcastId,
  title,
}: Props) => {
  return (
    <div className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image
          src={imageUrl}
          height={174}
          width={174}
          alt={title}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
};
