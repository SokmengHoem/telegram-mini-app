import type { Task } from "../types/task";
import { TaskStatus } from "../types/task";

interface Props {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onStatusChange, onDelete }: Props) {
  const nextStatus =
    task.status === TaskStatus.PENDING
      ? TaskStatus.IN_PROGRESS
      : task.status === TaskStatus.IN_PROGRESS
        ? TaskStatus.COMPLETED
        : TaskStatus.PENDING;

  return (
    <article className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="wrap-break-word font-semibold">{task.title}</h3>

          {task.description && (
            <p className="mt-1 wrap-break-words text-sm text-gray-500">
              {task.description}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500">
            {task.status.replace("_", " ")}
          </p>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          aria-label="Delete Task"
          className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-5"
        >
          Delete
        </button>
      </div>

      <button
        onClick={() => onStatusChange(task.id, nextStatus)}
        className="mt-3 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
      >
        Change Status
      </button>
    </article>
  );
}
