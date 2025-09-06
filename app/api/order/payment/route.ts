import { GetFullOrder } from "@/lib/order";
import { getTokenizedClient } from "@/lib/utils";
import Stripe from "stripe";

export async function POST(request: Request) {
  const apiKey = process.env.STRIPE_PRIVATE_KEY;
  if (!apiKey)
    return Response.json({ message: "missing api key" }, { status: 500 });

  const serverUrl = process.env.SERVER_URL;
  if (!serverUrl)
    return Response.json({ message: "no server url" }, { status: 404 });

  const { order_id } = (await request.json()) as { order_id: string };
  if (!order_id)
    return Response.json({ message: "empty cart items" }, { status: 500 });

  const supabase = await getTokenizedClient(request);

  const fullOrder = await GetFullOrder(supabase, order_id);
  const items = fullOrder.order_item;

  try {
    const stripe = new Stripe(apiKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.count,
        };
      }),
      success_url: `${serverUrl}/user/order`,
      cancel_url: `${serverUrl}/user/order`,
      metadata: {
        data: JSON.stringify({
          order_id: order_id,
        } as WebhookParsedMetadata),
      },
    });

    return Response.json({ url: session.url } as IcheckoutResponse, {
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error)
      return Response.json(
        { message: `failed to process payment: ${e.message}` },
        { status: 500 }
      );
  }
}
