import axios from "@/configs/axiosConfig";

export const deleteHistory = async (courseId: string) => {
  const res = await axios.post("/ai/delete-history", {
    courseId,
  });
  return res.data;
};
