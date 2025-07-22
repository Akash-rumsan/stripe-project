import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("customer_email", email)
    .eq("status", "active");
  // const { data, error } = await supabase
  //   .from("subscriptions")
  //   .select("*, users(*)")
  //   .eq("customer_email", email)
  //   .eq("status", "active");

  if (error) {
    console.log("Error fetching subscriptions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
