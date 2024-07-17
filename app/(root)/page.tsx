import { PodcastCard } from "@/components/podcast-card";
import { podcastData } from "@/lib/constants";

const RootPage = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {podcastData.map(({ description, id, imageUrl, title }) => (
            <PodcastCard
              key={id}
              description={description}
              imageUrl={imageUrl}
              podcastId={id}
              title={title}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RootPage;
