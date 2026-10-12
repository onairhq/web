"use client";

import { Card, Skeleton } from "@heroui/react";
import type { FC } from "react";

export const SkeletonComponent: FC = () => {
  return (
    <Card className="mx-auto container max-w-xs mt-12" variant="secondary">
      <Card.Content>
        <Skeleton className="aspect-square w-full rounded-lg" />
      </Card.Content>

      <Card.Header className="items-center">
        <Skeleton className="h-5 w-3/4 rounded-md" />
      </Card.Header>

      <Card.Footer className="flex justify-center items-center">
        <Skeleton className="size-12 rounded-full" />
      </Card.Footer>
    </Card>
  );
};
