import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@/lib/auth";

// Loading component
const LoadingScreen = () => (
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#F8F7FC] via-[#FFF5F8] to-[#F8F7FC]">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#f84178]/20 border-t-[#f84178]"></div>
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  </div>
);

// Only for users who are NOT logged in (e.g., login/signup)
export const UnauthenticatedRoute = ({ redirectTo = "/" }) => {
  const { data, isPending } = useSession() || {};
  
  if (isPending) return <LoadingScreen />;
  
  // If user exists, redirect to home
  if (data?.user?.id && data?.session?.id) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

// Only for users who ARE logged in (e.g., dashboard, todo)
export const AuthenticatedRoute = ({
  redirectTo = "/auth/login",
  allowedRoles,
}) => {
  const { data, isPending } = useSession() || {};
  
  // Show loader while session is loading
  if (isPending) return <LoadingScreen />;
  
  if (!data?.user?.id || !data?.session?.id) return <Navigate to={redirectTo} replace />;

  if (allowedRoles && (!data?.user?.role || !allowedRoles.includes(data.user.role))) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// Public route (no auth required)
export const PublicRoute = () => <Outlet />;