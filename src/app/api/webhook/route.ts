import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // Needed for webhook signature verification
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;

    const subscriptionId = invoice.parent?.subscription_details
      ?.subscription as string;
    const customerEmail = invoice.customer_email as string | null;
    const customerId = invoice.customer as string;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const products = await stripe.products.retrieve(
      subscription.items.data[0].price.product as string
    );
    const { error } = await supabase.from("subscriptions").insert({
      product_name: products.name,
      price: Number(subscription.items.data[0].price.unit_amount) / 100,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: customerId,
      stripe_price_id: subscription.items.data[0].price.id,
      customer_email: customerEmail,
      status: subscription.status,
      ends_at: new Date(invoice.lines.data[0].period.end * 1000), // store as timestamp
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Supabase insert failed" },
        { status: 500 }
      );
    }
    console.log("✅ Subscription stored in Supabase");
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
