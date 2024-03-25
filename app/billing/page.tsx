"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  ReactPayPalScriptOptions,
  getScriptID,
  destroySDKScript,
  PayPalMessages,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
//import googlepay from '@paypal/googlepay-components'
export default function Billing() {
  //secret: EHJu3f2e_krcmRT-dVmVkjmN3LLIksgIDsORtuebjym3hgvGPczJD9eggDg_isb9DcfMdgqOnsRFCRu1
  //client id:AYUz6PJaJRmYWImq2oPBnPZPpGC7lYb6e729pLHW3J4bQ8zo9nidGQJMIbctio-XMvovPYX9QzvKUgxf
  const [status, setStatus] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const initialOptions: any = {
    "client-id":
      "ATZl5eLAOWOORW9XV8ZBo5YRhjn0j7k34UmfHmXgXVZ2QU-DYVaNnB7jqxarzFYpGkvapgPuqrVkafc5",
    "enable-funding": "card",

    "data-sdk-integration-source": "integrationbuilder_sc",
    vault: "true",
    intent: "subscription",
  };
  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const accessToken =
        "access_token$sandbox$bjxnzxfq5ypgwfkp$746af76a7dad1bd9ca60a9caa35e0116 ";
      const subscriptionId = "I-P6X59NWRHW8B";
      try {
        const response = await axios.get(
          `https://api-m.sandbox.paypal.com/v1/billing/subscription/${subscriptionId}`,
          {
            headers: {
              Authorization: `Basic ATZl5eLAOWOORW9XV8ZBo5YRhjn0j7k34UmfHmXgXVZ2QU-DYVaNnB7jqxarzFYpGkvapgPuqrVkafc5:EJkD4x7jUJe-QvQhvAGjOLToIQOEFQ9zXGAPcmIMVK8GejY9BL6lb7I3Ud2O9yE7ys5Ddye63NL3h3KO`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Subscription status:", response.data.status);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    getSubscriptionStatus();
  }, []);
  return (
    <div>
      <p className="text-2xl font-semibold  text-center my-10">pay with </p>
      <div className="flex justify-center mt-11">
        <PayPalScriptProvider options={initialOptions}>
          <ButtonWrapper type="subscription" />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
const ButtonWrapper = ({ type }: any) => {
  const router = useRouter();
  const [{ options, isInitial, isPending, isResolved, isRejected }, dispatch] =
    usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  function onCurrencyChange({ target: { value } }: any) {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  }
  console.log(` is pending :${isPending}`);

  return (
    <>
      {isPending ? (
        <LoaderIcon />
      ) : (
        <PayPalButtons
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: "P-86S718199T297924TMX654VA",
              application_context: {
                shipping_preference: "NO_SHIPPING",
                return_url: "http://localhost:3000/billing",
                cancel_url: "http://localhost:3000/dashboard",
                payment_method: {
                  payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
                },
              },
            });
          }}
          onApprove={(data, action) => {
            console.log(data.subscriptionID);
            alert(" subscribtion success");
            router.push("/dashboard");
            return Promise.resolve();
          }}
          onError={(err) => {
            console.log(err);

            return Promise.resolve();
          }}
          style={{
            color: "white",
            label: "pay",
            shape: "pill",
          }}
          displayOnly={["vaultable"]}
        />
      )}
    </>
  );
};
