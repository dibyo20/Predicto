import { useAuth } from "../hooks/useAuth.js";
import { Navigate, useLocation } from "react-router-dom";
import { LoginSkeleton, RegisterSkeleton } from "./Skeletons";

const PublicOnly = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    const isRegister = location.pathname === "/register";
    return isRegister ? <RegisterSkeleton /> : <LoginSkeleton />;
  }

  if (!loading && user) {
    return <Navigate to="/predict" replace />;
  }

  return children;
};

export default PublicOnly;
