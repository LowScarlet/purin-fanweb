import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import NewsClient from "@/components/news/NewsClient";
import PageDecorations from "@/components/layout/PageDecorations";
import DiamondTitle from "@/components/ui/DiamondTitle";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const news = await repositories.news.getAll();

  return (
    <SubpageLayout>
      {/* Outer wrapper with Hololive Fanclub soft neutral background */}
      <div className="relative min-h-screen bg-[#f7f2ed] overflow-hidden py-10 sm:py-16">
        {/* Reusable Confetti Ribbons & Giant Vertical Side Watermarks */}
        <PageDecorations
          leftWatermark={isEn ? "PURIN KOKOA OFFICIAL NEWS" : "PURIN KOKOA OFFICIAL NEWS"}
          rightWatermark={isEn ? "PURURIN ANNOUNCEMENTS" : "PURURIN ANNOUNCEMENTS"}
          topClass="top-16"
        />

        {/* ========================================================
            MAIN CONTAINER CONTENT
        ========================================================= */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header Title with Diamond Accents */}
          <AnimatedSection delay={0.05}>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#c38a76]">
                <span>✦</span>
                <span>Purin Kokoa News Dispatch</span>
                <span>✦</span>
              </div>

              {/* Diamond Section Title */}
              <DiamondTitle
                title={isEn ? "Latest News & Updates 🍮" : "Berita & Update Terkini 🍮"}
                as="h1"
                size="xl"
              />

              <p className="text-xs sm:text-sm font-medium text-[#694231]/80 max-w-xl mx-auto">
                {isEn
                  ? "Official announcements regarding events, special live broadcasts, fanweb releases, merchandise, and Purin Kokoa milestones."
                  : "Pengumuman resmi mengenai event, jadwal siaran spesial, peluncuran fanweb, merchandise, dan milestone seputar Purin Kokoa."}
              </p>
            </div>
          </AnimatedSection>

          {/* Interactive News Client with Category Pills & Stadium Cards */}
          <NewsClient initialNews={news} />
        </div>
      </div>
    </SubpageLayout>
  );
}
