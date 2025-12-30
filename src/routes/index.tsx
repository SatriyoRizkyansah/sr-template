import React, { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import DashboardPage from "../views/DashboardPage";
import MarketplacePage from "../views/MarketplacePage";
import OrdersPage from "../views/OrdersPage";
import SettingsPage from "../views/SettingsPage";
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
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/tracking" element={<DashboardPage />} />
        <Route path="/customers" element={<DashboardPage />} />
        <Route path="/discounts" element={<DashboardPage />} />
        <Route path="/ledger" element={<DashboardPage />} />
        <Route path="/taxes" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dark-mode" element={<DashboardPage />} />

        {/* Default redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    ),
    []
  ); // Empty dependency array since routes are static

  return routes;
};

export default AppRoutes;
