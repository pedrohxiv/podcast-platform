"use client";

import { useClerk, useSession } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { signOut } = useClerk();
  const { isLoaded, session } = useSession();

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-2">
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
              "flex gap-3 items-center py-4 max-lg:px-4 -ml-8 justify-center lg:justify-start",
              {
                "bg-nav-focus border-r-4 border-orange-1": pathname === route,
              }
            )}
          >
            <Image
              src={imageUrl}
              height={24}
              width={24}
              alt={label}
              className="ml-8"
            />
            <p>{label}</p>
          </Link>
        ))}
        <Link
          href={`/profile/${session?.user.id}`}
          className={cn(
            "flex gap-3 items-center py-4 max-lg:px-4 -ml-8 justify-center lg:justify-start",
            {
              "bg-nav-focus border-r-4 border-orange-1":
                pathname.startsWith("/profile"),
            }
          )}
        >
          <Image
            src="/icons/profile.svg"
            height={24}
            width={24}
            alt="My Profile"
            className="ml-8"
          />
          <p>My Profile</p>
        </Link>
      </nav>
      <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
        {!isLoaded ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <>
            {!session ? (
              <Button
                asChild
                className="text-16 w-full bg-orange-1 font-extrabold"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            ) : (
              <Button
                className="text-16 w-full bg-orange-1 font-extrabold"
                onClick={() => signOut(() => router.push("/"))}
              >
                Log out
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};
