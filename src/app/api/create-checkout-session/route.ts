import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account", "amazon_pay"],
      mode: "subscription", // or "payment"
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      customer_email: body.customerEmail,
      success_url: `${req.nextUrl.origin}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/dashboard/cancel`,
      subscription_data: {
        metadata: {
          user_id: body.userId,
        },
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
