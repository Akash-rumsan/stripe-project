"use client";

import {
  XCircle,
  Heart,
  ArrowLeft,
  MessageCircle,
  RefreshCw,
  Mail,
  Calendar,
  HelpCircle,
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CancelPageProps {
  planName?: string;
  planPrice?: number;
  customerEmail?: string;
  cancelDate?: string;
  reason?: "payment_failed" | "user_cancelled" | "expired";
}

export default function CancelPage({
  planName = "mef-pro",
  planPrice = 20,
  customerEmail = "user@example.com",
  cancelDate = new Date().toLocaleDateString(),
  reason = "user_cancelled",
}: CancelPageProps) {
  const [feedback, setFeedback] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const router = useRouter();

  const getPageContent = () => {
    switch (reason) {
      case "payment_failed":
        return {
          title: "Payment Issue",
          subtitle: "We couldn't process your payment",
          description:
            "Don't worry - update your payment method to continue using Mefqna.",
          icon: <XCircle className="h-16 w-16 text-orange-500" />,
        };
      case "expired":
        return {
          title: "Subscription Expired",
          subtitle: "Your Mefqna subscription has ended",
          description: "Reactivate anytime to continue using all features.",
          icon: <Calendar className="h-16 w-16 text-slate-500" />,
        };
      default:
        return {
          title: "Subscription Cancelled",
          subtitle: "We're sorry to see you go",
          description:
            "Your subscription has been cancelled. You'll have access until your billing period ends.",
          icon: <Heart className="h-16 w-16 text-red-500" />,
        };
    }
  };

  const content = getPageContent();

  const cancellationReasons = [
    "Too expensive",
    "Not using it enough",
    "Missing features I need",
    "Found a better alternative",
    "Technical issues",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 p-4 bg-white dark:bg-slate-800 rounded-full w-fit shadow-lg">
            {content.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Cancellation Details */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Cancellation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Plan:
                  </span>
                  <span className="font-medium capitalize">
                    {planName.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Price:
                  </span>
                  <span className="font-medium">${planPrice}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Email:
                  </span>
                  <span className="font-medium">{customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Date:
                  </span>
                  <span className="font-medium">{cancelDate}</span>
                </div>
              </div>

              <Separator />

              {reason === "user_cancelled" && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Good news!</strong> You'll keep access to all
                    features until{" "}
                    {new Date(
                      Date.now() + 15 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                    .
                  </p>
                </div>
              )}

              {reason === "payment_failed" && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    <strong>Account Paused:</strong> Update your payment method
                    within 7 days to avoid losing access.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Options */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                What's Next?
              </CardTitle>
              <CardDescription>
                Choose how you'd like to proceed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {reason === "payment_failed" ? (
                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Update Payment Method
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    Contact Support
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    Reactivate Subscription
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                    onClick={() => router.push("/dashboard")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Pricing
                  </Button>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Need help?</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" size="sm" className="justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Live Chat
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help Center
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Miss */}
        <Card className="max-w-4xl mx-auto mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>What You'll Miss</CardTitle>
            <CardDescription>
              Features you'll lose access to when your subscription ends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="mx-auto mb-3 p-3 bg-red-100 dark:bg-red-900/20 rounded-full w-fit">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-medium mb-2">API Access</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No more API calls or integrations
                </p>
              </div>
              <div className="text-center p-4">
                <div className="mx-auto mb-3 p-3 bg-red-100 dark:bg-red-900/20 rounded-full w-fit">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-medium mb-2">Priority Support</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Back to community support only
                </p>
              </div>
              <div className="text-center p-4">
                <div className="mx-auto mb-3 p-3 bg-red-100 dark:bg-red-900/20 rounded-full w-fit">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-medium mb-2">Advanced Features</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Analytics, integrations, and more
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section - Only show for user cancellations */}
        {reason === "user_cancelled" && (
          <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>Help Us Improve</CardTitle>
              <CardDescription>
                Your feedback helps us make Mefqna better for everyone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">
                  What made you cancel?
                </Label>
                <RadioGroup
                  value={selectedReason}
                  onValueChange={setSelectedReason}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {cancellationReasons.map((reason) => (
                      <div key={reason} className="flex items-center space-x-2">
                        <RadioGroupItem value={reason} id={reason} />
                        <Label htmlFor={reason} className="text-sm">
                          {reason}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Additional feedback (optional)</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us more about your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We hope to see you back soon! Your account data will be safely
            stored for 90 days.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Questions? Contact us at support@mefqna.com
          </p>
        </div>
      </div>
    </div>
  );
}
