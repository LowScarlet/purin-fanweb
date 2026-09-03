"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bell, Sparkles } from "lucide-react";
import { useTranslation, useCurrentLocale } from "@/lib/i18n/client";

export default function HeroCarousel() {
  const { t } = useTranslation("common");
  const locale = useCurrentLocale();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      title: t("carousel.communityTitle"),
      icon: MessageSquare,
      subtitle: t("carousel.communitySub"),
      link: "https://discord.gg/SzvzcQWabE",
      isExternal: true,
    },
    {
      id: 2,
      title: t("carousel.scheduleTitle"),
      icon: Bell,
      subtitle: t("carousel.scheduleSub"),
      link: `/${locale}/schedule`,
      isExternal: false,
    },
    {
      id: 3,
      title: t("carousel.milestoneTitle"),
      icon: Sparkles,
      subtitle: t("carousel.milestoneSub"),
      link: `/${locale}/news/purin-milestone-50k-subscribers`,
      isExternal: false,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="w-full max-w-[260px] sm:max-w-[290px]">
      <div className="relative overflow-hidden min-h-[64px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Link
              href={slide.link}
              target={slide.isExternal ? "_blank" : undefined}
              rel={slide.isExternal ? "noopener noreferrer" : undefined}
              className="block group"
            >
              <div className="glass-banner-card rounded-xl p-3 sm:p-3.5 shadow-md shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:bg-white/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#694231]/80 text-[#fcaa94] flex items-center justify-center shadow-inner group-hover:bg-[#694231] transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-[#694231] text-xs sm:text-sm tracking-wide font-sans leading-none">
                      <span>🐱</span>
                      <span>{slide.title}</span>
                      <span>🐱</span>
                    </div>
                    <p className="text-[11px] text-[#694231]/80 font-medium mt-1 leading-tight">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Dash Indicators */}
      <div className="flex items-center gap-1.5 mt-2 px-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              current === i
                ? "w-6 bg-white shadow-xs"
                : "w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
