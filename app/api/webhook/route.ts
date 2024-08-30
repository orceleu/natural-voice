import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/app/lib/stripe";
import { NextApiResponse } from "next";
const endpointSecret = "whsec_Ve8S1lEtc8UnL6LRxa8dCVKz5BZmZP6Q";
export async function POST(req: NextRequest, res: NextApiResponse) {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  // "whsec_4776402dd66d977d463c3a5e20708000ee5bc49a7bb524d1d6765eeda1b7f520";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    //console.log(event.id);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      {
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      },
      { status: 400 }
    );
  }

  console.log("✅ Success:", event.id);

  switch (event.type) {
    //"customer.subscription.created"
    //'payment_intent.succeeded'

    case "checkout.session.completed": {
      const subscription = event.data.object;
      const subscriptionId = subscription.subscription as string;
      const customerId = subscription.customer as string;
      const userId = subscription.metadata?.userId as string;
      // console.log(userId);
      //console.log(`Subscription ID: ${subscriptionId}`);
      /* if (!subscription) {
        return NextResponse.json(
          {
            error: "server error",
          },
          {
            status: 500,
          }
        );
      }*/
      addCustomerSub_Id(subscriptionId, customerId, userId);
      break;
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ received: true });
}

const addCustomerSub_Id = async (
  stripe_subscription_id: string,
  stripe_customer_id: string,
  userId: string
) => {
  try {
    await setDoc(doc(db, "usersPlan", userId), {
      having_plan: true,
      subscription_id: stripe_subscription_id,
      customer_id: stripe_customer_id,
      plan: "starter",
      used_char: 40000,
    });

    console.log("inseted to userPlan! .");
  } catch (e) {
    console.error("Error:", e);
  }
};
