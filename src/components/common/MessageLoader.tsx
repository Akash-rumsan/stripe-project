import type React from "react";

export const MessageLoading: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <div
        className="w-1.5 h-1.5 rounded-full bg-black animate-bounce"
        style={{ animationDuration: "1s", animationDelay: "0s" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-black animate-bounce"
        style={{ animationDuration: "1s", animationDelay: "0.2s" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-black animate-bounce"
        style={{ animationDuration: "1s", animationDelay: "0.4s" }}
      />
    </div>
  );
};
