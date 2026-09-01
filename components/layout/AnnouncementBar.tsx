"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Radio, Calendar, ExternalLink } from "lucide-react";
import { ScheduleItem } from "../../lib/types/schedule";
import { useLoading } from "../context/LoadingContext";

interface AnnouncementBarProps {
  streams: ScheduleItem[];
}

export default function AnnouncementBar({ streams }: AnnouncementBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isInitialLoad } = useLoading();

  // Find the most recent or active stream
  const activeStream = streams.find((s) => s.status === "live") || streams[0];

  const formatDate = (isoString?: string) => {
    if (!isoString) return "9/1/2026";
    const d = new Date(isoString);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  return (
    <motion.div
      initial={isInitialLoad ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
      animate={
        isInitialLoad
          ? isLoading
            ? { opacity: 0, y: 15 }
            : { opacity: 1, y: 0 }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-40 w-full bg-gradient-to-r from-[#c38a76] via-[#d69883] to-[#c38a76] text-white shadow-xs select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="w-full px-4 sm:px-8 py-2 flex items-center justify-between gap-4">
        {/* Left Side: Date & Stream Title */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <span className="text-xs sm:text-sm font-bold bg-[#694231]/40 px-2.5 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm border border-white/20">
            {formatDate(activeStream?.scheduledAt)}
          </span>

          <div className="flex items-center gap-2 truncate">
            {activeStream?.status === "live" && (
              <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase px-2 py-0.5 bg-red-500 text-white rounded-full animate-pulse shadow-sm">
                <Radio className="w-3 h-3 animate-spin" /> LIVE
              </span>
            )}
            <span className="text-xs sm:text-sm font-medium tracking-wide truncate hover:underline cursor-pointer">
              {activeStream?.title || "Ini Game Horror? 【Panicore!】"}
            </span>
          </div>
        </div>

        {/* Right Side: View Link */}
        <Link
          href={activeStream?.externalUrl || "https://www.youtube.com/@PurinKokoa_"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap hover:text-[#fff8f3] hover:translate-x-0.5 transition-all group shrink-0"
        >
          <span>View</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Expandable Stream Drawer: Expands UPWARDS over the bottom of the wallpaper banner */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.99 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-full left-0 w-full bg-[#694231]/95 backdrop-blur-xl text-[#fff8f3] shadow-2xl border-t border-[#fcaa94]/40 z-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#fcaa94] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Recent & Upcoming Streams
                </span>
                <Link
                  href="/schedule"
                  className="text-xs text-white/80 hover:text-white underline"
                >
                  View Full Weekly Schedule →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {streams.slice(0, 3).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={item.externalUrl || "https://www.youtube.com/@PurinKokoa_"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#fcaa94]/40 transition-all group"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#fcaa94]/20 text-[#fcaa94] flex items-center justify-center shrink-0 mt-0.5">
                        {item.status === "live" ? (
                          <Radio className="w-3.5 h-3.5 text-red-400" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-white group-hover:text-[#fcaa94] truncate transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-white/60 mt-0.5">
                          {new Date(item.scheduledAt).toLocaleDateString("id-ID", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          • {item.category}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
