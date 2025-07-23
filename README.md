# Stripe Project Integration README

This guide explains how to set up, configure, and integrate Stripe payments and subscriptions in this project.

## Table of Contents

1. [Stripe Setup](#1-stripe-setup)
   - [Install Stripe Packages](#11-install-stripe-packages)
   - [Get Your API Keys](#12-get-your-api-keys)
2. [Create Products and Prices in Stripe](#2-create-products-and-prices-in-stripe)
3. [Implement Stripe Checkout](#3-implement-stripe-checkout)
   - [Create Checkout Session API Route](#31-create-checkout-session-api-route)
4. [Handle Stripe Webhooks](#4-handle-stripe-webhooks)
   - [Setup Webhook Endpoint](#41-setup-webhook-endpoint)
5. [Environment Configuration](#5-environment-configuration)
6. [Install Dependencies](#6-install-dependencies)
7. [Stripe Integration](#7-stripe-integration)
   - [API Endpoint](#api-endpoint)
   - [Example Request](#example-request)
   - [Example Response](#example-response)
   - [Payment Methods Supported](#payment-methods-supported)
   - [Success & Cancel URLs](#success--cancel-urls)
8. [Running the Project](#8-running-the-project)
9. [Stripe Webhooks (Local Testing)](#9-stripe-webhooks-local-testing)
10. [Invoice Email Delivery in Stripe (Sandbox vs Live Mode)](#10-invoice-email-delivery-in-stripe-sandbox-vs-live-mode)
11. [Error Handling](#11-error-handling)
12. [Useful Links](#12-useful-links)

## 1.Stripe Setup

### 1.1. Install Stripe Packages

```bash
pnpm add @stripe/stripe-js @stripe/react-stripe-js
pnpm add -D stripe
```

### 1.2. Get Your API Keys

- Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
- Navigate to **Developers → API keys**
- Copy the **Publishable key** and **Secret key** for both **test** and **live** modes

Store these in `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 2. Create Products and Prices in Stripe

- Go to **Stripe Dashboard → Products**
- Create product(s) like `Basic Plan`, `Pro Plan`, etc.
- Add **pricing tiers** (monthly, yearly) as needed
- Each pricing tier generates a **Price ID**, which is used in the code

## 3.Implement Stripe Checkout

### 3.1. Create Checkout Session API Route

`/app/api/create-checkout-session/route.ts`:

```ts
import { stripe } from "@/lib/stripe"; // helper to init Stripe with secret key
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { priceId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return NextResponse.json({ url: session.url });
}
```

## 4. Handle Stripe Webhooks

### 4.1. Setup Webhook Endpoint

Use this route: `/api/stripe/webhook`

Verify Stripe signature and handle events like:

- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.created`

Stripe sends data to this endpoint when something billing-related happens.

## 5.Environment Configuration

Create a `.env.local` file in the project root and add the following variables:

```env
# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

> **Note:** To test Stripe webhooks locally, run:
>
> ```bash
> stripe listen --forward-to localhost:3000/api/webhooks/stripe
> ```
>
> This will generate your `STRIPE_WEBHOOK_SECRET`.

## 6. Install Dependencies

```bash
yarn install
# or
npm install
```

## 7.Stripe Integration

### API Endpoint

- **File:** `route.ts`
- **Method:** POST
- **Purpose:** Creates a Stripe Checkout Session for subscriptions or payments

### Example Request

```json
{
  "priceId": "price_12345",
  "customerEmail": "user@example.com",
  "userId": "user_abc"
}
```

### Example Response

```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### Payment Methods Supported

- Card
- US Bank Account
- Amazon Pay

### Success & Cancel URLs

- **Success:** `/dashboard/success?session_id={CHECKOUT_SESSION_ID}`
- **Cancel:** `/dashboard/cancel`

## 8. Running the Project

Visit [http://localhost:3000](http://localhost:3000).

## 9. Stripe Webhooks (Local Testing)

To test webhooks locally:

1. Run the Stripe CLI listener:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

2. Copy the generated webhook secret to your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

## 10. Invoice Email Delivery in Stripe (Sandbox vs Live Mode)

While developing and testing Stripe integration, it's possible to create and preview invoice email templates. However, Stripe's sandbox (test) environment does not send actual invoice or receipt emails to customers. This functionality is only available when using live API keys.

> ⚠️ **Note:** To fully test email delivery (like invoice or receipt emails), you must switch to live mode and use real customer email addresses.

## 11. Error Handling

- Stripe errors are logged to the server console
- API returns `{ error: "Something went wrong" }` with status 500 on failure

## 12. Useful Links

- [Stripe Documentation](https://stripe.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

For additional support or questions, please refer to the project documentation or contact the development team.
