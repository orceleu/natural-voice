import { NextApiRequest, NextApiResponse } from "next";
import paypal from "@paypal/checkout-server-sdk";

// Configurer l'environnement PayPal

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const subscriptionId = req.body.subscriptionId; // Obtenez l'ID de l'abonnement à annuler depuis le corps de la requête

      const request = new paypal.subscriptions.SubscriptionCancelRequest(
        subscriptionId
      );
      const response = await request.cancel();

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur est survenue lors de l'annulation de l'abonnement",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Méthode non autorisée");
  }
}
