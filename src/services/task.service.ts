import type {
  CreateTask,
  PaginatedTasks,
  QueryTasks,
  Task,
  UpdateTask,
} from "../types/task";
import { apiClient } from "./api-client";

export const taskService = {
  async findAll(params: QueryTasks = {}): Promise<PaginatedTasks> {
    const response = await apiClient.get<PaginatedTasks>("/task", { params });
    return response.data;
  },

  async findOne(taskId: string): Promise<Task> {
    const response = await apiClient.get<Task>(`/task/${taskId}`);
    return response.data;
  },

  async create(dto: CreateTask): Promise<Task> {
    const response = await apiClient.post<Task>("/task", dto);
    return response.data;
  },

  async update(id: string, dto: UpdateTask): Promise<Task> {
    const response = await apiClient.patch<Task>(`/task/${id}`, dto);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/task/${id}`);
  },
};
