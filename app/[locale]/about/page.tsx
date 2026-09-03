import Image from "next/image";
import Link from "next/link";
import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import {
  ExternalLink,
  Calendar,
  Ruler,
  Clock,
  Heart,
  Maximize2,
} from "lucide-react";
import {
  FaYoutube,
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaDiscord,
  FaMugHot,
} from "react-icons/fa6";
import ppImage from "@/public/pp.jpg";
import referenceSheetImage from "@/public/reference-sheet.png";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageDecorations from "@/components/layout/PageDecorations";
import DiamondTitle from "@/components/ui/DiamondTitle";
import ColorPaletteCard from "@/components/profile/ColorPaletteCard";
import HashtagsCard from "@/components/profile/HashtagsCard";
import StreamingRulesCard from "@/components/profile/StreamingRulesCard";
import SoundboardCard from "@/components/profile/SoundboardCard";

const platformStyles: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    className: string;
    label?: string;
  }
> = {
  youtube: {
    icon: FaYoutube,
    className:
      "bg-[#fff0f0] border-[#ff0000]/30 text-[#e60000] hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000] hover:shadow-md hover:shadow-red-500/25",
    label: "YouTube",
  },
  twitter: {
    icon: FaXTwitter,
    className:
      "bg-[#f5f5f7] border-black/20 text-black hover:bg-black hover:text-white hover:border-black hover:shadow-md hover:shadow-black/25",
    label: "Twitter",
  },
  instagram: {
    icon: FaInstagram,
    className:
      "bg-[#fff0f5] border-[#e1306c]/30 text-[#c13584] hover:bg-gradient-to-r hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:text-white hover:border-transparent hover:shadow-md hover:shadow-pink-500/25",
    label: "Instagram",
  },
  tiktok: {
    icon: FaTiktok,
    className:
      "bg-[#f4fbfc] border-black/20 text-[#111111] hover:bg-black hover:text-[#00f2fe] hover:border-black hover:shadow-md hover:shadow-cyan-500/25",
    label: "TikTok",
  },
  discord: {
    icon: FaDiscord,
    className:
      "bg-[#f0f2ff] border-[#5865f2]/30 text-[#5865f2] hover:bg-[#5865f2] hover:text-white hover:border-[#5865f2] hover:shadow-md hover:shadow-indigo-500/25",
    label: "Discord",
  },
  trakteer: {
    icon: FaMugHot,
    className:
      "bg-[#fff1f2] border-[#be1e2d]/30 text-[#be1e2d] hover:bg-[#be1e2d] hover:text-white hover:border-[#be1e2d] hover:shadow-md hover:shadow-red-700/25",
    label: "Trakteer",
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  const [profile, timeline, voiceClips] = await Promise.all([
    repositories.profile.getProfile(),
    repositories.timeline.getAll(),
    repositories.sound.getVoiceClips(),
  ]);

  const debutFormatted = new Date(profile.debutDate).toLocaleDateString(
    isEn ? "en-US" : "id-ID",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <SubpageLayout>
      {/* Outer wrapper with Hololive Fanclub soft neutral background */}
      <div className="relative min-h-screen bg-[#f7f2ed] overflow-hidden py-10 sm:py-16">
        {/* Page Decorations (Confetti & Giant Watermarks) */}
        <PageDecorations
          leftWatermark={isEn ? "PURIN KOKOA PROFILE & LORE" : "PURIN KOKOA OFFICIAL PROFILE"}
          rightWatermark={isEn ? "PURURIN FAN CLUB PORTAL" : "PURURIN VTUBER PORTAL"}
        />

        {/* ========================================================
            1. HERO SECTION: OFFICIAL PROFILE (CONTAINED)
        ========================================================= */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <div id="profile" className="scroll-mt-24">
            <AnimatedSection delay={0.05}>
              <div className="text-center space-y-6">
                {/* Header Tagline matching Hololive FC fee banner */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#c38a76]">
                    <span>✦</span>
                    <span>{isEn ? "Official Member Reference" : "Official Member Reference"}</span>
                    <span>✦</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-[#694231] tracking-tight">
                    {profile.name} (プリン・ココア)
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-[#694231]/70">
                    *Your Sweet & Cozy Pudding Chocolatier VTuber 🍮🍫
                  </p>
                </div>

                {/* Avatar with Cute Golden Ring & Status */}
                <div className="flex flex-col items-center justify-center gap-4 pt-1 sm:pt-2">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#fcaa94]/70 group">
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

                  <div className="space-y-1.5">
                    <div className="text-sm font-black text-[#c38a76] font-mono">
                      {profile.handle}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#4a2e22] max-w-xl mx-auto leading-relaxed">
                      &quot;{profile.bio}&quot;
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#694231]/80 max-w-md mx-auto italic">
                      {profile.tagline}
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#fcaa94]/40 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-black uppercase tracking-wider flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" /> {isEn ? "Birthday" : "Ulang Tahun"}
                    </div>
                    <div className="text-sm sm:text-base font-black text-[#694231] mt-0.5">
                      {profile.birthday}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#fcaa94]/40 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-black uppercase tracking-wider flex items-center justify-center gap-1">
                      <Ruler className="w-3 h-3" /> {isEn ? "Height" : "Tinggi"}
                    </div>
                    <div className="text-sm sm:text-base font-black text-[#694231] mt-0.5">
                      {profile.height}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#fcaa94]/40 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-black uppercase tracking-wider flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" /> Debut
                    </div>
                    <div className="text-sm sm:text-base font-black text-[#694231] mt-0.5">
                      {debutFormatted}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#fcaa94]/40 text-center shadow-xs">
                    <div className="text-[10px] text-[#c38a76] font-black uppercase tracking-wider flex items-center justify-center gap-1">
                      <Heart className="w-3 h-3" /> Fanbase
                    </div>
                    <div className="text-sm sm:text-base font-black text-[#694231] mt-0.5">
                      {profile.fanName}
                    </div>
                  </div>
                </div>

                {/* Social Media Pills with Platform Brand Colors */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {profile.socials.map((s) => {
                    const platformKey = s.platform.toLowerCase();
                    const config = platformStyles[platformKey] || {
                      icon: ExternalLink,
                      className:
                        "bg-white border-[#c38a76]/25 text-[#694231] hover:border-[#fcaa94] hover:text-[#c38a76]",
                      label: s.platform,
                    };
                    const IconComponent = config.icon;

                    return (
                      <Link
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs transition-all hover:scale-105 flex items-center gap-1.5 group ${config.className}`}
                      >
                        <IconComponent className="w-3.5 h-3.5 shrink-0" />
                        <span>{config.label || s.platform}</span>
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-90 ml-0.5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ========================================================
            2. FULL-WIDTH OFFICIAL LORE & BACKGROUND (SELEBAR LAYAR)
        ========================================================= */}
        <section
          id="lore"
          className="relative z-10 w-full scroll-mt-24 py-14 sm:py-20 bg-gradient-to-b from-[#351e14] via-[#23120b] to-[#351e14] border-y-2 border-[#fcaa94]/30 shadow-2xl overflow-hidden my-8 sm:my-14"
        >
          {/* Ambient Warm Fairy Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fcaa94]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fedacb]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Large Watermark Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03] overflow-hidden">
            <span className="text-[12vw] font-black text-white whitespace-nowrap tracking-widest font-sans">
              PURIN KOKOA LORE
            </span>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
            {/* Header Tagline & Gradient Title */}
            <AnimatedSection delay={0.1}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#fcaa94]">
                  <span>✦</span>
                  <span>{isEn ? "The Story of Purin Kokoa" : "Kisah Latar Belakang Purin Kokoa"}</span>
                  <span>✦</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fedacb] via-[#fff5eb] to-[#fcaa94] tracking-tight">
                  {isEn ? "Official Lore & Background 🍮✨" : "Official Lore & Kisah Latar 🍮✨"}
                </h2>
              </div>
            </AnimatedSection>

            {/* 3 Story Cards with Previous Frosted Glass Card Style (Without Bab) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Story Card 1 */}
              <AnimatedSection delay={0.15}>
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-[#fcaa94]/40 hover:bg-white/[0.09] transition-all duration-300 shadow-xl group">
                  <div className="space-y-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block select-none">
                      🐱
                    </span>
                    <p className="text-xs sm:text-sm text-[#fedacb] leading-relaxed font-medium">
                      {isEn
                        ? "Purin Kokoa is a half-cat-half-human chocolatier. She was once an abandoned stray cat who was warmly adopted by a kindhearted master chocolatier."
                        : "Purin Kokoa adalah seorang chocolatier blasteran kucing dan manusia. Dulunya ia adalah seekor kucing terlantar yang diadopsi oleh seorang pembuat cokelat handal."}
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Story Card 2 */}
              <AnimatedSection delay={0.2}>
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-[#fcaa94]/40 hover:bg-white/[0.09] transition-all duration-300 shadow-xl group">
                  <div className="space-y-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block select-none">
                      🧚‍♀️
                    </span>
                    <p className="text-xs sm:text-sm text-[#fedacb] leading-relaxed font-medium">
                      {isEn
                        ? "Driven by deep admiration for her owner, she always dreamed of becoming a chocolatier and serving customers herself. One day while wandering, she got lost in an enchanted forest and met a purple-haired fairy godmother who offered to grant her greatest wish."
                        : "Karena kekagumannya pada sang pemilik, ia selalu berkeinginan menjadi chocolatier dan melayani para pelanggan sendiri. Suatu hari saat berjalan-jalan, ia tersesat di dalam hutan dan bertemu ibu peri berambut ungu yang menawarkan untuk mengabulkan impiannya."}
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Story Card 3 */}
              <AnimatedSection delay={0.25}>
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-[#fcaa94]/40 hover:bg-white/[0.09] transition-all duration-300 shadow-xl group">
                  <div className="space-y-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block select-none">
                      🍮
                    </span>
                    <p className="text-xs sm:text-sm text-[#fedacb] leading-relaxed font-medium">
                      {isEn
                        ? "✨ She joyfully accepted, and now she is a full-fledged chocolatier running her own chocolate shop. Come visit and enjoy sweet, warm moments in her cozy chocolaterie! 🍮"
                        : "✨ Ia mengiyakan tawaran itu, dan kini ia menjadi chocolatier sejati dengan toko cokelatnya sendiri. Mari berkunjung dan bersenang-senang di toko cokelatnya! 🍮"}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. REMAINING SECTIONS CONTAINER
        ========================================================= */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
          {/* ====================================================
              3. CHARACTER REFERENCE SHEET
          ==================================================== */}
          <div id="reference" className="scroll-mt-24">
            <DiamondTitle
              title={isEn ? "Character Reference Sheet" : "Character Reference Sheet"}
            />

            <AnimatedSection delay={0.2}>
              <div className="rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 p-6 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#c38a76]/10">
                  <p className="text-xs sm:text-sm font-medium text-[#694231]/80 max-w-xl">
                    {isEn
                      ? "Official VTuber model design for Purin Kokoa: front, side, back view, chocolate bow accessories, and facial expressions."
                      : "Desain resmi model VTuber Purin Kokoa: Pandangan depan, samping, belakang, aksesoris pita cokelat, dan ekspresi wajah."}
                  </p>
                  <Link
                    href="https://drive.google.com/drive/folders/170zR-gW7V3L6HhVuhKzT9Qj11Z2kC-xY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fcaa94] hover:bg-[#fedacb] text-[#694231] text-xs font-black shadow-xs transition-all shrink-0"
                  >
                    <span>{isEn ? "Open Original Resolution" : "Buka Resolusi Asli"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Interactive Zoomable Image Card */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#fcaa94]/40 bg-[#fff8f3] group shadow-inner">
                  <Image
                    src={referenceSheetImage}
                    alt="Purin Kokoa Model Reference Sheet"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{isEn ? "Click to Zoom Full Resolution" : "Klik untuk Zoom Resolusi Penuh"}</span>
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* ====================================================
              4. OFFICIAL COLOR PALETTE
          ==================================================== */}
          <div id="palette" className="scroll-mt-24">
            <DiamondTitle
              title={isEn ? "Official Color Palette" : "Palet Warna Resmi"}
            />

            <AnimatedSection delay={0.25}>
              <ColorPaletteCard hideHeader />
            </AnimatedSection>
          </div>

          {/* ====================================================
              5. OFFICIAL HASHTAGS & FANMARK
          ==================================================== */}
          <div id="hashtags" className="scroll-mt-24">
            <DiamondTitle
              title={isEn ? "Official Hashtags & Fanmark" : "Official Hashtags & Fanmark"}
            />

            <AnimatedSection delay={0.3}>
              <HashtagsCard profile={profile} hideHeader />
            </AnimatedSection>
          </div>

          {/* ====================================================
              6. PURIN VOICE SOUNDBOARD
          ==================================================== */}
          <div id="soundboard" className="scroll-mt-24 space-y-4">
            <DiamondTitle
              title={isEn ? "Voice Clips & Soundboard" : "Voice Clips & Soundboard"}
            />
            <AnimatedSection delay={0.32}>
              <SoundboardCard voiceClips={voiceClips} />
            </AnimatedSection>
          </div>

          {/* ====================================================
              7. STREAMING RULES & ETIQUETTE
          ==================================================== */}
          <div id="rules" className="scroll-mt-24">
            <DiamondTitle
              title={isEn ? "Streaming Rules & Etiquette" : "Tata Tertib Streaming"}
            />

            <AnimatedSection delay={0.35}>
              <StreamingRulesCard rules={profile.streamingRules} />
            </AnimatedSection>
          </div>

          {/* ====================================================
              8. MILESTONES & JOURNEY TIMELINE
          ==================================================== */}
          <div id="journey" className="scroll-mt-24">
            <DiamondTitle
              title={isEn ? "Journey & Milestones" : "Perjalanan & Milestone"}
            />

            <AnimatedSection delay={0.4}>
              <div className="rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 p-6 sm:p-10 space-y-6">
                <div className="relative border-l-2 border-[#fcaa94] ml-2 sm:ml-6 pl-4 sm:pl-8 space-y-6 sm:space-y-8 pt-2">
                  {timeline.map((event) => (
                    <div key={event.id} className="relative group">
                      {/* Timeline Node Bullet */}
                      <div className="absolute -left-[25px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#fcaa94] border-4 border-white shadow-sm group-hover:scale-125 transition-transform" />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-black text-[#c38a76] bg-[#fedacb]/60 px-2.5 py-0.5 rounded-full border border-[#fcaa94]/40">
                            {new Date(event.date).toLocaleDateString(
                              isEn ? "en-US" : "id-ID",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-[#694231]">
                          {event.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-[#4a2e22] leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
