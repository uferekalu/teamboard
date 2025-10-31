import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import EditProjectModal from "../components/EditProjectModal";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import EditTaskModal from "../components/EditTaskModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

export default function DashboardPage() {
  const { logout } = useAuth();
  const qc = useQueryClient();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);

  const [projectSearch, setProjectSearch] = useState("");
  const [projectSort, setProjectSort] = useState<"asc" | "desc">("asc");
  const [projectPage, setProjectPage] = useState(1);

  const [taskSearch, setTaskSearch] = useState("");
  const [taskSort, setTaskSort] = useState<"asc" | "desc">("asc");
  const [taskPage, setTaskPage] = useState(1);

  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await api.get("/projects")).data.projects,
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onSettled: () => setDeleteProjectId(null),
  });

  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks", currentProject?._id],
    queryFn: async () => (await api.get(`/tasks/project/${currentProject?._id}`)).data.tasks,
    enabled: !!currentProject,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      if (currentProject) qc.invalidateQueries({ queryKey: ["tasks", currentProject._id] });
      toast.success("Task deleted");
    },
    onSettled: () => setDeleteTaskId(null),
  });

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects
      .filter((p: any) => p.name.toLowerCase().includes(projectSearch.toLowerCase()))
      .sort((a: any, b: any) =>
        projectSort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
  }, [projects, projectSearch, projectSort]);

  const totalProjectPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (projectPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, projectPage]);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks
      .filter((t: any) => t.title.toLowerCase().includes(taskSearch.toLowerCase()))
      .sort((a: any, b: any) =>
        taskSort === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );
  }, [tasks, taskSearch, taskSort]);

  const totalTaskPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = useMemo(() => {
    const start = (taskPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTasks, taskPage]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {!currentProject ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Projects</h1>
              <p className="text-slate-500 text-sm">
                Manage your projects, track progress, and collaborate with your team.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowProjectForm((s) => !s)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition"
              >
                {showProjectForm ? "Close Form" : "New Project"}
              </button>
              <button
                onClick={logout}
                className="border border-slate-300 hover:bg-slate-100 text-sm px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>

          {showProjectForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <ProjectForm onClose={() => setShowProjectForm(false)} />
            </motion.div>
          )}

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <input
              type="text"
              placeholder="Search projects..."
              value={projectSearch}
              onChange={(e) => {
                setProjectSearch(e.target.value);
                setProjectPage(1);
              }}
              className="w-full sm:w-1/3 p-2 border rounded-lg"
            />
            <select
              value={projectSort}
              onChange={(e) => setProjectSort(e.target.value as "asc" | "desc")}
              className="w-full sm:w-1/4 p-2 border rounded-lg"
            >
              <option value="asc">Sort by Name: A-Z</option>
              <option value="desc">Sort by Name: Z-A</option>
            </select>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {projectsLoading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white p-5 rounded-xl shadow-sm" />
                ))
              : paginatedProjects.length
              ? paginatedProjects.map((p: any) => (
                  <ProjectCard
                    key={p._id}
                    project={p}
                    onEdit={() => setEditingProject(p)}
                    onDelete={() => setDeleteProjectId(p._id)}
                    onClick={() => {
                      setCurrentProject(p);
                      setTaskPage(1);
                    }}
                  />
                ))
              : (
                  <p className="text-center text-slate-500 col-span-full py-10">
                    No projects yet. Create one to get started
                  </p>
                )}
          </div>

          {/* Project Pagination */}
          {totalProjectPages > 1 && (
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              <button
                disabled={projectPage === 1}
                onClick={() => setProjectPage((p) => p - 1)}
                className="px-3 py-1 border rounded-lg hover:bg-slate-50"
              >
                Prev
              </button>
              {Array.from({ length: totalProjectPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setProjectPage(page)}
                  className={`px-3 py-1 border rounded-lg ${
                    projectPage === page ? "bg-blue-600 text-white" : "hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={projectPage === totalProjectPages}
                onClick={() => setProjectPage((p) => p + 1)}
                className="px-3 py-1 border rounded-lg hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          )}

          {editingProject && (
            <EditProjectModal project={editingProject} onClose={() => setEditingProject(null)} />
          )}
        </>
      ) : (
        <>
          {/* Tasks Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <button
              onClick={() => setCurrentProject(null)}
              className="px-3 py-1 border rounded-lg hover:bg-slate-50"
            >
              Back to Projects
            </button>
            <h1 className="text-2xl font-semibold">{currentProject.name} - Tasks</h1>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={taskSearch}
              onChange={(e) => {
                setTaskSearch(e.target.value);
                setTaskPage(1);
              }}
              className="w-full sm:w-1/3 p-2 border rounded-lg"
            />
            <select
              value={taskSort}
              onChange={(e) => setTaskSort(e.target.value as "asc" | "desc")}
              className="w-full sm:w-1/4 p-2 border rounded-lg"
            >
              <option value="asc">Sort by Title: A-Z</option>
              <option value="desc">Sort by Title: Z-A</option>
            </select>
          </div>

          {/* Task Form */}
          <div className="mb-6">
            <TaskForm projectId={currentProject._id} />
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {tasksLoading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white p-5 rounded-xl shadow-sm" />
                ))
              : paginatedTasks.length
              ? paginatedTasks.map((t: any) => (
                  <TaskCard
                    key={t._id}
                    task={t}
                    onEdit={() => setEditingTask(t)}
                    onDelete={() => setDeleteTaskId(t._id)} // Only set ID
                  />
                ))
              : (
                  <p className="text-center text-slate-500 col-span-full py-10">
                    No tasks yet. Add one to get started
                  </p>
                )}
          </div>

          {/* Task Pagination */}
          {totalTaskPages > 1 && (
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              <button
                disabled={taskPage === 1}
                onClick={() => setTaskPage((p) => p - 1)}
                className="px-3 py-1 border rounded-lg hover:bg-slate-50"
              >
                Prev
              </button>
              {Array.from({ length: totalTaskPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setTaskPage(page)}
                  className={`px-3 py-1 border rounded-lg ${
                    taskPage === page ? "bg-blue-600 text-white" : "hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={taskPage === totalTaskPages}
                onClick={() => setTaskPage((p) => p + 1)}
                className="px-3 py-1 border rounded-lg hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          )}

          {editingTask && <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />}
        </>
      )}

      {/* === CONFIRM DELETE MODALS === */}
      <ConfirmDeleteModal
        isOpen={!!deleteProjectId}
        title="Delete Project?"
        message="This will permanently delete the project and all its tasks. This action cannot be undone."
        confirmText="Delete Project"
        onConfirm={() => {
          if (deleteProjectId) deleteProjectMutation.mutate(deleteProjectId);
        }}
        onCancel={() => setDeleteProjectId(null)}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteTaskId}
        title="Delete Task?"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete Task"
        onConfirm={() => {
          if (deleteTaskId) deleteTaskMutation.mutate(deleteTaskId);
        }}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  );
}