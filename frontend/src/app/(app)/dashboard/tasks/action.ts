"use server";

import { api } from "@/lib/axios";
import { ErrorResponse, GeneralAPISuccessResponse } from "@/type/type";
import { AxiosError, AxiosResponse } from "axios";
import { cookies, headers } from "next/headers";

export async function taskStatusUpdate(_: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const id = formData.get("taskId");
  const status = formData.get("status");

  if (!status) {
    try {
      const res: AxiosResponse<GeneralAPISuccessResponse> = await api.delete(
        "/user/delete",
        { data: { id }, headers: { Authorization: `Bearer ${token}` } },
      );

      return {
        success: true,
        message: res.data.message || "Task deleted successfully",
      };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Deleting task error", axiosError.response?.data);

      return {
        success: false,
        message:
          axiosError.response?.data.message ||
          "There is a problem when deleting task",
      };
    }
  }

  try {
    const res: AxiosResponse<GeneralAPISuccessResponse> = await api.put(
      "/user/update",
      { id, status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return {
      success: true,
      message: res.data.message || "Task updated successfully!",
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("Updating task error", axiosError.response?.data);

    return {
      success: false,
      message:
        axiosError.response?.data.message ||
        "There is a problem during updating task",
    };
  }
}
