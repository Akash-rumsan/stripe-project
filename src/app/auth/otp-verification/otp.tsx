"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LogoHolder from "@/components/ui/logo-placeholder";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { verifyOTP } from "./actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { CustomFormMessage } from "@/components/ui/form-message";

// Define schema with validation
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function InputOTPForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const error = { error: searchParams.get("error") || "" };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email || "", // Use searchParams email or fallback to an empty string
      otp: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        await verifyOTP({
          email: data.email, // Pass email from the form data
          otp: data.otp,
        });
      } catch (error) {
        console.error("Failed to verify OTP:", error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <LogoHolder companyName="Rumsan AI" />
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>One Time Password</CardTitle>
          <CardDescription>
            Please enter the OTP sent to your email.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="flex flex-col items-center justify-center">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            {Object.keys(error).length > 0 && (
              <div className="mb-4">
                <CustomFormMessage message={error} />
              </div>
            )}
            <CardFooter>
              <SubmitButton
                pendingText="Verifying..."
                className="w-full"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Verifying..." : "Verify OTP"}
              </SubmitButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
