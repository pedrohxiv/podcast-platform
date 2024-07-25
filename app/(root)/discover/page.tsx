"use client";

import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { PodcastCard } from "@/components/podcast-card";
import { Searchbar } from "@/components/searchbar";
import { api } from "@/convex/_generated/api";

interface Props {
  searchParams: { search: string };
}

const DiscoverPage = ({ searchParams: { search = "" } }: Props) => {
  const podcasts = useQuery(api.podcasts.getPodcastBySearch, { search });

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search
            ? "Discover Trending Podcasts"
            : `Search results for ${search}`}
        </h1>
        {podcasts ? (
          <>
            {podcasts.length > 0 ? (
              <div className="podcast_grid">
                {podcasts?.map(({ description, _id, imageUrl, title }) => (
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
              <EmptyState title="No results found" />
            )}
          </>
        ) : (
          <div className="flex-center w-full h-[calc(100vh-238px)]">
            <Loader2 className="animate-spin text-orange-1 size-7" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
