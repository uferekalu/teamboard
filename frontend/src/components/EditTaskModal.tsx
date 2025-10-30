import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function EditTaskModal({ task, onClose }: any) {
    const { register, handleSubmit } = useForm({ defaultValues: { title: task.title, description: task.description, status: task.status } });
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: any) => api.patch(`/tasks/${task._id}`, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["tasks", task.project] });
            toast.success("Task updated");
            onClose();
        },
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
    });

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h3 className="text-lg font-semibold mb-3">Edit Task</h3>
                <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-3">
                    <input {...register("title")} className="w-full p-2 border rounded" />
                    <textarea {...register("description")} className="w-full p-2 border rounded" />
                    <select {...register("status")} className="w-full p-2 border rounded">
                        <option value="todo">todo</option>
                        <option value="in-progress">in-progress</option>
                        <option value="done">done</option>
                    </select>
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}