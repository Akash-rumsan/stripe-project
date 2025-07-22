export interface UpdateSubscription {
  id: string;
  email: string;
  newPriceId: string;
}
export interface Subscription {
  id: string;
  customer_email: string;
  stripe_price_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}
