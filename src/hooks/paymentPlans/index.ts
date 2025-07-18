import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useFetchPaymentPlans = () => {
  return useQuery({
    queryKey: ["paymentPlans"],
    queryFn: async () => {
      const response = await fetch("/api/payment-plans");
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      return response.json();
    },
  });
};
const createPaymentPlan = async (planData: any) => {
  const response = await fetch("/api/create-plans", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(planData),
  });

  if (!response.ok) {
    throw new Error("Failed to create payment plan");
  }

  return response.json();
};

export const useCreatePaymentPlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createPaymentPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentPlans"] });
      toast({
        title: "Payment Plan Created",
        description: "Your payment plan has been created successfully.",
      });
    },
  });
};
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: async (checkoutData: {
      priceId: string;
      customerEmail: string;
    }) => {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      return response.json();
    },
  });
};
