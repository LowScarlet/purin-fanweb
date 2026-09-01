import Link from "next/link";
import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Sparkles, Calendar, Tag, ArrowRight } from "lucide-react";
import TypingText from "@/components/ui/TypingText";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "News & Updates - Purin Kokoa",
  description: "Berita terbaru, pengumuman jadwal, merchandise, dan event spesial Purin Kokoa.",
};

export default async function NewsPage() {
  const news = await repositories.news.getAll();

  return (
    <SubpageLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <AnimatedSection delay={0.1}>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c38a76]">
              <Sparkles className="w-4 h-4" /> Latest Announcements
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#694231] mt-1 font-sans">
              Berita & Update Terkini 🍮
            </h1>
            <p className="text-xs sm:text-sm text-[#694231]/80 mt-1 max-w-2xl">
              <TypingText
                text="Pengumuman resmi mengenai event, peluncuran fanweb, merchandise, dan milestone seputar Purin Kokoa."
                speed={16}
                delay={200}
              />
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, idx) => (
            <AnimatedSection key={article.id} delay={0.15 + idx * 0.08}>
              <Link
                href={`/news/${article.slug}`}
                className="flex flex-col justify-between p-6 rounded-3xl bg-white border border-[#c38a76]/20 shadow-sm hover:shadow-md hover:border-[#fcaa94] hover:-translate-y-1 transition-all group h-full"
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

                  <h2 className="text-base font-bold text-[#694231] group-hover:text-[#c38a76] transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs text-black/65 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-black/5 flex items-center justify-between text-xs text-[#c38a76] font-bold">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
}
