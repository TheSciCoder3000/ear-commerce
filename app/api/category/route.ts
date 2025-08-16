import { createClient } from "@/lib/supabase/client";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from("category").select();

  if (error)
    return Response.json({ message: "Supabase error" }, { status: 500 });

  return Response.json({ message: "success", data }, { status: 200 });
}
