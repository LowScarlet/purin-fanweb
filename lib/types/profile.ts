export interface SocialLink {
  id: string;
  platform: "youtube" | "twitter" | "instagram" | "tiktok" | "discord" | "marshmallow" | "trakteer";
  label: string;
  handle: string;
  url: string;
  iconName: string;
  isActive: boolean;
}

export interface Profile {
  id: string;
  name: string;
  japaneseName: string;
  englishName: string;
  handle: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  tagline: string;
  birthday: string;
  debutDate: string; // ISO-8601 date string e.g. "2024-04-01"
  height: string;
  hobby?: string;
  languages?: string[];
  bloodType?: string;
  race?: string;
  lore?: string;
  fanName: string;
  fanMark?: string;
  officialTags: {
    general: string;
    live: string;
    fanart: string;
    clips: string;
    nsfw?: string;
  };
  streamingRules: string[];
  socials: SocialLink[];
}
