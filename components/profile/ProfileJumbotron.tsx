import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/lib/types/profile";
import { Sparkles, BookOpen, Calendar, MessageSquare } from "lucide-react";
import TypingText from "@/components/ui/TypingText";
import ppImage from "@/public/pp.jpg";

interface ProfileJumbotronProps {
  profile: Profile;
}

export default function ProfileJumbotron({ profile }: ProfileJumbotronProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 p-6 sm:p-10 md:p-12 transition-all duration-300">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#fcaa94] via-[#c38a76] to-[#694231]" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-10 pt-2">
        {/* Mascot Avatar with Golden Ring */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#fcaa94]/50 shrink-0 group">
          <Image
            src={ppImage}
            alt={profile.name}
            fill
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#fcaa94] border-2 border-white rounded-full flex items-center justify-center text-xs shadow-md">
            🍮
          </div>
        </div>

        {/* Jumbotron Intro Text & CTA Buttons */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fedacb]/70 border border-[#fcaa94]/50 text-xs font-black text-[#694231] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#c38a76]" /> Official Fan Portal & Hub
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#694231] tracking-tight font-sans">
              Selamat Datang di Purin Kokoa Portal 🍮
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-[#c38a76] font-mono">
              <TypingText
                text="Your Sweet & Cozy Pudding VTuber Chocolatier Fan Community Hub! 🍫🐱"
                speed={20}
                delay={200}
              />
            </p>
          </div>

          <p className="text-sm font-medium text-[#4a2e22] leading-relaxed max-w-2xl">
            Tempat berkumpulnya komunitas <strong className="font-black text-[#694231]">Pururin</strong> dari seluruh dunia! Temukan jadwal live stream terupdate, official lore, reference sheet, galeri karya komunitas, hingga ruang mabar Discord.
          </p>

          {/* Jumbotron Quick Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#694231] hover:bg-[#c38a76] text-white text-xs font-black shadow-md hover:scale-105 transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#fcaa94]" />
              <span>Profil & Lore Resmi</span>
            </Link>

            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fcaa94] hover:bg-[#fedacb] text-[#694231] text-xs font-black border border-[#fcaa94]/50 shadow-sm hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#694231]" />
              <span>Jadwal Live Stream</span>
            </Link>

            <Link
              href="https://discord.gg/SzvzcQWabE"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#fff8f3] text-[#694231] text-xs font-black border border-[#c38a76]/30 shadow-xs hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#c38a76]" />
              <span>Join Discord Pururin</span>
            </Link>
          </div>

          {/* 4 Quick Stat Badges in Stadium Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#c38a76]/15">
            <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 text-center shadow-xs">
              <div className="text-[10px] text-[#c38a76] uppercase font-black tracking-wider">Role</div>
              <div className="text-xs font-black text-[#694231] truncate mt-0.5">Chocolatier 🐱</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 text-center shadow-xs">
              <div className="text-[10px] text-[#c38a76] uppercase font-black tracking-wider">Birthday</div>
              <div className="text-xs font-black text-[#694231] mt-0.5">{profile.birthday}</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 text-center shadow-xs">
              <div className="text-[10px] text-[#c38a76] uppercase font-black tracking-wider">Fan Base</div>
              <div className="text-xs font-black text-[#694231] mt-0.5">Pururin 🍮</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 text-center shadow-xs">
              <div className="text-[10px] text-[#c38a76] uppercase font-black tracking-wider">Height</div>
              <div className="text-xs font-black text-[#694231] mt-0.5">{profile.height}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
