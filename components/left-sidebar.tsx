"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
        >
          <Image src="/icons/logo.svg" height={27} width={23} alt="logo" />
          <h1 className="text-20 font-extrabold text-white-1 ml-2 max-lg:hidden">
            Podcast Platform
          </h1>
        </Link>
        {sidebarLinks.map(({ imageUrl, label, route }) => (
          <Link
            key={route}
            href={route}
            className={cn(
              "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
              {
                "bg-nav-focus border-r-4 border-orange-1": pathname === route,
              }
            )}
          >
            <Image src={imageUrl} height={24} width={24} alt={label} />
            <p>{label}</p>
          </Link>
        ))}
      </nav>
    </section>
  );
};
