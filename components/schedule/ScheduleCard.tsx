"use client";

import Link from "next/link";
import { ScheduleItem } from "@/lib/types/schedule";
import { Radio, Play } from "lucide-react";
import { useTranslation, useCurrentLocale } from "@/lib/i18n/client";

interface ScheduleCardProps {
  item: ScheduleItem;
  timezone?: "WIB" | "JST" | "UTC";
}

export default function ScheduleCard({
  item,
  timezone = "WIB",
}: ScheduleCardProps) {
  const { t } = useTranslation("schedule");
  const locale = useCurrentLocale();

  const formatStreamTime = (isoString: string) => {
    const date = new Date(isoString);
    let offsetHours = 7; // WIB (UTC+7)
    if (timezone === "JST") offsetHours = 9;
    if (timezone === "UTC") offsetHours = 0;

    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const targetDate = new Date(utc + 3600000 * offsetHours);

    const dateLocale = locale === "en" ? "en-US" : "id-ID";

    return {
      dateFormatted: targetDate.toLocaleDateString(dateLocale, {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      timeFormatted: targetDate.toLocaleTimeString(dateLocale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { dateFormatted, timeFormatted } = formatStreamTime(item.scheduledAt);

  return (
    <div className="flex flex-col justify-between p-6 sm:p-8 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 hover:shadow-2xl hover:border-[#fcaa94] hover:-translate-y-1.5 transition-all h-full">
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-black uppercase px-3.5 py-1 rounded-full bg-[#fedacb]/70 text-[#694231] border border-[#fcaa94]/50">
            {item.category}
          </span>

          {item.status === "live" ? (
            <span className="flex items-center gap-1.5 text-xs font-black uppercase px-3 py-1 rounded-full bg-red-500 text-white animate-pulse shadow-sm">
              <Radio className="w-3.5 h-3.5" /> {t("card.liveNow")}
            </span>
          ) : item.status === "upcoming" ? (
            <span className="text-xs font-black text-[#c38a76] bg-[#fff8f3] px-3 py-1 rounded-full border border-[#fcaa94]/40">
              {t("card.upcoming")}
            </span>
          ) : (
            <span className="text-xs font-black text-[#694231] bg-[#fedacb]/50 px-3 py-1 rounded-full border border-[#fcaa94]/40">
              {t("card.archive")}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-[#694231] leading-snug">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-sm font-medium text-[#4a2e22] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 mt-6 border-t border-[#c38a76]/15 flex items-center justify-between text-xs">
        <div>
          <div className="font-black text-[#694231] text-sm">
            {dateFormatted}
          </div>
          <div className="text-xs text-[#c38a76] font-extrabold mt-0.5">
            {timeFormatted} {timezone}
          </div>
        </div>

        <Link
          href={item.externalUrl || "https://www.youtube.com/@PurinKokoa/streams"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#694231] text-[#fff8f3] hover:bg-[#c38a76] font-black text-xs shadow-sm transition-all hover:scale-105"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>
            {item.status === "live"
              ? t("card.watchLive")
              : item.status === "archive" || item.status === "completed"
              ? t("card.watchVod")
              : t("card.openStream")}
          </span>
        </Link>
      </div>
    </div>
  );
}
