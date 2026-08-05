import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Register from "./Features/Auth/pages/Register.jsx";
import Login from "./Features/Auth/pages/Login.jsx";
import Home from "./Features/Home/pages/Home.jsx";
import EmotionDetector from "./Features/Expression/pages/EmotionDetectorPage.jsx";
import Protected from "./Features/Auth/components/Protected.jsx";
import { SongContextProvider } from "./Features/Song/song.context.jsx";
import SongsByMood from "./Features/Song/pages/SongsByMood.jsx";

const Layout = () => (
  <SongContextProvider>
    <Outlet />
  </SongContextProvider>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
        path: "/songsbymood",
        element: <Protected><SongsByMood /></Protected>
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
