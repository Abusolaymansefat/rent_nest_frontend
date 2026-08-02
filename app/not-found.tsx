"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-lg border shadow-xl">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="mb-6 rounded-full bg-destructive/10 p-5">
            <SearchX className="h-16 w-16 text-destructive" />
          </div>

          <h1 className="text-6xl font-extrabold tracking-tight text-primary">
            404
          </h1>

          <h2 className="mt-3 text-2xl font-semibold">
            Page Not Found
          </h2>

          <p className="mt-3 max-w-sm text-muted-foreground">
            Sorry, the page you are looking for does not exist or may have been moved.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;