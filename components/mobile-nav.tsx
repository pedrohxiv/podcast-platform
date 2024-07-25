"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/icons/hamburger.svg"
          height={30}
          width={30}
          alt="menu"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-black-1">
        <SheetClose asChild>
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
          >
            <Image src="/icons/logo.svg" height={27} width={23} alt="logo" />
            <h1 className="text-20 font-extrabold text-white-1 ml-2">
              Podcast Platform
            </h1>
          </Link>
        </SheetClose>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <nav className="flex h-full flex-col gap-2 text-white-1">
              {sidebarLinks.map(({ imageUrl, label, route }) => (
                <SheetClose asChild key={route}>
                  <Link
                    href={route}
                    className={cn(
                      "flex gap-3 items-center py-4 max-lg:px-4 justify-start",
                      {
                        "bg-nav-focus border-r-4 border-orange-1":
                          pathname === route,
                      }
                    )}
                  >
                    <Image src={imageUrl} height={24} width={24} alt={label} />
                    <p>{label}</p>
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
