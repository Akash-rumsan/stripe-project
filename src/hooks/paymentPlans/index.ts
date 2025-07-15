import { useQuery } from "@tanstack/react-query";

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
