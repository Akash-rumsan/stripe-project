import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
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
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }
  console.log(event.type, "Webhook event type");
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
    console.log("Subscription created:", subscription);
    console.log(invoice, "Invoice from webhook");
    // ✅ get user_id from metadata
    const userId = subscription.metadata.user_id;

    console.log(userId, "user from webhook");
    // if (invoice.status === "paid" && customerEmail) {
    //   try {
    //     await stripe.invoices.sendInvoice(invoice.id!);
    //     console.log(` Invoice ${invoice.id} sent to ${customerEmail}`);
    //   } catch (emailError) {
    //     console.error("Failed to send invoice email:", emailError);
    //     // Don't fail the webhook for email errors
    //   }
    // }
    const { error } = await supabase.from("subscriptions").insert({
      plan_name: products.name,
      user_id: userId,
      amount: Number(subscription.items.data[0].price.unit_amount) / 100,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: customerId,
      stripe_product_id: products.id,
      stripe_price_id: subscription.items.data[0].price.id,
      customer_email: customerEmail,
      status: subscription.status,
      current_period_start: new Date(invoice.period_start * 1000), // store as timestamp
      current_period_end: new Date(invoice.lines.data[0].period.end * 1000), // store as timestamp
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Supabase insert failed" },
        { status: 500 }
      );
    }
    console.log("✅ Subscription stored in Supabase");
  }

  return Response.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
