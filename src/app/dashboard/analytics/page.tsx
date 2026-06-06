import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const supabase = createAdminClient();
  const [{ count: poems }, { count: comments }, { count: reactions }, { data: moods }] = await Promise.all([
    supabase.from("poems").select("*", { count: "exact", head: true }),
    supabase.from("comments").select("*", { count: "exact", head: true }),
    supabase.from("reactions").select("*", { count: "exact", head: true }),
    supabase.from("poems").select("mood")
  ]);

  const moodCounts = new Map<string, number>();
  moods?.forEach((item) => moodCounts.set(item.mood, (moodCounts.get(item.mood) ?? 0) + 1));
  const topMood = Array.from(moodCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  return (
    <div>
      <h2 className="mb-5 text-2xl font-semibold">Analytics</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Poems", poems ?? 0],
          ["Comments", comments ?? 0],
          ["Reactions", reactions ?? 0],
          ["Top Mood", topMood]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-card p-5">
            <p className="text-sm text-white/55">{label}</p>
            <p className="mt-2 text-3xl font-bold text-blush">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
