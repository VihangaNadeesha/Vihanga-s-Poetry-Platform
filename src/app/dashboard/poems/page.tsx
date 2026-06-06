import Link from "next/link";
import { Plus } from "lucide-react";
import { createAdminClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPoemsPage() {
  const supabase = createAdminClient();
  const { data: poems, error } = await supabase.from("poems").select("*").order("created_at", { ascending: false });
  if (error) throw error;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Poems</h2>
        <Link href="/dashboard/poems/new" className="inline-flex items-center gap-2 rounded-md bg-rose px-4 py-2 font-semibold">
          <Plus className="h-4 w-4" />
          New Poem
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        {poems.map((poem) => (
          <Link key={poem.id} href={`/dashboard/poems/${poem.id}`} className="grid gap-2 border-b border-white/10 bg-card p-4 last:border-b-0 hover:bg-white/5 md:grid-cols-[1fr_160px_120px]">
            <span className="font-semibold">{poem.title}</span>
            <span className="text-sm text-blush">{poem.mood}</span>
            <span className="text-sm text-white/55">{formatDate(poem.created_at)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
