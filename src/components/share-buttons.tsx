"use client";

import { Copy, Facebook, Send } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const encodedUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-2">
      <a className="rounded-md border border-white/10 p-3 text-white/70 transition hover:border-rose hover:text-blush" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
        <Facebook className="h-4 w-4" />
      </a>
      <a className="rounded-md border border-white/10 p-3 text-white/70 transition hover:border-rose hover:text-blush" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on X">
        <Send className="h-4 w-4" />
      </a>
      <button className="rounded-md border border-white/10 p-3 text-white/70 transition hover:border-rose hover:text-blush" onClick={() => navigator.clipboard.writeText(window.location.href)} aria-label="Copy link">
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
