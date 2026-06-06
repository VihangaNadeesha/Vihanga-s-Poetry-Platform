import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `covers/${crypto.randomUUID()}.${extension}`;
  const supabase = createAdminClient();
  const { error } = await supabase.storage.from("poem-covers").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data } = supabase.storage.from("poem-covers").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
