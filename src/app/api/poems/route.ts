import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin";
import { slugifySinhala } from "@/lib/utils";
import { moods, type Mood } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supabase = createAdminClient();
  let query = supabase.from("poems").select("*").order("created_at", { ascending: false });
  const q = searchParams.get("q");
  const mood = searchParams.get("mood");
  if (q) query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`);
  if (mood) query = query.eq("mood", mood);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ poems: data });
}

export async function POST(request: Request) {
  await requireAdmin();
  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();
  const excerpt = String(body.excerpt ?? "").trim();
  const mood = String(body.mood ?? "").trim();
  const slug = String(body.slug ?? slugifySinhala(title)).trim();

  if (!title || !content || !excerpt || !slug || !moods.includes(mood as Mood)) {
    return NextResponse.json({ error: "Invalid poem payload." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("poems").insert({ title, content, excerpt, mood: mood as Mood, slug, cover_image: body.cover_image ?? null }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ poem: data }, { status: 201 });
}
