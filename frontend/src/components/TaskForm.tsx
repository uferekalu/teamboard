import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function TaskForm({ projectId }: { projectId: string }) {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => api.post(`/tasks`, { ...data, project: projectId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks", projectId] });
      toast.success("Task added successfully");
      reset();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to add task"),
  });

  return (
    <form
      onSubmit={handleSubmit((d) => mutation.mutate(d))}
      className="bg-white rounded-xl shadow-sm p-5 border border-slate-100 space-y-4"
    >
      <div>
        <label className="text-sm text-slate-600 block mb-1">Task Title</label>
        <input
          {...register("title")}
          placeholder="e.g., Design login page"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-slate-600 block mb-1">Description</label>
        <textarea
          {...register("description")}
          placeholder="Optional task details"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <button
        disabled={mutation.isPending}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {mutation.isPending ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
