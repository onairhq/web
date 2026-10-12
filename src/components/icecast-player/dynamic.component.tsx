"use client";

import dynamic from "next/dynamic";
import { SkeletonComponent } from "@/components/icecast-player/skeleton";

export const IcecastPlayerComponent = dynamic(
  () =>
    import("@/components/icecast-player/component").then(
      (mod) => mod.IcecastPlayerComponent,
    ),
  {
    ssr: false,
    loading: () => <SkeletonComponent />,
  },
);
