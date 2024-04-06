import { createBrowserRouter, Navigate } from "react-router-dom";
import DefoultLayout from "../layout/DefoultLayout";
import GuestLayout from "../layout/GuestLayout";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import NotFound from "../pages/NotFound";
import Dashbord from "../pages/Dashbord/Dashbord";
import Tasks from "../pages/task/Tasks";
import MyTask from "../pages/myTask/MyTask";
import Projects from "../pages/projects/Projects";
import AddTask from "../pages/addTask/AddTask";
import EditTask from "../pages/EditTask/EditTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: <DefoultLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/login" />,
      },

      {
        path: "/dashbord",
        element: <Dashbord />,
      },
      {
        path: "/Mytasks",
        element: <MyTask />,
      },
      {
        path: "/addTask",
        element: <AddTask />,
      },
      {
        path: "/editTask/:id",
        element: <EditTask />,
      },
      {
        path: "/projectTask",
        element: <Tasks />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
