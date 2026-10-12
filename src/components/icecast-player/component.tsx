"use client";

import { Button, Card, Slider, Separator } from "@heroui/react";
import type { FC } from "react";
import { CoverComponent } from "@/components/icecast-player/cover.component";
import { SkeletonComponent } from "@/components/icecast-player/skeleton";
import { useIcecastHook } from "@/components/icecast-player/icecast-player.hook";
import {
  PauseIcon,
  PlayIcon,
  VolumeDownIcon,
  VolumeUpIcon,
} from "@/components/icecast-player/icon";

export const IcecastPlayerComponent: FC<{ streamUrl: string }> = ({
  streamUrl,
}) => {
  const {
    metadata,
    isLoading,
    isPlaying,
    error,
    toggle,
    volume,
    changeVolume,
  } = useIcecastHook(streamUrl);

  if (isLoading) {
    return <SkeletonComponent />;
  }

  return (
    <Card className="mx-auto container max-w-xs mt-12" variant="secondary">
      <Card.Content>
        <CoverComponent metadata={metadata} />
      </Card.Content>
      <Card.Header className="items-center justify-center text-center">
        <Card.Title className="font-bold text-md">
          {metadata.StreamTitle}
        </Card.Title>
        {error && <Card.Description>{error}</Card.Description>}
      </Card.Header>
      <Separator className="my-0.5 bg-foreground/5" />
      <Card.Footer className="flex flex-row justify-center items-center">
        <Button
          isIconOnly
          size="lg"
          className="px-2.5"
          onClick={toggle}
          isDisabled={isLoading}
        >
          {!isPlaying && <PlayIcon className="w-6 h-6 ml-0.5" />}
          {isPlaying && <PauseIcon className="w-6 h-6" />}
        </Button>
        <div className="flex w-full items-center gap-2 px-2.5">
          <VolumeDownIcon className="h-4 w-4 shrink-0 text-muted-foreground mt-1" />
          <Slider
            className="w-full max-w-xs"
            defaultValue={30}
            minValue={1}
            maxValue={100}
            step={1}
            value={volume}
            onChange={(value: number | number[]) =>
              changeVolume(value as number)
            }
            isDisabled={isLoading}
          >
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
          <VolumeUpIcon className="h-4 w-4 shrink-0 text-muted-foreground mt-1" />
        </div>
      </Card.Footer>
    </Card>
  );
};
