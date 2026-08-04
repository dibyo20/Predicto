import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Register from "./Features/Auth/pages/Register.jsx";
import Login from "./Features/Auth/pages/Login.jsx";
import Home from "./Features/Home/pages/Home.jsx";
import EmotionDetector from "./Features/Expression/pages/EmotionDetectorPage.jsx";
import Protected from "./Features/Auth/components/Protected.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/predict",
    element: <Protected><EmotionDetector /></Protected>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
