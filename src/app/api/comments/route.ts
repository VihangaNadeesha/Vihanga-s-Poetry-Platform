import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const poem_id = String(body.poem_id ?? "");
  const name = String(body.name ?? "").trim().slice(0, 80);
  const comment = String(body.comment ?? "").trim().slice(0, 800);
  if (!poem_id || !name || !comment) {
    return NextResponse.json({ error: "Invalid comment." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("comments").insert({ poem_id, name, comment }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data }, { status: 201 });
}
