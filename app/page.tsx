import Image from "next/image";
import Link from "next/link";
import { repositories } from "@/lib/repositories";
import HeaderBanner from "@/components/layout/HeaderBanner";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import TypingText from "@/components/ui/TypingText";
import ppImage from "@/public/pp.jpg";

import {
  Sparkles,
  Calendar,
  Radio,
  Users,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Tag,
  Palette,
  Heart,
  BookOpen,
  Play,
  Cat,
  Flame,
} from "lucide-react";

export const revalidate = 60; // Refresh static cache periodically

export default async function Home() {
  const [profile, schedule, news, communityLinks, communityProjects] =
    await Promise.all([
      repositories.profile.getProfile(),
      repositories.schedule.getAll(),
      repositories.news.getAll(),
      repositories.community.getLinks(),
      repositories.community.getProjects(),
    ]);

  const activeStream = schedule.find((s) => s.status === "live") || schedule[0];

  // Extract YouTube Video ID from external URL if available
  const extractVideoId = (url?: string) => {
    if (!url) return "3xadHYaLobM";
    const match = url.match(
      /(?:v=|\/embed\/|youtu\.be\/|\/v\/|\/e\/|watch\?v=)([^#&?]*).*/
    );
    return match && match[1]?.length === 11 ? match[1] : "3xadHYaLobM";
  };

  const activeVideoId = extractVideoId(activeStream?.externalUrl);
  const latestNews = news.slice(0, 3);
  const upcomingStreams = schedule.filter((s) => s.status !== "completed").slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fffcf8]">
      {/* 1. HERO BANNER AREA (Compact on mobile, exact 100dvh minus Navbar on desktop) */}
      <div className="flex flex-col justify-between h-[48vh] min-h-[300px] sm:h-[calc(100dvh-88px)] w-full bg-[#fffcf8] overflow-hidden transition-all duration-300">
        <HeaderBanner videoId={activeVideoId} />
        <AnnouncementBar streams={schedule} />
      </div>

      {/* 2. STICKY NAVBAR (Direct child of root container for true continuous sticky top) */}
      <Navbar />

      {/* 3. MAIN HOMEPAGE SECTIONS */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20 flex-1">

        {/* ========================================================
            JUMBOTRON HERO INTRODUCTION BANNER
        ========================================================= */}
        <AnimatedSection delay={0.05}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fff8f3] to-[#fedacb]/30 border border-[#fcaa94]/50 shadow-xl shadow-[#694231]/5 p-6 sm:p-10 md:p-12 transition-all duration-300">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#fcaa94] via-[#c38a76] to-[#694231]" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-10 pt-2">
              {/* Mascot Avatar with Sparkling Ring */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#fcaa94]/50 shrink-0 group">
                <Image
                  src={ppImage}
                  alt={profile.name}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#fcaa94] border-2 border-white rounded-full flex items-center justify-center text-xs shadow">
                  🍮
                </div>
              </div>

              {/* Jumbotron Intro Text & CTA Buttons */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcaa94]/30 border border-[#fcaa94]/50 text-xs font-black text-[#694231] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#c38a76]" /> Official Fan Portal & Hub
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#694231] tracking-tight font-sans">
                    Selamat Datang di Purin Kokoa Portal 🍮
                  </h1>

                  <p className="text-xs sm:text-sm font-semibold text-[#c38a76] font-mono">
                    <TypingText
                      text="Your Sweet & Cozy Pudding VTuber Chocolatier Fan Community Hub! 🍫🐱"
                      speed={20}
                      delay={200}
                    />
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#694231]/85 leading-relaxed max-w-2xl font-normal">
                  Tempat berkumpulnya komunitas <strong className="font-bold text-[#694231]">Cocoanuts</strong> dari seluruh dunia! Temukan jadwal live stream terupdate, official lore, reference sheet, galeri karya komunitas, hingga ruang mabar Discord.
                </p>

                {/* Jumbotron Quick Actions */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#694231] hover:bg-[#c38a76] text-white text-xs font-extrabold shadow-md hover:scale-105 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-[#fcaa94]" />
                    <span>Profil & Lore Resmi</span>
                  </Link>

                  <Link
                    href="/schedule"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fedacb] hover:bg-[#fcaa94] text-[#694231] text-xs font-extrabold border border-[#fcaa94]/50 shadow-sm hover:scale-105 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-[#c38a76]" />
                    <span>Jadwal Live Stream</span>
                  </Link>

                  <Link
                    href="/community"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#fff8f3] text-[#694231] text-xs font-bold border border-[#c38a76]/30 shadow-xs hover:scale-105 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-[#c38a76]" />
                    <span>Join Discord (2.4k+)</span>
                  </Link>
                </div>

                {/* 4 Quick Stat Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-black/5">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#fcaa94]/30 text-center">
                    <div className="text-[10px] text-black/50 uppercase font-bold">Role</div>
                    <div className="text-xs font-black text-[#694231] truncate">Chocolatier 🐱</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#fcaa94]/30 text-center">
                    <div className="text-[10px] text-black/50 uppercase font-bold">Birthday</div>
                    <div className="text-xs font-black text-[#694231]">{profile.birthday}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#fcaa94]/30 text-center">
                    <div className="text-[10px] text-black/50 uppercase font-bold">Fan Base</div>
                    <div className="text-xs font-black text-[#694231]">Cocoanuts 🍮</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#fcaa94]/30 text-center">
                    <div className="text-[10px] text-black/50 uppercase font-bold">Art Tag</div>
                    <div className="text-xs font-black text-[#694231]">{profile.officialTags.fanart}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            SECTION 1: QUICK FEATURE HUB (3 Cards)
        ========================================================= */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: About & Lore */}
            <Link
              href="/about"
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-xl hover:border-[#fcaa94] hover:-translate-y-1.5 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 flex items-center justify-center text-[#694231] group-hover:bg-[#fcaa94] group-hover:scale-110 transition-all shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c38a76]">
                    Official Profile & Lore
                  </span>
                  <h2 className="text-lg font-black text-[#694231] mt-0.5 group-hover:text-[#c38a76] transition-colors">
                    Mengenal Purin Kokoa 🍫
                  </h2>
                  <p className="text-xs text-black/65 mt-2 leading-relaxed line-clamp-3">
                    {profile.bio}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#c38a76] font-bold">
                <span>Baca Profil & Reference Sheet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Live Stream Schedule */}
            <Link
              href="/schedule"
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-xl hover:border-[#fcaa94] hover:-translate-y-1.5 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 flex items-center justify-center text-[#694231] group-hover:bg-[#fcaa94] group-hover:scale-110 transition-all shadow-xs">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c38a76]">
                    Weekly Timetable
                  </span>
                  <h2 className="text-lg font-black text-[#694231] mt-0.5 group-hover:text-[#c38a76] transition-colors">
                    Jadwal Live Stream 🎙️
                  </h2>
                  <p className="text-xs text-black/65 mt-2 leading-relaxed line-clamp-3">
                    Pantau siaran game horror, chit-chat, karaoke, dan unboxing bersama Cocoanuts dalam zona waktu WIB & JST.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#c38a76] font-bold">
                <span>Lihat Jadwal Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Community Discord */}
            <Link
              href="/community"
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-xl hover:border-[#fcaa94] hover:-translate-y-1.5 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 flex items-center justify-center text-[#694231] group-hover:bg-[#fcaa94] group-hover:scale-110 transition-all shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c38a76]">
                    Cocoanuts Community
                  </span>
                  <h2 className="text-lg font-black text-[#694231] mt-0.5 group-hover:text-[#c38a76] transition-colors">
                    Komunitas Purin&apos;s Apse 🐾
                  </h2>
                  <p className="text-xs text-black/65 mt-2 leading-relaxed line-clamp-3">
                    Bergabung di server Discord resmi, bagikan fanart kreatif, mabar bareng, dan ikuti proyek seru komunitas.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#c38a76] font-bold">
                <span>Jelajahi Hub Komunitas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>
        </AnimatedSection>

        {/* ========================================================
            SECTION 2: LATEST NEWS & ANNOUNCEMENTS
        ========================================================= */}
        <AnimatedSection delay={0.15}>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c38a76]">
                  <Sparkles className="w-4 h-4" /> Announcements
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#694231] mt-0.5">
                  Berita & Update Terkini 🍮
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c38a76] hover:underline"
              >
                <span>Lihat Semua Berita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="flex flex-col justify-between p-6 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-md hover:border-[#fcaa94] hover:-translate-y-1 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold text-[#694231] bg-[#fedacb]/60 px-3 py-0.5 rounded-full border border-[#fcaa94]/40 uppercase tracking-wider text-[10px]">
                        {article.category}
                      </span>
                      <span className="text-black/40 flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-black/65 mt-2 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#c38a76] font-bold">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            SECTION 3: UPCOMING STREAMS TIMETABLE
        ========================================================= */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c38a76]">
                  <Radio className="w-4 h-4 text-red-500" /> Upcoming Broadcasts
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#694231] mt-0.5">
                  Jadwal Siaran Terdekat 🎙️
                </h2>
              </div>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c38a76] hover:underline"
              >
                <span>Lihat Seluruh Jadwal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcomingStreams.map((item) => {
                const streamDate = new Date(item.scheduledAt);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between p-6 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-md hover:border-[#fcaa94] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold uppercase px-3 py-0.5 rounded-full bg-[#fedacb]/60 text-[#694231] border border-[#fcaa94]/40 text-[10px]">
                          {item.category}
                        </span>

                        {item.status === "live" ? (
                          <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-500 text-white animate-pulse">
                            <Radio className="w-3 h-3" /> LIVE NOW
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-[#c38a76] bg-[#fff8f3] px-2.5 py-0.5 rounded-full border border-[#fcaa94]/30">
                            Upcoming
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[#694231] leading-snug">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-black/60 mt-1.5 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-[#694231]">
                          {streamDate.toLocaleDateString("id-ID", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                        <div className="text-[11px] text-[#c38a76] font-semibold">
                          {streamDate.toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          WIB
                        </div>
                      </div>

                      <Link
                        href={item.externalUrl || "https://www.youtube.com/@PurinKokoa_"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#694231] text-[#fff8f3] hover:bg-[#c38a76] font-bold text-xs shadow-sm transition-all hover:scale-105"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Buka Stream</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            SECTION 4: OFFICIAL HASHTAGS & BRAND PALETTE QUICK REF
        ========================================================= */}
        <AnimatedSection delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Official Hashtags */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#694231] flex items-center gap-2 uppercase tracking-wide">
                <Tag className="w-4 h-4 text-[#c38a76]" /> Official Hashtags
              </h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">General</span>
                  <span className="font-extrabold text-[#694231] text-xs sm:text-sm">{profile.officialTags.general}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">Live Stream</span>
                  <span className="font-extrabold text-[#694231] text-xs sm:text-sm">{profile.officialTags.live}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">Fanart</span>
                  <span className="font-extrabold text-[#694231] text-xs sm:text-sm">{profile.officialTags.fanart}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">Clips</span>
                  <span className="font-extrabold text-[#694231] text-xs sm:text-sm">{profile.officialTags.clips}</span>
                </div>
              </div>
            </div>

            {/* Official Brand Palette */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#694231] flex items-center gap-2 uppercase tracking-wide">
                <Palette className="w-4 h-4 text-[#c38a76]" /> Official Colors
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/35 space-y-2">
                  <div className="w-full h-8 rounded-lg bg-[#fcaa94] shadow-xs" />
                  <span className="text-[11px] font-bold text-[#694231] block">Peach</span>
                  <code className="text-[10px] font-mono text-black/60 bg-white px-1.5 py-0.5 rounded border border-[#fcaa94]/40 block">
                    #fcaa94
                  </code>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/35 space-y-2">
                  <div className="w-full h-8 rounded-lg bg-[#c38a76] shadow-xs" />
                  <span className="text-[11px] font-bold text-[#694231] block">Terracotta</span>
                  <code className="text-[10px] font-mono text-black/60 bg-white px-1.5 py-0.5 rounded border border-[#c38a76]/40 block">
                    #c38a76
                  </code>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/35 space-y-2">
                  <div className="w-full h-8 rounded-lg bg-[#694231] shadow-xs" />
                  <span className="text-[11px] font-bold text-[#694231] block">Cocoa</span>
                  <code className="text-[10px] font-mono text-black/60 bg-white px-1.5 py-0.5 rounded border border-[#694231]/30 block">
                    #694231
                  </code>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            SECTION 5: COMMUNITY DISCORD CTA BANNER
        ========================================================= */}
        <AnimatedSection delay={0.3}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#694231] via-[#7d4f3b] to-[#694231] text-white p-8 sm:p-12 shadow-xl border border-[#fcaa94]/30">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#fcaa94] text-[#694231] px-3 py-1 rounded-full inline-block">
                Join The Community
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-sans tracking-wide">
                Bergabunglah Bersama 2,400+ Cocoanuts! 🍮
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Nikmati serunya interaksi bersama sesama penggemar Purin Kokoa di Discord: info stream paling update, ruang diskusi fanart, mabar game, bot interaktif, dan event komunitas seru.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="https://discord.gg/purin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fcaa94] hover:bg-[#fedacb] text-[#694231] font-extrabold text-sm shadow-lg hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Gabung Discord Sekarang</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-[#fcaa94] transition-colors"
                >
                  <span>Lihat Proyek & Fan Inisiatif</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Ambient watermark icon */}
            <div className="absolute right-6 -bottom-8 opacity-10 text-9xl pointer-events-none select-none">
              🐱
            </div>
          </div>
        </AnimatedSection>

      </main>

      <Footer />
    </div>
  );
}
