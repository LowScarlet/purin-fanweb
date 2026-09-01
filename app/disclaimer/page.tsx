import Link from "next/link";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { ShieldCheck, Info, Heart, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Disclaimer & Copyright Guidelines - Purin Kokoa Fan Portal",
  description: "Pedoman hak cipta, disclaimer proyek fan-made non-komersial Purin Kokoa.",
};

export default function DisclaimerPage() {
  return (
    <SubpageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c38a76]">
          <ShieldCheck className="w-4 h-4" /> Legal & Project Notices
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#694231] mt-1 font-sans">
          Disclaimer & Pedoman Hak Cipta 🍮
        </h1>
        <p className="text-xs sm:text-sm text-[#694231]/80 mt-1">
          PURIN KOKOA 著作権に関するガイドライン (Fan-made Project Information)
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#c38a76]/25 shadow-sm space-y-6 text-sm text-[#694231] leading-relaxed">
        {/* Section 1 */}
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[#694231] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#c38a76]" /> 1. Sifat Proyek Fan-Made
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Website portal ini adalah <strong>karya penggemar tidak resmi (unofficial fan-made project)</strong> yang dibuat dengan penuh cinta oleh komunitas untuk mengapresiasi dan mendukung VTuber / Content Creator <strong>Purin Kokoa</strong>.
          </p>
          <p className="text-xs sm:text-sm text-black/70">
            Website ini bersifat <strong>non-komersial</strong> dan sama sekali tidak terafiliasi secara resmi ataupun mengambil keuntungan finansial langsung dari pihak manajemen/agensi.
          </p>
        </div>

        <hr className="border-black/5" />

        {/* Section 2 */}
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[#694231] flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" /> 2. Hak Cipta & Kepemilikan Karakter
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Seluruh hak cipta terkait karakter, desain model VTuber, nama, suara, dan konten live stream adalah milik sah dari <strong>Purin Kokoa</strong> dan/atau ilustrator/desainer resmi yang bersangkutan.
          </p>
          <p className="text-xs sm:text-sm text-black/70">
            Ilustrasi, fanart, dan aset media yang ditampilkan di situs ini diberikan kredit sesuai pembuat aslinya dan hanya digunakan untuk keperluan promosi fan.
          </p>
        </div>

        <hr className="border-black/5" />

        {/* Section 3 */}
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[#694231] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c38a76]" /> 3. Permohonan Penurunan Konten (Takedown Request)
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Jika Anda adalah pemegang hak cipta atau perwakilan resmi dan ingin meminta modifikasi atau penghapusan aset/informasi tertentu dari fanweb ini, silakan hubungi tim developer melalui repositori GitHub resmi atau kontak komunitas.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-black/5 text-xs text-[#c38a76] font-bold">
          <span>Pengembang: LowScarlet & Komunitas Cocoanuts</span>
          <Link
            href="https://github.com/LowScarlet/purin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            GitHub Repository <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  </SubpageLayout>
  );
}
