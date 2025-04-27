import { getCourseById } from "@/services/courseService";
import { LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const data = await getCourseById(params.courseId as string);
  return data ? data : null;
};
