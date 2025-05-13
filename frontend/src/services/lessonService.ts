import axios from "@/configs/axiosConfig";

interface UpdatedProgress {
  progress: number;
  lastWatchPosition: number;
}

export interface ICreateLessonData {
  title: string;
  description: string;
  courseId: string;
  duration: number;
  orderIndex: number;
  videoUrl: string;
  publicId: string;
}

export const createLesson = async (data: ICreateLessonData) => {
  try {
    const response = await axios.post("lessons", data);
    return response.data;
  } catch (error) {
    console.error("Error creating lesson:", error);
  }
};

export const updateLesson = async (
  lessonId: string,
  data: ICreateLessonData
) => {
  try {
    const response = await axios.put(`lessons/${lessonId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating lesson:", error);
  }
};

export const deleteLesson = async (lessonId: string) => {
  try {
    const response = await axios.delete(`lessons/${lessonId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting lesson:", error);
  }
};

export const updateProgressLesson = async (
  id: string,
  data: UpdatedProgress
) => {
  try {
    const response = await axios.put(`/lesson-progresses/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
