import { stripe } from "@/app/lib/stripe";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { user_email } = await req.json();
  //creation du customerId
  //sauvegarde dans la base de donnee  {
  // "user": "cus_QAloUZ421YjV6C"
  console.log(user_email);
  const customer = await stripe.customers.create({
    email: user_email,
  });

  return NextResponse.json({ user: `${customer.id}` });
}
