import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import DefoultLayout from "../components/DefoultLayout";
import GuestLayout from "../components/GuestLayout";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import NotFound from "../pages/NotFound";
import Dashbord from "../pages/Dashbord/Dashbord";
import Task from "../pages/task/Task";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefoultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashbord" />,
      },
      {
        path: "/dashbord",
        element: <Dashbord />,
      },
      {
        path: "/task",
        element: <Task />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
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
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
