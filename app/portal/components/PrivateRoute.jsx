// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

export default function PrivateRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);

  // 1) Still checking session? Don’t redirect yet.
  if (loading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading…</div>;
  }

  // 2) Once loading is false, if no user, go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3) Authenticated — render the protected page
  return children;
}
