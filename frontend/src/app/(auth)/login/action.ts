"use server";

import { login } from "@/api/api";

export async function loginAction(_: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const date = formData.get("date");

  const utcDate = new Date(date as string);

  console.log({ email, password, date, utcDate });
}
