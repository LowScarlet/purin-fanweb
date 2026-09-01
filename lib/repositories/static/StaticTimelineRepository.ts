import { ITimelineRepository } from "../interfaces";
import { TimelineEvent } from "../../types/timeline";
import { mockTimeline } from "../../data/mock/mockTimeline";

export class StaticTimelineRepository implements ITimelineRepository {
  async getAll(): Promise<TimelineEvent[]> {
    return [...mockTimeline].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
