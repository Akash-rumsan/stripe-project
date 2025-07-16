import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // or "payment"
      line_items: [
        {
          price: body.priceId, // Use the price ID from the request body
          quantity: 1,
        },
      ],
      customer_email: body.customerEmail, // Use the email from the request body
      success_url: `${req.nextUrl.origin}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/dashboard/cancel`,
    });
    console.log("Stripe session created:", session);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
