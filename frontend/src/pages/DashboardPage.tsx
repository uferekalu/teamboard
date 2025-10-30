import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import { motion } from "framer-motion";
import EditProjectModal from "../components/EditProjectModal";

export default function DashboardPage() {
    const { logout } = useAuth();
    const qc = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);


    const { data, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => (await api.get("/projects")).data.projects,
    });


    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/projects/${id}`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="max-w-6xl mx-auto flex gap-6 p-6">
                <Sidebar />
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold">Projects</h1>
                        <div className="flex gap-2">
                            <button onClick={() => setShowForm((s) => !s)} className="btn">New Project</button>
                            <button onClick={logout} className="btn-outline">Logout</button>
                        </div>
                    </div>

                    {showForm && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                            <ProjectForm onClose={() => setShowForm(false)} />
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-white p-4 rounded-lg">
                                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                                    <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                                </div>
                            ))
                            : data?.map((p: any) => (
                                <ProjectCard key={p._id} project={p} onDelete={() => deleteMutation.mutate(p._id)} onEdit={() => setEditing(p)} />
                            ))}
                    </div>

                    {editing && <EditProjectModal project={editing} onClose={() => setEditing(null)} />}
                </main>
            </div>
        </div>
    );
}