"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/AppContext";
import {
  useDeleteSubscription,
  useFetchSubscriptions,
} from "@/hooks/subscriptions";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Crown,
  MoreVertical,
  Rocket,
  Settings,
  Trash2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";

export default function MySubscription() {
  const { user } = useAppContext();
  const [isPending, startTransition] = useTransition();

  const { data } = useFetchSubscriptions(user.email);
  const { mutate: deleteSubscription } = useDeleteSubscription();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "past_due":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case "mef-light":
        return <Zap className="h-6 w-6" />;
      case "mef-pro":
        return <Rocket className="h-6 w-6" />;
      case "mef-premium":
        return <Crown className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const handleDeleteSubscription = async (
    subscriptionId: string,
    stripeSubsId: string
  ) => {
    startTransition(() => {
      deleteSubscription({
        subscriptionId: subscriptionId,
        stripeSubsId: stripeSubsId,
      });
    });
  };

  const handleUpdateSubscription = (subscriptionId: string) => {
    console.log(`Updating subscription: ${subscriptionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href={"/dashboard"}>
            <Button
              variant="ghost"
              className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            My Subscriptions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Manage all your Mefqna subscriptions in one place
          </p>
        </div>

        {/* Active Subscriptions */}
        {data?.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Active Subscriptions
              </h2>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {data.length} Active
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((subscription: any) => (
                <Card
                  key={subscription.id}
                  className="shadow-xl border-2 border-green-200 dark:border-green-800 bg-white/95 dark:bg-slate-800/95"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                          {getPlanIcon(subscription.product_name)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold capitalize">
                            {/* {formatPlanName(subscription.product_name)} */}
                            {subscription.plan_name}
                          </h3>
                          <Badge
                            className={`${getStatusColor(
                              subscription.status
                            )} border-0 text-xs`}
                          >
                            {subscription.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateSubscription(subscription.id)
                            }
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Manage Subscription
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateSubscription(subscription.id)
                            }
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Update Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteSubscription(
                                subscription.id,
                                subscription.stripe_subscription_id
                              )
                            }
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        ${subscription.amount}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        per month
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            Next billing:{" "}
                          </span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {formatDate(subscription.current_period_end)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CreditCard className="h-4 w-4 text-slate-500" />
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            Started:{" "}
                          </span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {formatDate(subscription.current_period_start)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {data?.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 p-6 bg-slate-100 dark:bg-slate-800 rounded-full w-fit">
              <CreditCard className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              No Subscriptions Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              You don't have any subscriptions. Choose a plan to get started.
            </p>
            <Link href="/dashboard">
              <Button
                // onClick={handleBackToHome}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Choose a Plan
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
