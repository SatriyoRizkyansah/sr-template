import { Suspense, lazy, type ReactElement } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../components";
import { auth_signal, is_authenticated } from "@Signal/use-signal/auth-init-signal";
import { get_role_home_path, resolve_menu_role_from_akses, type MenuRole } from "../layouts/components";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DataDiriPage = lazy(() => import("../pages/DataDiriPage"));
const FeaturePlaceholderPage = lazy(() => import("../pages/FeaturePlaceholderPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const get_current_menu_role = (): MenuRole => {
  return resolve_menu_role_from_akses(auth_signal.value.selectedAuthorization?.akses);
};

function ProtectedRoutes() {
  const location = useLocation();

  if (!is_authenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function RoleHomeRedirect() {
  const role = get_current_menu_role();
  return <Navigate to={get_role_home_path(role)} replace />;
}

interface RoleRouteProps {
  allowedRoles: MenuRole[];
  element: ReactElement;
}

function RoleRoute({ allowedRoles, element }: RoleRouteProps) {
  const role = get_current_menu_role();

  if (!allowedRoles.includes(role)) {
    return <Navigate to={get_role_home_path(role)} replace />;
  }

  return element;
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
          <Route path="/dashboard" element={<RoleHomeRedirect />} />
          <Route path="/data-diri" element={<DataDiriPage />} />

          <Route
            path="/pegawai/penugasan"
            element={<RoleRoute allowedRoles={["pegawai"]} element={<FeaturePlaceholderPage title="Penugasan" description="Halaman Penugasan untuk akses Pegawai akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/pegawai/pendidikan"
            element={<RoleRoute allowedRoles={["pegawai"]} element={<FeaturePlaceholderPage title="Pendidikan" description="Halaman Pendidikan untuk akses Pegawai akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/pegawai/keluarga"
            element={<RoleRoute allowedRoles={["pegawai"]} element={<FeaturePlaceholderPage title="Keluarga" description="Halaman Keluarga untuk akses Pegawai akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/pegawai/riwayat-pendidikan"
            element={<RoleRoute allowedRoles={["pegawai"]} element={<FeaturePlaceholderPage title="Riwayat Pendidikan" description="Halaman Riwayat Pendidikan untuk akses Pegawai akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/pegawai/rekognisi"
            element={<RoleRoute allowedRoles={["pegawai"]} element={<FeaturePlaceholderPage title="Rekognisi" description="Halaman Rekognisi untuk akses Pegawai akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/pegawai/beasiswa-s3"
            element={<RoleRoute allowedRoles={["pegawai"]} element={<FeaturePlaceholderPage title="Beasiswa S3" description="Halaman Beasiswa S3 untuk akses Pegawai akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/pegawai/data-asuransi-sjg"
            element={<RoleRoute allowedRoles={["pegawai"]} element={<FeaturePlaceholderPage title="Data Asuransi SJG" description="Halaman Data Asuransi SJG untuk akses Pegawai akan dikembangkan pada tahap berikutnya." />} />}
          />

          <Route
            path="/admin/dashboard-statistik"
            element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Dashboard Statistik" description="Halaman Dashboard Statistik untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/admin/data-pegawai"
            element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Data Pegawai" description="Halaman Data Pegawai untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/admin/data-penugasan"
            element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Data Penugasan" description="Halaman Data Penugasan untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/admin/data-dosen"
            element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Data Dosen" description="Halaman Data Dosen untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/admin/data-tendik"
            element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Data Tendik" description="Halaman Data Tendik untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route path="/admin/data-tpa" element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Data TPA" description="Halaman Data TPA untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />} />
          <Route path="/admin/rekognisi" element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Rekognisi" description="Halaman Rekognisi untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />} />
          <Route
            path="/admin/approval-data-pegawai"
            element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Approval Data Pegawai" description="Halaman Approval Data Pegawai untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />}
          />
          <Route
            path="/admin/approval-data-penugasan"
            element={<RoleRoute allowedRoles={["admin"]} element={<FeaturePlaceholderPage title="Approval Data Penugasan" description="Halaman Approval Data Penugasan untuk akses Admin akan dikembangkan pada tahap berikutnya." />} />}
          />
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
