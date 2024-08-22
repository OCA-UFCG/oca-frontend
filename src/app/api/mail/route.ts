import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const password = process.env.NEXT_PUBLIC_MAIL_APP_PASS;
    const from = process.env.NEXT_PUBLIC_MAIL_APP_USER;
    const to = process.env.NEXT_PUBLIC_MAIL_APP_TO;

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
      cc: email,
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
