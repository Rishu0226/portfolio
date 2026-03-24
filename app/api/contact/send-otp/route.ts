import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a hash to send to the client
    // We sign email + otp to verify it later in the contact route without needing a database
    const secret = process.env.OTP_SECRET || "fallback_default_secret_key_change_me_in_prod";
    const hash = crypto.createHash("sha256").update(`${email}:${otp}:${secret}`).digest("hex");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Security" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your Verification Code: ${otp}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:580px;margin:auto;background:#050a14;color:#e8f0fe;border-radius:12px;overflow:hidden;padding:32px">
          <h2 style="margin:0 0 16px;font-size:22px">Verify your email</h2>
          <p style="color:#7a90b8;line-height:1.7">Use the following 6-digit code to complete sending your message from the portfolio contact form:</p>
          <div style="margin-top:28px;padding:16px;background:#0f1c38;border-radius:8px;text-align:center">
            <h1 style="margin:0;letter-spacing:4px;color:#00d4ff">${otp}</h1>
          </div>
          <p style="margin-top:28px;color:#7a90b8;font-size:13px">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, hash });
  } catch (err) {
    console.error("OTP send error:", err);
    return NextResponse.json({ error: "Failed to send OTP. Please check your email or try again." }, { status: 500 });
  }
}
