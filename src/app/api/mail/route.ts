import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const password = process.env.NEXT_PUBLIC_MAIL_APP_PASS;
const from = process.env.NEXT_PUBLIC_MAIL_APP_USER;
const to = process.env.NEXT_PUBLIC_MAIL_APP_TO;
const cc = process.env.NEXT_PUBLIC_MAIL_APP_CC;
const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: "POST",
      },
    );

    const data = await response.json();

    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);

    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, captchaToken } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!captchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 },
      );
    }

    const isValidCaptcha = await verifyRecaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: from,
        pass: password,
      },
    });

    await transporter.sendMail({
      from: from,
      to: to,
      cc: [email, cc],
      subject: `Nova mensagem de ${name}`,
      text: message,
    });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
