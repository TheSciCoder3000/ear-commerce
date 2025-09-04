import { SupabaseClient } from "@supabase/supabase-js";

export async function GetUser(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw Error("error retrieving user");

  return data.user;
}
