"use server";

import { api } from "@/lib/axios";
import { ErrorResponse, RegisterResponse } from "@/type/type";
import type { AxiosError, AxiosResponse } from "axios";

export async function registerAction(_: any, formData: FormData) {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmedpassword") as string;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match",
    };
  }

  try {
    const res: AxiosResponse<RegisterResponse> = await api.post("/register", {
      email,
      username,
      password,
    });

    return {
      success: true,
      message: res.data.message || "Registration successful.",
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error(
      "Registration error:",
      axiosError.response?.data || axiosError.message,
    );

    return {
      success: false,
      message:
        axiosError.response?.data.message ||
        "An error occurred during registration.",
    };
  }
}
