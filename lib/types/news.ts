export type NewsCategory = "Announcement" | "Event" | "Stream" | "Merch" | "Milestone";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or rich text string
  coverImageUrl?: string;
  category: NewsCategory;
  author: string;
  publishedAt: string; // ISO-8601 string
  updatedAt?: string;
  isPinned?: boolean;
  tags?: string[];
}
