"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-rose">
      Logout
    </button>
  );
}
