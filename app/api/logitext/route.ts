import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://n8n-wwfb.onrender.com/webhook/66536b6f-5973-49e0-a8b3-abe85b1041aa";

interface LogitextRequest {
  firstName: string;
  lastName: string;
  phone: string;
  hasIphone: boolean;
  hasMacbook: boolean;
}

async function sendToWebhook(data: LogitextRequest) {
  const { firstName, lastName, phone, hasIphone, hasMacbook } = data;

  const devices = [];
  if (hasIphone) devices.push("iPhone");
  if (hasMacbook) devices.push("MacBook");

  const payload = {
    type: "logitext_signup",
    firstName,
    lastName,
    phone,
    hasIphone,
    hasMacbook,
    devices: devices.join(", ") || "Aucun",
    timestamp: new Date().toISOString(),
    to: "hotth@logipret.ca",
    subject: `LogiText - Nouvelle inscription: ${firstName} ${lastName}`,
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
      console.log(`LogiText webhook sent for ${firstName} ${lastName}`);
    }
  } catch (error) {
    console.error("Error sending to webhook:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LogitextRequest = await request.json();
    const { firstName, lastName, phone } = body;

    if (!firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: "Prenom, nom et telephone sont requis" },
        { status: 400 },
      );
    }

    // Await the webhook to ensure it completes
    await sendToWebhook(body);

    return NextResponse.json(
      { message: "Inscription envoyee avec succes" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing LogiText request:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la demande" },
      { status: 500 },
    );
  }
}
