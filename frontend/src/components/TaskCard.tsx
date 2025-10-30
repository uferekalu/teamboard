interface Task {
    title: string;
    description: string;
    status: string;
}

interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onEdit: () => void;
}

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
    return (
        <div className="border p-3 rounded flex items-start justify-between bg-white">
            <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-slate-600">{task.description}</p>
                <p className="text-xs mt-2">Status: <span className="font-semibold">{task.status}</span></p>
            </div>
            <div className="flex flex-col gap-2">
                <button onClick={onEdit} className="text-sm text-indigo-600">Edit</button>
                <button onClick={onDelete} className="text-sm text-red-500">Delete</button>
            </div>
        </div>
    );
}