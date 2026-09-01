import { INewsRepository } from "../interfaces";
import { NewsArticle, NewsCategory } from "../../types/news";
import { mockNews } from "../../data/mock/mockNews";

export class StaticNewsRepository implements INewsRepository {
  async getAll(category?: NewsCategory | "All"): Promise<NewsArticle[]> {
    if (!category || category === "All") {
      return [...mockNews].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    return mockNews
      .filter((n) => n.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getFeatured(limit?: number): Promise<NewsArticle[]> {
    const sorted = [...mockNews].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    return limit ? sorted.slice(0, limit) : sorted;
  }

  async getBySlug(slug: string): Promise<NewsArticle | null> {
    const article = mockNews.find((n) => n.slug === slug);
    return article ?? null;
  }
}
