import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://n8n-wwfb.onrender.com/webhook/66536b6f-5973-49e0-a8b3-abe85b1041aa";

interface QuoteRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  description: string;
}

async function sendToWebhook(data: QuoteRequest) {
  const { firstName, lastName, phone, email, description } = data;

  const payload = {
    type: "quote_request",
    firstName,
    lastName,
    phone,
    email,
    description,
    timestamp: new Date().toISOString(),
    to: "fgiroux@logipret.ca",
    replyTo: email,
    subject: `Nouvelle demande de soumission - ${firstName} ${lastName}`,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Webhook failed with status: ${response.status}`);
    } else {
      console.log(`Quote webhook sent for ${firstName} ${lastName}`);
    }
  } catch (error) {
    console.error("Error sending to webhook:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json();
    const { firstName, lastName, phone, email, description } = body;

    if (!firstName || !lastName || !phone || !email || !description) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format de courriel invalide" },
        { status: 400 },
      );
    }

    // Await the webhook to ensure it completes
    await sendToWebhook(body);

    return NextResponse.json(
      { message: "Demande envoyee avec succes" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la demande" },
      { status: 500 },
    );
  }
}
