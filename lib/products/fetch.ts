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

export async function FetchUserProducts(
  userId: string
): Promise<[SupabaseProductTable[] | null, PostgrestError | null]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product")
    .select<`*, category (id, name, description)`, SupabaseProductTable>(
      `*, category (id, name, description)`
    )
    .eq("user_id", userId);

  return [data, error];
}

export async function FetchProductByIds(
  ids: string[]
): Promise<SupabaseProductTable[] | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product")
    .select<`*`, SupabaseProductTable>("*")
    .in("id", ids);

  if (error) throw Error(error.message);

  return data;
}

/**
 * converts the image_paths relative url and returns the
 * public url of each image path. The data object array
 * must contain a property image_paths of type string[]
 * @param data
 */
export async function ParseProductTable<T extends { image_paths: string[] }>(
  data: T[]
): Promise<T[]> {
  const parsed: T[] = [];

  for (let t = 0; t < data.length; t++) {
    const parsedPaths = await ParseProductPaths(data[t]);

    parsed.push(parsedPaths);
  }

  return parsed;
}

export async function ParseProductPaths<T extends { image_paths: string[] }>(
  data: T
): Promise<T> {
  const supabase = createClient();
  const { image_paths } = data;
  const urls: string[] = [];
  for (let i = 0; i < image_paths.length; i++) {
    const { data } = await supabase.storage
      .from("products")
      .getPublicUrl(image_paths[i]?.replace("products", ""));
    urls.push(data.publicUrl);
  }

  return { ...data, image_paths: urls };
}
