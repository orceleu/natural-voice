import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
const endpointSecret =
  "whsec_4776402dd66d977d463c3a5e20708000ee5bc49a7bb524d1d6765eeda1b7f520";

export async function GET(req: NextApiRequest) {
  //const { text, language, clean_voice } = await req.json();

  return NextResponse.json({ output: " output" });
}

export async function POST(req: NextApiRequest) {
  const playload = await req.body;
  //get the plan id

  const subscriptionId = playload.resource.id;
  console.log(subscriptionId);

  return NextResponse.json({ output: " post req received" });
}
const addEndDate = async (planId: string) => {
  try {
    await updateDoc(doc(db, "usersPlan", planId), {
      end_date: Date.now(),
    });

    console.log("great! .");
  } catch (e) {
    console.error("Error:", e);
  }
};
