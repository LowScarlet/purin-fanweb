import { IScheduleRepository } from "../interfaces";
import { ScheduleItem } from "../../types/schedule";
import { mockSchedule } from "../../data/mock/mockSchedule";

export class StaticScheduleRepository implements IScheduleRepository {
  async getAll(): Promise<ScheduleItem[]> {
    return [...mockSchedule].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }

  async getUpcoming(limit?: number): Promise<ScheduleItem[]> {
    const list = mockSchedule.filter((item) => item.status === "upcoming" || item.status === "live");
    const sorted = list.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
    return limit ? sorted.slice(0, limit) : sorted;
  }

  async getLive(): Promise<ScheduleItem | null> {
    const live = mockSchedule.find((item) => item.status === "live");
    return live ?? null;
  }

  async getById(id: string): Promise<ScheduleItem | null> {
    const item = mockSchedule.find((s) => s.id === id);
    return item ?? null;
  }
}
