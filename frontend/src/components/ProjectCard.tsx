import { Link } from "react-router-dom";

export default function ProjectCard({ project, onDelete, onEdit }: any) {
    return (
        <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
            <div>
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-sm text-slate-600 mt-2 truncate">{project.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <Link to={`/projects/${project._id}`} className="text-indigo-600">Open</Link>
                <div className="flex gap-2">
                    <button onClick={onEdit} className="text-sm text-indigo-600">Edit</button>
                    <button onClick={onDelete} className="text-sm text-red-500">Delete</button>
                </div>
            </div>
        </div>
    );
}