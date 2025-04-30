import axios from "@/configs/axiosConfig";

// Types
import { User } from "@/types";

interface CommonResponse {
  statusCode: number;
  statusText: string;
  message: string;
}

interface LoginResponse extends CommonResponse {
  data?: User;
  errors?: Record<string, { field: string; message: string }>;
}

interface RegisterResponse extends CommonResponse {
  data?: User;
  errors?: Record<string, { field: string; message: string }>;
}

interface VerifyTokenResponse extends CommonResponse {
  data?: User;
}

export const login = async (data: object): Promise<LoginResponse> => {
  try {
    const result = (await axios.post("/login", data)) as LoginResponse;
    return result;
  } catch (error) {
    return error as LoginResponse;
  }
};

export const register = async (data: object) => {
  try {
    const result = (await axios.post("/register", data)) as RegisterResponse;
    return result.data;
  } catch (error) {
    return error as RegisterResponse;
  }
};

export const verifyToken = async (): Promise<VerifyTokenResponse> => {
  try {
    const data = (await axios.post("/verify-token")) as VerifyTokenResponse;
    return data;
  } catch (error) {
    return error as VerifyTokenResponse;
  }
};

export const logout = async () => {
  try {
    const result = (await axios.post("/logout")) as CommonResponse;
    return result;
  } catch (error) {
    return error as CommonResponse;
  }
};
