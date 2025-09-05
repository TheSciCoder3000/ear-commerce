import { SupabaseClient } from "@supabase/supabase-js";

export async function DeleteProductByIds(
  supabase: SupabaseClient,
  products: { id: string; image_paths: string[] }[]
) {
  const ids = products.map((prod) => prod.id);
  const image_paths = products.reduce(
    (state, item) => [...state, ...item.image_paths],
    [] as string[]
  );

  const { error } = await supabase.from("product").delete().in("id", ids);
  if (error) console.log(error.message);

  const relativePaths = image_paths.reduce((state, path) => {
    const match = path.match(/products\/(.+)/);
    if (match) {
      return [...state, match[1]];
    }
    return state;
  }, [] as string[]);

  const { error: StorageError } = await supabase.storage
    .from("products")
    .remove(relativePaths);

  if (StorageError) console.log(StorageError.message);
}
