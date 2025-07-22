import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, newPriceId } = await req.json();
  try {
    const { data: subData, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("customer_email", email)
      .contains("status", "canceled")
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
        product_name: products.name,
        price: Number(newPrice.unit_amount) / 100,
        updated_at: new Date().toISOString(),
      })
      .eq("customer_email", email);

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
