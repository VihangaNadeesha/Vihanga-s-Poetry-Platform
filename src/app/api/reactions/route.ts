import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { getReactionSummary } from "@/lib/data";
import { reactionTypes, type ReactionType } from "@/types";

export async function POST(request: Request) {
  const body = await request.json();
  const poem_id = String(body.poem_id ?? "");
  const reaction_type = String(body.reaction_type ?? "");
  if (!poem_id || !reactionTypes.includes(reaction_type as ReactionType)) {
    return NextResponse.json({ error: "Invalid reaction." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("reactions").insert({ poem_id, reaction_type: reaction_type as ReactionType });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const summary = await getReactionSummary(poem_id);
  return NextResponse.json({ summary }, { status: 201 });
}
