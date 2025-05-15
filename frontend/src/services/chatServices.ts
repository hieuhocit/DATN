import axios from "@/configs/axiosConfig";

export interface ChatRequest {
  courseId: string;
  lessonId: string;
  message: string;
}

export interface ChatResponse {
  statusCode: number;
  statusText: string;
  message: string;
  data: string;
}

export const chatWithAI = async (data: ChatRequest) => {
  const response = await axios.post("/chat-with-ai", data);
  return response.data as ChatResponse;
};
