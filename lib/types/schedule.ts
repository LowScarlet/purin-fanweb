export type ScheduleStatus = "upcoming" | "live" | "archive" | "completed";

export interface ScheduleItem {
  id: string;
  title: string;
  description?: string;
  scheduledAt: string; // ISO-8601 string, e.g. "2026-09-01T20:00:00+07:00"
  category: "Gaming" | "Chit-Chat" | "Karaoke" | "Handstream" | "Special" | "Collab";
  gameTitle?: string;
  platform: "YouTube" | "Twitch" | "Bilibili";
  externalUrl?: string;
  thumbnailUrl?: string;
  status: ScheduleStatus;
  isPinned?: boolean;
}
