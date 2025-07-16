import { Button } from "@/components/ui/button";
import React from "react";
import { LoaderCircle } from "lucide-react";
import { useCreateCheckoutSession } from "@/hooks/paymentPlans";
import { useAppContext } from "@/context/AppContext";

export default function Checkout({ plan }: any) {
  const { user } = useAppContext();
  const { mutate: createCheckoutSession, isPending } =
    useCreateCheckoutSession();
  const handleCheckout = async () => {
    createCheckoutSession(
      {
        priceId: plan.stripe_price_id, // Replace with your actual price ID
        customerEmail: user.email!,
      },
      {
        onSuccess: (data) => {
          if (data.url) {
            window.location.href = data.url;
          } else {
            console.error("Checkout error:", data);
          }
        },
      }
    );
  };

  return (
    <Button
      className={
        "w-full py-6 text-lg font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700  text-white shadow-lg hover:shadow-xl"
      }
      onClick={handleCheckout}
    >
      Buy {plan.name}
      {isPending ? <LoaderCircle className="animate-spin " /> : null}
    </Button>
  );
}
