import Link from "next/link";
import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { MessageSquare, Users, Sparkles, Heart, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Community - Purin's Apse",
  description: "Pusat komunitas Cocoanuts & Discord Purin's Apse - Diskusi, fan projects, dan fanart Purin Kokoa.",
};

export default async function CommunityPage() {
  const [links, projects] = await Promise.all([
    repositories.community.getLinks(),
    repositories.community.getProjects(),
  ]);

  return (
    <SubpageLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c38a76]">
          <Users className="w-4 h-4" /> Cocoanuts Fan Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#694231] mt-1 font-sans">
          Komunitas Purin&apos;s Apse 🍮
        </h1>
        <p className="text-xs sm:text-sm text-[#694231]/80 mt-1 max-w-2xl">
          Bergabunglah dengan ribuan penggemar Purin Kokoa di Discord, bagikan fanart kalian di media sosial, dan ikuti proyek seru komunitas!
        </p>
      </div>

      {/* Hero Discord Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#694231] via-[#7d4f3b] to-[#694231] text-white p-8 sm:p-12 shadow-xl border border-[#fcaa94]/30">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider bg-[#fcaa94] text-[#694231] px-3 py-1 rounded-full inline-block">
            Official Discord Server
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans tracking-wide">
            Purin&apos;s Apse Community Discord
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Rumah utama para Cocoanuts! Dapatkan notifikasi live stream otomatis, saluran berbagi fanart, room mabar game, bot interaktif, dan obrolan seru setiap hari.
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
            <span className="text-xs font-semibold text-white/70">
              2,400+ Cocoanuts bergabung 🍮
            </span>
          </div>
        </div>

        {/* Ambient watermark icon */}
        <div className="absolute right-6 -bottom-8 opacity-10 text-9xl pointer-events-none select-none">
          🐱
        </div>
      </div>

      {/* Community Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            target={item.url.startsWith("http") ? "_blank" : undefined}
            rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-md hover:border-[#fcaa94] hover:-translate-y-1 transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#fff8f3] text-[#694231] border border-[#fcaa94]/40 flex items-center justify-center mb-3 group-hover:bg-[#fcaa94] transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-black/60 mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-[#c38a76] font-bold">
              <span>{item.badgeText || "Kunjungi"}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Community Projects Spotlight */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-[#694231] flex items-center gap-2 uppercase tracking-wide">
          <Heart className="w-5 h-5 text-red-400 fill-current" /> Fan Projects & Inisiatif Komunitas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#fcaa94]/40 text-[#694231]">
                  Status: {proj.status}
                </span>
                <span className="text-xs text-black/50 font-medium">
                  Lead: {proj.leadAuthor}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#694231]">
                {proj.title}
              </h3>
              <p className="text-xs text-black/70 leading-relaxed">
                {proj.description}
              </p>
              {proj.url && (
                <Link
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#c38a76] hover:underline pt-1"
                >
                  Lihat Repositori Project <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </SubpageLayout>
  );
}
