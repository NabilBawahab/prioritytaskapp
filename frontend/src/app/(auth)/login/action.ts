"use server";

import { login } from "@/api/api";

export async function loginAction(_: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await login(email as string, password as string);

    if (res.status >= 400) {
      return { success: false, message: res.message };
    }
    return {
      success: true,
      message: res.message,
    };
  } catch (error) {
    console.error("Error login user", error);
    return {
      success: false,
      message: "There is a problem, please try again later",
    };
  }
}
