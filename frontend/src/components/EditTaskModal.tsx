import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function EditTaskModal({ task, onClose }: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => api.patch(`/tasks/${task._id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks", task.project] });
      toast.success("Task updated successfully");
      onClose();
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Update failed"),
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-slate-800">
          Edit Task
        </h3>
        <form
          onSubmit={handleSubmit((d) => mutation.mutate(d))}
          className="space-y-4"
        >
          <div>
            <label className="text-sm text-slate-600 block mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 block mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 block mb-1">Status</label>
            <select
              {...register("status")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              disabled={mutation.isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
