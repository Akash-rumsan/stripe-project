"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z.string().length(6, { message: "OTP must be exactly 6 digits." }),
});

export async function verifyOTP(formData: z.infer<typeof schema>) {
  const validatedFields = schema.safeParse({
    email: formData.email,
    otp: formData.otp,
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email: formData.email,
    token: formData.otp,
    type: "email",
  });

  if (error) {
    return redirect(
      `/auth/otp-verification?email=${
        formData.email
      }&error=${encodeURIComponent(error.message)}`
    );
  }

  return redirect("/dashboard");
}
