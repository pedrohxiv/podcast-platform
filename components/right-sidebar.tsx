"use client";

import { useSession } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";

export const RightSidebar = () => {
  const router = useRouter();

  const { isLoaded, session } = useSession();

  const carouselPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const topPodcasters = useQuery(api.users.getTopUsersByPodcastCount);

  const slides = topPodcasters?.filter(
    (podcaster) => podcaster.totalPodcasts > 0
  );

  if (!isLoaded || !slides || !topPodcasters) {
    return (
      <section className="right_sidebar">
        <div className="flex gap-3 items-center">
          <Skeleton className="size-[28px] rounded-full" />
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="size-6" />
          </div>
        </div>
        <section className="flex flex-col gap-4 pt-6">
          <Header
            title="Fans Also Like"
            isLoading={!slides || !topPodcasters}
          />
          <Skeleton className="size-[242px]" />
        </section>
        <section className="flex flex-col gap-4 pt-6">
          <Header
            title="Top Podcasters"
            isLoading={!slides || !topPodcasters}
          />
          <div className="flex flex-col gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-[44px]" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="right_sidebar text-white-1">
      {session ? (
        <Link
          href={`/profile/${session.user.id}`}
          className="flex gap-3 items-center"
        >
          <Image
            src={session.user.imageUrl}
            height={28}
            width={28}
            alt="user"
            className="rounded-full"
          />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold text-white-1">
              {session.user.firstName} {session.user.lastName}
            </h1>
            <Image
              src="/icons/right-arrow.svg"
              height={24}
              width={24}
              alt="arrow"
            />
          </div>
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className="h-7 flex w-full items-center justify-between"
        >
          <h1 className="text-16 truncate font-semibold text-orange-1">
            Sign in
          </h1>
          <Image
            src="/icons/right-arrow.svg"
            height={24}
            width={24}
            alt="arrow"
          />
        </Link>
      )}
      <section className="flex flex-col gap-4 pt-6">
        <Header title="Fans Also Like" />
        <Carousel
          opts={{ loop: true }}
          plugins={[carouselPlugin.current]}
          className="w-full"
          onMouseEnter={carouselPlugin.current.stop}
          onMouseLeave={carouselPlugin.current.reset}
        >
          <CarouselContent>
            {slides.slice(0, 5).map((slide) => (
              <CarouselItem
                key={slide._id}
                onClick={() =>
                  router.push(`/podcasts/${slide.podcast[0].podcastId}`)
                }
                className="cursor-pointer"
              >
                <div className="p-1">
                  <Card className="border-none">
                    <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                      <Image
                        src={slide.imageUrl}
                        height={242}
                        width={242}
                        alt="card"
                        className="rounded-xl"
                        priority
                      />
                      <div className="glassmorphism-black absolute bottom-0 z-10 flex flex-col rounded-b-xl p-4 w-[242px]">
                        <h2 className="text-14 font-semibold text-white-1">
                          {slide.podcast[0].podcastTitle}
                        </h2>
                        <p className="text-12 font-normal text-white-2">
                          {slide.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <section className="flex flex-col gap-4 pt-6">
        <Header title="Top Podcasters" />
        <div className="flex flex-col gap-6">
          {topPodcasters.slice(0, 3).map((podcaster) => (
            <div
              key={podcaster._id}
              className="flex cursor-pointer justify-between"
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  height={44}
                  width={44}
                  alt={podcaster.name}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold text-white-1">
                  {podcaster.name}
                </h2>
              </div>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">
                  {podcaster.totalPodcasts} podcasts
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
