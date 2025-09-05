import { DeleteProductByIds } from "@/lib/products/delete";
import {
  FetchProductByIds,
  FetchUserProducts,
  ParseProductTable,
} from "@/lib/products/fetch";
import { createClient } from "@/lib/supabase/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ user: string }> }
) {
  const { user } = await params;
  const [data, error] = await FetchUserProducts(user);

  if (error || !data)
    return Response.json({ message: "Supabase fetch error" }, { status: 500 });

  const parsed = await ParseProductTable(data);
  return Response.json({ data: parsed }, { status: 200 });
}

interface DeleteBody {
  ids: string[];
}
export async function DELETE(request: Request) {
  const { ids } = (await request.json()) as DeleteBody;
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader === "")
    return Response.json({ message: "unauthorized user" }, { status: 401 });
  const token = authHeader?.replace("Bearer ", "");

  try {
    const supabase = createClient(token);

    const data = await FetchProductByIds(ids);
    if (!data) throw Error("No products by that id");

    const productArray = data.reduce((state, item) => {
      const prodObj = {
        id: item.id as string,
        image_paths: item.image_paths,
      };
      return [...state, prodObj];
    }, [] as { id: string; image_paths: string[] }[]);

    await DeleteProductByIds(supabase, productArray);

    return Response.json({ message: "success" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
