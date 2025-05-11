import { enrollmentsSelector } from "@/features/account";
import { useAppSelector } from "@/hooks/useStore";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedLearningRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const enrollments = useAppSelector(enrollmentsSelector);
  const { courseSlug } = useParams();

  const course = enrollments.find((enrollment) => {
    return enrollment?.course?.[0]?.slug === `/${courseSlug}`;
  })?.course?.[0];

  const isEnrolled = course?.slug === `/${courseSlug}`;

  if (!isEnrolled) {
    return <Navigate to={"/"} />;
  }

  return children;
}
