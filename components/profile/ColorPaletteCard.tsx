"use client";

import { Palette } from "lucide-react";
import CopyChip from "@/components/ui/CopyChip";
import { useTranslation } from "@/lib/i18n/client";

interface ColorPaletteCardProps {
  className?: string;
  hideHeader?: boolean;
}

export default function ColorPaletteCard({
  className = "",
  hideHeader = false,
}: ColorPaletteCardProps) {
  const { t } = useTranslation("about");

  return (
    <div
      className={`p-6 sm:p-10 rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 space-y-4 ${className}`}
    >
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#694231] flex items-center gap-2 uppercase tracking-wide">
            <Palette className="w-4 h-4 text-[#c38a76]" /> {t("palette.title")}
          </h3>
          <span className="text-[10px] font-black text-[#c38a76] bg-[#fedacb]/70 px-2.5 py-0.5 rounded-full border border-[#fcaa94]/40">
            {t("palette.badge")}
          </span>
        </div>
      )}

      <p className="text-center text-xs sm:text-sm font-medium text-[#694231]/80 max-w-lg mx-auto">
        {t("palette.desc")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
        <CopyChip
          variant="color"
          textToCopy="#fcaa94"
          displayLabel={t("palette.peach")}
          colorPreview="#fcaa94"
          className="p-3"
        />
        <CopyChip
          variant="color"
          textToCopy="#c38a76"
          displayLabel={t("palette.terracotta")}
          colorPreview="#c38a76"
          className="p-3"
        />
        <CopyChip
          variant="color"
          textToCopy="#694231"
          displayLabel={t("palette.cocoa")}
          colorPreview="#694231"
          className="p-3"
        />
      </div>
    </div>
  );
}
