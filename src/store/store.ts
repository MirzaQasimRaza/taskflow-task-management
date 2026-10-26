import { configureStore } from "@reduxjs/toolkit";
import { taskDetailsReducer } from "./taskDetailsSlice";
import tasksReducer from "./tasksSlice";
import { persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const persistConfig = {
    key: 'root',
    storage: storage
}

const rootReducer = combineReducers({
    taskDetailsReducer,
    taskReducer: tasksReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;