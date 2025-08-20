"use server";

import { api } from "@/lib/axios";
import type { ErrorResponse, LoginResponse } from "@/type/type";
import type { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function loginAction(_: any, formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res: AxiosResponse<LoginResponse> = await api.post("/login", {
      email,
      password,
    });
    cookieStore.set("token", res.data?.data?.token || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
    });

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error(
      "Login error:",
      axiosError.response?.data || axiosError.message,
    );
    return {
      success: false,
      message:
        axiosError.response?.data.message || "An error occurred during login.",
    };
  }
}

export async function loginGoogleAction() {}
