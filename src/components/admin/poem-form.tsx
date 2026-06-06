"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Trash2, Upload } from "lucide-react";
import { moods, type Poem } from "@/types";

export function PoemForm({ poem }: { poem?: Poem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [coverUrl, setCoverUrl] = useState(poem?.cover_image ?? "");
  const [message, setMessage] = useState("");

  async function uploadCover(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const data = (await response.json()) as { url?: string; error?: string };
    if (data.url) setCoverUrl(data.url);
    if (data.error) setMessage(data.error);
  }

  function save(formData: FormData) {
    setMessage("");
    startTransition(async () => {
      const payload = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        mood: formData.get("mood"),
        content: formData.get("content"),
        cover_image: coverUrl || null
      };
      const response = await fetch(poem ? `/api/poems/${poem.id}` : "/api/poems", {
        method: poem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        setMessage("කවිය සුරැකීමට නොහැකි විය.");
        return;
      }
      router.push("/dashboard/poems");
      router.refresh();
    });
  }

  function remove() {
    if (!poem || !confirm("Delete this poem?")) return;
    startTransition(async () => {
      await fetch(`/api/poems/${poem.id}`, { method: "DELETE" });
      router.push("/dashboard/poems");
      router.refresh();
    });
  }

  return (
    <form action={save} className="space-y-5 rounded-lg border border-white/10 bg-card p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="title" required defaultValue={poem?.title} placeholder="මාතෘකාව" className="rounded-md border border-white/10 bg-ink px-4 py-3 outline-none focus:border-rose" />
        <input name="slug" required defaultValue={poem?.slug} placeholder="slug" className="rounded-md border border-white/10 bg-ink px-4 py-3 outline-none focus:border-rose" />
      </div>
      <textarea name="excerpt" required defaultValue={poem?.excerpt} rows={3} placeholder="කෙටි හැඳින්වීම" className="w-full rounded-md border border-white/10 bg-ink px-4 py-3 outline-none focus:border-rose" />
      <select name="mood" required defaultValue={poem?.mood ?? moods[0]} className="w-full rounded-md border border-white/10 bg-ink px-4 py-3 outline-none focus:border-rose">
        {moods.map((mood) => (
          <option key={mood}>{mood}</option>
        ))}
      </select>
      <textarea name="content" required defaultValue={poem?.content} rows={12} placeholder="කවිය" className="w-full rounded-md border border-white/10 bg-ink px-4 py-3 leading-8 outline-none focus:border-rose" />
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-white/75 transition hover:border-rose">
          <Upload className="h-4 w-4" />
          Cover image
          <input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadCover(event.target.files[0])} />
        </label>
        {coverUrl ? <span className="max-w-full truncate text-sm text-blush">{coverUrl}</span> : null}
      </div>
      {message ? <p className="text-sm text-rose">{message}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-rose px-5 py-3 font-semibold text-white disabled:opacity-60">
          <Save className="h-4 w-4" />
          සුරකින්න
        </button>
        {poem ? (
          <button type="button" onClick={remove} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-5 py-3 text-white/70 hover:border-rose">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
