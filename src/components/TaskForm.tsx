import { useState, type FormEvent } from "react";
import type { CreateTask } from "../types/task";

interface Props {
  onSubmit: (dto: CreateTask) => Promise<void>;
}

export function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await onSubmit({
        title: trimmedTitle,
        description: description.trim() || undefined,
      });

      setTitle("");
      setDescription("");
    } catch {
      setError("Failed to create task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" space-y-3 rounded-xl border border-gray-200 p-4"
    >
      <h2 className="text-lg font-semibold">Create Task</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        maxLength={200}
        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        maxLength={2000}
        rows={3}
        className="w-full resize-none rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        disabled={submitting || !title.trim()}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Add Task"}
      </button>
    </form>
  );
}
