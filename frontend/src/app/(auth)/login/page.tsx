"use client";

import { useActionState } from "react";
import { loginAction } from "./action";

export default function Home() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <>
      <section className="text-center space-y-1">
        <h1 className="font-semibold">Login</h1>
        <p>Sign in to continue</p>
      </section>
      <form className="flex flex-col" action={formAction}>
        <input placeholder="Input your email" name="email" />
        <input placeholder="Input your password" name="password" />
        <input type="datetime-local" name="date" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
