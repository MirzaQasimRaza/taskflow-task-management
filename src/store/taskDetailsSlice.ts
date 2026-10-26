
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type TaskDetails = {
  title: string;
  icon: "list" | "circle" | "clock" | "check";
  color: string;
};

type TaskDetailsState = {
  items: TaskDetails[];
};

const initialState: TaskDetailsState = {
  items: [
    {
      title: "Total Tasks",
      icon: "list",
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "To Do",
      icon: "circle",
      color: "bg-slate-100 text-slate-600",
    },
    {
      title: "In Progress",
      icon: "clock",
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed",
      icon: "check",
      color: "bg-emerald-50 text-emerald-600",
    },
  ],
};

const taskDetailsSlice = createSlice({
  name: "taskDetails",
  initialState,
  reducers: {},
});

export const selectTaskDetails = (state: RootState) => {
    return state.taskDetailsReducer.items
}

export const taskDetailsReducer = taskDetailsSlice.reducer;
