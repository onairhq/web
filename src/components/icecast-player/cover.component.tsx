"use client";

import Image from "next/image";
import type { FC } from "react";
import type { IcyMetadata } from "@/lib/icecast-metadata-player.lib";

export const CoverComponent: FC<{ metadata: IcyMetadata }> = ({
  metadata: { StreamTitle, StreamUrl },
}) => {
  const isJingle = StreamTitle?.toLowerCase().includes("jingles");

  if (isJingle) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-900">
        <span className="text-3xl font-bold text-white">JINGLE</span>
      </div>
    );
  }

  if (!StreamUrl) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-zinc-800">
        <span className="font-semibold text-zinc-400">NO COVER</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
      <Image
        src={StreamUrl}
        alt={StreamTitle || "Radio cover"}
        fill
        loading="eager"
        sizes="(max-width: 320px) 100vw, 320px"
        unoptimized
        className="object-cover"
      />
    </div>
  );
};
