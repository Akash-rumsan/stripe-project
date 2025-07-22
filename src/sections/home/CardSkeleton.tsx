import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

export default function CardSkeleton() {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-800/95 animate-pulse">
      <CardHeader className="text-center pb-8">
        <div className="mx-auto mb-6 p-6 bg-slate-200 dark:bg-slate-700 rounded-3xl w-fit">
          <div className="h-12 w-12 bg-slate-300 dark:bg-slate-600 rounded" />
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded" />
      </CardContent>
    </Card>
  );
}
