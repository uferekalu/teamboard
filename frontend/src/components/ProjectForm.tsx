import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function ProjectForm({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    description?: string;
  }>();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/projects", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
      reset();
      onClose?.();
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Failed to create"),
  });

  return (
    <form
      onSubmit={handleSubmit((d) => mutation.mutate(d))}
      className="bg-white rounded-xl shadow-sm p-5 border border-slate-100 space-y-4"
    >
      <div>
        <label className="text-sm text-slate-600 block mb-1">
          Project Name
        </label>
        <input
          {...register("name")}
          placeholder="e.g., Marketing Launch"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm text-slate-600 block mb-1">Description</label>
        <textarea
          {...register("description")}
          placeholder="Optional details about the project"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => onClose?.()}
          className="px-4 py-2 border rounded-lg hover:bg-slate-50 transition"
        >
          Cancel
        </button>
        <button
          disabled={mutation.isPending}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {mutation.isPending ? "Creating..." : "Create Project"}
        </button>
      </div>
    </form>
  );
}
