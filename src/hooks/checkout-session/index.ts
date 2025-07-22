import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/utils/axiosInstance";

interface CheckoutData {
  priceId: string;
  customerEmail: string;
  userId: string;
}
const createCheckoutSession = async (checkoutData: CheckoutData) => {
  console.log("Creating checkout session with data:", checkoutData);
  const response = await api.post("/create-checkout-session", checkoutData);

  if (response.status !== 200) {
    throw new Error("Failed to create checkout session");
  }
  return response.data;
};
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
};

export const useFetchCheckoutInfo = (sessionId: string | null) => {
  return useQuery({
    queryKey: ["checkoutInfo", sessionId],
    enabled: !!sessionId, // Only run the query if sessionId is provided
    queryFn: async () => {
      const response = await api.get("/get-checkout-info", {
        params: { session_id: sessionId },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch checkout info");
      }
      return response.data;
    },
  });
};
