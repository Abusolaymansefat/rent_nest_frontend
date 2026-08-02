"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <Card className="w-90 shadow-xl border">
        <CardContent className="flex flex-col items-center gap-6 py-8">
          {/* Spinner */}
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Loading...</h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare everything for you.
            </p>
          </div>

          {/* Skeleton Preview */}
          <div className="w-full space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalLoading;