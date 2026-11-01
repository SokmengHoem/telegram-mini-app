import { useCallback, useEffect, useState } from "react";
import type { CreateTask, QueryTasks, Task, UpdateTask } from "../types/task";
import { taskService } from "../services/task.service";

export function useTasks(query: QueryTasks = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await taskService.findAll(query);

      setTasks(result.data);
      setTotal(result.meta.total);
    } catch {
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query.page, query.limit, query.status]);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const createTask = async (dto: CreateTask) => {
    await taskService.create(dto);
    await loadTasks();
  };

  const updateTask = async (id: string, dto: UpdateTask) => {
    await taskService.update(id, dto);
    await loadTasks();
  };

  const deleteTask = async (id: string) => {
    await taskService.remove(id);
    await loadTasks();
  };

  return {
    tasks,
    loading,
    error,
    total,
    reload: loadTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
