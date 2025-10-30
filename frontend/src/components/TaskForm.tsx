import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

const schema = z.object({ title: z.string().min(1), description: z.string().optional() });

type FormValues = z.infer<typeof schema>;

export default function TaskForm({ projectId }: { projectId: string }) {
    const { register, handleSubmit, formState, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const { errors } = formState;
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: any) => api.post(`/tasks`, { ...data, project: projectId }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["tasks", projectId] });
            toast.success("Task added");
            reset();
        },
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
    });

    return (
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-3">
            <div>
                <input {...register("title")} placeholder="Task title" className="w-full p-2 border rounded" />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <textarea {...register("description")} placeholder="Description (optional)" className="w-full p-2 border rounded" />
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded">Add Task</button>
        </form>
    );
}