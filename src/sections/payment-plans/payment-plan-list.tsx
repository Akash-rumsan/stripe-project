"use client";

import { Zap, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Checkout from "./Checkout";
import { useState } from "react";
import { usePaymentPlanContext } from "@/context/PaymentPlanContext";
import AddProductDialog from "./add-product-dialog";
import { useCreatePaymentPlan } from "@/hooks/paymentPlans";
import { useRouter } from "next/navigation";

export default function PaymentPlans() {
  const router = useRouter();
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const { paymentPlans, isPending } = usePaymentPlanContext();
  const { mutate: createPlan, isPending: isCreatingPlan } =
    useCreatePaymentPlan();

  const handleBackToHome = () => {
    router.push("/dashboard"); // Navigate back to the home page
  };
  const handleAddProduct = (product: any) => {
    createPlan(product, {
      onSettled: () => {
        setIsAddProductDialogOpen(false);
      },
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-6">
            Choose Your Mefqna Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Scale your projects with our flexible pricing options. Start small
            and grow as your needs evolve.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 mt-8"
            onClick={() => setIsAddProductDialogOpen(true)}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Plans
          </Button>
        </div>

        {/* Pricing Cards */}
        {paymentPlans?.length === 0 && !isPending ? (
          <div className="  text-center py-16  mx-auto">
            <div className="mx-auto mb-8 p-8 bg-slate-100 dark:bg-slate-800 rounded-full w-fit">
              <Plus className="h-16 w-16 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              No Plans Available Yet
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed  max-w-2xl mx-auto">
              You haven't created any subscription plans yet. Start by adding
              your first product to offer to your customers. Once you create
              products, they'll appear here as subscription options.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Create your first product plan to get started with subscriptions
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {paymentPlans?.map((plan, index) => (
              <Card
                key={plan.name}
                className={
                  "relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 "
                }
              >
                {
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600">
                    Most Popular
                  </Badge>
                }

                <CardHeader className="text-center pb-8">
                  <div className={"mx-auto mb-4 p-3 rounded-full "}>
                    <Zap className="h-6 w-6" />,
                  </div>
                  <CardTitle className="text-2xl font-bold capitalize">
                    {plan.name.replace("-", " ")}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">${plan.amount}</span>
                    <span className="text-slate-600 dark:text-slate-400">
                      /month
                    </span>
                  </div>
                </CardHeader>

                <CardFooter className="pt-6">
                  <Checkout plan={plan} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {
          <AddProductDialog
            open={isAddProductDialogOpen}
            onOpenChange={setIsAddProductDialogOpen}
            onAddProduct={handleAddProduct}
            isCreatingPlan={isCreatingPlan}
          />
        }
      </div>
    </div>
  );
}
