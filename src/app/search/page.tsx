import { Search } from "lucide-react";
import { PoemGrid } from "@/components/poem-grid";
import { getPoems } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const poems = q ? await getPoems({ query: q }) : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold">කවි සොයන්න</h1>
      <form className="my-8 flex gap-3">
        <input name="q" defaultValue={q} placeholder="මාතෘකාව, වචන, හැඟීම්..." className="min-w-0 flex-1 rounded-md border border-white/10 bg-card px-4 py-3 outline-none focus:border-rose" />
        <button className="inline-flex items-center gap-2 rounded-md bg-rose px-5 py-3 font-semibold">
          <Search className="h-4 w-4" />
          සොයන්න
        </button>
      </form>
      {q ? <PoemGrid poems={poems} /> : <p className="text-white/60">සෙවීමට වචනයක් ඇතුළත් කරන්න.</p>}
    </main>
  );
}
