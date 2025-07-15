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

import { SubmitButton } from "./ui/submit-button";
import { signIn } from "@/app/auth/login/actions";

export function LoginForm() {
  return (
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
