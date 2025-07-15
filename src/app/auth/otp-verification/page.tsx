"use client";
import { Suspense } from "react";
import OTPVerification from './otp'

export default function Page() {
  

  return (
    <Suspense>
      <OTPVerification/>
    </Suspense>
  );
}
