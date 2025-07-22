import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, newPriceId, subId } = await req.json();
  try {
    const { data: subData, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("customer_email", email)
      .eq("status", "active")
      .single();

    if (error || !subData) {
      return new Response(JSON.stringify({ error: "Subscription not found" }));
    }
    const subscription = await stripe.subscriptions.retrieve(
      subData.stripe_subscription_id
    );
    const currentItemId = subscription.items.data[0].id;

    const updated = await stripe.subscriptions.update(subscription.id, {
      items: [
        {
          id: currentItemId,
          price: newPriceId,
        },
      ],
      proration_behavior: "create_prorations", // You can change to 'none'
    });

    const newPrice = await stripe.prices.retrieve(newPriceId);
    const products = await stripe.products.retrieve(newPrice.product as string);
    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        stripe_price_id: newPrice.id,
        plan_name: products.name,
        amount: Number(newPrice.unit_amount) / 100,
        updated_at: new Date().toISOString(),
        stripe_product_id: products.id,
      })
      .eq("id", subId);

    if (updateError) {
      console.error("Error updating subscription in Supabase:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update subscription in database" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ success: true, updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Subscription upgrade failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
