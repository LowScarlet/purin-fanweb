"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Locale, locales } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/client";

interface LanguageSwitcherProps {
  variant?: "pill" | "inline";
  className?: string;
}

function setLocaleCookie(targetLocale: Locale) {
  if (typeof document !== "undefined") {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    try {
      localStorage.setItem("i18nextLng", targetLocale);
    } catch {}
  }
}

export default function LanguageSwitcher({
  variant = "pill",
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname() || "/id";

  // Determine active locale from current URL pathname
  const currentLocale: Locale = pathname.startsWith("/en") ? "en" : "id";

  const handleLanguageSelect = (targetLocale: Locale) => {
    setLocaleCookie(targetLocale);
  };

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-2 text-xs font-bold ${className}`}>
        {locales.map((loc, idx) => {
          const isActive = currentLocale === loc;
          const targetUrl = getLocalizedPath(pathname, loc);

          return (
            <span key={loc} className="flex items-center gap-2">
              <Link
                href={targetUrl}
                onClick={() => handleLanguageSelect(loc)}
                className={`transition-colors uppercase ${
                  isActive
                    ? "text-[#694231] font-black underline underline-offset-4"
                    : "text-neutral-400 hover:text-[#c38a76]"
                }`}
              >
                {loc.toUpperCase()}
              </Link>
              {idx < locales.length - 1 && <span className="text-neutral-300">|</span>}
            </span>
          );
        })}
      </div>
    );
  }

  // Pill variant for Navbar and Mobile Drawer
  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-[#fedacb]/40 border border-[#fcaa94]/40 shadow-xs ${className}`}
    >
      <div className="flex items-center px-1 text-[#694231] opacity-70">
        <Globe className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-0.5">
        {locales.map((loc) => {
          const isActive = currentLocale === loc;
          const targetUrl = getLocalizedPath(pathname, loc);

          return (
            <Link
              key={loc}
              href={targetUrl}
              onClick={() => handleLanguageSelect(loc)}
              className={`relative px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider transition-all select-none ${
                isActive
                  ? "text-white"
                  : "text-[#694231] hover:text-[#c38a76]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeLangIndicator"
                  className="absolute inset-0 bg-[#694231] rounded-full shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{loc.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
