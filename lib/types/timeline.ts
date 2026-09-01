export interface TimelineEvent {
  id: string;
  title: string;
  date: string; // ISO-8601 string, e.g. "2024-08-01"
  description: string;
  category: "Debut" | "Subscriber" | "Outfit" | "Event" | "Anniversary";
  mediaUrl?: string;
  externalLink?: string;
}
