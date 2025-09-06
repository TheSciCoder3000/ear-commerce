import { CreateOrder } from "@/lib/order";
import { getTokenizedClient } from "@/lib/utils";
import Stripe from "stripe";

export async function POST(request: Request) {
  const apiKey = process.env.STRIPE_PRIVATE_KEY;
  if (!apiKey)
    return Response.json({ message: "missing api key" }, { status: 500 });

  const serverUrl = process.env.SERVER_URL;
  if (!serverUrl)
    return Response.json({ message: "no server url" }, { status: 404 });

  const { items } = (await request.json()) as ICheckoutBody;
  if (!items || items.length < 1)
    return Response.json({ message: "empty cart items" }, { status: 500 });

  let order: IDbFullOrder;
  try {
    const supabase = getTokenizedClient(request);
    order = await CreateOrder(supabase, items);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return Response.json(
        {
          message: `Error in checkout create order: ${e.message}`,
        },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "unknown Error in create order" },
      { status: 500 }
    );
  }

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
      success_url: `${serverUrl}/`,
      cancel_url: `${serverUrl}/`,
      metadata: {
        data: JSON.stringify({
          order_id: order.id,
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
