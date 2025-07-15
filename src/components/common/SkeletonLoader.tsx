import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-4 w-full mb-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default SkeletonLoader;
