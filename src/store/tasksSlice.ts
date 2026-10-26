import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Task } from "../types/types"
import type { RootState } from "./store"


type TaskState = {
    tasks: Task[]
}

const initialState: TaskState = {
     tasks: [
    {
      id: "1",
      title: "Build authentication UI",
      description: "Create login and registration screens",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-10-22",
      createdAt: "2026-10-19T10:00:00.000Z",
    },
    {
      id: "2",
      title: "Implement task filters",
      description: "Add status, priority, and search filters",
      status: "todo",
      priority: "medium",
      dueDate: "2026-10-24",
      createdAt: "2026-10-19T11:00:00.000Z",
    },
    {
      id: "3",
      title: "Set up project structure",
      description: "Organize components and TypeScript types",
      status: "done",
      priority: "low",
      dueDate: "2026-10-18",
      createdAt: "2026-10-17T09:00:00.000Z",
    },
  ],
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

        addTask: (state, action:PayloadAction<Task>) =>  {
            state.tasks.unshift(action.payload)
        },

        removeTask: (state, action:PayloadAction<Pick<Task, "id">>) => {
            state.tasks = state.tasks.filter((currentTask)=>{
                return currentTask.id !== action.payload.id
            })
        },

        editTask: (state, action:PayloadAction<{
            id: string,
            changes: Partial<Task>
        }>) => {
            const task = state.tasks.find((itemId)=>{
                return itemId.id === action.payload.id;
            })
           if(task) {
            const updatedTask = {
                ...task,
                ...action.payload.changes
            }
            const taskIndex = state.tasks.findIndex((taskIndex)=>{
                return taskIndex.id === updatedTask.id    
            })

            if(taskIndex !== -1){
                state.tasks[taskIndex] = updatedTask
            }
           }
        }
    }
})

export const selectTasks = (state: RootState) => {
    return state.taskReducer.tasks
}

export const selectTotalTasks = (state: RootState) => {
    return state.taskReducer.tasks.length;
}

export const selectTodoCount = (state: RootState) => {
   return state.taskReducer.tasks.filter(task => task.status === "todo").length;
}

export const selectInProgressCount = (state: RootState) => {
    return state.taskReducer.tasks.filter(task => task.status === "in-progress").length;
}

export const selectCompletedCount = (state: RootState) => {
    return state.taskReducer.tasks.filter(task => task.status === "done").length;
}


const tasksReducer = tasksSlice.reducer

export const { addTask, removeTask, editTask } = tasksSlice.actions;

export default tasksReducer