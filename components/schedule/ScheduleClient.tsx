"use client";

import { useState } from "react";
import { ScheduleItem, ScheduleStatus } from "@/lib/types/schedule";
import { Globe, Filter } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import ScheduleCard from "./ScheduleCard";
import { useTranslation } from "@/lib/i18n/client";

interface ScheduleClientProps {
  initialSchedule: ScheduleItem[];
}

export default function ScheduleClient({ initialSchedule }: ScheduleClientProps) {
  const { t } = useTranslation("schedule");
  const [activeStatus, setActiveStatus] = useState<ScheduleStatus | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [timezone, setTimezone] = useState<"WIB" | "JST" | "UTC">("WIB");

  const categories = ["all", "Gaming", "Chit-Chat", "Handstream", "Karaoke", "Collab"];

  const filteredSchedule = initialSchedule.filter((item) => {
    if (activeStatus !== "all") {
      if (activeStatus === "archive" && item.status !== "archive" && item.status !== "completed") return false;
      if (activeStatus !== "archive" && item.status !== activeStatus) return false;
    }
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
    return true;
  });

  const statusTabs = [
    { id: "all", label: t("status.all") },
    { id: "live", label: t("status.live") },
    { id: "upcoming", label: t("status.upcoming") },
    { id: "archive", label: t("status.archive") },
  ] as const satisfies ReadonlyArray<{ id: ScheduleStatus | "all"; label: string }>;

  return (
    <div className="space-y-8">
      {/* --------------------------------------------------------
          HOLOLIVE FC STYLE PILL CONTROLS & TIMEZONE SWITCHER
      --------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStatus(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-sm ${
                activeStatus === tab.id
                  ? "bg-[#fcaa94] text-[#694231] border border-[#fcaa94] scale-105"
                  : "bg-white text-[#694231] border border-[#c38a76]/20 hover:bg-[#fff8f3] hover:border-[#fcaa94]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timezone Switcher */}
        <div className="flex items-center gap-2 text-xs font-black text-[#694231]">
          <Globe className="w-4 h-4 text-[#c38a76]" />
          <span>{t("timezone")}</span>
          <div className="flex items-center gap-1.5">
            {(["WIB", "JST", "UTC"] as const).map((tz) => (
              <button
                key={tz}
                onClick={() => setTimezone(tz)}
                className={`px-3 py-1 rounded-full text-xs font-black transition-all shadow-xs ${
                  timezone === tz
                    ? "bg-[#694231] text-white"
                    : "bg-[#fff8f3] hover:bg-[#fedacb]/60 text-[#694231] border border-[#c38a76]/20"
                }`}
              >
                {tz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1">
        <span className="text-xs font-black text-[#c38a76] uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Kategori:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
              selectedCategory === cat
                ? "bg-[#c38a76] text-white border border-[#c38a76]"
                : "bg-white text-[#694231] hover:bg-[#fff8f3] border border-[#c38a76]/20"
            }`}
          >
            {cat === "all" ? "Semua Kategori" : cat}
          </button>
        ))}
      </div>

      {/* Schedule Items Grid with Hololive FC Stadium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchedule.map((item, idx) => (
          <AnimatedSection key={item.id} delay={0.08 * idx}>
            <ScheduleCard item={item} timezone={timezone} />
          </AnimatedSection>
        ))}
      </div>

      {filteredSchedule.length === 0 && (
        <div className="p-12 text-center rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-md">
          <p className="text-sm font-black text-[#694231]">
            {t("empty")}
          </p>
        </div>
      )}
    </div>
  );
}
