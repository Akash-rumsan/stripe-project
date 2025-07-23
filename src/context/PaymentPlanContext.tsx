"use client";
import { createContext, ReactNode, useContext } from "react";

import { PaymentPlan } from "@/hooks/paymentPlans/types";
import { useFetchPaymentPlans } from "@/hooks/paymentPlans";
import api from "@/utils/axiosInstance";
import { useQueries } from "@tanstack/react-query";

interface PaymentPlanContextType {
  paymentPlans: PaymentPlan[];
  isPending: boolean;
}
const PaymentPlanContext = createContext<PaymentPlanContextType | undefined>(
  undefined
);
const fetchPaymentPlans = async () => {
  const response = await api.get("/payment-plans");
  if (response.status !== 200) {
    throw new Error("Failed to fetch payment plans");
  }
  return response.data;
};
export const PaymentPlanProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["paymentPlans"],
        queryFn: fetchPaymentPlans,
      },
    ],
  });
  const paymentPlansQuery = queries[0];
  const isPending = paymentPlansQuery.isLoading;
  const paymentPlans = paymentPlansQuery.data ?? [];
  if (paymentPlansQuery.isError) {
    console.error("Error fetching payment plans:", paymentPlansQuery.error);
  }

  return (
    <PaymentPlanContext.Provider value={{ paymentPlans, isPending }}>
      {children}
    </PaymentPlanContext.Provider>
  );
};

export const usePaymentPlanContext = () => {
  const context = useContext(PaymentPlanContext);
  if (context === undefined) {
    throw new Error(" useAppContext must be used within an AppProvider");
  }
  return context;
};
