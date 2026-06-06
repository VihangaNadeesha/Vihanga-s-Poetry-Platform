import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const url = supabaseUrl ?? "https://example.supabase.co";
const anonKey = supabaseAnonKey ?? "local-development-anon-key";

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false }
});

export function createAdminClient() {
  if (!isSupabaseConfigured || !supabaseServiceRoleKey) {
    throw new Error("Supabase environment variables are required for admin actions.");
  }

  return createClient(url, supabaseServiceRoleKey, {
    auth: { persistSession: false }
  });
}
