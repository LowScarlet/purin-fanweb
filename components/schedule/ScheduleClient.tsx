"use client";

import { useState } from "react";
import Link from "next/link";
import { ScheduleItem, ScheduleStatus } from "../../lib/types/schedule";
import { Radio, Calendar, Play, Globe, ExternalLink, Filter } from "lucide-react";

interface ScheduleClientProps {
  initialSchedule: ScheduleItem[];
}

export default function ScheduleClient({ initialSchedule }: ScheduleClientProps) {
  const [activeStatus, setActiveStatus] = useState<ScheduleStatus | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [timezone, setTimezone] = useState<"WIB" | "JST" | "UTC">("WIB");

  const categories = ["all", "Gaming", "Chit-Chat", "Handstream", "Karaoke", "Collab"];

  const filteredSchedule = initialSchedule.filter((item) => {
    if (activeStatus !== "all" && item.status !== activeStatus) return false;
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
    return true;
  });

  const formatStreamTime = (isoString: string) => {
    const date = new Date(isoString);
    let offsetHours = 7; // WIB (UTC+7)
    if (timezone === "JST") offsetHours = 9;
    if (timezone === "UTC") offsetHours = 0;

    // Convert to target timezone
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const targetDate = new Date(utc + 3600000 * offsetHours);

    return {
      dateFormatted: targetDate.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      timeFormatted: targetDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="space-y-8">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#c38a76]/20 shadow-sm">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "live", "upcoming", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeStatus === status
                  ? "bg-[#694231] text-[#fff8f3] shadow-sm scale-105"
                  : "bg-[#fff8f3] text-[#694231]/70 hover:bg-[#fedacb]/60"
              }`}
            >
              {status === "all" ? "Semua" : status}
            </button>
          ))}
        </div>

        {/* Timezone Switcher */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#694231]">
          <Globe className="w-3.5 h-3.5 text-[#c38a76]" />
          <span>Zona Waktu:</span>
          {(["WIB", "JST", "UTC"] as const).map((tz) => (
            <button
              key={tz}
              onClick={() => setTimezone(tz)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                timezone === tz
                  ? "bg-[#fcaa94] text-[#694231]"
                  : "bg-black/5 hover:bg-black/10 text-black/60"
              }`}
            >
              {tz}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-[#c38a76] uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Filter className="w-3 h-3" /> Kategori:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-[#c38a76] text-white"
                : "bg-white text-[#694231]/70 hover:bg-[#fedacb]/40 border border-[#c38a76]/20"
            }`}
          >
            {cat === "all" ? "Semua Kategori" : cat}
          </button>
        ))}
      </div>

      {/* Schedule Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchedule.map((item) => {
          const { dateFormatted, timeFormatted } = formatStreamTime(item.scheduledAt);
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-md hover:border-[#fcaa94] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-[#fedacb]/60 text-[#694231] border border-[#fcaa94]/40">
                    {item.category}
                  </span>

                  {item.status === "live" ? (
                    <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-red-500 text-white animate-pulse">
                      <Radio className="w-3.5 h-3.5" /> LIVE STREAM
                    </span>
                  ) : item.status === "upcoming" ? (
                    <span className="text-xs font-bold text-[#c38a76] bg-[#fff8f3] px-3 py-1 rounded-full border border-[#fcaa94]/30">
                      Upcoming
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-black/40">
                      Completed VOD
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#694231] leading-snug">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-xs text-black/60 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#694231]">{dateFormatted}</div>
                  <div className="text-[11px] text-[#c38a76] font-semibold mt-0.5">
                    {timeFormatted} {timezone}
                  </div>
                </div>

                <Link
                  href={item.externalUrl || "https://www.youtube.com/@PurinKokoa_"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#694231] text-[#fff8f3] hover:bg-[#c38a76] font-bold text-xs shadow-sm transition-all hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{item.status === "live" ? "Tonton Live" : "Buka Stream"}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchedule.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-black/5 text-black/50 space-y-2">
          <p className="text-base font-bold">Tidak ada stream yang sesuai dengan filter.</p>
          <p className="text-xs">Coba pilih tab status atau kategori yang lain ya~ 🍮</p>
        </div>
      )}
    </div>
  );
}
