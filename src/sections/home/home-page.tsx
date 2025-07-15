"use client";

import {
  Rocket,
  CreditCard,
  ArrowRight,
  Users,
  Zap,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HomePageProps {
  activeSubscriptions?: number;
  totalSpent?: number;
}

export default function HomePage({
  activeSubscriptions = 3,
  totalSpent = 60,
}: HomePageProps) {
  const handleChoosePlans = () => {
    window.location.href = "/plans";
  };

  const handleViewSubscriptions = () => {
    window.location.href = "/subscriptions";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
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
          {/* Choose Plans Card */}
          <Card
            className="shadow-2xl border-0 bg-white/95 dark:bg-slate-800/95 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
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
                Explore our API plans and find the perfect fit for your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Light
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    $10/mo
                  </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                  <Rocket className="h-6 w-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Pro
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    $20/mo
                  </div>
                  <Badge className="text-xs mt-1 bg-blue-500">Popular</Badge>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Crown className="h-6 w-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Premium
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    $30/mo
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Compare all features</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Cancel anytime</span>
                </div>
              </div>

              <Button className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg group-hover:shadow-xl transition-all duration-300">
                View All Plans
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* My Subscriptions Card */}
          <Card
            className="shadow-2xl border-0 bg-white/95 dark:bg-slate-800/95 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
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
                    {activeSubscriptions}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Active Plans
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${totalSpent}
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

              <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 shadow-lg group-hover:shadow-xl transition-all duration-300">
                Manage Subscriptions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80">
            <CardContent className="py-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="mx-auto mb-3 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    10K+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Happy Customers
                  </div>
                </div>
                <div>
                  <div className="mx-auto mb-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit">
                    <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    99.9%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Uptime
                  </div>
                </div>
                <div>
                  <div className="mx-auto mb-3 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit">
                    <Rocket className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    1M+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    API Calls/Day
                  </div>
                </div>
                <div>
                  <div className="mx-auto mb-3 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full w-fit">
                    <Crown className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    24/7
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Support
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
      </div>
    </div>
  );
}
