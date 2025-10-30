import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {(open || window.innerWidth >= 640) && (
          <motion.aside
            className={`fixed sm:static z-30 top-0 left-0 h-full sm:h-auto w-64 bg-white border-r p-4 flex flex-col gap-2`}
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
          >
            <div className="flex items-center justify-between mb-4 sm:hidden">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="px-3 py-2 rounded hover:bg-slate-100 text-slate-700"
                onClick={onClose}
              >
                Projects
              </Link>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
