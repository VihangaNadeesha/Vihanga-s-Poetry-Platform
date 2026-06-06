"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { reactionTypes, type ReactionSummary, type ReactionType } from "@/types";

export function Reactions({ poemId, initial }: { poemId: string; initial: ReactionSummary[] }) {
  const [summary, setSummary] = useState(initial);
  const [isPending, startTransition] = useTransition();

  function countFor(type: ReactionType) {
    return summary.find((item) => item.reaction_type === type)?.count ?? 0;
  }

  function react(type: ReactionType) {
    startTransition(async () => {
      const response = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poem_id: poemId, reaction_type: type })
      });
      if (response.ok) {
        const data = (await response.json()) as { summary: ReactionSummary[] };
        setSummary(data.summary);
      }
    });
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-blush">ප්‍රතිචාර</h3>
      <div className="flex flex-wrap gap-2">
        {reactionTypes.map((type) => (
          <button
            key={type}
            onClick={() => react(type)}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card px-4 py-2 text-sm text-white/75 transition hover:border-rose hover:text-paper disabled:opacity-60"
          >
            <Heart className="h-4 w-4 text-rose" />
            {type}
            <span className="text-blush">{countFor(type)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
