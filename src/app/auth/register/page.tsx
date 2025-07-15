"use client";

import { Suspense } from "react";
import Register from './register'


export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    );
}
