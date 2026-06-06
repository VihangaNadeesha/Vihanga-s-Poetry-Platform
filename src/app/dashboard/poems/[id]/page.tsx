import { notFound } from "next/navigation";
import { PoemForm } from "@/components/admin/poem-form";
import { createAdminClient } from "@/lib/supabase";
import type { Poem } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditPoemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: poem } = await supabase.from("poems").select("*").eq("id", id).single();
  if (!poem) notFound();
  return <PoemForm poem={poem as Poem} />;
}
