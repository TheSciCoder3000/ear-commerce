import { FetchUserProducts, ParseProductTable } from "@/lib/products/fetch";

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
