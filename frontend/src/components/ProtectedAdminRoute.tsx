import { userSelector } from "@/features/account";
import { useAppSelector } from "@/hooks/useStore";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(userSelector);
  const isAdmin = user?.role === "admin";

  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
