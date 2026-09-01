"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAudio } from "@/components/context/AudioContext";
import { useLoading } from "@/components/context/LoadingContext";

export default function PageTransitionSound() {
  const pathname = usePathname();
  const { playPaperFlipSound } = useAudio();
  const { isLoading } = useLoading();
  const isFirstRenderRef = useRef(true);
  const prevPathnameRef = useRef(pathname);

  // Play paper flip sound when pathname changes
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      playPaperFlipSound();
    }
  }, [pathname, playPaperFlipSound]);

  // Play paper flip sound when initial loading screen completes
  useEffect(() => {
    if (!isLoading) {
      playPaperFlipSound();
    }
  }, [isLoading, playPaperFlipSound]);

  return null;
}
