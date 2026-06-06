import { supabase, createAdminClient, isSupabaseConfigured } from "./supabase";
import type { Mood, Poem, ReactionSummary } from "@/types";

export const localPoems: Poem[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    title: "අන්තේවාසික සිහිනයක්!",
    slug: "anthewasik-sihinayak",
    content: "ඉතා කෙටි සවසක\nඅනාරාධිත මුණ ගැසීමක\nසිත් උයන් ඉම ඉවුරු තල බිද\nසිහින ගොඩ ගැලුවා\n\nඉතින් ඒ දිගුත් නැති\nකෙසේවත් කෙටිත් නැති\nඅන්තේවාසික සිහිනයක්\nඔබ මට දුන්නා.",
    excerpt: "විරහව අතරත් ආදරය නිහඬව ඉතිරි වන කවියක්.",
    mood: "විරහ",
    cover_image: null,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    title: "නවම් මාවත",
    slug: "akuru-athara-oba",
    content: 'ඉතින් ඔබ ඇවිද යන\nකෙලවර නවම් මාවත\nදෙස බලා හිදියෙමි\nමැකෙන තෙක්ම නුඹේ වත\n\nදවසක් දෙකක් හෝ තුනක්\nමමත් ඇවිද ගියෙමි\nසුපුරුදු දෙසට ප්‍රතිවිරුද්ධව\nඔබ යන දෙසට මාවත\n\nඑසේ ගොස් මුන ගැසෙන\nඉතින් එක ඇසිල්ලෙක\nවින්දෙමි ඔබෙන්\nමුලු ලොවේ ප්‍රහර්ෂය\n\nඉතින් ඔබ පැමිණියේ\nකාරනා කිමද\nපෙරදිනක මෙන්\nපොතක් ඇත අන් සතුවද\n\nඅසන විට ඔබ මගෙන්\nකෙසේ පවසනුද\nඔබම දැකුමට පතා\nආ බවක් කියනුද සිතා\n\nඔව් එය එසේමැයි\nපොතක් ඇත අන් සතු ව\nඉල්වාගන්න ට සිතා\nහෙතෙම හමුවන ලෙසට\n\nකියමින් එලෙස ට මුසා\nසැගවුවෙමි කිමද කාරණා\nඒත් මට දැන් සැකයි ඔබ\nදැන දැන ත් ඇසුව ද කියා\n\nඉතින් කලකින් හමුවූ හිතවතිය\nමා හට ඔබේ ගැන සිත ඇතිය\nදුටුව ඒ මුල් ඇසිල්ලෙම\nසිත් සොරා ගෙන ගිය සැටිය\n\nකෙමෙන් අප මේ ජීවිතේ\nතිස් වසට ලං වී සිටිමු\nඔබ හිමිව ඔබ සමග ඉන්නට\nබැහැ තවත් කල් ගනිනු\n\nතවත් සගවනු කිමද\nඅප නැතිය පෙර මෙන් යොවුනු\nආදරය විද ගමු\nනොවී අප තව මහලු.',
    excerpt: "ඉතින් කලකින් හමුවූ හිතවතිය, මා හට ඔබේ ගැන සිත ඇතිය.",
    mood: "ආදර",
    cover_image: null,
    created_at: "2026-01-02T00:00:00.000Z",
    updated_at: "2026-01-02T00:00:00.000Z"
  }
];

export async function getPoems(params?: { query?: string; mood?: string; limit?: number }) {
  if (!isSupabaseConfigured) {
    let poems = localPoems;
    if (params?.query) {
      const q = params.query.toLowerCase();
      poems = poems.filter((poem) => [poem.title, poem.excerpt, poem.content].some((value) => value.toLowerCase().includes(q)));
    }
    if (params?.mood) poems = poems.filter((poem) => poem.mood === params.mood);
    return params?.limit ? poems.slice(0, params.limit) : poems;
  }

  let request = supabase.from("poems").select("*").order("created_at", { ascending: false });
  if (params?.query) request = request.or(`title.ilike.%${params.query}%,excerpt.ilike.%${params.query}%,content.ilike.%${params.query}%`);
  if (params?.mood) request = request.eq("mood", params.mood as Mood);
  if (params?.limit) request = request.limit(params.limit);
  const { data, error } = await request;
  if (error) throw error;
  return data as Poem[];
}

export async function getPoemBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    return localPoems.find((poem) => poem.slug === slug) ?? null;
  }

  const { data, error } = await supabase.from("poems").select("*").eq("slug", slug).single();
  if (error) return null;
  return data as Poem;
}

export async function getComments(poemId: string) {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase.from("comments").select("*").eq("poem_id", poemId).order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getReactionSummary(poemId: string): Promise<ReactionSummary[]> {
  if (!isSupabaseConfigured) return [];

  const supabaseAdmin = createAdminClient();
  const { data, error } = await supabaseAdmin.from("reactions").select("reaction_type").eq("poem_id", poemId);
  if (error) throw error;

  const counts = new Map<string, number>();
  data.forEach((reaction) => counts.set(reaction.reaction_type, (counts.get(reaction.reaction_type) ?? 0) + 1));
  return Array.from(counts.entries()).map(([reaction_type, count]) => ({ reaction_type: reaction_type as ReactionSummary["reaction_type"], count }));
}
