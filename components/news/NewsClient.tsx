"use client";

import { useState } from "react";
import { NewsArticle } from "@/lib/types/news";
import AnimatedSection from "@/components/ui/AnimatedSection";
import NewsCard from "@/components/news/NewsCard";
import { useTranslation } from "@/lib/i18n/client";

interface NewsClientProps {
  initialNews: NewsArticle[];
}

export default function NewsClient({ initialNews }: NewsClientProps) {
  const { t } = useTranslation("news");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: t("categories.all") },
    { id: "Announcement", label: t("categories.announcement") },
    { id: "Milestone", label: t("categories.milestone") },
    { id: "Merch", label: t("categories.merch") },
  ];

  const filteredNews = initialNews.filter((article) => {
    if (selectedCategory === "all") return true;
    return article.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-10">
      {/* --------------------------------------------------------
          HOLOLIVE FC STYLE PILL FILTER TABS & SCALLOP ACCENT
      --------------------------------------------------------- */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Cloud / Scallop Wave Accent */}
          <div className="flex items-center gap-1.5 opacity-30 pointer-events-none select-none">
            <span className="w-3.5 h-3.5 rounded-full bg-[#c38a76]" />
            <span className="w-5 h-5 rounded-full bg-[#fcaa94]" />
            <span className="w-7 h-7 rounded-full bg-[#c38a76]" />
            <span className="w-5 h-5 rounded-full bg-[#fcaa94]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#c38a76]" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2 rounded-full font-black text-xs sm:text-sm tracking-wide transition-all shadow-sm ${
                    isActive
                      ? "bg-[#fcaa94] text-[#694231] border border-[#fcaa94] scale-105"
                      : "bg-white text-[#694231] border border-[#c38a76]/20 hover:bg-[#fff8f3] hover:border-[#fcaa94]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* --------------------------------------------------------
          ARTICLE GRID (HOLOLIVE FC STADIUM CARDS)
      --------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredNews.map((article, idx) => (
          <AnimatedSection key={article.id} delay={0.12 + idx * 0.06}>
            <NewsCard article={article} />
          </AnimatedSection>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="p-12 text-center rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-md">
          <p className="text-sm font-black text-[#694231]">
            {t("empty")}
          </p>
        </div>
      )}
    </div>
  );
}
