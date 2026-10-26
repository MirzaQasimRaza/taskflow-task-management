
import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import {
  Clock3,
  Search,
  CalendarDays,
  Circle,
  CheckCircle2,
  ListTodo,
  ChevronDown,
  Trash2,
} from "lucide-react";

import {
  useAppSelector,
  useAppDispatch
} from "../hooks/hooks";
import {
  selectTasks,
  selectTotalTasks,
  selectTodoCount,
  selectInProgressCount,
  selectCompletedCount,
  editTask,
  removeTask
} from "../store/tasksSlice";
import { selectTaskDetails } from "../store/taskDetailsSlice";

// Summary card icons
const iconMap = {
  list: ListTodo,
  circle: Circle,
  clock: Clock3,
  check: CheckCircle2,
} as const;

// Status badge styling
const statusStyles = {
  todo: "bg-slate-100 text-slate-600",
  "in-progress": "bg-violet-100 text-violet-700",
  done: "bg-emerald-100 text-emerald-700",
} as const;

// Priority badge styling
const priorityStyles = {
  low: "bg-sky-50 text-sky-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
} as const;

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Completed",
} as const;

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const;

type StatusFilter = "all" | "todo" | "in-progress" | "done";
type PriorityFilter = "all" | "low" | "medium" | "high";

function Hero() {

  const dispatch = useAppDispatch();
  const taskDetails = useAppSelector(selectTaskDetails);
  const tasks = useAppSelector(selectTasks);

  const totalTasks = useAppSelector(selectTotalTasks);
  const todoCount = useAppSelector(selectTodoCount);
  const inProgressCount = useAppSelector(selectInProgressCount);
  const completedCount = useAppSelector(selectCompletedCount);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("all");

  // Match each card's title with its live Redux count.
  const summaryCards = taskDetails.map((card) => ({
    ...card,
    count:
      card.title === "Total Tasks"
        ? totalTasks
        : card.title === "To Do"
          ? todoCount
          : card.title === "In Progress"
            ? inProgressCount
            : card.title === "Completed"
              ? completedCount
              : 0,
  }));

  // Apply search, status and priority filters.
  const filteredTasks = tasks.filter((task) => {
    const query = searchTerm.trim().toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
      <Header />

      {/* Summary cards */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <div className={`rounded-xl p-2.5 ${card.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">
                {card.count}
              </p>
            </div>
          );
        })}
      </section>

      {/* Task list panel */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* Toolbar */}
        <div className="flex flex-col gap-5 border-b border-slate-100 p-5">
          <div>
            <h3 className="text-lg font-bold">All Tasks</h3>
            <p className="mt-1 text-sm text-slate-500">
              Manage and track your daily work.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3">
              <Search size={17} className="shrink-0 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
                className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Status filter */}
            <div className="relative flex items-center rounded-xl border border-slate-200 px-3">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
                aria-label="Filter by status"
                className="w-full appearance-none bg-transparent py-3 pr-7 text-sm text-slate-600 outline-none lg:w-40"
              >
                <option value="all">All statuses</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 text-slate-500"
              />
            </div>

            {/* Priority filter */}
            <div className="relative flex items-center rounded-xl border border-slate-200 px-3">
              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value as PriorityFilter)
                }
                aria-label="Filter by priority"
                className="w-full appearance-none bg-transparent py-3 pr-7 text-sm text-slate-600 outline-none lg:w-40"
              >
                <option value="all">All priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Dynamic task rows */}
        <div className="divide-y divide-slate-100">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              const isCompleted = task.status === "done";

              return (
                <div
                  key={task.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                >

                  <button
                    type="button"
                    onClick={() => {
                      const nextStatus =
                        task.status === "todo"
                          ? "in-progress"
                          : task.status === "in-progress"
                            ? "done"
                            : "todo";

                      dispatch(
                        editTask({
                          id: task.id,
                          changes: { status: nextStatus },
                        })
                      );
                    }}
                    aria-label={`Change status of ${task.title}`}
                    title="Change task status"
                    className="shrink-0 rounded-full transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-violet-500"
                  >
                    {isCompleted ? (
                      <CheckCircle2
                        size={21}
                        className="text-emerald-500"
                      />
                    ) : task.status === "in-progress" ? (
                      <Clock3
                        size={21}
                        className="text-violet-500"
                      />
                    ) : (
                      <Circle
                        size={21}
                        className="text-slate-300 hover:text-violet-500"
                      />
                    )}
                  </button>


                  <div className="min-w-0 flex-1">
                    <h4
                      className={`font-semibold ${isCompleted
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                        }`}
                    >
                      {task.title}
                    </h4>

                    <p
                      className={`mt-1 text-sm ${isCompleted
                        ? "text-slate-400"
                        : "text-slate-500"
                        }`}
                    >
                      {task.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <select
                        value={task.status}
                        onChange={(event) => {
                          dispatch(
                            editTask({
                              id: task.id,
                              changes: {
                                status: event.target.value as
                                  | "todo"
                                  | "in-progress"
                                  | "done",
                              },
                            })
                          );
                        }}
                        aria-label={`Status for ${task.title}`}
                        className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${statusStyles[task.status]}`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Completed</option>
                      </select>

                      <select
                        value={task.priority}
                        onChange={(event) => {
                          dispatch(
                            editTask({
                              id: task.id,
                              changes: {
                                priority: event.target.value as
                                  | "low"
                                  | "medium"
                                  | "high",
                              },
                            })
                          );
                        }}
                        aria-label={`Priority for ${task.title}`}
                        className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${priorityStyles[task.priority]}`}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>

                      {task.dueDate && (
                        <span className="text-xs text-slate-400">
                          <CalendarDays
                            size={13}
                            className="mr-1 inline"
                          />
                          {new Date(
                            `${task.dueDate}T00:00:00`
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Delete "${task.title}"? This action cannot be undone.`
                      );

                      if (confirmed) {
                        dispatch(removeTask({ id: task.id }));
                      }
                    }}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                    className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-rose-500"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="px-5 py-12 text-center">
              <ListTodo
                size={32}
                className="mx-auto text-slate-300"
              />
              <h4 className="mt-3 font-semibold text-slate-700">
                No tasks found
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter options.
              </p>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="border-t border-slate-100 px-5 py-3 text-sm text-slate-500">
          Showing {filteredTasks.length} of {totalTasks} tasks
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Hero;
