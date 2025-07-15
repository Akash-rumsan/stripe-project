"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoPlaceholder from "@/components/ui/logo-placeholder";
import { CustomFormMessage, Message } from "@/components/ui/form-message";

import { SubmitButton } from "@/components/ui/submit-button";
import { signIn } from "./actions";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const params = useSearchParams();
  const searchParams: Message = Object.fromEntries(params.entries());

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <LogoPlaceholder companyName="Rumsan AI" />
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                {Object.keys(searchParams).length > 0 && (
                  <CustomFormMessage message={searchParams} />
                )}
                <SubmitButton
                  className="w-full"
                  pendingText="Signing in..."
                  formAction={signIn}
                >
                  Login
                </SubmitButton>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?&nbsp;
                <Link
                  href="/auth/register"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
