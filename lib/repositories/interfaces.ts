import { Profile, SocialLink } from "../types/profile";
import { ScheduleItem } from "../types/schedule";
import { NewsArticle, NewsCategory } from "../types/news";
import { TimelineEvent } from "../types/timeline";
import { GalleryItem, GalleryCategory } from "../types/media";
import { CommunityLink, CommunityProject } from "../types/community";
import { SoundTrack, VoiceClip } from "../types/sound";

export interface IProfileRepository {
  getProfile(): Promise<Profile>;
  getSocials(): Promise<SocialLink[]>;
}

export interface IScheduleRepository {
  getAll(): Promise<ScheduleItem[]>;
  getUpcoming(limit?: number): Promise<ScheduleItem[]>;
  getLive(): Promise<ScheduleItem | null>;
  getById(id: string): Promise<ScheduleItem | null>;
}

export interface INewsRepository {
  getAll(category?: NewsCategory | "All"): Promise<NewsArticle[]>;
  getFeatured(limit?: number): Promise<NewsArticle[]>;
  getBySlug(slug: string): Promise<NewsArticle | null>;
}

export interface ITimelineRepository {
  getAll(): Promise<TimelineEvent[]>;
}

export interface IGalleryRepository {
  getAll(categoryId?: string): Promise<GalleryItem[]>;
  getCategories(): Promise<GalleryCategory[]>;
  getFeatured(limit?: number): Promise<GalleryItem[]>;
}

export interface ICommunityRepository {
  getLinks(): Promise<CommunityLink[]>;
  getProjects(): Promise<CommunityProject[]>;
}

export interface ISoundRepository {
  getBgmTracks(): Promise<SoundTrack[]>;
  getVoiceClips(): Promise<VoiceClip[]>;
}
