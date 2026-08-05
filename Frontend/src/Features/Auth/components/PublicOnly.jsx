import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router-dom";

const PublicOnly = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="loading"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "#fff",
          fontSize: "2rem",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!loading && user) {
    return <Navigate to="/predict" replace />;
  }

  return children;
};

export default PublicOnly;
