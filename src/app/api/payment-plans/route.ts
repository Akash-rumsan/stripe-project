import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("plans").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data, { status: 200 });
}
