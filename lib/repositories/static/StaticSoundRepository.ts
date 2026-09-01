import { ISoundRepository } from "../interfaces";
import { SoundTrack, VoiceClip } from "../../types/sound";
import { mockSoundTracks, mockVoiceClips } from "../../data/mock/mockSounds";

export class StaticSoundRepository implements ISoundRepository {
  async getBgmTracks(): Promise<SoundTrack[]> {
    return mockSoundTracks;
  }

  async getVoiceClips(): Promise<VoiceClip[]> {
    return mockVoiceClips;
  }
}
