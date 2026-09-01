import { ICommunityRepository } from "../interfaces";
import { CommunityLink, CommunityProject } from "../../types/community";
import { mockCommunityLinks, mockCommunityProjects } from "../../data/mock/mockCommunity";

export class StaticCommunityRepository implements ICommunityRepository {
  async getLinks(): Promise<CommunityLink[]> {
    return mockCommunityLinks;
  }

  async getProjects(): Promise<CommunityProject[]> {
    return mockCommunityProjects;
  }
}
