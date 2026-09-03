"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

import CanvasParticles from "../ui/CanvasParticles";
import HeroCarousel from "../home/HeroCarousel";
import { useLoading } from "../context/LoadingContext";
import { useYouTubePlayer } from "@/lib/hooks/useYouTubePlayer";

import bgImage from "@/public/bg.jpg";
import ppImage from "@/public/pp.jpg";

interface HeaderBannerProps {
  videoId?: string;
}

export default function HeaderBanner({
  videoId = "3xadHYaLobM",
}: HeaderBannerProps) {
  const { isLoading, isInitialLoad } = useLoading();
  const {
    iframeRef,
    videoSrc,
    isPlayingVideo,
    isMuted,
    canPlayVideo,
    handleStartVideo,
    handleStopVideo,
    toggleVideoSound,
    handleIframeLoad,
  } = useYouTubePlayer({ videoId });

  /*
   * ------------------------------------------------------------
   * Render
   * ------------------------------------------------------------
   */

  return (
    <section className="relative w-full aspect-[16/9] sm:aspect-auto sm:flex-1 min-h-0 overflow-hidden select-none bg-[#fffcf8]">

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
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#24130c] via-[#351c12] to-[#24130c] pointer-events-auto">
              {/* Ambient Glow Backdrop for Mobile Aspect Bars */}
              <div className="absolute inset-0 z-0 sm:hidden pointer-events-none overflow-hidden">
                <Image
                  src={bgImage}
                  alt="Ambient Glow"
                  fill
                  className="object-cover blur-2xl scale-125 opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#24130c]/80 via-transparent to-[#24130c]/80" />
              </div>

              <iframe
                ref={iframeRef}
                id="youtube-banner-player"
                src={videoSrc}
                title="Purin Kokoa YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={handleIframeLoad}
                className="relative z-10 w-full h-full scale-[1.25] origin-center sm:scale-110 sm:w-[100vw] sm:h-[56.25vw] sm:min-h-full sm:min-w-[177.78vh] sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 border-0 pointer-events-none"
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
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/25 shadow-xl flex items-center justify-center cursor-pointer transition-colors group"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-[#fcaa94] transition-colors" />
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
            className="pointer-events-auto w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/85 hover:bg-white text-red-600 backdrop-blur-md border-2 border-white/90 shadow-2xl ring-4 ring-white/40 hover:ring-red-400/50 flex items-center justify-center cursor-pointer transition-all duration-300 group"
          >
            <Play className="w-6 h-6 sm:w-9 sm:h-9 fill-red-600 text-red-600 ml-0.5 sm:ml-1 group-hover:scale-110 transition-transform" />
          </motion.button>

        </div>
      )}

      {/* ========================================================
          BOTTOM CONTENT
      ========================================================= */}

      <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-3.5 sm:left-6 sm:right-6 flex items-end justify-between z-20 pointer-events-none">

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
            <div className="relative w-11 h-11 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full overflow-hidden border-2 border-white/95 shadow-lg bg-[#fff8f3] group-hover:border-[#fcaa94] group-hover:scale-105 transition-all duration-300 ring-2 ring-[#694231]/20">

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