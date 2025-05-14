import { getInstructorDashboardStats } from "@/services/statisticsService";
import { useQuery } from "@tanstack/react-query";

export const useStats = () => {
  return useQuery({
    queryKey: ["instructorStats"],
    queryFn: getInstructorDashboardStats,
  });
};
