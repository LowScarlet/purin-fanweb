"use client";

import Link from "next/link";
import { MessageSquare, ExternalLink, ArrowRight } from "lucide-react";
import { useTranslation, useCurrentLocale } from "@/lib/i18n/client";

interface DiscordBannerProps {
  showExploreLink?: boolean;
  buttonText?: string;
  className?: string;
}

export default function DiscordBanner({
  showExploreLink = false,
  buttonText,
  className = "",
}: DiscordBannerProps) {
  const { t } = useTranslation("community");
  const locale = useCurrentLocale();

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#694231] via-[#7d4f3b] to-[#694231] text-white p-8 sm:p-12 shadow-xl border border-[#fcaa94]/40 w-full ${className}`}
    >
      <div className="relative z-10 max-w-2xl space-y-4">
        <span className="text-xs font-black uppercase tracking-wider bg-[#fcaa94] text-[#694231] px-3.5 py-1 rounded-full inline-block shadow-xs">
          {t("banner.badge")}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black font-sans tracking-wide">
          {t("banner.title")}
        </h2>
        <p className="text-sm text-white/90 leading-relaxed font-medium">
          {t("banner.desc")}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href="https://discord.gg/SzvzcQWabE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fcaa94] hover:bg-[#fedacb] text-[#694231] font-black text-sm shadow-lg hover:scale-105 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{buttonText || t("banner.button")}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {showExploreLink ? (
            <Link
              href={`/${locale}/community`}
              className="inline-flex items-center gap-1.5 text-xs font-black text-white/90 hover:text-[#fcaa94] transition-colors"
            >
              <span>{t("banner.explore")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="text-xs font-bold text-white/80">
              {t("banner.members")}
            </span>
          )}
        </div>
      </div>

      {/* Ambient watermark icon */}
      <div className="absolute right-6 -bottom-8 opacity-10 text-9xl pointer-events-none select-none">
        🐱
      </div>
    </div>
  );
}
