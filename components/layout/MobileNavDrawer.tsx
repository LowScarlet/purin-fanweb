"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuCat } from "react-icons/lu";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AiOutlineInstagram, AiOutlineTikTok } from "react-icons/ai";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { Menu, X as CloseIcon } from "lucide-react";
import { useAudio } from "../context/AudioContext";

import { useTranslation } from "@/lib/i18n/client";
import LanguageSwitcher from "../ui/LanguageSwitcher";

interface NavLinkItem {
  display: string;
  href: string;
}

interface MobileNavDrawerProps {
  navLinks: NavLinkItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function MobileNavDrawer({
  navLinks,
  isOpen,
  onToggle,
  onClose,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const { t } = useTranslation("common");
  const { isPlaying, volume, togglePlay } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-[999] md:hidden flex flex-col items-end pointer-events-auto">
      {/* Floating Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs z-40"
            />

            {/* Floating Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative z-50 mb-3 w-64 p-5 rounded-3xl bg-white/98 backdrop-blur-xl border border-[#fcaa94]/50 shadow-2xl shadow-[#694231]/25 space-y-4"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <LuCat className="text-xl text-[#694231]" />
                  <span className="font-bold font-marker text-sm text-[#694231]">
                    {t("nav.menuTitle")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher variant="pill" />
                </div>
              </div>

              {/* Nav Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#694231] text-white shadow-sm"
                          : "text-[#694231] hover:bg-[#fff8f3]"
                      }`}
                    >
                      <span>{link.display}</span>
                      <span className="text-[10px] opacity-70">➔</span>
                    </Link>
                  );
                })}
              </div>

              {/* Sound Controls inside floating menu */}
              <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 text-xs font-bold text-[#694231] hover:text-[#c38a76] cursor-pointer"
                >
                  {isPlaying ? (
                    <HiMiniSpeakerWave className="text-base text-[#c38a76]" />
                  ) : (
                    <HiMiniSpeakerXMark className="text-base" />
                  )}
                  <span>{isPlaying ? t("nav.bgmPlaying") : t("nav.bgmMuted")}</span>
                </button>
                <span className="text-[10px] text-black/50 font-mono font-bold">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Social Icons */}
              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#694231] font-semibold">
                <span>{t("nav.social")}</span>
                <div className="flex items-center gap-3 text-lg text-[#694231]">
                  <Link
                    href="https://www.youtube.com/@PurinKokoa"
                    target="_blank"
                    className="hover:text-[#c38a76]"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </Link>
                  <Link
                    href="https://x.com/purinkokoa_"
                    target="_blank"
                    className="hover:text-[#c38a76]"
                  >
                    <FaXTwitter />
                  </Link>
                  <Link
                    href="https://www.instagram.com/purinkokoa_"
                    target="_blank"
                    className="hover:text-[#c38a76]"
                  >
                    <AiOutlineInstagram />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@purinkokoa"
                    target="_blank"
                    className="hover:text-[#c38a76]"
                  >
                    <AiOutlineTikTok />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-[#694231] hover:bg-[#c38a76] text-white border-2 border-white shadow-2xl ring-4 ring-[#fcaa94]/50 flex items-center justify-center cursor-pointer transition-colors relative z-50"
        aria-label="Toggle Mobile Navigation Menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <CloseIcon className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
