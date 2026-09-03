"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuCat } from "react-icons/lu";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AiOutlineInstagram, AiOutlineTikTok } from "react-icons/ai";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { useAudio } from "../context/AudioContext";
import { useLoading } from "../context/LoadingContext";
import { useTranslation, useCurrentLocale } from "@/lib/i18n/client";
import MobileNavDrawer from "./MobileNavDrawer";

const shareIcons = [
  { Icon: FaYoutube, href: "https://www.youtube.com/@PurinKokoa", label: "YouTube" },
  { Icon: FaXTwitter, href: "https://x.com/purinkokoa_", label: "Twitter" },
  { Icon: AiOutlineInstagram, href: "https://www.instagram.com/purinkokoa_", label: "Instagram" },
  { Icon: AiOutlineTikTok, href: "https://www.tiktok.com/@purinkokoa", label: "TikTok" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation("common");
  const locale = useCurrentLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isPlaying, volume, togglePlay, setVolume } = useAudio();
  const { isInitialLoad } = useLoading();

  const navLinks = [
    { display: t("nav.news"), href: `/${locale}/news` },
    { display: t("nav.about"), href: `/${locale}/about` },
    { display: t("nav.schedule"), href: `/${locale}/schedule` },
    { display: t("nav.community"), href: `/${locale}/community` },
    { display: t("nav.disclaimer"), href: `/${locale}/disclaimer` },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && scrollY > 30) return true;
            if (prev && scrollY < 10) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full select-none transition-[background-color,box-shadow,border-color] duration-300 ${isScrolled
            ? "bg-white/98 shadow-md border-b border-[#c38a76]/25 backdrop-blur-md"
            : "bg-white/90 shadow-xs border-b border-[#c38a76]/15 backdrop-blur-md"
          }`}
      >
        <motion.div
          initial={isInitialLoad ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-between items-center bg-transparent px-6 sm:px-8 font-semibold text-neutral-500 uppercase h-16 sm:h-20"
        >
          {/* Left: Brand Logo + NavLinks right next to it */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-2 me-4 sm:me-8 group origin-left"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <LuCat
                  className="text-[#694231] transition-colors duration-300 group-hover:text-[#c38a76] text-3xl sm:text-4xl"
                />
              </motion.div>
              <div className="text-xs normal-case">
                <h1 className="font-bold font-marker text-base sm:text-lg text-[#694231] leading-none group-hover:text-[#c38a76] transition-colors duration-300">
                  Purin Kokoa
                </h1>
                <p className="text-[0.65em] italic text-[#c38a76]">
                  @purinkokoa_
                </p>
              </div>
            </Link>

            {/* NavLinks positioned directly beside the brand logo */}
            <div className="hidden md:flex items-center space-x-8 text-sm">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block relative py-1 hover:text-[#c38a76] transition duration-300 ease-in-out tracking-wider ${isActive ? "text-[#694231] font-bold" : ""
                      }`}
                  >
                    <span>{item.display}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fcaa94] rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Share, Divider, Sound Controls, Language Switcher */}
          <div className="hidden md:flex items-center origin-right">
            {/* Share Section */}
            <div className="flex items-center">
              <p className="font-semibold tracking-wider text-xs">
                {t("nav.share")}
              </p>
              <div className="flex gap-x-4 text-2xl ms-8">
                {shareIcons.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: "#c38a76" }}
                    whileTap={{ scale: 0.9 }}
                    className="block transition-colors text-neutral-600 cursor-pointer"
                  >
                    <item.Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="text-neutral-300 mx-6">
              |
            </div>

            {/* Sound Section */}
            <div
              className="flex items-center relative"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <p className="font-semibold tracking-wider text-xs me-4">
                {t("nav.sound")}
              </p>
              <div className="flex gap-x-4 text-2xl ms-8">
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.2, color: "#c38a76" }}
                  whileTap={{ scale: 0.9 }}
                  className="block transition-colors text-neutral-600 cursor-pointer"
                  title={isPlaying ? "Mute BGM" : "Play BGM"}
                >
                  {isPlaying ? <HiMiniSpeakerWave className="text-[#c38a76]" /> : <HiMiniSpeakerXMark />}
                </motion.button>
              </div>

              {/* Volume Control Hover Popover */}
              <AnimatePresence>
                {showVolumeSlider && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 p-3 rounded-xl bg-white border border-[#c38a76]/30 shadow-xl w-36 flex flex-col gap-2 z-50 normal-case"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#694231]">
                      <span>Volume</span>
                      <span>{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-[#fedacb] rounded-lg appearance-none cursor-pointer accent-[#694231]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Top Sound Toggle Button */}
          <div className="flex md:hidden items-center">
            <motion.button
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
              className="text-neutral-600 hover:text-[#c38a76] text-2xl transition-colors"
              aria-label="Toggle sound"
            >
              {isPlaying ? <HiMiniSpeakerWave className="text-[#c38a76]" /> : <HiMiniSpeakerXMark />}
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Floating Action Button & Drawer Menu */}
      <MobileNavDrawer
        navLinks={navLinks}
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
