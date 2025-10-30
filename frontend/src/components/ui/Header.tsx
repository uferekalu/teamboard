import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
    const { logout } = useAuth();

    return (
        <header className="w-full bg-white border-b">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-lg font-bold">TeamBoard</Link>
                <div className="flex items-center gap-3">
                    <button onClick={logout} className="text-sm px-3 py-1 rounded-md border">Logout</button>
                </div>
            </div>
        </header>
    );
}