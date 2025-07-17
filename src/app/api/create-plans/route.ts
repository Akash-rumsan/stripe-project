// File: /pages/api/create-plan.ts

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-06-30.basil",
// });

// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.method, "Method called in create-plan API");
  if (req.method !== "POST")
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });

  try {
    const { name, amount, interval, currency, description, billingPeriod } =
      await req.json();

    // 1. Create product in Stripe
    const product = await stripe.products.create({
      name,
      description,
    });

    // 2. Create price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount, // in cents
      currency,
      recurring: {
        interval, // 'month' or 'year'
      },
    });

    // 3. Store in Supabase
    const { error } = await supabase.from("plans").insert([
      {
        name,
        description,
        stripe_product_id: product.id,
        stripe_price_id: price.id,
        amount: amount / 100,
        interval: interval,
        is_active: true,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save plan in database." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, productId: product.id, priceId: price.id },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    // res.status(500).json({ error: err.message || "Something went wrong" });
    // res.status(500).json({ error: "Something went wrong" });
  }
}
