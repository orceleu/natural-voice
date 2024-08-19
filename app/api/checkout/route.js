//import { stripe } from "@/app/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { NextResponse } from "next/server";

// pages/api/stripe/subscription.ts
const stripe = new Stripe(
  "sk_test_51OpACQHMq3uIqhfsV1UgHf7wnUXqJVB2OqsI4CIPPnwfNGQJDiXyASrIr9FBKSKi9zFM384gtwbchxvPGCMmnBrM00Bfs91kOz",
  {
    apiVersion: "2024-04-10",
    typescript: true,
  }
);

export async function POST(req) {
  // Create or update subscription
  const { price_Id, user_Id, customer_Email } = await req.json();

  console.log(price_Id);
  console.log(user_Id);
  console.log(customer_Email);
  /* const subscription = await stripe.subscriptions.create({
    customer: "cus_QARIKwkbeUgpGB",
    items: [{ price: "price_1PFdXUHMq3uIqhfsb82b423Q" }],
  });*/
  /* const subscription = await stripe.subscriptions.cancel(
    'sub_1MlPf9LkdIwHu7ixB6VIYRyX'
  );*/

  /* const subscription = await stripe.subscriptions.update(
    "sub_1PK6t7HMq3uIqhfsKx6p8UIj",
    {
      metadata: {
        order_id: "6735",
      },
    }
  );*/
  /* const subscription = await stripe.subscriptions.retrieve(
    "sub_1PK6t7HMq3uIqhfsKx6p8UIj"
  );*/
  //afficher le sub_njfkjg_ID
  /* const subscriptions = await stripe.subscriptions.list({
    customer: "cus_QAloUZ421YjV6C",
  });
  const subscriptionIds = subscriptions.data.map(
    (subscription) => subscription.id
  );
  console.log(`Subscriptions:, ${subscriptionIds}`);

  */
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        price: `${price_Id}`, // Remplacez par l'ID de votre prix
        quantity: 1,
      },
    ],
    metadata: {
      userId: `${user_Id}`,
    },
    mode: "subscription",
    success_url: "https://natural-voice.vercel.app/checkout/success",
    cancel_url: "https://natural-voice.vercel.app/checkout/cancel",
    customer_email: customer_Email,
  });
  return NextResponse.json({ session: `${session.url}` });
}
