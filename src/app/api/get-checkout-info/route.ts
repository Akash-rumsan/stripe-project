import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const subscriptionId = session.subscription as string;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const item = subscription.items.data[0];
    const price = item.price;
    const product = await stripe.products.retrieve(price.product as string);

    return NextResponse.json({
      productName: product.name,
      amount: (price.unit_amount || 0) / 100,
      interval: price.recurring?.interval,
      customerEmail: session.customer_email,
      transactionId: subscription.id,
      //   nextBilling: new Date(subscription.current_period_end * 1000),
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to fetch session info" },
      { status: 500 }
    );
  }
}
