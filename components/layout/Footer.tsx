"use client";

import Link from "next/link";
import { SiNextdotjs, SiTailwindcss, SiVercel } from "react-icons/si";
import { useTranslation, useCurrentLocale } from "@/lib/i18n/client";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Footer() {
  const { t } = useTranslation("common");
  const locale = useCurrentLocale();

  return (
    <footer className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-8 font-semibold text-neutral-500 text-xs uppercase select-none border-t border-[#c38a76]/20 bg-white gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <LanguageSwitcher variant="inline" />
          <div className="text-neutral-300">|</div>
          <Link href={`/${locale}`} className="hover:text-[#c38a76] transition-colors">
            {t("footer.purin")}
          </Link>
          <Link href={`/${locale}/community`} className="hover:text-[#c38a76] transition-colors">
            {t("footer.contact")}
          </Link>
          <Link href={`/${locale}/disclaimer`} className="hover:text-[#c38a76] transition-colors">
            {t("footer.privacy")}
          </Link>
        </div>
        <div className="space-x-2 mt-4 font-semibold">
          <Link href={`/${locale}/about`} className="text-[#c38a76] hover:underline">
            Purin Kokoa
          </Link>
          <Link href={`/${locale}/disclaimer`} className="text-[#c38a76] hover:underline">
            {t("footer.copyrightGuidelines")}
          </Link>
        </div>
        <p className="text-[0.8em] text-neutral-400 normal-case mt-1">
          © LowScarlet 2024–2026. {t("footer.rights")}
        </p>
      </div>

      {/* Tech Stack Icons matching original prototype */}
      <div className="flex items-center gap-x-4 text-4xl text-neutral-600">
        <span title="Vercel"><SiVercel className="hover:text-black transition-colors" /></span>
        <span title="Next.js"><SiNextdotjs className="hover:text-black transition-colors" /></span>
        <span title="Tailwind CSS"><SiTailwindcss className="hover:text-[#38bdf8] transition-colors" /></span>
      </div>
    </footer>
  );
}
