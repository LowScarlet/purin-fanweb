"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

import CanvasParticles from "../ui/CanvasParticles";
import HeroCarousel from "../home/HeroCarousel";
import { useAudio } from "../context/AudioContext";
import { useLoading } from "../context/LoadingContext";

import bgImage from "@/public/bg.jpg";
import ppImage from "@/public/pp.jpg";

interface HeaderBannerProps {
  videoId?: string;
}

export default function HeaderBanner({
  videoId = "3xadHYaLobM",
}: HeaderBannerProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const { canPlayVideo, isLoading, isInitialLoad } = useLoading();

  const videoSrc =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1` +
    `&mute=0` +
    `&controls=1` +
    `&enablejsapi=1` +
    `&playsinline=1` +
    `&rel=0` +
    `&vq=hd720`;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const { isPlaying, togglePlay } = useAudio();

  /*
   * ------------------------------------------------------------
   * YouTube API helper
   * ------------------------------------------------------------
   */

  const sendYouTubeCommand = useCallback(
    (func: string, args: any[] = []) => {
      const iframe = iframeRef.current;

      if (!iframe?.contentWindow) {
        return;
      }

      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args,
        }),
        "https://www.youtube.com"
      );
    },
    []
  );

  /*
   * ------------------------------------------------------------
   * Start video
   * ------------------------------------------------------------
   */

  const handleStartVideo = useCallback(() => {
    if (isPlaying) {
      togglePlay();
    }

    setIsPlayingVideo(true);

    /*
     * User interaction means we can safely request sound & force 720p quality.
     */
    setTimeout(() => {
      sendYouTubeCommand("playVideo");
      sendYouTubeCommand("setPlaybackQuality", ["hd720"]);
      sendYouTubeCommand("setSuggestedQuality", ["hd720"]);
      sendYouTubeCommand("unMute");
      sendYouTubeCommand("setVolume", [100]);

      setIsMuted(false);
    }, 100);
  }, [isPlaying, togglePlay, sendYouTubeCommand]);

  /*
   * ------------------------------------------------------------
   * Stop video
   * ------------------------------------------------------------
   */

  const handleStopVideo = useCallback(() => {
    setIsPlayingVideo(false);
  }, []);

  /*
   * ------------------------------------------------------------
   * Toggle sound
   * ------------------------------------------------------------
   */

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

  /*
   * ------------------------------------------------------------
   * Iframe loaded
   * ------------------------------------------------------------
   */

  const handleIframeLoad = useCallback(() => {
    /*
     * Give YouTube a tiny amount of time to initialize
     * before sending commands.
     */
    setTimeout(() => {
      if (!iframeRef.current) {
        return;
      }

      sendYouTubeCommand("playVideo");
      sendYouTubeCommand("setPlaybackQuality", ["hd720"]);
      sendYouTubeCommand("setSuggestedQuality", ["hd720"]);

      /*
       * On initial page load we want sound.
       *
       * Browser policy may still reject this.
       * That's okay, the iframe itself remains visible.
       */
      if (!isMuted) {
        sendYouTubeCommand("unMute");
        sendYouTubeCommand("setVolume", [100]);
      }
    }, 300);
  }, [isMuted, sendYouTubeCommand]);

  /*
   * ------------------------------------------------------------
   * Detect YouTube player states & enforce quality
   * ------------------------------------------------------------
   */

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
          typeof event.data === "string"
            ? JSON.parse(event.data)
            : event.data;

        /*
         * YouTube player state:
         *
         * -1 unstarted
         *  0 ended
         *  1 playing
         *  2 paused
         *  3 buffering
         *  5 cued
         */

        const state =
          data?.info ??
          data?.data;

        if (data?.event === "onStateChange") {
          if (state === 0) {
            handleStopVideo();
          } else if (state === 1) {
            // Enforce HD 720p / large quality on active stream
            sendYouTubeCommand("setPlaybackQuality", ["hd720"]);
            sendYouTubeCommand("setSuggestedQuality", ["hd720"]);
          }
        }
      } catch {
        // Ignore invalid postMessage data.
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleStopVideo]);

  /*
   * ------------------------------------------------------------
   * Tell YouTube we want player events
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (!isPlayingVideo || !canPlayVideo) {
      return;
    }

    /*
     * YouTube requires initialization message when using
     * enablejsapi=1.
     */
    const timer = setTimeout(() => {
      if (!iframeRef.current?.contentWindow) {
        return;
      }

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

  /*
   * ------------------------------------------------------------
   * Render
   * ------------------------------------------------------------
   */

  return (
    <section className="relative w-full flex-1 min-h-0 overflow-hidden select-none bg-[#fffcf8]">

      {/* ========================================================
          BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Purin Kokoa Room Background"
          fill
          priority
          className="object-cover object-center transform scale-100 transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Warm Ambient Vignette & Color Overlay (Removed when video plays) */}
        {!isPlayingVideo && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />
        )}

        {!isPlayingVideo && <CanvasParticles />}
      </div>

      {/* ========================================================
          VIDEO (Only begins when loading progress is >= 80%)
      ========================================================= */}

      <AnimatePresence initial={false}>
        {isPlayingVideo && canPlayVideo && (
          <motion.div
            key="youtube-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-30 overflow-hidden w-full h-full"
          >
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center pointer-events-auto">

              <iframe
                ref={iframeRef}
                id="youtube-banner-player"
                src={videoSrc}
                title="Purin Kokoa YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={handleIframeLoad}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-auto"
                style={{
                  width: "100vw",
                  height: "56.25vw",
                  minHeight: "100%",
                  minWidth: "177.78vh",
                }}
              />

            </div>

            {/* ====================================================
                CONTROLS
            ===================================================== */}

            <div className="absolute top-4 right-4 z-40 flex items-center gap-2">

              {/* SOUND */}

              <motion.button
                onClick={toggleVideoSound}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                title={
                  isMuted
                    ? "Aktifkan Suara Video"
                    : "Matikan Suara Video"
                }
                aria-label="Toggle Video Sound"
                className="px-3 py-2 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/25 shadow-xl flex items-center gap-1.5 cursor-pointer transition-colors group"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400" />

                    <span className="text-xs font-bold text-white/90">
                      Unmute
                    </span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#fcaa94]" />

                    <span className="text-xs font-bold text-white/90">
                      Sound On
                    </span>
                  </>
                )}
              </motion.button>

              {/* CLOSE */}

              <motion.button
                onClick={handleStopVideo}
                whileHover={{
                  scale: 1.15,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                title="Tutup Video (Kembali ke Wallpaper)"
                aria-label="Tutup Video"
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/25 shadow-xl flex items-center justify-center cursor-pointer transition-colors group"
              >
                <X className="w-5 h-5 text-white group-hover:text-[#fcaa94] transition-colors" />
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          PLAY BUTTON
      ========================================================= */}

      {!isPlayingVideo && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">

          <motion.button
            onClick={handleStartVideo}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            whileHover={{
              scale: 1.12,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20,
            }}
            title="Play Video (With Sound)"
            aria-label="Play YouTube Stream"
            className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/85 hover:bg-white text-red-600 backdrop-blur-md border-2 border-white/90 shadow-2xl ring-4 ring-white/40 hover:ring-red-400/50 flex items-center justify-center cursor-pointer transition-all duration-300 group"
          >
            <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-red-600 text-red-600 ml-1 group-hover:scale-110 transition-transform" />
          </motion.button>

        </div>
      )}

      {/* ========================================================
          BOTTOM CONTENT
      ========================================================= */}

      <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3.5 sm:left-6 sm:right-6 flex items-end justify-between z-20 pointer-events-none">

        {/* CAROUSEL */}

        <motion.div
          initial={isInitialLoad ? { opacity: 0, y: 35, x: -15 } : { opacity: 1, y: 0, x: 0 }}
          animate={
            isInitialLoad
              ? isLoading
                ? { opacity: 0, y: 35, x: -15 }
                : { opacity: 1, y: 0, x: 0 }
              : { opacity: 1, y: 0, x: 0 }
          }
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-auto"
        >
          <HeroCarousel />
        </motion.div>

        {/* AVATAR */}

        <motion.div
          initial={isInitialLoad ? { opacity: 0, scale: 0.7, x: 20 } : { opacity: 1, scale: 1, x: 0 }}
          animate={
            isInitialLoad
              ? isLoading
                ? { opacity: 0, scale: 0.7, x: 20 }
                : { opacity: 1, scale: 1, x: 0 }
              : { opacity: 1, scale: 1, x: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.25,
          }}
          className="pointer-events-auto relative group"
        >
          <Link
            href="/about"
            className="block relative"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full overflow-hidden border-2 border-white/95 shadow-lg bg-[#fff8f3] group-hover:border-[#fcaa94] group-hover:scale-105 transition-all duration-300 ring-2 ring-[#694231]/20">

              <Image
                src={ppImage}
                alt="Purin Kokoa Avatar"
                fill
                className="object-cover object-center group-hover:rotate-3 transition-transform duration-300"
              />

            </div>

            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#fcaa94] border-2 border-white rounded-full flex items-center justify-center text-[8px] shadow-sm animate-bounce">
              🍮
            </span>

          </Link>
        </motion.div>

      </div>
    </section>
  );
}