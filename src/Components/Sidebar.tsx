import {
  LayoutDashboard,
  CheckSquare,
  Clock3,
  Settings,
} from "lucide-react";

function Sidebar() {
    return (
        <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r md:p-5">
            <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-violet-600 p-3 text-white">
                    <CheckSquare size={22} />
                </div>
                <div>
                    <h1 className="text-lg font-bold">TaskFlow</h1>
                    <p className="text-xs text-slate-500">
                        Get things done
                    </p>
                </div>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
            </p>

            <nav className="flex flex-wrap gap-2 md:flex-col">
                <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500">
                    <LayoutDashboard size={19} />
                    Overview
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-violet-50 px-3 py-3 text-sm font-semibold text-violet-700">
                    <CheckSquare size={19} />
                    My Tasks
                </div>

                <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500">
                    <Clock3 size={19} />
                    Upcoming
                </div>
            </nav>

            <div className="mt-10 hidden border-t border-slate-100 pt-5 md:block">
                <div className="flex items-center gap-3 px-3 py-3 text-sm text-slate-500">
                    <Settings size={19} />
                    Settings
                </div>
            </div>
        </aside>
    )
}

export default Sidebar