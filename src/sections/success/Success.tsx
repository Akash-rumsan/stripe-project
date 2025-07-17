"use client";

import {
  CheckCircle,
  Download,
  Mail,
  ArrowRight,
  Sparkles,
  CreditCard,
  Hash,
  User,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface SuccessPageProps {
  productName?: string;
  amount?: number;
  interval?: string;
  customerEmail?: string;
  transactionId?: string;
  nextBilling?: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SuccessPageProps | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/get-checkout-info?session_id=${sessionId}`
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching checkout info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Something went wrong.</p>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatProductName = (name: string) => {
    return name.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="mb-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        {/* Success Header */}
        <div className="text-center mb-16">
          <div className="mx-auto mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full w-fit shadow-xl">
            <CheckCircle className="h-20 w-20 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Payment Successful! 🎉
          </h1>
          <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Mefqna
            </span>
            ! Your subscription is now active and ready to use.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Purchase Summary */}
          <Card className="shadow-2xl mb-12 border-0 bg-white/95 dark:bg-slate-800/95">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-fit">
                <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Purchase Summary
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                Here are the details of your subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Product & Billing */}
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                    <Badge
                      variant="secondary"
                      className="mb-3 text-lg px-4 py-2"
                    >
                      {formatProductName(
                        data?.productName || "Default Product"
                      )}
                    </Badge>
                    <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      ${data.amount}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-lg">
                      per {data.interval}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          Next Billing
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {formatDate(data.nextBilling || "2024-02-15")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Account & Transaction */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          Account Email
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {data.customerEmail}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Hash className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          Transaction ID
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 font-mono text-sm">
                          {data.transactionId}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          Payment Status
                        </div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Getting Started */}
            <Card className="shadow-xl border-0 bg-white/95 dark:bg-slate-800/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <ArrowRight className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  Getting Started
                </CardTitle>
                <CardDescription className="text-base">
                  Everything you need to begin using Mefqna
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400 mt-1">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">
                        Check Your Email
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        API keys and setup guide sent to {data.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-600 dark:text-purple-400 mt-1">
                      <Download className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">
                        Access Dashboard
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Your account is ready to use right now
                      </p>
                    </div>
                  </div>
                </div>
                <Link href={"/dashboard"}>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="shadow-xl border-0 bg-white/95 dark:bg-slate-800/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  Resources
                </CardTitle>
                <CardDescription className="text-base">
                  Learn and get support for your new subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="lg"
                  >
                    <Download className="mr-3 h-4 w-4" />
                    Documentation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="lg"
                  >
                    <Mail className="mr-3 h-4 w-4" />
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="lg"
                  >
                    <Sparkles className="mr-3 h-4 w-4" />
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Receipt Notice */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-700/50">
            <CardContent className="text-center py-8">
              <div className="mx-auto mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-full w-fit">
                <Mail className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                Receipt Sent
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                A detailed receipt has been sent to{" "}
                <strong>{data.customerEmail}</strong>. You can manage your
                subscription anytime from your dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
