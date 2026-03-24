import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to Rishabh
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL || "rishabhdubey104@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject || "New Contact Request"} — from ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:580px;margin:auto;background:#050a14;color:#e8f0fe;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#00d4ff,#7b5ea7);padding:3px"></div>
          <div style="padding:32px">
            <h2 style="margin:0 0 24px;font-size:20px;color:#00d4ff">New Message from Portfolio</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#7a90b8;width:90px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#7a90b8">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#00d4ff">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#7a90b8">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ""}
              ${subject ? `<tr><td style="padding:8px 0;color:#7a90b8">Subject</td><td style="padding:8px 0">${subject}</td></tr>` : ""}
            </table>
            <div style="margin-top:20px;padding:16px;background:#0f1c38;border-radius:8px;border-left:3px solid #00d4ff">
              <p style="margin:0;color:#7a90b8;font-size:12px;margin-bottom:8px">MESSAGE</p>
              <p style="margin:0;line-height:1.7">${message.replace(/\n/g, "<br/>")}</p>
            </div>
          </div>
          <div style="padding:16px 32px;border-top:1px solid rgba(0,212,255,0.1);font-size:12px;color:#7a90b8">
            Sent from rishabhdubey.dev portfolio contact form
          </div>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Rishabh Dubey" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:580px;margin:auto;background:#050a14;color:#e8f0fe;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#00d4ff,#7b5ea7);padding:3px"></div>
          <div style="padding:32px">
            <h2 style="margin:0 0 16px;font-size:22px">Hey ${name}! 👋</h2>
            <p style="color:#7a90b8;line-height:1.7">Thanks for getting in touch. I've received your message and will get back to you within 24 hours.</p>
            <p style="color:#7a90b8;line-height:1.7">In the meantime, feel free to check out my work on <a href="https://github.com/Rishu0226" style="color:#00d4ff">GitHub</a> or connect on <a href="https://linkedin.com/in/er-rishabh-dubey-64b73b1a1" style="color:#00d4ff">LinkedIn</a>.</p>
            <div style="margin-top:28px;padding:16px;background:#0f1c38;border-radius:8px">
              <p style="margin:0;font-size:13px;color:#7a90b8">Your message:</p>
              <p style="margin:8px 0 0;font-style:italic;color:#a0b4d0">"${message.slice(0, 200)}${message.length > 200 ? "…" : ""}"</p>
            </div>
            <p style="margin-top:28px;color:#e8f0fe;font-weight:600">— Rishabh Dubey</p>
            <p style="color:#7a90b8;font-size:13px">Frontend Engineer · React &amp; Next.js</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
