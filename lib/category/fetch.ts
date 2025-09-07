import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";
import { CategoryData } from "@/Constants";

export async function FetchCategories(): Promise<
  [data: CategoryData[], PostgrestError | null]
> {
  const supabase = createClient();
  const { data, error } = await supabase.from("category").select();

  return [data as CategoryData[], error];
}

export async function FetchNotNullCategories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("category")
    .select<`*`, CategoryData>()
    .neq("cover", null);

  if (error) throw Error(error.message);

  return data;
}
