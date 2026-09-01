"use client";

import Link from "next/link";
import { ScheduleItem } from "../../lib/types/schedule";
import { NewsArticle } from "../../lib/types/news";
import { VoiceClip } from "../../lib/types/sound";
import { Radio, Calendar, Play, Sparkles, Volume2, ArrowRight } from "lucide-react";
import ConfettiCheer from "../ui/ConfettiCheer";
import { useAudio } from "../context/AudioContext";

interface FeaturedStreamsProps {
  schedule: ScheduleItem[];
  news: NewsArticle[];
  voiceClips: VoiceClip[];
}

export default function FeaturedStreams({ schedule, news, voiceClips }: FeaturedStreamsProps) {
  const { playVoiceClip } = useAudio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Top Banner Row: Interactive Cheer & Welcome Snippet */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-[#fff8f3] via-[#fedacb]/40 to-[#fff8f3] border border-[#fcaa94]/40 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c38a76]">
            <Sparkles className="w-3.5 h-3.5" /> Welcome to Purin Kokoa Fan Portal
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#694231] mt-1 font-sans">
            Tempat Hangat untuk Semua Cocoanuts! 🍮✨
          </h2>
          <p className="text-xs sm:text-sm text-[#694231]/80 mt-1 max-w-xl">
            Ikuti jadwal live stream, dengarkan cuplikan suara lucu Purin, baca berita terbaru, dan gabung komunitas Discord Purin&apos;s Apse!
          </p>
        </div>

        <ConfettiCheer />
      </div>

      {/* Grid: Featured Live Streams & Soundboard Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Weekly Highlights & Streams */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#694231] flex items-center gap-2 uppercase tracking-wide">
              <Calendar className="w-4 h-4 text-[#c38a76]" /> Jadwal & Highlight Stream
            </h3>
            <Link
              href="/schedule"
              className="text-xs font-bold text-[#c38a76] hover:text-[#694231] flex items-center gap-1 group"
            >
              Lihat Semua Jadwal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schedule.slice(0, 4).map((stream) => (
              <Link
                key={stream.id}
                href={stream.externalUrl || "https://www.youtube.com/@PurinKokoa_"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-md hover:border-[#fcaa94] hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#fedacb]/60 text-[#694231] border border-[#fcaa94]/40">
                      {stream.category}
                    </span>
                    {stream.status === "live" ? (
                      <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500 text-white animate-pulse">
                        <Radio className="w-3 h-3" /> LIVE NOW
                      </span>
                    ) : (
                      <span className="text-[11px] text-black/50 font-medium">
                        {new Date(stream.scheduledAt).toLocaleDateString("id-ID", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors line-clamp-2 leading-snug">
                    {stream.title}
                  </h4>

                  {stream.description && (
                    <p className="text-xs text-black/60 mt-2 line-clamp-2">
                      {stream.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/5 text-xs text-[#c38a76] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Play className="w-3 h-3 fill-current" /> Tonton di YouTube
                  </span>
                  <span className="text-[11px] text-black/40 font-normal">
                    {new Date(stream.scheduledAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    WIB
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Soundboard & Purin Voice Clips */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#694231] flex items-center gap-2 uppercase tracking-wide">
              <Volume2 className="w-4 h-4 text-[#c38a76]" /> Purin Soundboard
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c38a76] bg-[#fcaa94]/20 px-2 py-0.5 rounded-full">
              Interactive
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#c38a76]/20 shadow-sm space-y-4">
            <p className="text-xs text-[#694231]/80">
              Klik tombol di bawah untuk mendengar sapaan dan suara menggemaskan Purin Kokoa! 🍮
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {voiceClips.map((clip) => (
                <button
                  key={clip.id}
                  onClick={() => playVoiceClip(clip.synthFrequency)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#fff8f3] hover:bg-[#fedacb]/60 border border-[#fcaa94]/30 hover:border-[#fcaa94] text-left transition-all duration-200 group"
                >
                  <div>
                    <div className="text-xs font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors">
                      {clip.title}
                    </div>
                    {clip.japaneseText && (
                      <div className="text-[11px] text-[#c38a76] font-medium mt-0.5">
                        {clip.japaneseText}
                      </div>
                    )}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white text-[#694231] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/about"
                className="text-xs font-bold text-[#c38a76] hover:underline"
              >
                Kenali Lore & Profil Lengkap Purin →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Latest News Carousel Cards */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#694231] flex items-center gap-2 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-[#c38a76]" /> Berita & Pengumuman Terbaru
          </h3>
          <Link
            href="/news"
            className="text-xs font-bold text-[#c38a76] hover:text-[#694231] flex items-center gap-1 group"
          >
            Semua Berita <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-md hover:border-[#fcaa94] hover:-translate-y-1 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2.5">
                  <span className="font-bold text-[#c38a76] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-black/40">
                    {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-black/60 mt-2 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 text-xs text-[#c38a76] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Baca Selengkapnya →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
