"use client";

import { useQuery } from "convex/react";

import { EmptyState } from "@/components/empty-state";
import { PodcastCard, PodcastCardSkeleton } from "@/components/podcast-card";
import { ProfileCard, ProfileCardSkeleton } from "@/components/profile-card";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  params: { id: Id<"podcasts"> };
}

const ProfilePage = ({ params }: Props) => {
  const user = useQuery(api.users.getUserById, {
    clerkId: params.id,
  });
  const data = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: params.id,
  });

  if (!user || !data) {
    return (
      <section className="mt-9 flex flex-col">
        <h1 className="text-20 font-bold text-white-1 max-md:text-center">
          Podcaster Profile
        </h1>
        <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
          <ProfileCardSkeleton />
        </div>
        <section className="mt-9 flex flex-col gap-5">
          <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
          <div className="podcast_grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <PodcastCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          imageUrl={user.imageUrl}
          listeners={data.listeners}
          name={user.name}
          podcasts={data.podcasts}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {data.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {data.podcasts
              .slice(0, 4)
              .map(({ description, _id, imageUrl, title }) => (
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
              title="You have not created any podcasts yet"
              buttonLink="/create-podcast"
              buttonText="Create Podcast"
            />
          </>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
