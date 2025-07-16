"use server";

import { loginAxios } from "@/api/api";
import { LoginResponse } from "@/type/type";
import { cookies } from "next/headers";

export async function loginAction(_: any, formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await loginAxios({ email, password });
    if (response.data.status === 200) {
      const token = response.data.data?.token;
      cookieStore.set("token", token || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
      });

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
}
