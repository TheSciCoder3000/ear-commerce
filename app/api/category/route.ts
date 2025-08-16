import { FetchCategories } from "@/lib/category/fetch";

export async function GET() {
  const [data, error] = await FetchCategories();

  if (error)
    return Response.json({ message: "Supabase error" }, { status: 500 });

  return Response.json({ message: "success", data }, { status: 200 });
}
