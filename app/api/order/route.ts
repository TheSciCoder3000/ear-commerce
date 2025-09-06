import { GetAllOrders } from "@/lib/order";
import { getTokenizedClient } from "@/lib/utils";

export async function GET(request: Request) {
  const supabase = getTokenizedClient(request);

  try {
    const orders = await GetAllOrders(supabase);
    return Response.json({ orders }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return Response.json(
        { message: `Error in fetching orders: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json({ message: "Unknown error" }, { status: 500 });
  }
}
