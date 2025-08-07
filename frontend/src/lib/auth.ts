import { cookies } from "next/headers";
import { api } from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, ProfileResponse } from "@/type/type";

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res: AxiosResponse<ProfileResponse> = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("Authentication error:", axiosError.response?.data);
    return null;
  }
}
