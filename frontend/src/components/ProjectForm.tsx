import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function ProjectForm({ onClose }: { onClose?: () => void }) {
    const { register, handleSubmit, reset } = useForm<{ name: string; description?: string }>();
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: any) => api.post("/projects", data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project created");
            reset();
            onClose?.();
        },
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
    });

    return (
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-3">
            <input {...register("name")} placeholder="Project name" className="w-full p-2 border rounded" />
            <textarea {...register("description")} placeholder="Description (optional)" className="w-full p-2 border rounded" />
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create</button>
                <button type="button" onClick={() => onClose?.()} className="px-4 py-2 border rounded">Cancel</button>
            </div>
        </form>
    );
}