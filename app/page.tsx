import HeaderBanner from "@/components/layout/HeaderBanner";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { repositories } from "@/lib/repositories";

export const revalidate = 60; // Refresh static cache periodically

export default async function Home() {
  const schedule = await repositories.schedule.getAll();
  const activeStream = schedule.find((s) => s.status === "live") || schedule[0];

  // Extract YouTube Video ID from external URL if available
  const extractVideoId = (url?: string) => {
    if (!url) return "3xadHYaLobM";
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/|\/e\/|watch\?v=)([^#&?]*).*/);
    return match && match[1]?.length === 11 ? match[1] : "3xadHYaLobM";
  };

  const activeVideoId = extractVideoId(activeStream?.externalUrl);

  return (
    <>
      <div className="flex flex-col justify-between h-screen w-full bg-[#fffcf8]">
        <HeaderBanner videoId={activeVideoId} />
        <AnnouncementBar streams={schedule} />
        <Navbar />
      </div>
      <Footer />
    </>
  );
}
