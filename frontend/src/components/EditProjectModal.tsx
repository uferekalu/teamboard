import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function EditProjectModal({ project, onClose }: any) {
    const { register, handleSubmit } = useForm({ defaultValues: { name: project.name, description: project.description } });
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: any) => api.patch(`/projects/${project._id}`, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project updated");
            onClose();
        },
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
    });

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h3 className="text-lg font-semibold mb-3">Edit Project</h3>
                <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-3">
                    <input {...register("name")} className="w-full p-2 border rounded" />
                    <textarea {...register("description")} className="w-full p-2 border rounded" />
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}