import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface QuoteRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  description: string;
}

async function sendEmail(data: QuoteRequest) {
  const { firstName, lastName, phone, email, description } = data;

  try {
    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "fgiroux@logipret.ca",
      replyTo: email,
      subject: `Nouvelle demande de soumission - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0055FF; border-bottom: 2px solid #0055FF; padding-bottom: 10px;">
            Nouvelle demande de soumission - Site Web Logipret
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Informations du client</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px;">Prenom:</td>
                <td style="padding: 8px 0;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Nom:</td>
                <td style="padding: 8px 0;">${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Telephone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Courriel:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Description de la demande</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${description}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
            Ce message a ete envoye automatiquement depuis le site web de Logipret.
          </p>
        </div>
      `,
      text: `
Nouvelle demande de soumission - Site Web Logipret

INFORMATIONS DU CLIENT
----------------------
Prenom: ${firstName}
Nom: ${lastName}
Telephone: ${phone}
Courriel: ${email}

DESCRIPTION DE LA DEMANDE
-------------------------
${description}

---
Ce message a ete envoye automatiquement depuis le site web de Logipret.
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully for ${firstName} ${lastName}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json();
    const { firstName, lastName, phone, email, description } = body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !email || !description) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format de courriel invalide" },
        { status: 400 },
      );
    }

    // Send email in background using waitUntil - ensures completion even if user closes page
    const emailPromise = sendEmail(body);

    // Use waitUntil to keep the serverless function alive until email is sent
    // This works in Vercel/Next.js edge and serverless environments
    if (
      typeof globalThis !== "undefined" &&
      "waitUntil" in
        (request as unknown as { waitUntil?: (promise: Promise<void>) => void })
    ) {
      (
        request as unknown as { waitUntil: (promise: Promise<void>) => void }
      ).waitUntil(emailPromise);
    } else {
      // Fallback: fire and forget (email still sends, just no guarantee if serverless times out)
      emailPromise.catch(console.error);
    }

    // Return success immediately - don't wait for email
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
