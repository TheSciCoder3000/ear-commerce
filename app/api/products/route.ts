import { ParseFormData, UploadImages } from "@/lib/products/add";
import { createClient } from "@/lib/supabase/client";

export async function POST(request: Request) {
  const rawData = await request.formData();
  const user_id = rawData.get("user_id") as string;
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader === "")
    return Response.json({ message: "unauthorized user" }, { status: 401 });
  const token = authHeader?.replace("Bearer ", "");

  try {
    const data = ParseFormData(rawData);
    console.log({ user_id, data });

    const supabase = createClient(token);

    // upload all files
    const imagePaths = await UploadImages(
      user_id,
      data.title,
      data.images,
      supabase
    );

    const { error } = await supabase.from("product").insert({
      name: data.title,
      price: data.price,
      description: data.description,
      stock: data.stock,
      category_id: data.category,
      user_id,
      image_paths: imagePaths,
    });

    if (error) {
      console.error(error);
      return Response.json(
        { message: "Supabase Insert Error" },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("server error");
    return Response.json(
      { message: `Server error: ${e instanceof Error && e.message}` },
      { status: 500 }
    );
  }

  // supabase.storage.from("products").upload(``)
  return Response.json({ message: "success" }, { status: 200 });
}
