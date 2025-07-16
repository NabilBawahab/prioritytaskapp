import type { LoginRequest, LoginResponse } from "@/type/type";
import axios, { AxiosResponse, isAxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginAxios = async ({
  email,
  password,
}: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await api.post<LoginResponse>("/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Login failed:", error.response);
      const message = error.response?.data || "An error occurred during login";
      throw message;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
