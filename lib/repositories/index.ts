import { StaticProfileRepository } from "./static/StaticProfileRepository";
import { StaticScheduleRepository } from "./static/StaticScheduleRepository";
import { StaticNewsRepository } from "./static/StaticNewsRepository";
import { StaticTimelineRepository } from "./static/StaticTimelineRepository";
import { StaticCommunityRepository } from "./static/StaticCommunityRepository";
import { StaticSoundRepository } from "./static/StaticSoundRepository";

import {
  IProfileRepository,
  IScheduleRepository,
  INewsRepository,
  ITimelineRepository,
  ICommunityRepository,
  ISoundRepository,
} from "./interfaces";

/**
 * Unified Repositories Container
 *
 * Current Phase: Backed by static mock data.
 * Future Migration: Seamlessly swap with Drizzle ORM + Neon PostgreSQL implementations.
 */
export interface RepositoriesContainer {
  profile: IProfileRepository;
  schedule: IScheduleRepository;
  news: INewsRepository;
  timeline: ITimelineRepository;
  community: ICommunityRepository;
  sound: ISoundRepository;
}

export const repositories: RepositoriesContainer = {
  profile: new StaticProfileRepository(),
  schedule: new StaticScheduleRepository(),
  news: new StaticNewsRepository(),
  timeline: new StaticTimelineRepository(),
  community: new StaticCommunityRepository(),
  sound: new StaticSoundRepository(),
};

export * from "./interfaces";
