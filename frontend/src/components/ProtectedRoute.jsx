import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoading, user }) {
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
