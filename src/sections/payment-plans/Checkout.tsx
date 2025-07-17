import { Button } from "@/components/ui/button";
import React from "react";
import { LoaderCircle } from "lucide-react";
import { useCreateCheckoutSession } from "@/hooks/paymentPlans";
import { useAppContext } from "@/context/AppContext";
import {
  useFetchSubscriptions,
  useUpdateSubscription,
} from "@/hooks/subscriptions";
import { useToast } from "@/hooks/use-toast";

export default function Checkout({ plan }: any) {
  const { user } = useAppContext();
  const { toast } = useToast();

  const { data, isLoading, error } = useFetchSubscriptions(user.email);

  const { mutate: createCheckoutSession, isPending } =
    useCreateCheckoutSession();
  const { mutate: updateSubscription, isPending: updatingSubscription } =
    useUpdateSubscription();
  const handleCheckout = async () => {
    if (data && data.length > 0) {
      if (plan.stripe_price_id === data[0].stripe_price_id) {
        toast({
          title: "Already Subscribed",
          description: "You are already subscribed to this plan.",
        });
        // alert("You already have this plan.");
        return;
      }
      // alert("upgrade your plan");
      updateSubscription({
        id: data[0].id,
        email: user.email!,
        newPriceId: plan.stripe_price_id,
      });
    } else {
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
    }
  };

  return (
    <Button
      className={
        "w-full py-6 text-lg font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700  text-white shadow-lg hover:shadow-xl"
      }
      onClick={handleCheckout}
    >
      Buy
      {isPending || updatingSubscription ? (
        <LoaderCircle className="animate-spin " />
      ) : null}
    </Button>
  );
}
