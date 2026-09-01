"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuCat } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineInstagram, AiOutlineTikTok } from "react-icons/ai";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { Menu, X as CloseIcon } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import { useLoading } from "../context/LoadingContext";

const navLinks = [
  { display: "News", href: "/news" },
  { display: "About", href: "/about" },
  { display: "Schedule", href: "/schedule" },
  { display: "Community", href: "/community" },
  { display: "Disclaimer", href: "/disclaimer" },
];

const shareIcons = [
  { Icon: FaXTwitter, href: "https://x.com/purinkokoa_" },
  { Icon: AiOutlineInstagram, href: "https://www.instagram.com/purinkokoa_" },
  { Icon: AiOutlineTikTok, href: "https://www.tiktok.com/@purinkokoa" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isPlaying, volume, togglePlay, setVolume } = useAudio();
  const { isLoading, isInitialLoad } = useLoading();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
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
    <motion.header
      initial={isInitialLoad ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
      animate={
        isInitialLoad
          ? isLoading
            ? { opacity: 0, y: 15 }
            : { opacity: 1, y: 0 }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#c38a76]/20 select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "shadow-md bg-white/98" : "shadow-xs"
      }`}
    >
      <div
        className={`flex justify-between items-center bg-transparent px-6 sm:px-8 font-semibold text-neutral-500 uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "py-2 sm:py-3 h-14 sm:h-16" : "py-5 sm:py-6 h-20 sm:h-[88px]"
        }`}
      >
        {/* Left: Brand Logo + NavLinks right next to it */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-2 me-4 sm:me-8 group origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isScrolled ? "scale(0.92)" : "scale(1)",
            }}
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <LuCat
                className={`text-[#694231] transition-colors duration-300 group-hover:text-[#c38a76] ${
                  isScrolled ? "text-3xl sm:text-3.5xl" : "text-3xl sm:text-4xl"
                }`}
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
          <div
            className={`hidden md:flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "space-x-5 text-xs" : "space-x-8 text-sm"
            }`}
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.display}
                  href={item.href}
                  className={`block relative py-1 hover:text-[#c38a76] transition duration-300 ease-in-out tracking-wider ${
                    isActive ? "text-[#694231] font-bold" : ""
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

        {/* Right: Share, Divider, Sound Controls */}
        <div
          className="hidden md:flex items-center origin-right transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: isScrolled ? "scale(0.92)" : "scale(1)",
          }}
        >
          {/* Share Section */}
          <div className="flex items-center">
            <p className="font-semibold tracking-wider text-xs">
              SHARE
            </p>
            <div
              className={`flex transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? "gap-x-3 text-xl ms-5" : "gap-x-4 text-2xl ms-8"
              }`}
            >
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
          <div
            className={`text-neutral-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "mx-5" : "mx-8"
            }`}
          >
            |
          </div>

          {/* Sound Section */}
          <div
            className="flex items-center relative"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <p className="font-semibold tracking-wider text-xs">
              SOUND
            </p>
            <div
              className={`flex transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? "gap-x-3 text-xl ms-5" : "gap-x-4 text-2xl ms-8"
              }`}
            >
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

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3 sm:gap-4">
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            className={`text-neutral-600 hover:text-[#c38a76] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
            aria-label="Toggle sound"
          >
            {isPlaying ? <HiMiniSpeakerWave className="text-[#c38a76]" /> : <HiMiniSpeakerXMark />}
          </motion.button>
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className={`text-neutral-700 hover:text-[#c38a76] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon className={`${isScrolled ? "w-5 h-5" : "w-6 h-6"} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`} />
            ) : (
              <Menu className={`${isScrolled ? "w-5 h-5" : "w-6 h-6"} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/98 border-t border-[#c38a76]/20 px-8 py-4 space-y-3 overflow-hidden"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-bold tracking-wider py-1.5 ${
                    isActive ? "text-[#c38a76]" : "text-[#694231]"
                  }`}
                >
                  {link.display}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs text-[#694231] font-semibold">
              <span>Share:</span>
              <div className="flex items-center gap-4 text-xl">
                <Link href="https://x.com/purinkokoa_" target="_blank"><FaXTwitter /></Link>
                <Link href="https://www.instagram.com/purinkokoa_" target="_blank"><AiOutlineInstagram /></Link>
                <Link href="https://www.tiktok.com/@purinkokoa" target="_blank"><AiOutlineTikTok /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
