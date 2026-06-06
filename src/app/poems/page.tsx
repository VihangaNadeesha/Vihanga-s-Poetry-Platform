import type { Metadata } from "next";
import { PoemGrid } from "@/components/poem-grid";
import { getPoems } from "@/lib/data";
import { moods } from "@/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "කවි",
  description: "රෝස අකුරු කවි එකතුව."
};

export const dynamic = "force-dynamic";

export default async function PoemsPage({ searchParams }: { searchParams: Promise<{ mood?: string }> }) {
  const { mood } = await searchParams;
  const poems = await getPoems({ mood });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">කවි එකතුව</h1>
        <p className="mt-3 text-white/65">ඔබේ හැඟීමට ගැළපෙන කවියක් තෝරන්න.</p>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/poems" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-rose">සියල්ල</Link>
        {moods.map((item) => (
          <Link key={item} href={`/poems?mood=${encodeURIComponent(item)}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-rose">
            {item}
          </Link>
        ))}
      </div>
      <PoemGrid poems={poems} />
    </main>
  );
}
