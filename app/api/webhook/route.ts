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

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;
  const endpointSecret =
    "whsec_4776402dd66d977d463c3a5e20708000ee5bc49a7bb524d1d6765eeda1b7f520";

  //console.log(`body:${body}`);
  let event: Stripe.Event;
  try {
    if (!sig || !endpointSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    //console.log(event.id);
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
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
    case "checkout.session.completed": {
      const subscription = event.data.object;
      const subscriptionId = subscription.id;
      const customerId = subscription.customer as string;
      const userId = subscription.metadata?.userId as string;
      console.log(userId);

      console.log(`Subscription ID: ${subscriptionId}`);
      addCustomerSub_Id(subscriptionId, customerId, userId);
      /*const response1 = await db
        .insert(OrderTable)
        .values({
          userId: checkoutSessionCompleted?.metadata.userId,
          itemCount: 1,
          total: checkoutSessionCompleted?.amount_total as any,
          isComplete: true,
        })
        .returning();*/ break;
    }

    case "customer.subscription.deleted":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;

      break;
    case "customer.subscription.paused":
      const checkoutSessionCompleted: any = event.data.object;

      break;
    default:
    // console.log(`Unhandled event type ${event.type}`);
    //customer.subscription.resumed
    //customer.subscription.updated
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
