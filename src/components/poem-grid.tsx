import type { Poem } from "@/types";
import { PoemCard } from "./poem-card";

export function PoemGrid({ poems }: { poems: Poem[] }) {
  if (poems.length === 0) {
    return <div className="rounded-lg border border-white/10 bg-card p-10 text-center text-white/60">කවි හමු නොවීය.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {poems.map((poem) => (
        <PoemCard key={poem.id} poem={poem} />
      ))}
    </div>
  );
}
