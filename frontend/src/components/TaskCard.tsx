// components/TaskCard.tsx
import { Pencil, Trash2 } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  onClick?: () => void;
}

export default function TaskCard({ task, onDelete, onEdit, onClick }: TaskCardProps) {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition flex justify-between items-start cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800 line-clamp-1">{task.title}</h4>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{task.description}</p>
        <p className="text-xs mt-3">
          <span className="text-slate-500">Status:</span>{" "}
          <span
            className={`font-medium ${
              task.status === "done"
                ? "text-green-600"
                : task.status === "in-progress"
                ? "text-amber-600"
                : "text-slate-500"
            }`}
          >
            {task.status}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 ml-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600 transition"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}