import { CommunityLink, CommunityProject } from "../../types/community";

export const mockCommunityLinks: CommunityLink[] = [
  {
    id: "com_001",
    title: "Purin's Apse (Discord Official)",
    description: "Tempat berkumpulnya semua Pururin! Diskusi live stream, sharing fanart, mabar game, dan info event terkini.",
    url: "https://discord.gg/SzvzcQWabE",
    iconName: "discord",
    badgeText: "Official Discord",
    category: "official",
    memberCountText: "2,400+ Members",
  },
  {
    id: "com_002",
    title: "Twitter Fanart Gallery (#Purspectine)",
    description: "Kumpulan ilustrasi indah, komik, dan karya kreatif dari para fans untuk Purin Kokoa.",
    url: "https://x.com/hashtag/Purspectine",
    iconName: "twitter",
    badgeText: "Twitter Art Tag",
    category: "fan_club",
  },
  {
    id: "com_003",
    title: "Trakteer Support Purin",
    description: "Dukung karya dan stream Purin Kokoa langsung melalui Trakteer!",
    url: "https://trakteer.id/purin_kokoa/gift",
    iconName: "heart",
    badgeText: "Support",
    category: "official",
  },
  {
    id: "com_004",
    title: "Purin Stream Highlights & Clips (#PurinClips)",
    description: "Momen-momen lucu, scream horor, dan klip terbaik dari setiap live stream Purin.",
    url: "https://x.com/hashtag/PurinClips",
    iconName: "youtube",
    badgeText: "Clip Tag",
    category: "fan_club",
  },
  {
    id: "com_005",
    title: "Fan Guidelines & Tata Tertib",
    description: "Panduan etika pembuatan fanart, klip video, dan pedoman hak cipta yang ramah dan aman.",
    url: "/disclaimer",
    iconName: "globe",
    badgeText: "Guidelines",
    category: "guidelines",
  },
];

export const mockCommunityProjects: CommunityProject[] = [
  {
    id: "proj_001",
    title: "Purin Kokoa Fanweb Project",
    description: "Pengembangan portal fanweb interaktif untuk seluruh komunitas Pururin di seluruh dunia.",
    leadAuthor: "LowScarlet & Pururin Devs",
    status: "ongoing",
    url: "https://github.com/LowScarlet/purin",
  },
  {
    id: "proj_002",
    title: "Birthday Message Mosaic & Video",
    description: "Pengumpulan ucapan selamat ulang tahun (5 Mei) dan video kompilasi pesan hangat dari para Pururin.",
    leadAuthor: "Apse Event Committee",
    status: "recruiting",
  },
];
