import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { motion } from "framer-motion";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import EditTaskModal from "../components/EditTaskModal";

export default function ProjectPage() {
    const { id } = useParams();
    const qc = useQueryClient();
    const [editing, setEditing] = useState<any>(null);

    const { data: projectData, isLoading: loadingProject } = useQuery({
        queryKey: ["project", id],
        queryFn: async () => (await api.get(`/projects/${id}`)).data.project,
        enabled: !!id,
    });

    const { data: tasksData, isLoading: loadingTasks } = useQuery({
        queryKey: ["tasks", id],
        queryFn: async () => (await api.get(`/tasks/project/${id}`)).data.tasks,
        enabled: !!id,
    });

    const deleteTask = useMutation({
        mutationFn: (taskId: string) => api.delete(`/tasks/${taskId}`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", id] }),
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="max-w-6xl mx-auto flex gap-6 p-6">
                <Sidebar />
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">
                            {loadingProject ? "Loading project..." : projectData?.name || "Project"}
                        </h2>
                        <Link to="/" className="text-indigo-600">Back</Link>
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-lg shadow">
                        <p className="mb-4 text-slate-700">
                            {loadingProject ? "Loading description..." : projectData?.description}
                        </p>
                        <TaskForm projectId={id!} />
                        <div className="mt-6 grid gap-3">
                            {loadingTasks
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="animate-pulse border p-3 rounded" />
                                ))
                                : tasksData?.map((t: any) => (
                                    <TaskCard key={t._id} task={t} onDelete={() => deleteTask.mutate(t._id)} onEdit={() => setEditing(t)} />
                                ))}
                        </div>
                    </motion.div>
                    {editing && <EditTaskModal task={editing} onClose={() => setEditing(null)} />}
                </main>
            </div>
        </div>
    );
}