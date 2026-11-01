import type { Task, TaskStatus } from "../types/task";
import { TaskItem } from "./TaskItem";


interface Props {
    tasks: Task[]
    onStatusChange: (
        id: string,
        status: TaskStatus
    ) => Promise<void>
    onDelete: (id: string) => Promise<void>
}

export function TaskList({
 tasks,
 onStatusChange,
 onDelete
}: Props) {
    if (!tasks.length) {
        return (
             <div className="rounded-xl border border-dashed p-8 text-center">
        <p className="font-medium">No tasks found</p>
        <p className="mt-1 text-sm text-gray-500">
          Create your first task to get started.
        </p>
      </div>
        )
    }

    return (
          <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
    )
}