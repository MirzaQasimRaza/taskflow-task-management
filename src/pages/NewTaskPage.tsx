
import { useState } from "react";
import type { FormEvent } from "react";
import {
    ArrowLeft,
    CalendarDays,
    ClipboardList,
    Flag,
    ListTodo,
} from "lucide-react";

import type { TaskStatus, TaskPriority } from "../types/types";
import { useAppDispatch } from "../hooks/hooks";
import { addTask } from "../store/tasksSlice";
import { Link } from "react-router-dom";

function NewTaskPage() {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TaskStatus>("todo");
    const [priority, setPriority] = useState<TaskPriority>("medium");
    const [dueDate, setDueDate] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const inputStyles =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

    const labelStyles =
        "mb-2 block text-sm font-semibold text-slate-700";

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title.trim()) return;

        dispatch(
            addTask({
                id: crypto.randomUUID(),
                title: title.trim(),
                description: description.trim(),
                status,
                priority,
                dueDate,
                createdAt: new Date().toISOString(),
            })
        );

        setSuccessMessage("Task created successfully!");

        // Clear the form after creating the task
        setTitle("");
        setDescription("");
        setStatus("todo");
        setPriority("medium");
        setDueDate("");
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-2xl">
                <Link to={"/"}>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="mb-6 cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                </Link>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white px-6 py-7 sm:px-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <ClipboardList size={25} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                                    Create New Task
                                </h1>
                                <p className="mt-1 text-sm text-slate-500">
                                    Add details and organize your next task.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 px-6 py-7 sm:px-8"
                    >
                        {successMessage && (
                            <div
                                role="status"
                                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                            >
                                {successMessage}
                            </div>
                        )}

                        <div>
                            <label htmlFor="title" className={labelStyles}>
                                Task Title <span className="text-rose-500">*</span>
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                    setSuccessMessage("");
                                }}
                                placeholder="e.g. Build the login page"
                                className={inputStyles}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className={labelStyles}>
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Describe what needs to be done..."
                                rows={4}
                                className={`${inputStyles} resize-y`}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="status"
                                    className={`${labelStyles} flex items-center gap-2`}
                                >
                                    <ListTodo size={16} className="text-violet-500" />
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value as TaskStatus)
                                    }
                                    className={inputStyles}
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Completed</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="priority"
                                    className={`${labelStyles} flex items-center gap-2`}
                                >
                                    <Flag size={16} className="text-amber-500" />
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={priority}
                                    onChange={(event) =>
                                        setPriority(event.target.value as TaskPriority)
                                    }
                                    className={inputStyles}
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="dueDate"
                                className={`${labelStyles} flex items-center gap-2`}
                            >
                                <CalendarDays size={16} className="text-violet-500" />
                                Due Date
                            </label>
                            <input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                                className={inputStyles}
                            />
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                            <Link to={"/"}>
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="cursor-pointer rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                            </Link>

                            <button
                                type="submit"
                                className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                            >
                                + Create Task
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-4 text-center text-xs text-slate-400">
                    Keep your tasks organized and stay productive.
                </p>
            </div>
        </div>
    );
}

export default NewTaskPage;
