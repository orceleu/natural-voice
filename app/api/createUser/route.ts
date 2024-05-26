import { stripe } from "@/app/lib/stripe";
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

export async function GET(req: NextApiRequest) {
  //creation du customerId
  //sauvegarde dans la base de donnee  {
  // "user": "cus_QAloUZ421YjV6C"

  const customer = await stripe.customers.create({
    email: "ozone1717@gmail.com",
  });
  return NextResponse.json({ user: `${customer.id}` });
}
