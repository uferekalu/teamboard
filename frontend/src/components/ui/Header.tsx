import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu } from "lucide-react";

export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const { logout } = useAuth();

  return (
    <header className="w-full bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="sm:hidden p-2 rounded hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>
          <Link to="/" className="text-lg font-bold text-blue-600">
            TeamBoard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="text-sm px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
