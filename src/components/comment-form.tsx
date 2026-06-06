"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Send } from "lucide-react";

export function CommentForm({ poemId }: { poemId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function onSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          poem_id: poemId,
          name: formData.get("name"),
          comment: formData.get("comment")
        })
      });

      if (!response.ok) {
        setError("කරුණාකර වලංගු නමක් සහ අදහසක් ඇතුළත් කරන්න.");
        return;
      }

      const form = document.getElementById("comment-form") as HTMLFormElement | null;
      form?.reset();
      router.refresh();
    });
  }

  return (
    <form id="comment-form" action={onSubmit} className="space-y-4 rounded-lg border border-white/10 bg-card p-5">
      <input name="name" required maxLength={80} placeholder="ඔබේ නම" className="w-full rounded-md border border-white/10 bg-ink px-4 py-3 text-paper outline-none focus:border-rose" />
      <textarea name="comment" required maxLength={800} rows={4} placeholder="ඔබේ අදහස" className="w-full rounded-md border border-white/10 bg-ink px-4 py-3 text-paper outline-none focus:border-rose" />
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      <button disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-rose px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose/85 disabled:opacity-60">
        <Send className="h-4 w-4" />
        අදහස යවන්න
      </button>
    </form>
  );
}
