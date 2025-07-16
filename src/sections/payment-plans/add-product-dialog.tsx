"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct?: (product: {
    name: string;
    description: string;
    amount: number;
    currency: string;
    // interval: string;
    interval: string;
  }) => void;
}

export default function AddProductDialog({
  open,
  onOpenChange,
  onAddProduct,
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    currency: "USD",
    interval: "month",
    // billingPeriod: "Monthly",
  });
  const [errors, setErrors] = useState({
    name: false,
    amount: false,
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        description: "",
        amount: "",
        currency: "USD",
        interval: "month",
        // billingPeriod: "Monthly",
      });
      setErrors({ name: false, amount: false });
    }
  }, [open]);

  const handleSubmit = () => {
    const newErrors = {
      name: !formData.name.trim(),
      amount: !formData.amount || Number.parseFloat(formData.amount) <= 0,
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.amount) {
      onAddProduct?.({
        name: formData.name,
        description: formData.description,
        amount: Number.parseFloat(formData.amount),
        currency: formData.currency,
        interval: formData.interval,
        // billingPeriod: formData.billingPeriod,
      });

      // Close dialog
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Add a product
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Name (required)
            </Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Name of the product or service, visible to customers.
            </p>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: false });
              }}
              className={
                errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
              }
              placeholder="Enter product name"
            />
            {errors.name && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Name is required.</span>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description
            </Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Appears at checkout, on the customer portal, and in quotes.
            </p>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter product description"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-medium">
              Amount (required)
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => {
                    setFormData({ ...formData, amount: e.target.value });
                    if (errors.amount) setErrors({ ...errors, amount: false });
                  }}
                  className={`pl-8 ${
                    errors.amount
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  placeholder="0.00"
                />
              </div>
              <Select
                value={formData.currency}
                onValueChange={(value) =>
                  setFormData({ ...formData, currency: value })
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.amount && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Amount is required and must be greater than 0.</span>
              </div>
            )}
          </div>

          {/* Billing Period Field */}
          <div className="space-y-2">
            <Label htmlFor="billing-period" className="text-base font-medium">
              Billing period
            </Label>
            <Select
              value={formData.interval}
              onValueChange={(value) =>
                setFormData({ ...formData, interval: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
