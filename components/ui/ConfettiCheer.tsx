"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";
import { useAudio } from "../context/AudioContext";

export default function ConfettiCheer() {
  const [cheerCount, setCheerCount] = useState(1420);
  const [isCheering, setIsCheering] = useState(false);
  const { playVoiceClip } = useAudio();

  const handleCheer = () => {
    setCheerCount((prev) => prev + 1);
    setIsCheering(true);
    setTimeout(() => setIsCheering(false), 300);

    playVoiceClip([523.25, 659.25, 783.99, 1046.5]);

    // Fire cute peach / rose / gold confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#fcaa94", "#c38a76", "#694231", "#fedacb", "#ffffff"],
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCheer}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg transition-all duration-300 ${
          isCheering
            ? "scale-110 bg-[#694231] text-[#fcaa94]"
            : "bg-[#fcaa94] hover:bg-[#fedacb] text-[#694231] hover:scale-105"
        }`}
      >
        <Heart className={`w-4 h-4 fill-current text-[#694231] ${isCheering ? "animate-ping" : ""}`} />
        <span>Cheer Purin!</span>
        <Sparkles className="w-3.5 h-3.5 text-[#694231]" />
      </button>

      <span className="text-xs font-semibold text-[#694231]/70 bg-white/80 px-3 py-1.5 rounded-full border border-[#c38a76]/20 shadow-inner">
        {cheerCount.toLocaleString()} Cheers 🍮
      </span>
    </div>
  );
}
