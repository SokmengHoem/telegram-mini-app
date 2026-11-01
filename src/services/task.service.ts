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
    const response = await apiClient.get<PaginatedTasks>("/tasks", { params });
    return response.data;
  },

  async findOne(taskId: string): Promise<Task> {
    const response = await apiClient.get<Task>(`/tasks/${taskId}`);
    return response.data;
  },

  async create(dto: CreateTask): Promise<Task> {
    const response = await apiClient.post<Task>("/tasks", dto);
    return response.data;
  },

  async update(id: string, dto: UpdateTask): Promise<Task> {
    const response = await apiClient.put<Task>(`/tasks/${id}`, dto);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
