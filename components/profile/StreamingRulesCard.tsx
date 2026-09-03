import { Heart, ShieldCheck, Info, Users, Sparkles } from "lucide-react";

interface StreamingRulesCardProps {
  rules?: string[];
  className?: string;
}

export default function StreamingRulesCard({
  rules,
  className = "",
}: StreamingRulesCardProps) {
  const defaultIcons = [
    <Heart key="1" className="w-5 h-5 text-red-500 fill-current" />,
    <ShieldCheck key="2" className="w-5 h-5 text-[#c38a76]" />,
    <Info key="3" className="w-5 h-5 text-[#c38a76]" />,
    <Users key="4" className="w-5 h-5 text-[#c38a76]" />,
    <Sparkles key="5" className="w-5 h-5 text-[#fcaa94]" />,
  ];

  const defaultRules = [
    {
      id: 1,
      icon: defaultIcons[0],
      title: "1. Saling Menghargai & Bahasa Sopan",
      desc: "Saling menghargai sesama penonton di live chat dan gunakan bahasa yang sopan. Jaga suasana stream agar tetap positif dan menyenangkan bagi semua orang.",
    },
    {
      id: 2,
      icon: defaultIcons[1],
      title: "2. Bebas Topik SARA & Politik",
      desc: "Hindari membicarakan topik SARA, politik, perdebatan sensitif, atau ujaran kebencian dalam bentuk apapun di kolom komentar maupun obrolan langsung.",
    },
    {
      id: 3,
      icon: defaultIcons[2],
      title: "3. No Spam & No Spoiler / Backseating",
      desc: "Jangan melakukan spam pesan atau emote berulang, serta hindari memberikan bocoran jalan cerita (spoiler) ataupun backseating berlebihan kecuali jika Purin secara langsung meminta bantuan penonton.",
    },
    {
      id: 4,
      icon: defaultIcons[3],
      title: "4. Etika Menyebut Streamer / Creator Lain",
      desc: "Jangan menyebut nama content creator, VTuber, atau streamer lain kecuali jika Purin sendiri yang sedang membicarakannya lebih dulu, begitu pula sebaliknya di stream creator lain (don't mention Purin unprompted).",
    },
    {
      id: 5,
      icon: defaultIcons[4],
      title: "5. Have Fun & Enjoy the Stream!",
      desc: "Yang terpenting: Mari bersenang-senang bersama, nikmati setiap detik keseruan live stream, dan sebarkan kehangatan bersama keluarga besar Pururin! 🍮✨",
    },
  ];

  return (
    <div
      className={`rounded-[1.75rem] sm:rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 p-4 sm:p-8 md:p-12 space-y-4 sm:space-y-6 ${className}`}
    >
      <p className="text-center text-xs sm:text-sm font-medium text-[#694231]/80 max-w-xl mx-auto pb-1 sm:pb-2">
        Panduan menikmati live stream Purin Kokoa secara nyaman, tertib, dan ramah untuk seluruh keluarga Pururin:
      </p>

      {/* Disclaimer-style Rule Cards */}
      <div className="space-y-3 sm:space-y-4">
        {rules && rules.length > 0
          ? rules.map((ruleText, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 space-y-1.5 sm:space-y-2 shadow-xs"
              >
                <h3 className="text-sm sm:text-lg font-black text-[#694231] flex items-center gap-2">
                  {defaultIcons[idx % defaultIcons.length]}
                  <span>Aturan #{idx + 1}</span>
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#4a2e22] leading-relaxed">
                  {ruleText}
                </p>
              </div>
            ))
          : defaultRules.map((r) => (
              <div
                key={r.id}
                className="p-4 sm:p-6 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 space-y-1.5 sm:space-y-2 shadow-xs"
              >
                <h3 className="text-sm sm:text-lg font-black text-[#694231] flex items-center gap-2">
                  {r.icon} <span>{r.title}</span>
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#4a2e22] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
