"use client";

import { useQuery } from "convex/react";

import { PodcastCard } from "@/components/podcast-card";
import { api } from "@/convex/_generated/api";

const RootPage = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts?.map(({ description, _id, imageUrl, title }) => (
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
