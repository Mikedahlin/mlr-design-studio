import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 20;
const MAX_MESSAGE_LENGTH = 2000;
const rateLimitStore = new Map<string, number[]>();

const SYSTEM_PROMPT = `You are the Buselmeier Legal AI, the website assistant for Buselmeier Law PA, a criminal defense and personal injury firm in Buffalo, MN, led by attorney Ted Buselmeier (20 years of Minnesota practice). You answer questions about the firm and about Minnesota criminal defense, DWI/DUI defense, and personal injury claims.

Rules:
- Be concise, direct, and grounded. Do not invent case results, verdicts, or settlement figures beyond what is public.
- You may share general legal information about Minnesota law (e.g., DWI process, statute of limitations, rights after arrest), but always note you are not a lawyer and this is not legal advice.
- If asked something outside your role or you do not know, say so honestly and suggest calling (763) 682-1324 for a free consultation.
- Keep answers under 180 words unless more detail is genuinely needed.
- Format with short paragraphs and, when useful, bullet points. Never use markdown headings.`;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(ip) ?? []).filter(
    (t) => t > windowStart
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

type Provider = "groq" | "gemini" | "openai";

function detectProvider(): Provider | null {
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.OPENAI_API_KEY) return "openai";
  return null;
}

async function callProvider(
  provider: Provider,
  message: string
): Promise<string> {
  if (provider === "groq") {
    const key = process.env.GROQ_API_KEY!;
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.4,
      }),
    });
    if (!res.ok) throw new Error(`Groq error ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? "";
  }

  if (provider === "gemini") {
    const key = process.env.GEMINI_API_KEY!;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: SYSTEM_PROMPT },
                { text: `User question: ${message}` },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.4,
          },
        }),
      }
    );
    if (!res.ok) throw new Error(`Gemini error ${res.status}`);
    const data = await res.json();
    const parts: { text?: string }[] = data?.candidates?.[0]?.content?.parts ?? [];
    return parts.map((p) => p.text ?? "").join("");
  }

  const key = process.env.OPENAI_API_KEY!;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.4,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

export async function POST(req: NextRequest) {
  if (isRateLimited(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let message: string;
  try {
    const body = await req.json();
    message = typeof body?.message === "string" ? body.message.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json(
      { error: "Missing required field: message" },
      { status: 400 }
    );
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Message too long" },
      { status: 400 }
    );
  }

  const provider = detectProvider();
  if (!provider) {
    console.error(
      "[chat] No AI provider configured. Set GROQ_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY."
    );
    return NextResponse.json(
      { error: "AI assistant is not configured on this deployment." },
      { status: 503 }
    );
  }

  try {
    const response = await callProvider(provider, message);
    if (!response) {
      return NextResponse.json(
        { error: "The AI assistant returned an empty response." },
        { status: 502 }
      );
    }
    return NextResponse.json({ response });
  } catch (error) {
    console.error("[chat] Provider request failed:", error);
    return NextResponse.json(
      { error: "The AI assistant is temporarily unavailable." },
      { status: 502 }
    );
  }
}
