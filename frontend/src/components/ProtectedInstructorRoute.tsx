import { userSelector } from "@/features/account";
import { useAppSelector } from "@/hooks/useStore";
import { Navigate } from "react-router-dom";

export default function ProtectedInstructorRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(userSelector);
  const isInstructor = user?.role === "instructor";

  if (!isInstructor) return <Navigate to="/" replace />;

  return children;
}
