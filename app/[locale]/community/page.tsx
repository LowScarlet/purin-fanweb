import Link from "next/link";
import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Sparkles, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageDecorations from "@/components/layout/PageDecorations";
import DiscordBanner from "@/components/community/DiscordBanner";
import DiamondTitle from "@/components/ui/DiamondTitle";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  const [links, projects] = await Promise.all([
    repositories.community.getLinks(),
    repositories.community.getProjects(),
  ]);

  return (
    <SubpageLayout>
      {/* Outer wrapper with Hololive Fanclub soft neutral background */}
      <div className="relative min-h-screen bg-[#f7f2ed] overflow-hidden py-10 sm:py-16">
        {/* Page Decorations (Confetti & Giant Watermarks) */}
        <PageDecorations
          leftWatermark="PURIN'S APSE FAN COMMUNITY"
          rightWatermark="PURURIN COMMUNITY HUB"
        />

        {/* ========================================================
            MAIN CONTAINER CONTENT
        ========================================================= */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          {/* ----------------------------------------------------
              HEADER SECTION
          ----------------------------------------------------- */}
          <AnimatedSection delay={0.05}>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#c38a76]">
                <span>✦</span>
                <span>Pururin Fan Community & Hub</span>
                <span>✦</span>
              </div>

              {/* Diamond Section Title */}
              <DiamondTitle
                title={isEn ? "Purin's Apse Community 🍮" : "Komunitas Purin's Apse 🍮"}
                size="lg"
              />

              <p className="text-xs sm:text-sm font-medium text-[#694231]/80 max-w-xl mx-auto">
                {isEn
                  ? "Join thousands of Purin Kokoa fans on Discord, share creative fanarts (#Purspectine), and participate in exciting community projects! 🐾"
                  : "Bergabunglah dengan ribuan penggemar Purin Kokoa di Discord, bagikan fanart kreatif (#Purspectine), dan ikuti proyek seru komunitas! 🐾"}
              </p>
            </div>
          </AnimatedSection>

          {/* ----------------------------------------------------
              HERO DISCORD CARD (REUSABLE FULL-WIDTH BANNER)
          ----------------------------------------------------- */}
          <AnimatedSection delay={0.1}>
            <DiscordBanner />
          </AnimatedSection>

          {/* ----------------------------------------------------
              PLATFORMS & COMMUNITY HUBS
          ----------------------------------------------------- */}
          <div className="space-y-6">
            <DiamondTitle
              title={isEn ? "Social Platforms & Hubs" : "Social Platforms & Hubs"}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {links.map((link, idx) => (
                <AnimatedSection key={link.id} delay={0.12 + idx * 0.05}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-6 sm:p-8 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 hover:shadow-2xl hover:border-[#fcaa94] hover:-translate-y-1.5 transition-all group h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-[#fedacb]/70 text-[#694231] border border-[#fcaa94]/50">
                          {link.badgeText || link.category}
                        </span>
                        <ExternalLink className="w-4 h-4 text-[#c38a76] group-hover:text-[#694231] transition-colors" />
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-[#694231] group-hover:text-[#c38a76] transition-colors">
                        {link.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-medium text-[#4a2e22] leading-relaxed">
                        {link.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[#c38a76]/15 flex items-center justify-between text-xs font-black text-[#c38a76]">
                      <span>{isEn ? "Open Platform" : "Kunjungi Platform"}</span>
                      <span className="group-hover:translate-x-1.5 transition-transform">➔</span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* ----------------------------------------------------
              FAN PROJECTS & INITIATIVES
          ----------------------------------------------------- */}
          <div className="space-y-6">
            <DiamondTitle
              title={isEn ? "Fan Projects & Community Initiatives" : "Fan Projects & Inisiatif Komunitas"}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <AnimatedSection key={proj.id} delay={0.18 + idx * 0.05}>
                  <div className="flex flex-col justify-between p-6 sm:p-8 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 hover:shadow-2xl hover:border-[#fcaa94] hover:-translate-y-1.5 transition-all group h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase px-3.5 py-1 rounded-full bg-[#fcaa94] text-[#694231] flex items-center gap-1.5 shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          {proj.status}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-black/50">
                          by {proj.leadAuthor}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-[#694231] group-hover:text-[#c38a76] transition-colors">
                        {proj.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-medium text-[#4a2e22] leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    {proj.url && (
                      <div className="pt-4 mt-6 border-t border-[#c38a76]/15 flex items-center justify-between">
                        <Link
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-black text-[#c38a76] hover:text-[#694231] transition-colors group-hover:underline"
                        >
                          <span>{isEn ? "View Project Repository" : "Lihat Repositori Project"}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
