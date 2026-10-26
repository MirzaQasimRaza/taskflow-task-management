import { Bell, Plus } from "lucide-react"
import { Link } from "react-router-dom"

function Header() {
    return (
        < header className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center" >
            <div>
                <p className="mb-2 text-sm text-slate-400">
                    Workspace / My Tasks
                </p>
                <h2 className="text-3xl font-bold tracking-tight">
                    My Tasks
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Organize your work and make progress every day.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button className="rounded-xl border border-slate-200 bg-white p-3 text-slate-500">
                    <Bell size={19} />
                </button>
                <Link to={"/addTask"} className="cursor-pointer flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white">
                    <button>
                        <Plus size={18} />
                        New Task
                    </button>
                </Link>
            </div>
        </header >
    )
}

export default Header