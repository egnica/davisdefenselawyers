import { Resend } from "resend";
import { NextResponse } from "next/server";



export async function POST(req) {
  try {
    const { name, email, phone, message, company, startedAt } =
      await req.json();

    if (company) {
      // bot filled the honeypot
      return NextResponse.json({ ok: true, accepted: false }, { status: 200 }); // silently succeed
    }

    if (!startedAt || Date.now() - Number(startedAt) < 2500) {
      return NextResponse.json({ ok: true, accepted: false }, { status: 200 }); // silent success
    }

    // Basic anti-spam heuristics
    if (String(message || "").length > 3000) {
      return NextResponse.json({ ok: true, accepted: false }, { status: 200 });
    }

    const urlCount = (String(message || "").match(/https?:\/\/|www\./gi) || []).length;
    if (urlCount >= 3) {
      return NextResponse.json({ ok: true, accepted: false }, { status: 200 });
    }

    // Basic validation (keep it simple for now)
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing name, email, phone, or message." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service is unavailable. Please call or text Andrew directly." }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error: sendError } = await resend.emails.send({
      from: `${name} via Website <contact@davisdefenselawyers.com>`,
      to: ["andrew.davis@davisdefenselawyers.com"],
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nphone: ${phone}\n\nMessage:\n${message}`,
    });

    if (sendError || !data?.id) {
      console.error("Contact email delivery request failed:", sendError);
      return NextResponse.json({ error: "Your message could not be sent. Please call or text Andrew directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, accepted: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Your message could not be sent. Please call or text Andrew directly." },
      { status: 500 },
    );
  }
}
