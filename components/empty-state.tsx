import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  buttonLink?: string;
  buttonText?: string;
  search?: boolean;
}

export const EmptyState = ({
  title,
  buttonLink,
  buttonText,
  search,
}: Props) => {
  return (
    <section className="flex-center size-full flex-col gap-3">
      <Image
        src="/icons/emptyState.svg"
        height={250}
        width={250}
        alt="empty state"
        className="h-auto w-auto"
      />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-16 text-center font-medium text-white-1">
          {title}
        </h1>
        {search && (
          <p className="text-16 text-center font-medium text-white-2">
            Try adjusting your search to find what you're looking for
          </p>
        )}
        {buttonLink && (
          <Button className="bg-orange-1">
            <Link href={buttonLink} className="gap-1 flex">
              <Image
                src="/icons/discover.svg"
                height={20}
                width={20}
                alt="discover"
              />
              <h1 className="text-16 font-extrabold text-white-1">
                {buttonText}
              </h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};
