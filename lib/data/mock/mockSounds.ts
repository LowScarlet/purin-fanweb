import { SoundTrack, VoiceClip } from "../../types/sound";

export const mockSoundTracks: SoundTrack[] = [
  {
    id: "snd_bgm_01",
    title: "Sweet Cocoa Café (Lo-Fi Ambient)",
    artist: "Cozy Purin Beats",
    audioUrl: "/audio/ambient-bgm.mp3",
    durationSeconds: 180,
    isDefaultBgm: true,
  },
  {
    id: "snd_bgm_02",
    title: "Pudding Dreamscape",
    artist: "Chiptune Chill",
    audioUrl: "/audio/ambient-bgm-2.mp3",
    durationSeconds: 210,
  },
];

export const mockVoiceClips: VoiceClip[] = [
  {
    id: "vc_001",
    title: "Kon-Purin! (Greeting)",
    japaneseText: "こんプリン〜！",
    englishText: "Hello everyone, it's Purin!",
    category: "Greeting",
    synthFrequency: [523.25, 659.25, 783.99, 1046.5], // C5, E5, G5, C6
  },
  {
    id: "vc_002",
    title: "Pudding Squish!",
    japaneseText: "ぷにぷに〜！",
    englishText: "Squishy squishy pudding!",
    category: "Cute",
    synthFrequency: [440, 554.37, 659.25, 880], // A4, C#5, E5, A5
  },
  {
    id: "vc_003",
    title: "Horror Jumpscare Screaaam!",
    japaneseText: "きゃあああ！お化けだ！",
    englishText: "Aaaaa! It's a ghost!",
    category: "Reaction",
    synthFrequency: [880, 783.99, 987.77, 1174.66],
  },
  {
    id: "vc_004",
    title: "Gunpla Assembly Completed!",
    japaneseText: "ガンプラ完成したよ！",
    englishText: "Gunpla is fully built!",
    category: "Stream Meme",
    synthFrequency: [523.25, 659.25, 783.99, 1046.5, 1318.51],
  },
];
