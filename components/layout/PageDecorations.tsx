interface PageDecorationsProps {
  leftWatermark?: string;
  rightWatermark?: string;
  topClass?: string;
}

export default function PageDecorations({
  leftWatermark = "PURIN KOKOA OFFICIAL FAN CLUB",
  rightWatermark = "PURURIN OFFICIAL FAN CLUB",
  topClass = "top-16",
}: PageDecorationsProps) {
  return (
    <>
      {/* Background Confetti, Festive Shapes & Whimsical Moving Trinkets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* ======================================================
            1. PITA KONFETI (CONFETTI STRIPS & STREAMERS)
            Outer wrapper controls translation & floating;
            Inner div retains full rotation angle cleanly.
        ======================================================= */}
        {/* Left side streamers */}
        <div className="absolute top-[8%] left-[3%] sm:left-[5%] animate-flutter-1">
          <div className="w-3.5 h-9 bg-[#fcaa94] rotate-45 rounded-sm opacity-70 shadow-xs" />
        </div>
        <div className="absolute top-[22%] left-[4%] sm:left-[6%] animate-flutter-2">
          <div className="w-3 h-8 bg-[#ffd166] -rotate-12 rounded-sm opacity-75" />
        </div>
        <div className="absolute top-[38%] left-[2%] sm:left-[4%] animate-flutter-1">
          <div className="w-4 h-10 bg-[#7ec8e3] rotate-75 rounded-sm opacity-70" />
        </div>
        <div className="absolute top-[52%] left-[5%] sm:left-[7%] animate-flutter-2">
          <div className="w-3.5 h-8 bg-[#ff9ebb] -rotate-45 rounded-sm opacity-70" />
        </div>
        <div className="absolute top-[68%] left-[3%] sm:left-[5%] animate-flutter-1">
          <div className="w-4 h-9 bg-[#c084fc] rotate-30 rounded-sm opacity-65" />
        </div>
        <div className="absolute top-[82%] left-[4%] sm:left-[6%] animate-flutter-2">
          <div className="w-3.5 h-9 bg-[#c38a76] -rotate-30 rounded-sm opacity-65" />
        </div>
        <div className="absolute top-[94%] left-[6%] sm:left-[8%] animate-flutter-1">
          <div className="w-4 h-8 bg-[#ffd166] rotate-45 rounded-sm opacity-70" />
        </div>

        {/* Right side streamers */}
        <div className="absolute top-[10%] right-[3%] sm:right-[5%] animate-flutter-2">
          <div className="w-3.5 h-9 bg-[#7ec8e3] -rotate-45 rounded-sm opacity-70" />
        </div>
        <div className="absolute top-[25%] right-[5%] sm:right-[7%] animate-flutter-1">
          <div className="w-4 h-10 bg-[#fcaa94] rotate-15 rounded-sm opacity-70" />
        </div>
        <div className="absolute top-[42%] right-[3%] sm:right-[4%] animate-flutter-2">
          <div className="w-3 h-8 bg-[#ff9ebb] -rotate-60 rounded-sm opacity-65" />
        </div>
        <div className="absolute top-[58%] right-[4%] sm:right-[6%] animate-flutter-1">
          <div className="w-4 h-9 bg-[#ffd166] rotate-45 rounded-sm opacity-70" />
        </div>
        <div className="absolute top-[72%] right-[2%] sm:right-[5%] animate-flutter-2">
          <div className="w-3.5 h-10 bg-[#7ec8e3] -rotate-15 rounded-sm opacity-65" />
        </div>
        <div className="absolute top-[86%] right-[5%] sm:right-[7%] animate-flutter-1">
          <div className="w-4 h-8 bg-[#c084fc] rotate-60 rounded-sm opacity-65" />
        </div>
        <div className="absolute top-[95%] right-[3%] sm:right-[6%] animate-flutter-2">
          <div className="w-3 h-9 bg-[#fcaa94] -rotate-45 rounded-sm opacity-70" />
        </div>

        {/* ======================================================
            2. CINCIN & LINGKARAN TERBUKA (HOLLOW RINGS & DONUTS)
        ======================================================= */}
        <div className="absolute top-[6%] left-[12%] animate-bob-slow">
          <div className="w-6 h-6 rounded-full border-2 border-[#fcaa94]/70" />
        </div>
        <div className="absolute top-[18%] right-[10%] animate-flutter-1">
          <div className="w-7 h-7 rounded-full border-2 border-[#ffd166]/70" />
        </div>
        <div className="absolute top-[34%] left-[9%] animate-bob-slow">
          <div className="w-5 h-5 rounded-full border-2 border-[#7ec8e3]/70" />
        </div>
        <div className="absolute top-[48%] right-[12%] animate-flutter-2">
          <div className="w-8 h-8 rounded-full border-2 border-[#ff9ebb]/60" />
        </div>
        <div className="absolute top-[64%] left-[11%] animate-bob-slow">
          <div className="w-6 h-6 rounded-full border-2 border-[#c084fc]/60" />
        </div>
        <div className="absolute top-[78%] right-[9%] animate-flutter-1">
          <div className="w-7 h-7 rounded-full border-2 border-[#fcaa94]/70" />
        </div>
        <div className="absolute top-[90%] left-[10%] animate-bob-slow">
          <div className="w-5 h-5 rounded-full border-2 border-[#ffd166]/70" />
        </div>

        {/* ======================================================
            3. BINTIK PERMEN BULAT (SOLID CANDY POLKA DOTS)
        ======================================================= */}
        <div className="absolute top-[12%] left-[8%] animate-flutter-1">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffd166]/90 shadow-xs" />
        </div>
        <div className="absolute top-[16%] right-[6%] animate-flutter-2">
          <div className="w-3 h-3 rounded-full bg-[#fcaa94]/90 shadow-xs" />
        </div>
        <div className="absolute top-[30%] left-[14%] animate-bob-slow">
          <div className="w-4 h-4 rounded-full bg-[#7ec8e3]/85 shadow-xs" />
        </div>
        <div className="absolute top-[44%] right-[8%] animate-flutter-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff9ebb]/90 shadow-xs" />
        </div>
        <div className="absolute top-[60%] left-[7%] animate-flutter-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffd166]/90 shadow-xs" />
        </div>
        <div className="absolute top-[74%] right-[14%] animate-bob-slow">
          <div className="w-3 h-3 rounded-full bg-[#c084fc]/80 shadow-xs" />
        </div>
        <div className="absolute top-[88%] left-[13%] animate-flutter-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#7ec8e3]/85 shadow-xs" />
        </div>
        <div className="absolute top-[96%] right-[11%] animate-flutter-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#fcaa94]/90 shadow-xs" />
        </div>

        {/* ======================================================
            4. SEGITIGA CERIA (FESTIVE GEOMETRIC TRIANGLES)
        ======================================================= */}
        <div className="absolute top-[14%] right-[14%] animate-flutter-1">
          <svg className="w-5 h-5 text-[#ffd166] opacity-70 rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,22 2,22" />
          </svg>
        </div>
        <div className="absolute top-[28%] left-[10%] animate-flutter-2">
          <svg className="w-4 h-4 text-[#fcaa94] opacity-65 -rotate-45" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,22 2,22" />
          </svg>
        </div>
        <div className="absolute top-[55%] left-[13%] animate-flutter-1">
          <svg className="w-4.5 h-4.5 text-[#7ec8e3] opacity-70 rotate-45" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,22 2,22" />
          </svg>
        </div>
        <div className="absolute top-[66%] right-[8%] animate-flutter-2">
          <svg className="w-4 h-4 text-[#ff9ebb] opacity-65 -rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,22 2,22" />
          </svg>
        </div>
        <div className="absolute top-[84%] right-[12%] animate-flutter-1">
          <svg className="w-5 h-5 text-[#c084fc] opacity-70 rotate-75" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,22 2,22" />
          </svg>
        </div>

        {/* ======================================================
            5. PITA GELOMBANG & ZIGZAG (WAVY SQUIGGLES)
        ======================================================= */}
        <div className="absolute top-[20%] left-[3%] animate-flutter-1 opacity-55">
          <svg className="w-7 h-7 text-[#fcaa94] rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M2 12c3-5 6 5 9 0s6 5 9 0" />
          </svg>
        </div>
        <div className="absolute top-[46%] right-[4%] animate-flutter-2 opacity-55">
          <svg className="w-8 h-8 text-[#7ec8e3] -rotate-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M2 12c3-5 6 5 9 0s6 5 9 0" />
          </svg>
        </div>
        <div className="absolute top-[80%] left-[5%] animate-flutter-1 opacity-55">
          <svg className="w-7 h-7 text-[#ffd166] rotate-15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M2 12c3-5 6 5 9 0s6 5 9 0" />
          </svg>
        </div>

        {/* ======================================================
            6. BINTANG KEMILAU & KRISTAL (SPARKLES & TWINKLES)
        ======================================================= */}
        <div className="absolute top-[7%] right-[8%] animate-sparkle-spin">
          <span className="text-[#fcaa94] text-2xl font-black select-none inline-block">✦</span>
        </div>
        <div className="absolute top-[17%] left-[6%] animate-flutter-1">
          <span className="text-[#ffd166] text-xl select-none inline-block">✧</span>
        </div>
        <div className="absolute top-[26%] right-[11%] animate-sparkle-spin">
          <span className="text-[#7ec8e3] text-2xl select-none inline-block">✦</span>
        </div>
        <div className="absolute top-[36%] left-[8%] animate-bob-slow">
          <span className="text-[#ff9ebb] text-lg select-none inline-block">◆</span>
        </div>
        <div className="absolute top-[45%] left-[5%] animate-sparkle-spin">
          <span className="text-[#ffd166] text-2xl select-none inline-block">✦</span>
        </div>
        <div className="absolute top-[54%] right-[7%] animate-flutter-2">
          <span className="text-[#fcaa94] text-xl select-none inline-block">◇</span>
        </div>
        <div className="absolute top-[62%] right-[10%] animate-sparkle-spin">
          <span className="text-[#c084fc] text-2xl select-none inline-block">✦</span>
        </div>
        <div className="absolute top-[70%] left-[7%] animate-flutter-1">
          <span className="text-[#7ec8e3] text-xl select-none inline-block">✶</span>
        </div>
        <div className="absolute top-[79%] left-[12%] animate-sparkle-spin">
          <span className="text-[#fcaa94] text-2xl select-none inline-block">✦</span>
        </div>
        <div className="absolute top-[89%] right-[8%] animate-flutter-2">
          <span className="text-[#ffd166] text-xl select-none inline-block">✧</span>
        </div>
        <div className="absolute top-[97%] left-[5%] animate-sparkle-spin">
          <span className="text-[#ff9ebb] text-2xl select-none inline-block">✦</span>
        </div>

        {/* Decorative Plus Crosses */}
        <div className="absolute top-[11%] left-[16%] animate-bob-slow">
          <span className="text-[#fcaa94] text-base font-black opacity-65 select-none">+</span>
        </div>
        <div className="absolute top-[39%] right-[9%] animate-flutter-1">
          <span className="text-[#ffd166] text-lg font-black opacity-70 select-none">+</span>
        </div>
        <div className="absolute top-[67%] left-[15%] animate-bob-slow">
          <span className="text-[#7ec8e3] text-base font-black opacity-65 select-none">+</span>
        </div>
        <div className="absolute top-[92%] right-[15%] animate-flutter-2">
          <span className="text-[#c084fc] text-base font-black opacity-65 select-none">+</span>
        </div>

        {/* ======================================================
            7. AKSEN MASCOT PURIN (WIGGLING CAT PAW & PUDDING)
        ======================================================= */}
        <div className="absolute top-[15%] left-[2%] animate-wiggle">
          <span className="text-xl opacity-40 select-none inline-block cursor-default" title="Purin Paw">
            🐾
          </span>
        </div>
        <div className="absolute top-[49%] left-[2%] animate-wiggle">
          <span className="text-xl opacity-40 select-none inline-block cursor-default" title="Purin Paw">
            🐾
          </span>
        </div>
        <div className="absolute top-[75%] right-[3%] animate-wiggle">
          <span className="text-xl opacity-40 select-none inline-block cursor-default" title="Purin Paw">
            🐾
          </span>
        </div>
        <div className="absolute top-[33%] right-[2%] animate-bob-slow">
          <span className="text-lg opacity-35 select-none inline-block cursor-default" title="Pudding Whimsy">
            🍮
          </span>
        </div>
        <div className="absolute top-[85%] left-[3%] animate-flutter-1">
          <span className="text-lg opacity-35 select-none inline-block cursor-default" title="Chocolate Whimsy">
            🍫
          </span>
        </div>
      </div>

      {/* ======================================================
          8. GIANT VERTICAL SIDE WATERMARKS
      ======================================================= */}
      {/* Left Side Watermark */}
      <div
        className={`hidden xl:block absolute left-2 2xl:left-6 ${topClass} bottom-16 pointer-events-none select-none z-0`}
      >
        <div className="sticky top-28 [writing-mode:vertical-lr] rotate-180 text-6xl 2xl:text-8xl font-black tracking-[0.25em] text-transparent [text-stroke:2px_rgba(195,138,118,0.22)] opacity-80 uppercase">
          {leftWatermark}
        </div>
      </div>

      {/* Right Side Watermark */}
      <div
        className={`hidden xl:block absolute right-2 2xl:right-6 ${topClass} bottom-16 pointer-events-none select-none z-0`}
      >
        <div className="sticky top-28 [writing-mode:vertical-lr] text-6xl 2xl:text-8xl font-black tracking-[0.25em] text-transparent [text-stroke:2px_rgba(195,138,118,0.22)] opacity-80 uppercase">
          {rightWatermark}
        </div>
      </div>
    </>
  );
}
