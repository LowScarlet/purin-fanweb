import Link from "next/link";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { ShieldCheck, Info, Heart, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageDecorations from "@/components/layout/PageDecorations";
import DiamondTitle from "@/components/ui/DiamondTitle";

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  return (
    <SubpageLayout>
      {/* Outer wrapper with Hololive Fanclub soft neutral background */}
      <div className="relative min-h-screen bg-[#f7f2ed] overflow-hidden py-10 sm:py-16">
        {/* Page Decorations (Confetti & Giant Watermarks) */}
        <PageDecorations
          leftWatermark="PURIN KOKOA FAN GUIDELINES"
          rightWatermark="NON-COMMERCIAL FAN PROJECT"
        />

        {/* ========================================================
            MAIN CONTAINER CONTENT
        ========================================================= */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header Title with Diamond Accents */}
          <AnimatedSection delay={0.05}>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#c38a76]">
                <span>✦</span>
                <span>{isEn ? "Legal & Project Notices" : "Legal & Project Notices"}</span>
                <span>✦</span>
              </div>

              {/* Diamond Section Title */}
              <DiamondTitle
                title={isEn ? "Disclaimer & Copyright Guidelines 🍮" : "Disclaimer & Pedoman Hak Cipta 🍮"}
                size="lg"
              />

              <p className="text-xs sm:text-sm font-semibold text-[#694231]/80 max-w-xl mx-auto">
                PURIN KOKOA 著作権に関するガイドライン (Unofficial Fan-made Project Information)
              </p>
            </div>
          </AnimatedSection>

          {/* Main Stadium Card */}
          <AnimatedSection delay={0.15}>
            <div className="rounded-[2.5rem] bg-white border border-[#c38a76]/20 shadow-xl shadow-[#694231]/5 p-6 sm:p-12 space-y-8">
              {/* Section 1 */}
              <div className="p-6 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 space-y-2 shadow-xs">
                <h2 className="text-base sm:text-lg font-black text-[#694231] flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#c38a76]" />
                  <span>{isEn ? "1. Nature of the Fan-Made Project" : "1. Sifat Proyek Fan-Made"}</span>
                </h2>
                <p className="text-sm font-medium text-[#4a2e22] leading-relaxed">
                  {isEn ? (
                    <>This portal website is an <strong>unofficial fan-made project</strong> created with love by the community to support and appreciate VTuber / Content Creator <strong>Purin Kokoa</strong>.</>
                  ) : (
                    <>Website portal ini adalah <strong>karya penggemar tidak resmi (unofficial fan-made project)</strong> yang dibuat dengan penuh cinta oleh komunitas untuk mengapresiasi dan mendukung VTuber / Content Creator <strong>Purin Kokoa</strong>.</>
                  )}
                </p>
                <p className="text-sm font-medium text-[#4a2e22] leading-relaxed">
                  {isEn ? (
                    <>This website is completely <strong>non-commercial</strong>, not officially affiliated with management or agencies, and generates no direct commercial profit.</>
                  ) : (
                    <>Website ini bersifat <strong>non-komersial</strong> dan sama sekali tidak terafiliasi secara resmi ataupun mengambil keuntungan finansial langsung dari pihak manajemen/agensi.</>
                  )}
                </p>
              </div>

              {/* Section 2 */}
              <div className="p-6 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 space-y-2 shadow-xs">
                <h2 className="text-base sm:text-lg font-black text-[#694231] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                  <span>{isEn ? "2. Copyright & Character Ownership" : "2. Hak Cipta & Kepemilikan Karakter"}</span>
                </h2>
                <p className="text-sm font-medium text-[#4a2e22] leading-relaxed">
                  {isEn ? (
                    <>All intellectual property rights regarding characters, VTuber 2D/3D model designs, names, voice recordings, and live stream content are the sole property of <strong>Purin Kokoa</strong> and/or official creators.</>
                  ) : (
                    <>Seluruh hak cipta terkait karakter, desain model VTuber, nama, suara, dan konten live stream adalah milik sah dari <strong>Purin Kokoa</strong> dan/atau ilustrator/desainer resmi yang bersangkutan.</>
                  )}
                </p>
                <p className="text-sm font-medium text-[#4a2e22] leading-relaxed">
                  {isEn ? (
                    <>Illustrations, fanarts, and media assets displayed across this portal are credited to their original creators and used strictly for fan community promotion.</>
                  ) : (
                    <>Ilustrasi, fanart, dan aset media yang ditampilkan di situs ini diberikan kredit sesuai pembuat aslinya dan hanya digunakan untuk keperluan promosi komunitas fan.</>
                  )}
                </p>
              </div>

              {/* Section 3 */}
              <div className="p-6 rounded-2xl bg-[#fff8f3] border border-[#fcaa94]/40 space-y-2 shadow-xs">
                <h2 className="text-base sm:text-lg font-black text-[#694231] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#c38a76]" />
                  <span>{isEn ? "3. Content Takedown & Modification Requests" : "3. Permohonan Penurunan Konten (Takedown Request)"}</span>
                </h2>
                <p className="text-sm font-medium text-[#4a2e22] leading-relaxed">
                  {isEn ? (
                    <>If you are a copyright owner or official representative and wish to request modification or removal of specific assets or information from this fanweb, please contact the developer team via GitHub or community channels.</>
                  ) : (
                    <>Jika Anda adalah pemegang hak cipta atau perwakilan resmi dan ingin meminta modifikasi atau penghapusan aset/informasi tertentu dari fanweb ini, silakan hubungi tim developer melalui repositori GitHub resmi atau kontak komunitas.</>
                  )}
                </p>
              </div>

              {/* Footer Attribution Bar */}
              <div className="pt-4 flex flex-wrap items-center justify-between border-t border-[#c38a76]/15 text-xs text-[#c38a76] font-black gap-2">
                <span>{isEn ? "Developer: LowScarlet & Pururin Community 🍮" : "Pengembang: LowScarlet & Komunitas Pururin 🍮"}</span>
                <Link
                  href="https://github.com/LowScarlet/purin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </SubpageLayout>
  );
}
