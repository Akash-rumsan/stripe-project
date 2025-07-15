import AppLayout from "@/layouts/app-layout";
import HomePage from "@/sections/home/home-page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default async function Page() {
  const supabase = await createClient();
  const id = uuidv4();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user", user);
  // if (!user) {
  //   redirect("/");
  // } else {
  //   redirect(`/dashboard`);
  // }

  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
}
