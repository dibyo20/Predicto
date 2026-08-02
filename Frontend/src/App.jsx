import { AuthProvider } from "./Features/Auth/auth.context.jsx";
import { router } from "./app.routes.jsx";
import { RouterProvider } from "react-router-dom";
import "./styles/main.scss";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
