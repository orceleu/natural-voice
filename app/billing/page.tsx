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
import { CheckCircleIcon, LoaderIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons";
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
      <div className="mx-10 md:mx-[100px]">
        <p className="text-3xl mt-[200px]">Pricing</p>
        <div className=" grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          <Card className=" max-w-sm mt-9">
            <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
              Starter
            </p>
            <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
              8$/month
            </p>
            <Separator className="my-4" />
            <ul className="text-lg font-thin text-center mb-4">
              <li>
                <div className="flex justify-center">
                  <p className="font-semibold">
                    New content creators, students
                  </p>
                </div>
              </li>
              <li>
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />
                  40,000 char/Month
                </div>
              </li>
              <li>
                {" "}
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />5 custom voice
                </div>{" "}
              </li>
              <li>
                {" "}
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />
                  commercial use
                </div>
              </li>
            </ul>
            <div className="flex justify-center">
              <PayPalScriptProvider options={initialOptions}>
                <ButtonWrapperStarter type="subscription" />
              </PayPalScriptProvider>
            </div>
            <br />
            <div className="flex justify-center">
              <CheckCircleIcon className="my-auto" />
              <p className="text-green-700 font-extrabold mx-1">
                cancel any time
              </p>
            </div>
            <br />
          </Card>

          <Card className=" max-w-sm mt-9">
            <div className="w-full bg-stone-100 h-[55px] rounded-t-md">
              <br />
              <p className="text-center font-semibold"> Most popular*</p>
            </div>
            <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
              Pro
            </p>
            <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
              22$/month
            </p>
            <Separator className="my-4" />
            <ul className="text-lg font-thin text-center mb-4">
              <li>
                <div className="flex justify-center">
                  <p className="font-semibold">Content creators, freelancers</p>
                </div>
              </li>
              <li>
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />
                  100,000 char/Month
                </div>
              </li>
              <li>
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />
                  15 custom voice
                </div>
              </li>
              <li>
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />
                  commercial use
                </div>
              </li>
            </ul>
            <div className="flex justify-center">
              <PayPalScriptProvider options={initialOptions}>
                <ButtonWrapperPro type="subscription" />
              </PayPalScriptProvider>
            </div>
            <br />
            <div className="flex justify-center">
              <CheckCircleIcon className="my-auto" />
              <p className="text-green-700 font-extrabold mx-1">
                cancel any time
              </p>
            </div>
            <br />
          </Card>

          <Card className=" max-w-sm mt-9">
            <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
              Entreprise
            </p>
            <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
              50$/month
            </p>
            <Separator className="my-4" />
            <ul className="text-lg font-thin text-center mb-4">
              <li>
                <p className="font-semibold">
                  Corporations, public entities, agencies, MCNs
                </p>
              </li>
              <li>
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" /> 250,000
                  char/Month
                </div>
              </li>
              <li>
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />
                  30 custom voice
                </div>
              </li>
              <li>
                <div className="flex justify-center">
                  <CheckCircledIcon className="my-auto mr-2" />
                  commercial use
                </div>
              </li>
            </ul>
            <div className="flex justify-center">
              <PayPalScriptProvider options={initialOptions}>
                <ButtonWrapperEnterprise type="subscription" />
              </PayPalScriptProvider>
            </div>
            <br />
            <div className="flex justify-center">
              <CheckCircleIcon className="my-auto" />
              <p className="text-green-700 font-extrabold mx-1">
                cancel any time
              </p>
            </div>
            <br />
          </Card>
        </div>
      </div>
      <div className="mx-[50px] md:mx-[100px] mt-[300px] mb-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
              How do I make my own AI voice?
            </AccordionTrigger>
            <AccordionContent className="md:text-xl text-gray-500 ">
              To create your own AI voice at SpeechLab, go to the setting,
              upload your best quality voice and select it. Voice Design allows
              you to customize the speaker s identityfor unique voices in your
              scripts, while Voice Cloning mimics real voices. This ensures
              variety and exclusivity in your generated voices, as they are
              entirely artificial and not linked to real people.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
              How much does using SpeechLab AI voice generator cost?
            </AccordionTrigger>
            <AccordionContent className="md:text-xl text-gray-500">
              The Starter Plan is $8 per month, offering 40,000 characters and
              up to 5 custom voices. the pro plan is 22$/month and offering
              100,000 characters and up to 15 voices.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
              Can I use SpeechLab AI voice generator for free?
            </AccordionTrigger>
            <AccordionContent className="md:text-xl text-gray-500">
              No,with this model we are unable to offer free plan
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
              How many languages does SpeechLab support?
            </AccordionTrigger>
            <AccordionContent className="md:text-xl text-gray-500">
              SpeechLab support 12 language for the moment
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
              What is an AI voice generator?
            </AccordionTrigger>
            <AccordionContent className="md:text-xl text-gray-500">
              SpeechLab AI voice generator transforms text to spoken audio that
              sounds like a natural human voice, complete with realistic
              intonation and accents. It offers a wide range of voice options
              across various languages and dialects. Designed for ease of use,
              it caters to both individuals and businesses looking for
              customizable vocal outputs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
              How do I use AI voice generators to turn text into audio?
            </AccordionTrigger>
            <AccordionContent className="md:text-xl text-gray-500">
              Step 1 involves selecting a voice and adjusting settings to your
              liking. In Step 2, you input your text into the provided box,
              ensuring it s in one of the supported languages. For Step 3, you
              simply click send iconButton to convert your text into audio,
              listen to the output. After that, you can download the audio for
              use in your project.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
const ButtonWrapperStarter = ({ type }: any) => {
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

const ButtonWrapperPro = ({ type }: any) => {
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
            color: "blue",
            label: "pay",
            shape: "pill",
          }}
          displayOnly={["vaultable"]}
        />
      )}
    </>
  );
};

const ButtonWrapperEnterprise = ({ type }: any) => {
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
            color: "gold",
            label: "pay",
            shape: "pill",
          }}
          displayOnly={["vaultable"]}
        />
      )}
    </>
  );
};
