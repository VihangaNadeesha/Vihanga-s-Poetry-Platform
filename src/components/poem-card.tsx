import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Heart } from "lucide-react";
import type { Poem } from "@/types";
import { formatDate } from "@/lib/utils";

export function PoemCard({ poem }: { poem: Poem }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-card transition hover:border-rose/45 hover:shadow-glow">
      <Link href={`/poems/${poem.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-white/5">
          {poem.cover_image ? (
            <Image src={poem.cover_image} alt={poem.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-rose">
              <Heart className="h-10 w-10" />
            </div>
          )}
        </div>
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-3 text-xs text-white/55">
            <span className="rounded-full border border-rose/35 px-3 py-1 text-blush">{poem.mood}</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(poem.created_at)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-paper">{poem.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/68">{poem.excerpt}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
