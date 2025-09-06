import { ProcessCartCheckout } from "@/lib/cart";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const header = await headers();
  const sig = header.get("stripe-signature");

  if (!sig) {
    console.error("No signature");
    return Response.json({ message: "no signature" }, { status: 404 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
    // If error is not an instance of Error, return a generic error response
    return new NextResponse("Webhook Error: Unknown error", { status: 400 });
  }

  console.log(event.type);

  // Handle event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("✅ Checkout session completed:", session.id);
    console.log("💵 Amount total:", session.amount_total);
    console.log("📧 Customer email:", session.customer_details?.email);
    console.log("🧾 Metadata:", session.metadata);

    await ProcessCartCheckout(session);

    // 👉 Update your database order here (use session.metadata.orderId if you set it)
    console.log(`\nPAYMENT RECEIVED: ${session.id}\n`);
  }

  return NextResponse.json({ received: true });
}
