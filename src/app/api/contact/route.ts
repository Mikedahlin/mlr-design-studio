import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(ip) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getDeliveryConfig() {
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || process.env.GMAIL_USER;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;

  if (smtpHost && smtpUser && smtpPass && recipient) {
    return {
      mode: "smtp" as const,
      recipient,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
    };
  }

  if (gmailUser && gmailPass && recipient) {
    return {
      mode: "gmail" as const,
      recipient,
      gmailUser,
      gmailPass,
    };
  }

  if (resendKey && resendFrom && recipient) {
    return {
      mode: "resend" as const,
      recipient,
      resendKey,
      resendFrom,
    };
  }

  return {
    mode: "unconfigured" as const,
    missing: [
      "CONTACT_RECIPIENT_EMAIL",
      "SMTP_HOST + SMTP_USER + SMTP_PASS (or GMAIL_USER + GMAIL_APP_PASSWORD, or RESEND_API_KEY + RESEND_FROM_EMAIL)",
    ],
  };
}

export async function GET() {
  const cfg = getDeliveryConfig();
  return NextResponse.json({
    configured: cfg.mode !== "unconfigured",
    missing: cfg.mode === "unconfigured" ? cfg.missing : [],
  });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  if (isRateLimited(getClientIp(req))) {
    return NextResponse.json(
      { error: "Too many transmissions. Please wait a few minutes." },
      { status: 429 }
    );
  }

  // Silent reject for automated honeypot fills
  if (honeypot) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (!name || name.length > 120) {
    return NextResponse.json(
      { error: "Please provide a valid Name (1–120 characters)." },
      { status: 400 }
    );
  }

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid Email address." },
      { status: 400 }
    );
  }

  if (!message || message.length < 2 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please provide a Message (2–5000 characters)." },
      { status: 400 }
    );
  }

  const cfg = getDeliveryConfig();
  if (cfg.mode === "unconfigured") {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error:
          "Email delivery service is not configured in this environment. Set CONTACT_RECIPIENT_EMAIL along with SMTP_HOST / SMTP_USER / SMTP_PASS (or GMAIL_USER / GMAIL_APP_PASSWORD) in .env.local or Vercel environment variables.",
        missing: cfg.missing,
      },
      { status: 200 }
    );
  }

  const plainText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const htmlBody = `
    <div style="font-family: monospace; background: #05080c; color: #f1f5f9; padding: 24px; border: 1px solid #1e293b;">
      <p style="margin: 0 0 8px;"><strong>NAME:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 16px;"><strong>EMAIL:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;"><strong>MESSAGE:</strong></p>
      <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    if (cfg.mode === "resend") {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfg.resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: cfg.resendFrom,
          to: [cfg.recipient],
          reply_to: email,
          subject: `ML&R ASSETS — Inquiry from ${name}`,
          text: plainText,
          html: htmlBody,
        }),
      });
      if (!res.ok) {
        throw new Error(`Resend HTTP ${res.status}`);
      }
    } else {
      const transporter =
        cfg.mode === "gmail"
          ? nodemailer.createTransport({
              service: "gmail",
              auth: { user: cfg.gmailUser, pass: cfg.gmailPass },
            })
          : nodemailer.createTransport({
              host: cfg.smtpHost,
              port: cfg.smtpPort,
              secure: cfg.smtpPort === 465,
              auth: { user: cfg.smtpUser, pass: cfg.smtpPass },
            });

      const senderAddress = cfg.mode === "gmail" ? cfg.gmailUser : cfg.smtpUser;
      await transporter.sendMail({
        from: `"ML&R ASSETS" <${senderAddress}>`,
        to: cfg.recipient,
        replyTo: email,
        subject: `ML&R ASSETS — Inquiry from ${name}`,
        text: plainText,
        html: htmlBody,
      });
    }

    return NextResponse.json({ success: true, configured: true });
  } catch (err) {
    console.error("[mlrassets/contact] Delivery error:", err);
    return NextResponse.json(
      { error: "Unable to dispatch message through the configured mail transport." },
      { status: 500 }
    );
  }
}
