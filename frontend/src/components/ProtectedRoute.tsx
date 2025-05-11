import { isLoggedInSelector } from "@/features/account";
import { useAppSelector } from "@/hooks/useStore";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const pathname = location.pathname;

  const isLoggedIn = useAppSelector(isLoggedInSelector);

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/sign-up")) &&
    isLoggedIn
  ) {
    return <Navigate to="/" replace />;
  }

  if (
    !isLoggedIn &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/sign-up")
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
