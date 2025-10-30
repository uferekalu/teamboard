import { Link } from "react-router-dom";

export default function Sidebar({ className = "" }: { className?: string }) {
    return (
        <aside className={`w-64 bg-white border-r p-4 ${className}`}>
            <nav className="flex flex-col gap-2">
                <Link to="/" className="px-3 py-2 rounded hover:bg-slate-50">Projects</Link>
            </nav>
        </aside>
    );
}