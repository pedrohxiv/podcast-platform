import Image from "next/image";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import type { Id } from "@/convex/_generated/dataModel";

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
  const router = useRouter();

  const handleViews = () => {
    router.push(`/podcasts/${podcastId}`, {
      scroll: true,
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
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

export const PodcastCardSkeleton = () => {
  return (
    <div>
      <figure className="flex flex-col gap-2">
        <Skeleton className="size-[200px]" />
        <div className="flex flex-col gap-2">
          <Skeleton className="text-16 h-6 w-1/2" />
          <Skeleton className="text-12 h-4 w-[200px]" />
        </div>
      </figure>
    </div>
  );
};
