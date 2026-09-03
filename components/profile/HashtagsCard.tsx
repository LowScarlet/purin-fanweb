"use client";

import { Profile } from "@/lib/types/profile";
import { Tag } from "lucide-react";
import CopyChip from "@/components/ui/CopyChip";
import { useTranslation } from "@/lib/i18n/client";

interface HashtagsCardProps {
  profile: Profile;
  className?: string;
  hideHeader?: boolean;
}

export default function HashtagsCard({
  profile,
  className = "",
  hideHeader = false,
}: HashtagsCardProps) {
  const { t } = useTranslation("about");

  return (
    <div
      className={`p-6 sm:p-10 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 space-y-4 ${className}`}
    >
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#694231] flex items-center gap-2 uppercase tracking-wide">
            <Tag className="w-4 h-4 text-[#c38a76]" /> {t("hashtags.title")}
          </h3>
          <span className="text-[10px] font-black text-[#c38a76] bg-[#fedacb]/70 px-2.5 py-0.5 rounded-full border border-[#fcaa94]/40">
            {t("hashtags.badge")}
          </span>
        </div>
      )}

      <p className="text-center text-xs sm:text-sm font-medium text-[#694231]/80 max-w-lg mx-auto">
        {t("hashtags.desc")}
      </p>

      {/* 3 Columns Layout with Centered Bottom Row */}
      <div className="flex flex-wrap justify-center gap-3.5 pt-2">
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc((100%-28px)/3)] flex-none">
          <CopyChip
            textToCopy={profile.officialTags.general}
            subLabel={t("hashtags.general")}
            className="w-full h-full justify-between py-3 px-4"
          />
        </div>
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc((100%-28px)/3)] flex-none">
          <CopyChip
            textToCopy={profile.officialTags.live}
            subLabel={t("hashtags.live")}
            className="w-full h-full justify-between py-3 px-4"
          />
        </div>
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc((100%-28px)/3)] flex-none">
          <CopyChip
            textToCopy={profile.officialTags.fanart}
            subLabel={t("hashtags.fanart")}
            className="w-full h-full justify-between py-3 px-4 border-[#fcaa94] bg-[#fff8f3]"
          />
        </div>
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc((100%-28px)/3)] flex-none">
          <CopyChip
            textToCopy={profile.officialTags.clips}
            subLabel={t("hashtags.clips")}
            className="w-full h-full justify-between py-3 px-4"
          />
        </div>
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc((100%-28px)/3)] flex-none">
          <CopyChip
            textToCopy={profile.fanMark || "🍮🍫"}
            subLabel={t("hashtags.mark")}
            className="w-full h-full justify-between py-3 px-4"
          />
        </div>
      </div>
    </div>
  );
}
