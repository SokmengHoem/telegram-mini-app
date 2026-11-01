import { TaskStatus } from "../types/task";

interface Props {
  value: TaskStatus | undefined;
  onChange: (value: TaskStatus | undefined) => void;
}

export function TaskFilters({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(undefined)}
        className={`rounded-full px-4 py-2 text-sm ${
          value === undefined
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        All
      </button>

      {Object.values(TaskStatus).map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`rounded-full px-4 py-2 text-sm ${
            value === status
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status.replace("_", " ")}
        </button>
      ))}
    </div>
  );
}
