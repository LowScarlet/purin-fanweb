import { IProfileRepository } from "../interfaces";
import { Profile, SocialLink } from "../../types/profile";
import { mockProfile } from "../../data/mock/mockProfile";

export class StaticProfileRepository implements IProfileRepository {
  async getProfile(): Promise<Profile> {
    return mockProfile;
  }

  async getSocials(): Promise<SocialLink[]> {
    return mockProfile.socials;
  }
}
