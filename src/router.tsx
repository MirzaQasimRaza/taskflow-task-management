
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./Components/RootLayout";
import NewTaskPage from "./pages/NewTaskPage";
import Hero from "./Components/Hero";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Hero />} />
      <Route path="/addTask" element={<NewTaskPage />} />
    </Route>
  )
);
