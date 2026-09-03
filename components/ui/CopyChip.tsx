"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CopyChipProps {
  textToCopy: string;
  displayLabel?: string;
  subLabel?: string;
  icon?: React.ReactNode;
  variant?: "tag" | "color" | "badge";
  colorPreview?: string;
  className?: string;
}

export default function CopyChip({
  textToCopy,
  displayLabel,
  subLabel,
  icon,
  variant = "tag",
  colorPreview,
  className = "",
}: CopyChipProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === "color") {
    return (
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        title={`Klik untuk salin kode warna ${textToCopy}`}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-[#c38a76]/20 shadow-xs hover:shadow-md hover:border-[#fcaa94] transition-all cursor-pointer select-none ${className}`}
      >
        {/* Color Swatch Dot */}
        <div
          className="w-5 h-5 rounded-full border border-black/10 shadow-xs shrink-0 flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: colorPreview || textToCopy }}
        />

        <div className="flex flex-col text-left">
          {displayLabel && (
            <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">
              {displayLabel}
            </span>
          )}
          <span className="font-mono text-xs font-bold text-[#694231]">
            {textToCopy}
          </span>
        </div>

        {/* Copy / Copied Status Icon */}
        <div className="ml-auto pl-1 text-[#c38a76]">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="copied"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
              >
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Salin!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
                className="p-1 rounded-md text-black/40 group-hover:text-[#694231] transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    );
  }

  // Default: Hashtag / Tag chip
  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      title={`Klik untuk salin ${textToCopy}`}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#c38a76]/25 shadow-2xs hover:shadow-sm hover:border-[#fcaa94] text-xs font-bold transition-all cursor-pointer select-none ${className}`}
    >
      {icon && <span className="text-[#c38a76]">{icon}</span>}
      <span className="text-[#694231] group-hover:text-[#c38a76] transition-colors whitespace-nowrap">
        {displayLabel || textToCopy}
      </span>
      {subLabel && (
        <span className="text-[10px] font-medium text-black/40 bg-black/5 px-1.5 py-0.5 rounded-md whitespace-nowrap shrink-0">
          {subLabel}
        </span>
      )}

      {/* Copy / Copied Status */}
      <span className="ml-1 shrink-0 text-[#c38a76]">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600"
            >
              <Check className="w-3 h-3" />
              <span>Copied!</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              className="text-black/30 group-hover:text-[#694231] transition-colors"
            >
              <Copy className="w-3 h-3" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
