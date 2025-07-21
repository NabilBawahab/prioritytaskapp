"use client";

import { useActionState, useEffect, useState } from "react";

import Link from "next/link";
import { registerAction } from "./action";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state]);

  return (
    <div className="w-full max-w-xs border p-6 rounded-xl shadow-md border-slate-300 space-y-6">
      <section className="text-center space-y-3">
        <h1 className="font-semibold">Register</h1>
        <p>Create an account to continue</p>
      </section>
      <form className="flex flex-col gap-4" action={formAction}>
        <input
          placeholder="Input your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="border-slate-200 border rounded-lg px-2 py-1 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors duration-500"
        />
        <input
          placeholder="Input your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          className="border-slate-200 border rounded-lg px-2 py-1 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors duration-500"
        />
        <input
          placeholder="Input your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          className="border-slate-200 border rounded-lg px-2 py-1 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors duration-500"
          type="password"
        />
        <input
          placeholder="Input your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmedpassword"
          className="border-slate-200 border rounded-lg px-2 py-1 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors duration-500"
          type="password"
        />
        <button
          className="rounded-xl py-2 px-4 mt-2 bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer transition-colors duration-500 active:bg-amber-800"
          type="submit"
          disabled={pending}
        >
          Register
        </button>
        {!state?.success && (
          <div className="text-red-600">{state?.message}</div>
        )}
      </form>
      <p className="text-sm text-center">
        Have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
