"use client";

import { Volume2, Sparkles } from "lucide-react";
import { VoiceClip } from "@/lib/types/sound";
import { useAudio } from "@/components/context/AudioContext";
import { useTranslation } from "@/lib/i18n/client";

interface SoundboardCardProps {
  voiceClips: VoiceClip[];
  className?: string;
}

export default function SoundboardCard({
  voiceClips,
  className = "",
}: SoundboardCardProps) {
  const { playVoiceClip } = useAudio();
  const { t } = useTranslation("about");

  return (
    <div
      className={`p-6 sm:p-10 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#694231] flex items-center gap-2 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-[#c38a76]" /> {t("soundboard.title")}
        </h3>
        <span className="text-[10px] font-black text-[#c38a76] bg-[#fedacb]/70 px-2.5 py-0.5 rounded-full border border-[#fcaa94]/40">
          {t("soundboard.badge")}
        </span>
      </div>

      <p className="text-center text-xs sm:text-sm font-medium text-[#694231]/80 max-w-lg mx-auto">
        {t("soundboard.desc")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {voiceClips.map((clip) => (
          <button
            key={clip.id}
            onClick={() => playVoiceClip(clip.synthFrequency)}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#fff8f3] hover:bg-[#fedacb]/60 border border-[#fcaa94]/30 hover:border-[#fcaa94] text-left transition-all duration-200 group cursor-pointer shadow-xs hover:scale-[1.02]"
          >
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-[#c38a76] block mb-0.5">
                {clip.category}
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors">
                {clip.title}
              </div>
              {clip.japaneseText && (
                <div className="text-[11px] text-[#c38a76] font-medium mt-0.5 font-mono">
                  {clip.japaneseText}
                </div>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-white text-[#694231] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[#fcaa94] transition-all shrink-0 ml-3">
              <Volume2 className="w-4 h-4 text-[#694231]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
