import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../components";
import { is_authenticated } from "@Signal/use-signal/auth-init-signal";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const MarketplacePage = lazy(() => import("../pages/MarketplacePage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function ProtectedRoutes() {
  const location = useLocation();

  if (!is_authenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function GuestOnlyLogin() {
  if (is_authenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<GuestOnlyLogin />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
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
        </Route>

        {/* Default redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
