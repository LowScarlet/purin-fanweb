import Image from "next/image";
import Link from "next/link";
import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import {
  ShieldAlert,
  Award,
  Tag,
  ExternalLink,
  BookOpen,
  Palette,
  Sparkles,
  Calendar,
  Ruler,
  Clock,
  Heart,
  Maximize2,
  Cat,
} from "lucide-react";
import ppImage from "@/public/pp.jpg";
import TypingText from "@/components/ui/TypingText";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "About Purin Kokoa - Lore, Reference Sheet & Profile",
  description: "Profil lengkap, lore resmi, reference sheet, palet warna, milestone, dan tata tertib streaming Purin Kokoa.",
};

export default async function AboutPage() {
  const [profile, timeline] = await Promise.all([
    repositories.profile.getProfile(),
    repositories.timeline.getAll(),
  ]);

  return (
    <SubpageLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">

        {/* ========================================================
            1. HERO PROFILE CARD
        ========================================================= */}
        <AnimatedSection delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm border border-[#fcaa94]/40 shadow-xl shadow-[#694231]/5 p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl">
            {/* Subtle Ambient Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#fcaa94] via-[#c38a76] to-[#694231]" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-10 pt-2">
              {/* Avatar Profile Picture with Cute Ring */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#fcaa94]/60 shrink-0 group">
                <Image
                  src={ppImage}
                  alt={profile.name}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#fcaa94] border-2 border-white rounded-full flex items-center justify-center text-[10px] shadow">
                  🍮
                </div>
              </div>

              {/* Profile Info Details */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <h1 className="text-3xl sm:text-4xl font-black text-[#694231] tracking-tight">
                      {profile.name}
                    </h1>
                    <span className="text-xs sm:text-sm font-bold text-[#c38a76] bg-[#fedacb]/60 border border-[#fcaa94]/40 px-3 py-1 rounded-full">
                      {profile.japaneseName}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <p className="text-xs sm:text-sm font-bold text-[#c38a76] font-mono">
                      {profile.handle}
                    </p>
                    <span className="text-xs text-black/30">•</span>
                    <span className="text-xs font-semibold text-[#694231]/80">
                      <TypingText text={profile.tagline} speed={25} delay={300} />
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#694231]/90 leading-relaxed max-w-2xl font-normal">
                  {profile.bio}
                </p>

                {/* 4 Quick Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/35 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" /> Ulang Tahun
                    </div>
                    <div className="text-xs sm:text-sm font-black text-[#694231] mt-1">
                      {profile.birthday}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/35 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1">
                      <Ruler className="w-3 h-3" /> Tinggi Badan
                    </div>
                    <div className="text-xs sm:text-sm font-black text-[#694231] mt-1">
                      {profile.height}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/35 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" /> Debut Date
                    </div>
                    <div className="text-xs sm:text-sm font-black text-[#694231] mt-1">
                      {new Date(profile.debutDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/35 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1">
                      <Heart className="w-3 h-3" /> Fan Name
                    </div>
                    <div className="text-xs sm:text-sm font-black text-[#694231] mt-1 truncate" title={profile.fanName}>
                      {profile.fanName}
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {profile.socials.map((s) => (
                    <Link
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#694231] hover:bg-[#c38a76] text-[#fff8f3] text-xs font-bold transition-all duration-200 shadow-sm hover:scale-105"
                    >
                      <span>{s.label}</span>
                      <ExternalLink className="w-3 h-3 text-[#fcaa94]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            2. OFFICIAL LORE (STORY)
        ========================================================= */}
        <AnimatedSection delay={0.15}>
          <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-[#fcaa94]/40 shadow-lg p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#c38a76]">
              <BookOpen className="w-4 h-4 text-[#c38a76]" /> Official Lore
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#694231] flex items-center gap-2">
              The Story of Purin Kokoa 🍫🐱
            </h2>

            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#fff8f3] to-[#fedacb]/20 border border-[#fcaa94]/35 text-[#694231] text-sm sm:text-base leading-relaxed space-y-3 font-sans shadow-inner">
              <p>
                <strong className="text-[#694231] font-bold">Purin Kokoa</strong> is a half-cat-half-human chocolatier. She was once a cat that was adopted by a chocolatier.
              </p>
              <p>
                Because of her admiration to her owner, she always wanted to be a chocolatier and serve the customers herself. One day, while walking outside, she got lost and ended up in a forest. Out of nowhere, a purple-haired fairy godmother found her and offered to grant her wish.
              </p>
              <p className="font-bold text-[#c38a76] text-base pt-1">
                ✨ She said yes, and now she is a chocolatier and has her own chocolate shop. Come and join her in her chocolate shop! 🍮
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            3. FULL-WIDTH REFERENCE SHEET SHOWCASE
        ========================================================= */}
        <AnimatedSection delay={0.2}>
          <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-[#fcaa94]/40 shadow-lg p-6 sm:p-10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#c38a76]">
                  <Cat className="w-4 h-4 text-[#c38a76]" /> Character Design
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#694231] mt-0.5">
                  Reference Sheet
                </h2>
              </div>

              <Link
                href="/reference-sheet.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#694231] hover:bg-[#c38a76] text-white text-xs font-bold transition-all duration-200 shadow-sm self-start sm:self-auto hover:scale-105"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#fcaa94]" />
                <span>Buka Resolusi Asli</span>
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-[#694231]/80 leading-relaxed max-w-2xl">
              Desain resmi model VTuber Purin Kokoa: Pandangan depan, samping, belakang, aksesoris pita cokelat, dan ekspresi wajah.
            </p>

            {/* Panoramic Reference Sheet Viewer */}
            <Link
              href="/reference-sheet.png"
              target="_blank"
              rel="noopener noreferrer"
              title="Klik untuk melihat resolusi penuh"
              className="relative w-full h-64 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden border border-[#fcaa94]/50 bg-gradient-to-b from-[#fffcf8] to-[#fff5ee] flex items-center justify-center group cursor-zoom-in block shadow-inner"
            >
              <Image
                src="/reference-sheet.png"
                alt="Purin Kokoa Full Reference Sheet"
                fill
                className="object-contain p-3 sm:p-5 group-hover:scale-103 transition-transform duration-500"
              />
              {/* Hover Floating Overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="px-4 py-2 rounded-full bg-white/90 text-[#694231] text-xs font-bold backdrop-blur-md shadow-lg flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#c38a76]" /> Klik untuk Zoom Resolusi Penuh
                </div>
              </div>
            </Link>
          </div>
        </AnimatedSection>

        {/* ========================================================
            4. COLOR PALETTE
        ========================================================= */}
        <AnimatedSection delay={0.25}>
          <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-[#fcaa94]/40 shadow-lg p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#c38a76]">
              <Palette className="w-4 h-4 text-[#c38a76]" /> Official Theme
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#694231]">
                Color Palette
              </h2>
              <p className="text-xs sm:text-sm text-[#694231]/80 mt-1">
                Panduan kode warna resmi untuk pembuatan fanart, grafis, dan aset komunitas Purin Kokoa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Peach Coral */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 shadow-xs hover:border-[#fcaa94] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#fcaa94] shadow-md border-2 border-white shrink-0" />
                <div className="flex-1">
                  <span className="text-xs font-black text-[#694231] block">Peach Coral</span>
                  <span className="text-[11px] text-[#c38a76] block mb-1">Primary Accent</span>
                  <code className="font-mono text-xs font-bold text-[#694231] bg-white px-2 py-0.5 rounded border border-[#fcaa94]/50">
                    #fcaa94
                  </code>
                </div>
              </div>

              {/* Rose Terracotta */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 shadow-xs hover:border-[#c38a76] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#c38a76] shadow-md border-2 border-white shrink-0" />
                <div className="flex-1">
                  <span className="text-xs font-black text-[#694231] block">Rose Terracotta</span>
                  <span className="text-[11px] text-[#c38a76] block mb-1">Secondary Brand</span>
                  <code className="font-mono text-xs font-bold text-[#694231] bg-white px-2 py-0.5 rounded border border-[#c38a76]/50">
                    #c38a76
                  </code>
                </div>
              </div>

              {/* Deep Cocoa */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 shadow-xs hover:border-[#694231] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#694231] shadow-md border-2 border-white shrink-0" />
                <div className="flex-1">
                  <span className="text-xs font-black text-[#694231] block">Deep Cocoa</span>
                  <span className="text-[11px] text-[#c38a76] block mb-1">Dark Base & Text</span>
                  <code className="font-mono text-xs font-bold text-[#694231] bg-white px-2 py-0.5 rounded border border-[#694231]/30">
                    #694231
                  </code>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            5. HASHTAGS & STREAMING RULES GRID
        ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Official Hashtags */}
          <AnimatedSection delay={0.3} direction="right">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-[#fcaa94]/40 shadow-lg space-y-4 h-full">
              <h2 className="text-lg font-black text-[#694231] flex items-center gap-2 uppercase tracking-wide">
                <Tag className="w-4 h-4 text-[#c38a76]" /> Official Hashtags
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">General</span>
                  <span className="font-extrabold text-[#694231] text-sm">{profile.officialTags.general}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">Live Stream</span>
                  <span className="font-extrabold text-[#694231] text-sm">{profile.officialTags.live}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">Fanart</span>
                  <span className="font-extrabold text-[#694231] text-sm">{profile.officialTags.fanart}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30">
                  <span className="text-[10px] text-black/50 uppercase font-bold block">Video Clips</span>
                  <span className="font-extrabold text-[#694231] text-sm">{profile.officialTags.clips}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Streaming Rules */}
          <AnimatedSection delay={0.35} direction="left">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-[#fcaa94]/40 shadow-lg space-y-4 h-full">
              <h2 className="text-lg font-black text-[#694231] flex items-center gap-2 uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-[#c38a76]" /> Streaming Rules & Etiquette
              </h2>
              <ul className="space-y-2.5 text-xs text-[#694231]/85 leading-relaxed">
                {profile.streamingRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#c38a76] font-bold text-sm shrink-0">🍮</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* ========================================================
            6. MILESTONES & JOURNEY TIMELINE
        ========================================================= */}
        <AnimatedSection delay={0.4}>
          <div className="p-6 sm:p-10 rounded-3xl bg-white/95 border border-[#fcaa94]/40 shadow-lg space-y-6">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#c38a76]">
              <Award className="w-4 h-4 text-[#c38a76]" /> Journey
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#694231]">
              Perjalanan & Milestone Purin
            </h2>

            <div className="relative border-l-2 border-[#fcaa94] ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8 pt-2">
              {timeline.map((event) => (
                <div key={event.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#694231] border-2 border-white group-hover:bg-[#fcaa94] group-hover:scale-125 transition-all shadow-sm" />

                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#c38a76] bg-[#fedacb]/60 border border-[#fcaa94]/30 px-2.5 py-0.5 rounded-full">
                      {event.date}
                    </span>
                    <span className="text-xs font-semibold text-black/50 uppercase">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/70 mt-1 max-w-xl">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================
            7. CREDITS & ATTRIBUTION
        ========================================================= */}
        <AnimatedSection delay={0.45}>
          <div className="p-6 rounded-3xl bg-white/80 border border-[#fcaa94]/30 text-xs text-[#694231]/70 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <span>Website fan & portal design inspired by UFOkiyo & LowScarlet</span>
            <div className="flex items-center gap-4">
              <Link
                href="https://ko-fi.com/ufokiyo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c38a76] font-bold hover:underline flex items-center gap-1"
              >
                UFOkiyo Ko-fi <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="https://github.com/LowScarlet/purin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c38a76] font-bold hover:underline flex items-center gap-1"
              >
                GitHub Project <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </SubpageLayout>
  );
}
