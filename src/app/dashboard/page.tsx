import Link from "next/link";
import { BarChart3, MessageSquare, PenLine } from "lucide-react";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createAdminClient();
  const [{ count: poems }, { count: comments }, { count: reactions }] = await Promise.all([
    supabase.from("poems").select("*", { count: "exact", head: true }),
    supabase.from("comments").select("*", { count: "exact", head: true }),
    supabase.from("reactions").select("*", { count: "exact", head: true })
  ]);

  const cards = [
    { label: "Poems", value: poems ?? 0, icon: PenLine, href: "/dashboard/poems" },
    { label: "Comments", value: comments ?? 0, icon: MessageSquare, href: "/dashboard/comments" },
    { label: "Reactions", value: reactions ?? 0, icon: BarChart3, href: "/dashboard/analytics" }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Link key={card.label} href={card.href} className="rounded-lg border border-white/10 bg-card p-5 hover:border-rose">
          <card.icon className="h-5 w-5 text-rose" />
          <p className="mt-5 text-sm text-white/55">{card.label}</p>
          <p className="mt-1 text-3xl font-bold">{card.value}</p>
        </Link>
      ))}
    </div>
  );
}
