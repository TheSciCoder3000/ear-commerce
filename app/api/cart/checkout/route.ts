import { DeleteCartItem } from "@/lib/cart";
import { CreateOrder } from "@/lib/order";
import { getTokenizedClient } from "@/lib/utils";

export async function POST(request: Request) {
  const supabase = getTokenizedClient(request);
  const { cart } = (await request.json()) as { cart?: ICartResponse[] };

  if (!cart)
    return Response.json(
      { message: "Error json body has no cart items" },
      { status: 400 }
    );

  try {
    const order = await CreateOrder(supabase, cart);

    await DeleteCartItem(
      supabase,
      cart.map((item) => item.id)
    );

    return Response.json({ order }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return Response.json(
        { message: `Error in creating order: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json({ message: "Unknown Error" }, { status: 500 });
  }
}
