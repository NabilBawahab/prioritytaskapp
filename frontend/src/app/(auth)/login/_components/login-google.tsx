"use client";

import { useActionState } from "react";
import { loginGoogleAction } from "../action";
import { Button } from "@/components/ui/button";

export function GoogleLogin() {
  const [_, formAction, pending] = useActionState(loginGoogleAction, null);
  return <Button type="submit">Continue with google</Button>;
}
