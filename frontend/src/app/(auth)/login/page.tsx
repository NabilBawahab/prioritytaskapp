"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "./action";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLogin } from "./_components/login-google";

export default function Page() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isRegistered = searchParams.get("success") === "true";

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-xs border p-6 rounded-xl shadow-md border-slate-300 space-y-6">
      <section className="text-center space-y-3">
        <h1 className="font-semibold">Login</h1>
        <p>Sign in to continue</p>
        {isRegistered && (
          <div className="bg-green-400 text-white rounded-lg py-2 px-2">
            Registration successful!
          </div>
        )}
      </section>
      <section>
        <form className="flex flex-col gap-4" action={formAction}>
          <input
            placeholder="Input your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
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
          <button
            className="rounded-xl py-2 px-4 mt-2 bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer transition-colors duration-500 active:bg-amber-800"
            type="submit"
            disabled={pending}
          >
            Login
          </button>
          {!state?.success && (
            <div className="text-red-600">{state?.message}</div>
          )}
        </form>
        <GoogleLogin />
      </section>
      <p className="text-sm text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
}
