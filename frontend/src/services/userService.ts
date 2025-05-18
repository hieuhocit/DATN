import axios from "@/configs/axiosConfig";

interface CreateUserRequest {
  email: string;
  name: string;
  password?: string;
  bio?: string;
  role?: string;
  provider?: string;
  avatarUrl?: string;
}

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`/users/${userId}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get("/users");
  return response.data;
};

export const updateUser = async (userId: string, data: CreateUserRequest) => {
  const response = await axios.put(`/users/${userId}`, data);
  return response.data;
};

export const createUser = async (data: CreateUserRequest) => {
  const response = await axios.post("/users", data);
  return response.data;
};

export const becomeInstructor = async () => {
  try {
    const response = await axios.get("/become-instructor");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadProfile = async (data: object) => {
  try {
    const response = await axios.put("/users/me", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
