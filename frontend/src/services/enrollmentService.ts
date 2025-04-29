import axios from "@/configs/axiosConfig";
import { Enrollment } from "@/types";

export const getEnrollments = async () => {
  try {
    const response = await axios.get("/enrollments");
    return response.data as Enrollment[];
  } catch (error) {
    return error;
  }
};
