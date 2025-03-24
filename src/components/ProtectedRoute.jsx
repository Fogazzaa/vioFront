import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? children : < Navigate to = "/" />
};

export default ProtectedRoute;