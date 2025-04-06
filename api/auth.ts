import api from "@/lib/apiClient";
import { AxiosError } from "axios";

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
  message: string;
};

export type RegisterResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
  message: string;
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof AxiosError && error.response?.data?.message) {
        error.message = error.response.data.message;
      }
      throw error;
    }
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>(
        "/auth/register",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      if (error instanceof AxiosError && error.response?.data?.message) {
        error.message = error.response.data.message;
      }
      throw error;
    }
  },

  verifyToken: async (): Promise<{ valid: boolean }> => {
    try {
      const response = await api.get("/verify-token");
      if (response.status === 200) {
        return { valid: true };
      }
      return { valid: true };
    } catch (error) {
      console.error("Token verification error:", error);
      return { valid: false };
    }
  },
};
