"use client";

import { Rocket, CreditCard, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { usePaymentPlanContext } from "@/context/PaymentPlanContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import AddProductDialog from "../payment-plans/add-product-dialog";
import { useCreatePaymentPlan } from "@/hooks/paymentPlans";
import CardSkeleton from "./CardSkeleton";

export default function HomePage() {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showCards, setShowCards] = useState(false);

  const { mutate: createPlan, isPending: isCreatingPlan } =
    useCreatePaymentPlan();

  const router = useRouter();

  const { paymentPlans, isPending: isLoadingPlans } = usePaymentPlanContext();
  const { subscriptions, isPending: isLoadingSubscriptions } = useAppContext();

  // Direct data checks
  const hasPlans = paymentPlans && !isLoadingPlans;
  const hasSubscriptions = subscriptions && !isLoadingSubscriptions;

  const handleChoosePlans = () => {
    router.push("/dashboard/plans");
  };

  const handleViewSubscriptions = () => {
    router.push("/dashboard/subscriptions");
  };

  const handleAddProduct = (product: any) => {
    createPlan(product, {
      onSettled: () => {
        setIsAddProductDialogOpen(false);
      },
    });
  };

  // Use transition to defer card rendering until data is ready
  useEffect(() => {
    if (hasPlans || hasSubscriptions) {
      startTransition(() => {
        setShowCards(true);
      });
    }
  }, [hasPlans, hasSubscriptions]);

  useEffect(() => {
    if (paymentPlans?.length === 0) {
      setIsAddProductDialogOpen(true);
    }
  }, [paymentPlans]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header - Always visible */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-6">
            Welcome to Mefqna
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Manage your subscriptions and explore our powerful API plans
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {!showCards ? (
            // Show skeletons while transitioning
            <>
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              {/* Choose Plans Card */}
              {hasPlans && (
                <Card
                  className={`shadow-2xl border-0 bg-white/95 dark:bg-slate-800/95 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer ${
                    isPending ? "opacity-70" : "opacity-100"
                  }`}
                  onClick={handleChoosePlans}
                >
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <Rocket className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      Choose Plans
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                      Explore our API plans and find the perfect fit for your
                      project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {paymentPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                        >
                          <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {plan.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            ${plan.amount}/mo
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      onClick={handleChoosePlans}
                      disabled={isPending}
                    >
                      View All Plans
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* My Subscriptions Card */}
              {hasSubscriptions && (
                <Card
                  className={`shadow-2xl border-0 bg-white/95 dark:bg-slate-800/95 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer ${
                    isPending ? "opacity-70" : "opacity-100"
                  }`}
                  onClick={handleViewSubscriptions}
                >
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-3xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <CreditCard className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      My Subscriptions
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                      Manage your active subscriptions and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {subscriptions?.length || 0}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Active Plans
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          $ 60
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Monthly Total
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Update payment methods</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>View billing history</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Cancel subscriptions</span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      disabled={isPending}
                    >
                      Manage Subscriptions
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Need help getting started? Our support team is here to assist you.
          </p>
          <div className="flex justify-center gap-8 text-sm text-slate-500 dark:text-slate-500">
            <span>✓ 14-day free trial</span>
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>

        <AddProductDialog
          open={isAddProductDialogOpen}
          onOpenChange={setIsAddProductDialogOpen}
          onAddProduct={handleAddProduct}
          isCreatingPlan={isCreatingPlan}
        />
      </div>
    </div>
  );
}
