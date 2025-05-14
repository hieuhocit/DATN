import axios from "@/configs/axiosConfig";

interface StatsData {
  total: number;
  percent: number;
  chartData: { month: string; value: number }[];
}

export type StatField = "user" | "course" | "instructor" | "revenue";
export type InstructorStatField = "user" | "course" | "revenue";

interface DashboardStatsResponse {
  statusCode: number;
  statusText: string;
  message: string;
  data: Record<StatField, StatsData>;
}

interface InstructorDashboardStatsResponse {
  statusCode: number;
  statusText: string;
  message: string;
  data: Record<InstructorStatField, StatsData>;
}

export const getDashboardStats = async () => {
  const response = await axios.get("/statistics");
  return response.data as DashboardStatsResponse;
};

export const getInstructorDashboardStats = async () => {
  const response = await axios.get("/statistics/instructor");
  return response.data as InstructorDashboardStatsResponse;
};
