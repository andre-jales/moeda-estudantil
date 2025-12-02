import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = false; // Placeholder for authentication logic

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
