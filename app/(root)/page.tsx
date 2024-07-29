"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

import { PodcastCard, PodcastCardSkeleton } from "@/components/podcast-card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { formatTime } from "@/lib/utils";

const RootPage = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  const latestPodcasts = useQuery(api.podcasts.getLatestPodcasts);
  const popularPodcasts = useQuery(api.podcasts.getPopularPodcasts);

  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {!trendingPodcasts
            ? Array.from({ length: 3 }).map((_, i) => (
                <PodcastCardSkeleton key={i} />
              ))
            : trendingPodcasts.map(({ description, _id, imageUrl, title }) => (
                <PodcastCard
                  key={_id}
                  description={description}
                  imageUrl={imageUrl!}
                  podcastId={_id}
                  title={title}
                />
              ))}
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <header className="flex items-center justify-between">
          <h1 className="text-20 font-bold text-white-1">Latest Podcasts</h1>
          {!latestPodcasts ? (
            <Skeleton className="h-5 w-12" />
          ) : (
            <Link
              href="/discover"
              className="text-16 font-semibold text-orange-1"
            >
              See all
            </Link>
          )}
        </header>
        <div className="flex flex-col gap-6">
          {!latestPodcasts
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex cursor-pointer justify-between text-white-1 hover:text-orange-1"
                >
                  <div className="flex items-center gap-2 w-72">
                    <Skeleton className="h-5 w-4 mr-2" />
                    <Skeleton className="size-[44px]" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                  <div className="flex flex-row items-center gap-2 w-24">
                    <Skeleton className="size-[24px]" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex flex-row items-center gap-2 w-24">
                    <Skeleton className="size-[24px]" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex justify-center items-center">
                    <Skeleton className="size-[24px]" />
                  </div>
                </div>
              ))
            : latestPodcasts?.slice(0, 4).map((podcast, i) => (
                <Link href={`/podcasts/${podcast._id}`}>
                  <div
                    key={podcast._id}
                    className="flex cursor-pointer justify-between text-white-1 hover:text-orange-1"
                  >
                    <div className="flex items-center gap-2 w-72">
                      <h2 className="text-14 font-semibold mr-2">{i + 1}</h2>
                      <Image
                        src={podcast.imageUrl!}
                        height={44}
                        width={44}
                        alt={podcast.title}
                        className="aspect-square rounded-sm"
                      />
                      <h2 className="text-14 font-semibold">{podcast.title}</h2>
                    </div>
                    <div className="flex flex-row items-center gap-2 w-24">
                      <Image
                        src="/icons/headphone.svg"
                        height={24}
                        width={24}
                        alt="headphone"
                      />
                      <h2 className="text-14 font-semibold text-white-1">
                        {podcast.views}
                      </h2>
                    </div>
                    <div className="flex flex-row items-center gap-2 w-24">
                      <Image
                        src="/icons/watch.svg"
                        height={24}
                        width={24}
                        alt="headphone"
                      />
                      <h2 className="text-14 font-semibold text-white-1">
                        {formatTime(podcast.audioDuration)}
                      </h2>
                    </div>
                    <div className="flex justify-center items-center">
                      <Image
                        src="/icons/three-dots.svg"
                        height={24}
                        width={24}
                        alt="three dots"
                        className="rotate-90"
                      />
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Popular Podcasts</h1>
        <div className="podcast_grid">
          {!popularPodcasts
            ? Array.from({ length: 3 }).map((_, i) => (
                <PodcastCardSkeleton key={i} />
              ))
            : popularPodcasts.map(({ description, _id, imageUrl, title }) => (
                <PodcastCard
                  key={_id}
                  description={description}
                  imageUrl={imageUrl!}
                  podcastId={_id}
                  title={title}
                />
              ))}
        </div>
      </section>
    </div>
  );
};

export default RootPage;
