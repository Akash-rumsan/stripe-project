import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateSubscription } from "./types";
import { useToast } from "../use-toast";
import api from "@/utils/axiosInstance";

export const useFetchSubscriptions = (user_id: string | undefined) => {
  return useQuery({
    queryKey: ["subscriptions", user_id],
    enabled: !!user_id, // Only run the query if email is provided
    queryFn: async () => {
      const response = await api.get("/subscriptions", {
        params: { user_id }, // Pass user_id as a query parameter
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch subscriptions");
      }
      return response.data;
    },
  });
};

const deleteSubscription = async (payload: {
  stripeSubsId: string;
  subscriptionId: string;
}) => {
  const response = await api.post(
    `/subscriptions/cancel/${payload.stripeSubsId}`,
    {
      stripeSubsId: payload.stripeSubsId,
      subscriptionId: payload.subscriptionId,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete subscription");
  }
  return response.data;
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
      });
      toast({
        title: "Subscription deleted successfully",
        description: "Your subscription has been deleted.",
      });
      console.log("Subscription deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting subscription:", error);
    },
  });
};

const updateSubscription = async (payload: UpdateSubscription) => {
  const response = await api.post(`/subscriptions/${payload.id}`, {
    email: payload.email,
    newPriceId: payload.newPriceId,
    subId: payload.id, // Include subscription ID if needed
  });
};
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
      });
      toast({
        title: "Subscription updated successfully",
        description: "Your subscription has been updated.",
      });
      console.log("Subscription updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating subscription:", error);
    },
  });
};
