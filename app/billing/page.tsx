"use client";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeft,
  CheckCircleIcon,
  LoaderIcon,
  LockIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { auth } from "@/app/firebase/config";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { db } from "../firebase/config";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckCircledIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
export default function Billing() {
  const router = useRouter();
  const [havingPlan, setHavingPlan] = useState(false);
  const userId = useRef("");
  const [user, setUser] = useState<User | null>(null);
  const useremail = useRef<string | null>("");
  const selected_plan = useRef("");

  const [clickedBase, setClickedBase] = useState(false);
  const [clickedPro, setClickedPro] = useState(false);
  const [clickedPremium, setClickedpremium] = useState(false);

  const fetchPost = async () => {
    const docRef = doc(db, "usersPlan", userId.current);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //cus_id.current = docSnap.data().having_plan as string;
      setHavingPlan(true);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("no plan setup!");
      setHavingPlan(false);
    }
  };

  useEffect(() => {
    if (userId.current !== "") {
      fetchPost();
      // console.log(userId);
    }
  }, [userId.current]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const name = currentUser?.displayName;
        const uiid = currentUser?.uid;
        const userEmail = currentUser?.email;
        userId.current = uiid;
        useremail.current = userEmail;
        console.log(currentUser?.displayName);
        console.log(uiid);
      }
      if (currentUser == null) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [user]);

  async function selectPlan(
    price_id: string,

    stripeCustomerEmail: string,
    userId: string
  ) {
    console.log(price_id);

    await axios
      .post("/api/checkout", {
        price_Id: price_id,
        user_Id: userId,
        customer_Email: stripeCustomerEmail,
      })
      .then((res) => {
        console.log(res.data);

        router.push(`${res.data.session}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const addPlan = async (
    firebaseUserId: string,
    stripeCustomerEmail: string
  ) => {
    selectPlan(selected_plan.current, stripeCustomerEmail, firebaseUserId);
    /* const docRef = doc(db, "users", firebaseUserId); // replace with firebase auth ID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const cus_id = docSnap.data().cus_id as string;

     
    }*/
    // addCusId("");
  };
  /* async function addCusId(cus_id: string) {
    try {
      await setDoc(doc(db, "users", userId.current), {
        cus_id: cus_id,
      });

      console.log("inserted to users! .");
      if (useremail.current !== null && useremail.current !== "") {
        selectPlan(selected_plan.current, cus_id, useremail.current,userId.current);
      } else {
        console.log("user email null!!");
        router.push("/login");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  }*/

  /*async function createCustomerId(email: string) {
    //cree un stripe customerId  a partir de l'email

    console.log(email);
    await axios
      .post("/api/createUser", { email_user: email })
      .then((res) => {
        console.log(res.data.user);
        cus_id.current = res.data.user as string;
        // addPlan(userId.current, cus_id.current);
        addCusId(cus_id.current);
        //selectPlan(selected_plan.current, cus_id.current);
      })
      .catch((error) => {
        console.log(error);
      });
  }*/
  return (
    <>
      <Button
        onClick={() => router.back()}
        className="fixed top-5 start-5"
        variant="outline"
      >
        <ArrowBigLeft />
      </Button>
      <div className="mx-10 md:mx-[100px]">
        <p className="text-3xl mt-[200px]">
          Pricing
          <span>{havingPlan ? <>(you already have a plan)</> : null}</span>
        </p>
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
              <Button
                className="bg-emerald-600 hover:bg-emerald-500"
                onClick={() => {
                  setClickedBase(true);
                  setHavingPlan(true);
                  selected_plan.current = "price_1Pp8vvHMq3uIqhfsUZwVE60I";
                  if (useremail.current !== null && useremail.current !== "") {
                    addPlan(userId.current, useremail.current);
                  }
                }}
                disabled={havingPlan}
              >
                {clickedBase ? (
                  <>
                    <p>
                      Processing...
                      <LockIcon className="h-5 w-5 " />
                    </p>
                  </>
                ) : (
                  <p>Select</p>
                )}
              </Button>
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
              <Button
                className="bg-emerald-600 hover:bg-emerald-500"
                onClick={() => {
                  setClickedPro(true);
                  setHavingPlan(true);
                  selected_plan.current = "price_1Pp8vvHMq3uIqhfsUZwVE60I";
                  if (useremail.current !== null && useremail.current !== "") {
                    addPlan(userId.current, useremail.current);
                  }
                }}
                disabled={havingPlan}
              >
                {clickedPro ? (
                  <>
                    <p>
                      Processing...
                      <LockIcon className="h-5 w-5 " />
                    </p>
                  </>
                ) : (
                  <p>Select</p>
                )}
              </Button>
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
              <Button
                className="bg-emerald-600 hover:bg-emerald-500"
                onClick={() => {
                  setClickedpremium(true);
                  setHavingPlan(true);
                  selected_plan.current = "price_1Pp8vvHMq3uIqhfsUZwVE60I";
                  if (useremail.current !== null && useremail.current !== "") {
                    addPlan(userId.current, useremail.current);
                  }
                }}
                disabled={havingPlan}
              >
                {clickedPremium ? (
                  <>
                    <p>
                      Processing...
                      <LockIcon className="h-5 w-5 " />
                    </p>
                  </>
                ) : (
                  <p>Select</p>
                )}
              </Button>
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
    </>
  );
}
