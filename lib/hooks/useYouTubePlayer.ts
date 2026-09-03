"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useAudio } from "@/components/context/AudioContext";
import { useLoading } from "@/components/context/LoadingContext";

interface UseYouTubePlayerOptions {
  videoId: string;
}

export function useYouTubePlayer({ videoId }: UseYouTubePlayerOptions) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const { notifyVideoPlay, notifyVideoEnd } = useAudio();
  const { canPlayVideo } = useLoading();

  const videoSrc = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}` +
      `?autoplay=1` +
      `&mute=0` +
      `&loop=1` +
      `&playlist=${videoId}` +
      `&color=white` +
      `&controls=0` +
      `&disablekb=1` +
      `&fs=0` +
      `&modestbranding=1` +
      `&iv_load_policy=3` +
      `&enablejsapi=1` +
      `&playsinline=1` +
      `&rel=0` +
      `&vq=hd720`,
    [videoId]
  );

  const sendYouTubeCommand = useCallback((func: string, args: unknown[] = []) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "https://www.youtube.com"
    );
  }, []);

  const handleStartVideo = useCallback(() => {
    notifyVideoPlay();
    setIsPlayingVideo(true);

    setTimeout(() => {
      sendYouTubeCommand("playVideo");
      sendYouTubeCommand("setPlaybackQuality", ["hd720"]);
      sendYouTubeCommand("setSuggestedQuality", ["hd720"]);
      sendYouTubeCommand("unMute");
      sendYouTubeCommand("setVolume", [100]);
      setIsMuted(false);
    }, 100);
  }, [notifyVideoPlay, sendYouTubeCommand]);

  const handleStopVideo = useCallback(() => {
    setIsPlayingVideo(false);
    notifyVideoEnd();
  }, [notifyVideoEnd]);

  const toggleVideoSound = useCallback(() => {
    if (isMuted) {
      sendYouTubeCommand("unMute");
      sendYouTubeCommand("setVolume", [100]);
      setIsMuted(false);
    } else {
      sendYouTubeCommand("mute");
      setIsMuted(true);
    }
  }, [isMuted, sendYouTubeCommand]);

  const handleIframeLoad = useCallback(() => {
    setTimeout(() => {
      if (!iframeRef.current) return;
      sendYouTubeCommand("playVideo");
      sendYouTubeCommand("setPlaybackQuality", ["hd720"]);
      sendYouTubeCommand("setSuggestedQuality", ["hd720"]);

      notifyVideoPlay();

      if (!isMuted) {
        sendYouTubeCommand("unMute");
        sendYouTubeCommand("setVolume", [100]);
      }
    }, 300);
  }, [isMuted, notifyVideoPlay, sendYouTubeCommand]);

  // Handle YouTube iframe postMessage responses
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://www.youtube.com" &&
        event.origin !== "https://www.youtube-nocookie.com"
      ) {
        return;
      }

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        const state = data?.info ?? data?.data;

        if (data?.event === "onStateChange") {
          if (state === 0) {
            handleStopVideo();
          } else if (state === 1) {
            notifyVideoPlay();
            sendYouTubeCommand("setPlaybackQuality", ["hd720"]);
            sendYouTubeCommand("setSuggestedQuality", ["hd720"]);
          }
        }
      } catch {
        // Ignore non-json or unrelated postMessage data
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleStopVideo, notifyVideoPlay, sendYouTubeCommand]);

  // Listen initialization for enablejsapi=1
  useEffect(() => {
    if (!isPlayingVideo || !canPlayVideo) return;

    const timer = setTimeout(() => {
      if (!iframeRef.current?.contentWindow) return;
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "listening",
          id: "youtube-banner-player",
        }),
        "https://www.youtube.com"
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [isPlayingVideo, canPlayVideo]);

  // Resume BGM when unmounting
  useEffect(() => {
    return () => {
      notifyVideoEnd();
    };
  }, [notifyVideoEnd]);

  return {
    iframeRef,
    videoSrc,
    isPlayingVideo,
    isMuted,
    canPlayVideo,
    handleStartVideo,
    handleStopVideo,
    toggleVideoSound,
    handleIframeLoad,
  };
}
