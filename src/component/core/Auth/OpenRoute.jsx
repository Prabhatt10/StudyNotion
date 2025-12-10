import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  // Safely access token from Redux state
  const token = useSelector((state) => state?.auth?.token);

  // If user is NOT authenticated, allow access
  if (!token) {
    return children;
  }

  // If user IS authenticated, redirect to dashboard
  return <Navigate to="/dashboard/my-profile" replace />;
}

export default OpenRoute;
