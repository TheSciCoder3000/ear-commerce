import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";

export interface SupabaseProductTable {
  id?: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: string;
  user_id: string;
  image_paths: string[];
}

export async function FetchProducts(): Promise<
  [SupabaseProductTable[] | null, PostgrestError | null]
> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product")
    .select<`*, category (id, name, description)`, SupabaseProductTable>(
      `*, category (id, name, description)`
    );

  return [data, error];
}

export async function ParseProductTable(data: SupabaseProductTable[]) {
  const supabase = createClient();

  const parsed: SupabaseProductTable[] = [];
  for (let t = 0; t < data.length; t++) {
    const { image_paths } = data[t];
    const urls: string[] = [];
    for (let i = 0; i < image_paths.length; i++) {
      const { data } = await supabase.storage
        .from("products")
        .getPublicUrl(image_paths[i]?.replace("products", ""));
      urls.push(data.publicUrl);
    }

    parsed.push({
      ...data[t],
      image_paths: urls,
    });
  }
  return parsed;
}
