"use server";

import { api } from "@/lib/axios";
import type { ErrorResponse, GeneralAPISuccessResponse } from "@/type/type";
import type { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function editProfileAction(_: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const name = formData.get("name");
  const bio = formData.get("bio");

  try {
    const res: AxiosResponse<GeneralAPISuccessResponse> = await api.put(
      "/user/updateprofile",
      { name, bio },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error(
      "Error updating user data",
      axiosError.response?.data || "Error updating user data",
    );

    return {
      success: false,
      message: axiosError.response?.data.message || "Error updating user data",
    };
  }
}
