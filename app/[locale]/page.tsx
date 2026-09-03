import { repositories } from "@/lib/repositories";
import HeaderBanner from "@/components/layout/HeaderBanner";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageDecorations from "@/components/layout/PageDecorations";

export const revalidate = 60; // Refresh static cache periodically

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  const [, schedule] = await Promise.all([
    repositories.profile.getProfile(),
    repositories.schedule.getAll(),
  ]);

  const activeStream = schedule.find((s) => s.status === "live") || schedule[0];

  // Extract YouTube Video ID from external URL if available
  const extractVideoId = (url?: string) => {
    if (!url) return "3xadHYaLobM";
    const match = url.match(
      /(?:v=|\/embed\/|youtu\.be\/|\/v\/|\/e\/|watch\?v=)([^#&?]*).*/
    );
    return match && match[1]?.length === 11 ? match[1] : "3xadHYaLobM";
  };

  const activeVideoId = extractVideoId(activeStream?.externalUrl);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7f2ed] relative overflow-hidden">
      {/* 0. Background Confetti Ribbons & Giant Vertical Side Watermarks */}
      <PageDecorations
        leftWatermark={isEn ? "PURIN KOKOA FAN CLUB" : "PURIN KOKOA OFFICIAL FAN CLUB"}
        rightWatermark={isEn ? "PURURIN FAN WEB PORTAL" : "PURURIN VTUBER PORTAL"}
      />

      {/* 1. HERO BANNER AREA (Video Header + Live Indicator + Ticker) */}
      <div className="relative z-10 flex flex-col justify-between w-full sm:h-[calc(100dvh-80px)] bg-[#fffcf8] overflow-hidden transition-all duration-300">
        <HeaderBanner videoId={activeVideoId} />
        <AnnouncementBar streams={schedule} />
      </div>

      {/* 2. STICKY NAVBAR */}
      <Navbar />

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
}
