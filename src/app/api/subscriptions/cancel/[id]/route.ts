import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = await req.json();
  try {
    if (!payload.subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // Cancel subscription on Stripe (default: at period end)
    const canceledSubscription = await stripe.subscriptions.update(
      // subscriptionId,
      payload.stripeSubsId,
      { cancel_at_period_end: true }
    );
    // const canceledSubscription = await stripe.subscriptions.cancel(
    //   payload.stripeSubsId
    // );

    // const { error: supabaseError } = await supabase
    //   .from("subscriptions")
    //   .delete()
    //   .eq("id", payload.subscriptionId);
    const { error: supabaseError } = await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", payload.stripeSubsId);

    if (supabaseError) {
      console.error("Supabase update error:", supabaseError);
      return NextResponse.json(
        { error: "Supabase update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Subscription cancellation scheduled",
      subscription: canceledSubscription,
    });
  } catch (error: any) {
    console.error("Error canceling subscription:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
