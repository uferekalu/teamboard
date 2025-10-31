import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: {
    _id: string;
    name: string;
    description?: string;
    createdAt?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
  onClick?: () => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-between group"
    >
      <div className="cursor-pointer" onClick={onClick}>
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
          {project.name}
        </h3>
        {project.description ? (
          <p className="text-slate-600 text-sm mt-1 line-clamp-2">{project.description}</p>
        ) : (
          <p className="text-slate-400 italic text-sm mt-1">No description provided</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-slate-400">
          {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}
        </p>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition cursor-pointer"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}