export interface SoundTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  durationSeconds?: number;
  isDefaultBgm?: boolean;
}

export interface VoiceClip {
  id: string;
  title: string;
  japaneseText?: string;
  englishText?: string;
  category: "Greeting" | "Cute" | "Reaction" | "Stream Meme";
  audioUrl?: string;
  synthFrequency?: number[]; // Web Audio fallback tone pattern
}
