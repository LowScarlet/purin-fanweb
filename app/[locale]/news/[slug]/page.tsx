import { notFound } from "next/navigation";
import Link from "next/link";
import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import PageDecorations from "@/components/layout/PageDecorations";
import { ArrowLeft, Calendar, Tag, User, Sparkles } from "lucide-react";
import CopyChip from "@/components/ui/CopyChip";
import { locales } from "@/lib/i18n/config";

interface NewsDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = await repositories.news.getAll();
  return locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await repositories.news.getBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} - Purin Kokoa Official News`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  const isEn = locale === "en";
  const article = await repositories.news.getBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <SubpageLayout>
      {/* Outer wrapper with Hololive Fanclub soft neutral background */}
      <div className="relative min-h-screen bg-[#f7f2ed] overflow-hidden py-10 sm:py-16">
        {/* Reusable Confetti Ribbons & Giant Vertical Side Watermarks */}
        <PageDecorations
          leftWatermark="PURIN KOKOA OFFICIAL DISPATCH"
          rightWatermark="PURURIN MEMBER ARTICLE"
          topClass="top-16"
        />

        {/* ========================================================
            ARTICLE CONTAINER
        ========================================================= */}
        <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Back button styled as a clean Hololive FC Pill */}
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#fff8f3] text-[#694231] font-black text-xs sm:text-sm border border-[#c38a76]/25 shadow-sm hover:border-[#fcaa94] group transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#c38a76] group-hover:-translate-x-1 transition-transform" />
              <span>{isEn ? "Back to News List" : "Kembali ke Daftar Berita"}</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 opacity-30 select-none pointer-events-none">
              <span className="w-3 h-3 rounded-full bg-[#c38a76]" />
              <span className="w-5 h-5 rounded-full bg-[#fcaa94]" />
              <span className="w-3 h-3 rounded-full bg-[#c38a76]" />
            </div>
          </div>

          {/* Main Stadium Card */}
          <div className="p-6 sm:p-12 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 space-y-6">
            {/* Diamond Header & Category */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#c38a76]/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#fcaa94] font-black text-sm">◆</span>
                <span className="font-black text-[#694231] bg-[#fedacb]/70 px-3.5 py-1 rounded-full uppercase tracking-wider text-[10px] border border-[#fcaa94]/50">
                  {article.category}
                </span>
                {article.isPinned && (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide bg-[#fcaa94] text-[#694231] px-2.5 py-1 rounded-full shadow-xs">
                    <Sparkles className="w-3 h-3 fill-current" /> {isEn ? "PINNED" : "PINNED"}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-black/50 font-medium text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#c38a76]" />
                  {new Date(article.publishedAt).toLocaleDateString(
                    isEn ? "en-US" : "id-ID",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#c38a76]" /> {article.author}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#694231] leading-tight font-sans tracking-tight">
              {article.title}
            </h1>

            {/* Lead Excerpt in Rounded Callout Box */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#fff8f3] border-l-4 border-[#fcaa94] border border-[#fcaa94]/30 text-[#4a2e22] text-sm sm:text-base font-semibold leading-relaxed shadow-inner">
              {article.excerpt}
            </div>

            {/* Content Body */}
            <div className="text-base sm:text-lg lg:text-[19px] leading-[1.85] sm:leading-[1.9] text-[#3e2318] space-y-6 whitespace-pre-line font-sans font-medium tracking-normal pt-2">
              {article.content}
            </div>

            {/* Tags & Action Chips */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-[#c38a76]/15 space-y-3">
                <div className="text-xs font-black text-[#c38a76] uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> {isEn ? "Related Tags" : "Tag Terkait"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <CopyChip
                      key={tag}
                      textToCopy={`#${tag}`}
                      displayLabel={`#${tag}`}
                      className="py-1.5 px-3"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </SubpageLayout>
  );
}
