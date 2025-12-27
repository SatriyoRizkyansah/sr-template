import React, { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import DashboardPage from "../views/DashboardPage";
import NotFoundPage from "../views/NotFoundPage";

export const AppRoutes: React.FC = () => {
  // Optimized routes with useMemo to prevent unnecessary re-renders
  const routes = useMemo(
    () => (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes - wrap with your auth logic later */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    ),
    []
  ); // Empty dependency array since routes are static

  return routes;
};

export default AppRoutes;
