"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export const Searchbar = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>(search);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`);
    } else if (!debouncedValue && pathname === "/discover") {
      router.push("/discover");
    }
  }, [debouncedValue, pathname, router]);

  return (
    <div className="relative mt-8 block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-orange-1"
        placeholder="Search for podcast"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Image
        src="/icons/search.svg"
        height={20}
        width={20}
        alt="search"
        className="absolute left-4 top-3.5"
      />
    </div>
  );
};
