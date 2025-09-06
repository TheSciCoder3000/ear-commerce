import { RemoveCartItem, GetCartItems, InsertCartItem } from "@/lib/cart";
import { getTokenizedClient } from "@/lib/utils";

export async function GET(request: Request) {
  const supabase = await getTokenizedClient(request);
  const { error: userError } = await supabase.auth.getUser();

  if (userError)
    return Response.json(
      { message: "error in retrieving user data" },
      { status: 500 }
    );

  const data = await GetCartItems(supabase);

  return Response.json({ carts: data });
}

interface PostData {
  product: IProduct;
  userId: string;
  value: number;
}

export async function POST(request: Request) {
  const supabase = await getTokenizedClient(request);
  const { product, userId, value } = (await request.json()) as PostData;

  try {
    const cartData: IDbCart = {
      user_id: userId,
      product_id: product.id,
      count: value,
    };
    const data = await InsertCartItem(supabase, cartData);
    return Response.json({ ...data });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return Response.json(
        { message: "error in inserting cart" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: Request) {
  const supabase = await getTokenizedClient(request);
  const { product, userId, value } = (await request.json()) as PostData;

  try {
    const cartData: IDbCart = {
      user_id: userId,
      product_id: product.id,
      count: value,
    };
    const data = await RemoveCartItem(supabase, cartData);

    if (data)
      return Response.json({ method: "decrement", data }, { status: 200 });
    return Response.json({ method: "remove", data: null });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return Response.json(
        { message: "error in inserting cart" },
        { status: 500 }
      );
    }
  }
}
