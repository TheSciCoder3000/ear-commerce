import { ParseFormData, UploadImages } from "@/lib/products/add";
import { createClient } from "@/lib/supabase/client";

interface SupabaseProductTable {
  id?: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: string;
  user_id: string;
  image_paths: string[];
}

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

    const InsertData: SupabaseProductTable = {
      name: data.title,
      price: data.price,
      description: data.description,
      stock: data.stock,
      category_id: data.category,
      user_id,
      image_paths: imagePaths,
    };

    const { error } = await supabase.from("product").insert(InsertData);

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

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product")
    .select<`*, category (id, name, description)`, SupabaseProductTable>(
      `*, category (id, name, description)`
    );

  if (error)
    return Response.json({ message: "Supabase fetch error" }, { status: 500 });

  const parsed: SupabaseProductTable[] = [];
  for (let t = 0; t < data.length; t++) {
    const { image_paths } = data[t];
    const urls: string[] = [];
    for (let i = 0; i < image_paths.length; i++) {
      console.log(image_paths[i]);
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
  return Response.json({ data: parsed }, { status: 200 });
}
