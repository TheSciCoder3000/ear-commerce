import { SupabaseClient } from "@supabase/supabase-js";

export function ParseFormData(formData: FormData) {
  return {
    title: formData.get("title") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string),
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    images: formData.getAll("images[]") as File[],
  };
}

export async function UploadImages(
  user_id: string,
  product_name: string,
  images: File[],
  supabase: SupabaseClient
) {
  const imagePaths: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const storageData = await supabase.storage
      .from("products")
      .upload(`${user_id}/${product_name}/${img.name}`, img)
      .then((res) => res.data);
    if (storageData) imagePaths.push(storageData.fullPath);
  }

  return imagePaths;
}
