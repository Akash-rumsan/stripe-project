import React from "react";

export const GuestLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[95vh] w-full">
      <div className="animate-pulse flex flex-col gap-4 items-center">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="h-4 w-40 rounded bg-gray-200" />
        <div className="h-4 w-64 rounded bg-gray-200" />
        <div className="h-4 w-56 rounded bg-gray-200" />
      </div>
      <p className="mt-6 text-gray-400">Loading chat...</p>
    </div>
  );
};
