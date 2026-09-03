import { repositories } from "@/lib/repositories";
import ScheduleClient from "@/components/schedule/ScheduleClient";
import SubpageLayout from "@/components/layout/SubpageLayout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageDecorations from "@/components/layout/PageDecorations";
import DiamondTitle from "@/components/ui/DiamondTitle";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const schedule = await repositories.schedule.getAll();

  return (
    <SubpageLayout>
      {/* Outer wrapper with Hololive Fanclub soft neutral background */}
      <div className="relative min-h-screen bg-[#f7f2ed] overflow-hidden py-10 sm:py-16">
        {/* Reusable Confetti Ribbons & Giant Vertical Side Watermarks */}
        <PageDecorations
          leftWatermark={isEn ? "PURIN KOKOA STREAM SCHEDULE" : "PURIN KOKOA STREAM SCHEDULE"}
          rightWatermark={isEn ? "PURURIN LIVE TIMETABLE" : "PURURIN LIVE TIMETABLE"}
          topClass="top-16"
        />

        {/* ========================================================
            MAIN CONTAINER CONTENT
        ========================================================= */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header Title with Diamond Accents */}
          <AnimatedSection delay={0.05}>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#c38a76]">
                <span>✦</span>
                <span>{isEn ? "Weekly Live Timetable" : "Weekly Live Timetable"}</span>
                <span>✦</span>
              </div>

              {/* Diamond Section Title */}
              <DiamondTitle
                title={isEn ? "Purin Kokoa Stream Schedule 🎙️" : "Jadwal Stream Purin Kokoa 🎙️"}
                as="h1"
                size="xl"
              />

              <p className="text-xs sm:text-sm font-medium text-[#694231]/80 max-w-xl mx-auto">
                {isEn
                  ? "Stay tuned for horror gaming, cozy chit-chats, Gunpla building, and karaoke sessions with Pururin in auto-converted timezones."
                  : "Pantau siaran game horror, chit-chat santai, rakit Gunpla, dan karaoke bersama Pururin dalam zona waktu otomatis."}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <ScheduleClient initialSchedule={schedule} />
          </AnimatedSection>
        </div>
      </div>
    </SubpageLayout>
  );
}
