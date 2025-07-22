import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import api from "@/utils/axiosInstance";

export const useFetchPaymentPlans = () => {
  return useQuery({
    queryKey: ["paymentPlans"],

    queryFn: async () => {
      const response = await api.get("/payment-plans");
      if (response.status !== 200) {
        throw new Error("Failed to fetch plans");
      }
      return response.data;
    },
  });
};
const createPaymentPlan = async (planData: any) => {
  const response = await api.post("/create-plans", planData);
  if (response.status !== 200) {
    throw new Error("Failed to create payment plan");
  }
  return response.data;
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
