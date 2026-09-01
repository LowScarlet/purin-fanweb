import { repositories } from "@/lib/repositories";
import ScheduleClient from "@/components/schedule/ScheduleClient";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Calendar } from "lucide-react";
import TypingText from "@/components/ui/TypingText";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "Schedule - Purin Kokoa Stream Calendar",
  description: "Jadwal live stream mingguan Purin Kokoa lengkap dengan zona waktu dan status tayang.",
};

export default async function SchedulePage() {
  const schedule = await repositories.schedule.getAll();

  return (
    <SubpageLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <AnimatedSection delay={0.1}>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c38a76]">
              <Calendar className="w-4 h-4" /> Live Stream Timetable
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#694231] mt-1 font-sans">
              Jadwal Stream Purin Kokoa 🍮
            </h1>
            <p className="text-xs sm:text-sm text-[#694231]/80 mt-1 max-w-2xl">
              <TypingText
                text="Pantau jadwal tayang live stream game horror, chit-chat santai, rakit Gunpla, dan karaoke bersama Cocoanuts."
                speed={16}
                delay={200}
              />
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ScheduleClient initialSchedule={schedule} />
        </AnimatedSection>
      </div>
    </SubpageLayout>
  );
}
