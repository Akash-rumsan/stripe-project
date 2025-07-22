import { Button } from "@/components/ui/button";
import React from "react";
import { LoaderCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useUpdateSubscription } from "@/hooks/subscriptions";
import { useToast } from "@/hooks/use-toast";
import { useCreateCheckoutSession } from "@/hooks/checkout-session";
import { useRouter } from "next/navigation";

export default function Checkout({ plan }: any) {
  const { user, subscriptions } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: createCheckoutSession, isPending } =
    useCreateCheckoutSession();

  const { mutate: updateSubscription, isPending: updatingSubscription } =
    useUpdateSubscription();
  const handleCheckout = async () => {
    if (subscriptions && subscriptions.length > 0) {
      if (plan.stripe_price_id === subscriptions[0].stripe_price_id) {
        toast({
          title: "Already Subscribed",
          description: "You are already subscribed to this plan.",
        });
        return;
      }
      updateSubscription({
        id: subscriptions[0]?.id,
        email: user.email!,
        newPriceId: plan.stripe_price_id,
      });
    } else {
      createCheckoutSession(
        {
          priceId: plan.stripe_price_id,
          customerEmail: user.email!,
          userId: user?.id!,
        },
        {
          onSuccess: (data) => {
            if (data.url) {
              router.push(data.url);
            } else {
              console.error("Checkout error:", data);
            }
          },
        }
      );
    }
  };
  // const handleCheckout = () => {
  //   startTransition(() => {
  //     if (data && data.length > 0) {
  //       if (plan.stripe_price_id === data[0].stripe_price_id) {
  //         toast({
  //           title: "Already Subscribed",
  //           description: "You are already subscribed to this plan.",
  //         });
  //         return;
  //       }
  //       updateSubscription({
  //         id: data[0].id,
  //         email: user.email!,
  //         newPriceId: plan.stripe_price_id,
  //       });
  //     } else {
  //       createCheckoutSession(
  //         {
  //           priceId: plan.stripe_price_id,
  //           customerEmail: user.email!,
  //           userId: user?.id!,
  //         },
  //         {
  //           onSuccess: (data) => {
  //             if (data.url) {
  //               router.push(data.url);
  //             } else {
  //               console.error("Checkout error:", data);
  //             }
  //           },
  //         }
  //       );
  //     }
  //   });
  // };
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
