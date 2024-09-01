import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  "sk_test_51OpACQHMq3uIqhfsV1UgHf7wnUXqJVB2OqsI4CIPPnwfNGQJDiXyASrIr9FBKSKi9zFM384gtwbchxvPGCMmnBrM00Bfs91kOz",
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);
export async function POST(req) {
  const { subscriptionId } = await req.json();

  const subscription = cancelSubscriptionAtPeriodEnd(subscriptionId);

  return NextResponse.json({
    data: `Abonnement annulé à la fin de la période: ${formatDate(
      (await subscription).current_period_end
    )}`,
  });
}
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
async function cancelSubscriptionAtPeriodEnd(subscriptionId) {
  // Mettre à jour l'abonnement pour annuler à la fin de la période de facturation
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true, // Annulation différée
  });

  console.log("Subscription updated:", subscription);
  return subscription;
}
