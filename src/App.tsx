
import { useState } from 'react';

import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { useTelegramAuth } from './hooks/useTelegramAuth';
import type { TaskStatus } from './types/task';

function TaskDashboard() {
  const [taskStatus, setTaskStatus] = useState<
    TaskStatus | undefined
  >();

  const {
    tasks,
    loading,
    error,
    total,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks({
    page: 1,
    limit: 10,
    status: taskStatus,
  });

  return (
    <main className="mx-auto min-h-screen max-w-lg space-y-5 p-4">
      <header>
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <p className="text-sm text-gray-500">
          Organize your daily tasks.
        </p>
      </header>

      <TaskForm onSubmit={createTask} />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My Tasks</h2>
          <span className="text-sm text-gray-500">
            {total} tasks
          </span>
        </div>

        <TaskFilters
          value={taskStatus}
          onChange={setTaskStatus}
        />

        {loading ? (
          <p className="py-8 text-center text-gray-500">
            Loading tasks...
          </p>
        ) : error ? (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        ) : (
          <TaskList
            tasks={tasks}
            onStatusChange={(id, nextStatus) =>
              updateTask(id, { status: nextStatus })
            }
            onDelete={deleteTask}
          />
        )}
      </section>
    </main>
  );
}

function App() {
  const { user, loading, error } = useTelegramAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-gray-500">Authenticating...</p>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-center text-red-600">
          {error ?? 'Authentication required.'}
        </p>
      </main>
    );
  }

  return <TaskDashboard />;
}

export default App;
