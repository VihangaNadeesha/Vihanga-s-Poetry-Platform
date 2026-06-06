"use client";

import { Suspense } from "react";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
        callbackUrl: searchParams.get("callbackUrl") ?? "/dashboard"
      });

      if (result?.error) {
        setError("Login failed.");
        return;
      }
      router.push(result?.url ?? "/dashboard");
    });
  }

  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-12">
      <form action={submit} className="w-full max-w-md space-y-5 rounded-lg border border-white/10 bg-card p-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-white/60">රෝස අකුරු කළමනාකරණ ප්‍රවේශය.</p>
        </div>
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-white/10 bg-ink px-4 py-3 outline-none focus:border-rose" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-md border border-white/10 bg-ink px-4 py-3 outline-none focus:border-rose" />
        {error ? <p className="text-sm text-rose">{error}</p> : null}
        <button disabled={isPending} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-rose px-5 py-3 font-semibold text-white disabled:opacity-60">
          <LogIn className="h-4 w-4" />
          Login
        </button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-[70vh] place-items-center px-4 py-12 text-white/60">Loading...</main>}>
      <LoginForm />
    </Suspense>
  );
}
