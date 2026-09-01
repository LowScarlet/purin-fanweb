"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLoading } from "@/components/context/LoadingContext";
import ppImage from "@/public/pp.jpg";

const loadingQuotes = [
  "Membuat cokelat hangat... 🍫",
  "Menyiapkan pudding karamel... 🍮",
  "Menghubungkan ke Purin's Apse... 🐱",
  "Menata miniatur furnitur... 🪑",
  "Memuat kenangan manis bersama Cocoanuts... ✨",
];

export default function LoadingScreen() {
  const { isLoading, finishLoading, enableVideoPlay } = useLoading();
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const videoTriggeredRef = useRef(false);

  useEffect(() => {
    // 1. Cycle quotes
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % loadingQuotes.length);
    }, 600);

    // 2. High-precision continuous 60/120fps progress interpolation
    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds

    let frameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawPercent = Math.min((elapsed / duration) * 100, 100);

      setProgress(rawPercent);

      // Trigger video player preparation as soon as 80% is reached
      if (rawPercent >= 80 && !videoTriggeredRef.current) {
        videoTriggeredRef.current = true;
        enableVideoPlay();
      }

      if (rawPercent < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        // Hold for 250ms at 100% before initiating smooth fade-out exit
        setTimeout(() => {
          finishLoading();
        }, 250);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      clearInterval(quoteInterval);
      cancelAnimationFrame(frameId);
    };
  }, [enableVideoPlay, finishLoading]);

  // Prevent background scrolling while loading screen is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(28px)",
            transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fffcf8] select-none pointer-events-auto overflow-hidden"
        >
          {/* Ambient Warm Glow Blobs with Smooth Fade-Out */}
          <motion.div
            exit={{ opacity: 0, scale: 1.4, transition: { duration: 1.5, ease: "easeOut" } }}
            className="absolute w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-[#fcaa94]/25 blur-3xl -top-12 -left-12 pointer-events-none animate-pulse"
          />
          <motion.div
            exit={{ opacity: 0, scale: 1.4, transition: { duration: 1.5, ease: "easeOut" } }}
            className="absolute w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-[#fedacb]/35 blur-3xl -bottom-12 -right-12 pointer-events-none animate-pulse"
          />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{
              scale: 0.92,
              opacity: 0,
              y: -40,
              transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center max-w-xs sm:max-w-sm px-6 text-center"
          >
            {/* Mascot Avatar with Smooth Sine Wave Bounce */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, -2, 2, 0],
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mb-6"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-[#fcaa94] bg-[#fff8f3]">
                <Image
                  src={ppImage}
                  alt="Purin Kokoa Mascot"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Pudding Mascot Badge */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white shadow-lg border-2 border-[#fcaa94] flex items-center justify-center text-base"
              >
                🍮
              </motion.div>
            </motion.div>

            {/* Title & Tagline */}
            <div className="space-y-1 mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-[#694231] tracking-tight font-sans">
                PURIN KOKOA
              </h1>
              <p className="text-xs font-bold text-[#c38a76] tracking-widest uppercase">
                プリン・ココア • Fan Portal
              </p>
            </div>

            {/* GPU Accelerated 120fps Silky Smooth Progress Bar */}
            <div className="w-full space-y-2 mb-4">
              <div className="relative w-full h-3.5 rounded-full bg-[#fedacb]/60 p-0.5 overflow-hidden shadow-inner border border-[#fcaa94]/40">
                <div
                  className="h-full w-full rounded-full bg-gradient-to-r from-[#fcaa94] via-[#c38a76] to-[#694231] shadow-sm origin-left will-change-transform"
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: "transform 0.05s linear",
                  }}
                />
              </div>

              {/* Percentage & State */}
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#694231]/75 px-1">
                <span className="flex items-center gap-1 text-[#c38a76]">
                  <Sparkles className="w-3 h-3 text-[#fcaa94] animate-spin" />
                  {progress >= 80 ? "Menyiapkan Player..." : "Loading..."}
                </span>
                <span>{Math.floor(progress)}%</span>
              </div>
            </div>

            {/* Rotating Quotes */}
            <div className="h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-semibold text-[#694231]/85 italic font-sans"
                >
                  {loadingQuotes[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
