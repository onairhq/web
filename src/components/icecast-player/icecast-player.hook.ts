"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createIcecastPlayer,
  type IcecastPlayerInstance,
  type IcyMetadata,
} from "@/lib/icecast-metadata-player.lib";

const INITIAL_METADATA: IcyMetadata = {
  StreamTitle: "Unknown",
  StreamUrl: undefined,
};

export const useIcecastHook = (streamUrl: string) => {
  const playerRef = useRef<IcecastPlayerInstance | null>(null);

  const [volume, setVolume] = useState<number>(30);
  const [metadata, setMetadata] = useState<IcyMetadata>(INITIAL_METADATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const originalTitle = document.title;

    if (metadata.StreamTitle !== "Unknown") {
      document.title = metadata.StreamTitle || "Radio";
    }

    return () => {
      document.title = originalTitle;
    };
  }, [metadata.StreamTitle]);

  useEffect(() => {
    let disposed = false;

    setIsLoading(true);
    setIsStarted(false);
    setIsMuted(true);
    setError(null);
    setMetadata(INITIAL_METADATA);

    const player = createIcecastPlayer({
      url: streamUrl,
      onMetadata: (data) => {
        if (!disposed) setMetadata(data);
      },
      onLoad: () => {
        if (!disposed) setIsLoading(true);
      },
      onPlay: () => {
        if (!disposed) {
          setIsLoading(false);
          setIsStarted(true);
        }
      },
      onStop: () => {
        if (!disposed) {
          setIsStarted(false);
          setIsLoading(false);
        }
      },
      onError: (message) => {
        if (!disposed) {
          setError(message);
          setIsLoading(false);
        }
      },
    });

    playerRef.current = player;
    player.audioElement.volume = volume / 100;
    player.audioElement.muted = true;

    player.play().catch((e: unknown) => {
      if (disposed) return;

      if (e instanceof Error && e.name === "AbortError") return;

      setError(e instanceof Error ? e.message : "Autoplay blocked");
      setIsLoading(false);
    });

    return () => {
      disposed = true;

      if (playerRef.current === player) {
        playerRef.current = null;
      }

      player.audioElement.muted = true;
    };
  }, [streamUrl]);

  const changeVolume = useCallback((newVolume: number) => {
    const player = playerRef.current;
    if (!player) return;

    const normalizedVolume = Math.max(0, Math.min(100, newVolume));

    player.audioElement.volume = normalizedVolume / 100;
    setVolume(normalizedVolume);

    if (normalizedVolume > 0 && player.audioElement.muted) {
      player.audioElement.muted = false;
      setIsMuted(false);
    }

    if (normalizedVolume === 0) {
      player.audioElement.muted = true;
      setIsMuted(true);
    }
  }, []);

  const play = useCallback(async () => {
    const player = playerRef.current;
    if (!player) return;

    player.audioElement.muted = false;
    setIsMuted(false);

    if (!isStarted) {
      setError(null);
      setIsLoading(true);

      try {
        await player.play();
      } catch (e: unknown) {
        if (e instanceof Error && e.name === "AbortError") return;

        setError(e instanceof Error ? e.message : "Playback error");
        setIsLoading(false);
      }
    }
  }, [isStarted]);

  const pause = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    player.audioElement.muted = true;
    setIsMuted(true);
  }, []);

  const isPlaying = isStarted && !isMuted;

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, play, pause]);

  return {
    volume,
    changeVolume,
    metadata,
    isLoading,
    isStarted,
    isMuted,
    isPlaying,
    error,
    play,
    pause,
    toggle,
  };
};
