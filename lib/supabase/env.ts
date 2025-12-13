// Defaults prevent build-time crashes if env vars are missing in the deploy env.
const DEFAULT_SUPABASE_URL = "https://jelfpyyrvjzuvsmksmgd.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbGZweXlydmp6dXZzbWtzbWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NDcyMDUsImV4cCI6MjA4MDUyMzIwNX0.S7Rzsl9CKA8Tsk1Yb_PMFbz0oKE1kiusIOrBjf3beKA";

const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_KEY;

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;

  return { url, key: publishableKey };
}
