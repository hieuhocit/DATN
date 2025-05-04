/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/configs/axiosConfig";

interface UpdatedProgress {
  progress: number;
  lastWatchPosition: number;
}

export const updateProgressLesson = async (
  id: string,
  data: UpdatedProgress
) => {
  try {
    const response = await axios.put(`/lesson-progresses/${id}`, data);
    return response as any;
  } catch (error) {
    return error;
  }
};
