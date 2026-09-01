import { notFound } from "next/navigation";
import Link from "next/link";
import { repositories } from "@/lib/repositories";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { ArrowLeft, Calendar, Tag, User, Share2 } from "lucide-react";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await repositories.news.getBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} - Purin Kokoa News`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await repositories.news.getBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <SubpageLayout>
      <article className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      {/* Back button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c38a76] hover:text-[#694231] group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Daftar Berita
      </Link>

      {/* Main Article Container */}
      <div className="p-6 sm:p-12 rounded-3xl bg-white border border-[#c38a76]/25 shadow-sm space-y-6">
        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-[#694231] bg-[#fedacb]/70 px-3.5 py-1 rounded-full uppercase tracking-wider text-[11px] border border-[#fcaa94]/50">
            {article.category}
          </span>
          <span className="text-black/50 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(article.publishedAt).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-black/50 flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> Ditulis oleh {article.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-[#694231] leading-tight font-sans">
          {article.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="text-sm sm:text-base font-medium text-[#c38a76] italic border-l-4 border-[#fcaa94] pl-4 py-1 leading-relaxed">
          {article.excerpt}
        </p>

        <hr className="border-black/5" />

        {/* Content Body */}
        <div className="prose prose-stone max-w-none text-[#42281d] text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-sans">
          {article.content}
        </div>

        {/* Tags & Footer */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6 border-t border-black/5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-black/50 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold bg-[#fff8f3] text-[#694231] px-2.5 py-1 rounded-lg border border-[#fcaa94]/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  </SubpageLayout>
  );
}
