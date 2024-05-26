import Stripe from "stripe";
export const stripe = new Stripe(
  "sk_test_51OpACQHMq3uIqhfsV1UgHf7wnUXqJVB2OqsI4CIPPnwfNGQJDiXyASrIr9FBKSKi9zFM384gtwbchxvPGCMmnBrM00Bfs91kOz",
  {
    apiVersion: "2024-04-10",
    typescript: true,
  }
);
