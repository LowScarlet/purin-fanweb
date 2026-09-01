export interface CommunityLink {
  id: string;
  title: string;
  description: string;
  url: string;
  iconName: "discord" | "twitter" | "youtube" | "heart" | "globe";
  badgeText?: string;
  category: "official" | "fan_club" | "project" | "guidelines";
  memberCountText?: string;
}

export interface CommunityProject {
  id: string;
  title: string;
  description: string;
  leadAuthor: string;
  status: "ongoing" | "completed" | "recruiting";
  url?: string;
  imageUrl?: string;
}
