"use server";

import { api } from "@/lib/axios";
import type {
  CreateTaskInput,
  ErrorResponse,
  GeneralAPISuccessResponse,
} from "@/type/type";
import { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function createTaskAction(_: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const tasksRaw = formData.get("tasks");
  if (typeof tasksRaw !== "string") {
    return { success: false, message: "Data is not valid string" };
  }
  const tasks: CreateTaskInput[] = JSON.parse(tasksRaw);
  // Cek apakah kondisi tasks sudah betul, jika ada yg ga diisi dan di cek dengan some, maka akan return success false
  const hasInvalidTask = tasks.some((task) => {
    return (
      !task.title.trim() ||
      !task.description.trim() ||
      !task.priority.trim() ||
      !task.status.trim() ||
      !task.dueDate.trim()
    );
  });

  if (hasInvalidTask) {
    return { success: false, message: "All field must be filled" };
  }

  try {
    const res: AxiosResponse<GeneralAPISuccessResponse> = await api.post(
      "/user/create",
      tasks.map((task) => {
        return {
          ...task,
          dueDate: new Date(task.dueDate).toISOString(),
        };
      }),
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return { success: true, message: res.data.message };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("Create task error", axiosError.response?.data);
    return {
      success: false,
      message:
        axiosError.response?.data.message ||
        "An error occured during create task",
    };
  }
}
