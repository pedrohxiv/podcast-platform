import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  isLoading?: boolean;
  className?: string;
}

export const Header = ({ className, isLoading, title }: Props) => {
  return (
    <header className="flex items-center justify-between">
      {title ? (
        <h1 className={cn("text-18 font-bold text-white-1", className)}>
          {title}
        </h1>
      ) : (
        <div />
      )}
      {isLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        <Link href="/discover" className="text-16 font-semibold text-orange-1">
          See all
        </Link>
      )}
    </header>
  );
};
