import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin";
import { moods, type Mood } from "@/types";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? "").trim();
  const excerpt = String(body.excerpt ?? "").trim();
  const content = String(body.content ?? "").trim();
  const mood = String(body.mood ?? "").trim();

  if (!title || !slug || !excerpt || !content || !moods.includes(mood as Mood)) {
    return NextResponse.json({ error: "Invalid poem payload." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("poems")
    .update({ title, slug, excerpt, content, mood: mood as Mood, cover_image: body.cover_image ?? null, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ poem: data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = createAdminClient();
  const { error } = await supabase.from("poems").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
