import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface LogitextRequest {
  firstName: string;
  lastName: string;
  phone: string;
  hasIphone: boolean;
  hasMacbook: boolean;
}

async function sendEmail(data: LogitextRequest) {
  const { firstName, lastName, phone, hasIphone, hasMacbook } = data;

  const devices = [];
  if (hasIphone) devices.push("iPhone");
  if (hasMacbook) devices.push("MacBook");
  const devicesText = devices.length > 0 ? devices.join(", ") : "Aucun";

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "hotth@logipret.ca",
      subject: `LogiText - Nouvelle inscription: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007AFF; border-bottom: 2px solid #007AFF; padding-bottom: 10px;">
            Nouvelle inscription LogiText
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Informations du contact</h3>
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
            </table>
          </div>
          
          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Appareils Apple</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px;">iPhone:</td>
                <td style="padding: 8px 0; color: ${hasIphone ? "#30D158" : "#FF453A"};">${hasIphone ? "Oui" : "Non"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">MacBook:</td>
                <td style="padding: 8px 0; color: ${hasMacbook ? "#30D158" : "#FF453A"};">${hasMacbook ? "Oui" : "Non"}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
            Ce message a ete envoye automatiquement depuis le site LogiText.
          </p>
        </div>
      `,
      text: `
Nouvelle inscription LogiText

INFORMATIONS DU CONTACT
-----------------------
Prenom: ${firstName}
Nom: ${lastName}
Telephone: ${phone}

APPAREILS APPLE
---------------
iPhone: ${hasIphone ? "Oui" : "Non"}
MacBook: ${hasMacbook ? "Oui" : "Non"}

---
Ce message a ete envoye automatiquement depuis le site LogiText.
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `LogiText email sent successfully for ${firstName} ${lastName}`,
    );
  } catch (error) {
    console.error("Error sending LogiText email:", error);
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

    const emailPromise = sendEmail(body);

    if (
      typeof globalThis !== "undefined" &&
      "waitUntil" in
        (request as unknown as { waitUntil?: (promise: Promise<void>) => void })
    ) {
      (
        request as unknown as { waitUntil: (promise: Promise<void>) => void }
      ).waitUntil(emailPromise);
    } else {
      emailPromise.catch(console.error);
    }

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
