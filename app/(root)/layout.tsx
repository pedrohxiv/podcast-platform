import Image from "next/image";

import { LeftSidebar } from "@/components/left-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { PodcastPlayer } from "@/components/podcast-player";
import { AudioProvider } from "@/components/providers/audio-provider";
import { RightSidebar } from "@/components/right-sidebar";
import { Toaster } from "@/components/ui/toaster";

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <AudioProvider>
      <div className="relative flex flex-col h-screen">
        <main className="relative flex flex-1 overflow-hidden bg-black-3">
          <LeftSidebar />
          <section className="flex flex-1 flex-col overflow-y-auto remove-scrollbar px-4 sm:px-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
              <div className="flex h-16 items-center justify-between md:hidden">
                <Image
                  src="/icons/logo.svg"
                  height={30}
                  width={30}
                  alt="menu icon"
                />
                <MobileNav />
              </div>
              <div className="flex flex-col md:pb-14">
                {children}
                <Toaster />
              </div>
            </div>
          </section>
          <RightSidebar />
        </main>
        <PodcastPlayer />
      </div>
    </AudioProvider>
  );
};

export default RootLayout;
