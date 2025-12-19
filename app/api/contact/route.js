import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, message, company, startedAt } =
      await req.json();

    if (company) {
      // bot filled the honeypot
      return NextResponse.json({ ok: true }, { status: 200 }); // silently succeed
    }

    if (!startedAt || Date.now() - Number(startedAt) < 2500) {
      return NextResponse.json({ ok: true }, { status: 200 }); // silent success
    }

    // Basic anti-spam heuristics
    if (String(message).length > 3000) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const urlCount = (message.match(/https?:\/\/|www\./gi) || []).length;
    if (urlCount >= 3) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Basic validation (keep it simple for now)
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing name, email, phone, or message." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: ["nictacks@gmail.com"], // change later to Andrew's inbox
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nphone: ${phone}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
