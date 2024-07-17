import Image from "next/image";

import { LeftSidebar } from "@/components/left-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { RightSidebar } from "@/components/right-sidebar";

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
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
            <div className="flex flex-col md:pb-14">{children}</div>
          </div>
        </section>
        <RightSidebar />
      </main>
    </div>
  );
};

export default RootLayout;
