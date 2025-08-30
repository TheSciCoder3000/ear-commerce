import { createBrowserClient } from "@supabase/ssr";

export function createClient(token?: string) {
  const tokenize = !token
    ? {}
    : {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: tokenize }
  );
}
