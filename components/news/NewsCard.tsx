"use client";

import Link from "next/link";
import { NewsArticle } from "@/lib/types/news";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation, useCurrentLocale } from "@/lib/i18n/client";

interface NewsCardProps {
  article: NewsArticle;
  showTags?: boolean;
}

export default function NewsCard({ article, showTags = true }: NewsCardProps) {
  const { t } = useTranslation("news");
  const locale = useCurrentLocale();

  return (
    <Link
      href={`/${locale}/news/${article.slug}`}
      className="flex flex-col justify-between p-6 sm:p-8 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 hover:shadow-2xl hover:border-[#fcaa94] hover:-translate-y-1.5 transition-all group h-full"
    >
      <div className="space-y-4">
        {/* Meta Badge Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-[#694231] bg-[#fedacb]/70 px-3 py-1 rounded-full border border-[#fcaa94]/50 uppercase tracking-wider text-[10px]">
              {article.category}
            </span>
            {article.isPinned && (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide bg-[#fcaa94] text-[#694231] px-2.5 py-1 rounded-full shadow-xs">
                <Sparkles className="w-3 h-3 fill-current" /> {t("pinned")}
              </span>
            )}
          </div>

          <span className="text-black/50 font-medium flex items-center gap-1 text-[11px]">
            <Calendar className="w-3 h-3 text-[#c38a76]" />
            {new Date(article.publishedAt).toLocaleDateString(
              locale === "en" ? "en-US" : "id-ID",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-[#694231] group-hover:text-[#c38a76] transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm font-medium text-[#4a2e22] line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Optional Tag Pills */}
        {showTags && article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold text-[#c38a76] bg-[#fff8f3] border border-[#fcaa94]/40 px-2.5 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Indicator */}
      <div className="pt-4 mt-6 border-t border-[#c38a76]/15 flex items-center justify-between text-xs text-[#c38a76] font-black">
        <span>{t("readMore")}</span>
        <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
          ✦ <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
