"use client";
import { createContext, ReactNode, useContext } from "react";

import { PaymentPlan } from "@/hooks/paymentPlans/types";
import { useFetchPaymentPlans } from "@/hooks/paymentPlans";

interface PaymentPlanContextType {
  paymentPlans: PaymentPlan[];
  isPending: boolean;
}
const PaymentPlanContext = createContext<PaymentPlanContextType | undefined>(
  undefined
);

export const PaymentPlanProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isPending } = useFetchPaymentPlans();

  return (
    <PaymentPlanContext.Provider value={{ paymentPlans: data, isPending }}>
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
