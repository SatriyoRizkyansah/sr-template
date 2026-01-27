import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../components/loading/Loader";

const LoginPage = lazy(() => import("../views/LoginPage"));
const DashboardPage = lazy(() => import("../views/DashboardPage"));
const MarketplacePage = lazy(() => import("../views/MarketplacePage"));
const OrdersPage = lazy(() => import("../views/OrdersPage"));
const SettingsPage = lazy(() => import("../views/SettingsPage"));
const NotFoundPage = lazy(() => import("../views/NotFoundPage"));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default AppRoutes;
