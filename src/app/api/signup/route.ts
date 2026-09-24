import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const interest = typeof body.interest === "string" ? body.interest : "all";
    const source = typeof body.source === "string" ? body.source : "lumisanepal-coming-soon";

    // Strict email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    // Deterministic VIP identifier based on hash
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = (hash << 5) - hash + email.charCodeAt(i);
      hash |= 0;
    }
    const vipNumber = `VIP-${Math.abs(hash % 9000 + 1000)}`;

    let savedToD1 = false;
    let savedToKV = false;

    // Attempt to access Cloudflare bindings dynamically
    try {
      const { getCloudflareContext } = await import("@opennextjs/cloudflare");
      const ctx = await getCloudflareContext({ async: true });
      const env = ctx?.env as CloudflareEnv | undefined;

      // 1. Store in Cloudflare D1
      if (env?.lumisa_db) {
        try {
          await env.lumisa_db
            .prepare(
              "INSERT OR IGNORE INTO subscribers (email, created_at, source, status) VALUES (?, ?, ?, 'active')"
            )
            .bind(email, timestamp, source)
            .run();
          savedToD1 = true;
        } catch (dbErr) {
          console.error("D1 write error:", dbErr);
        }
      }

      // 2. Store in Cloudflare KV
      if (env?.LUMISA_WAITLIST) {
        try {
          const payload = JSON.stringify({
            email,
            interest,
            source,
            vipNumber,
            timestamp,
            ip: req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown",
            country: req.headers.get("cf-ipcountry") || "NP",
          });
          await env.LUMISA_WAITLIST.put(`sub:${email}`, payload);
          savedToKV = true;
        } catch (kvErr) {
          console.error("KV write error:", kvErr);
        }
      }
    } catch {
      // Local dev or non-cloudflare execution context
    }

    return NextResponse.json({
      success: true,
      message: "You're on the Lumisa guestlist. We'll email you on opening day.",
      vipNumber,
      saved: { d1: savedToD1, kv: savedToKV },
    });
  } catch (err: unknown) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { success: false, error: "Unable to process subscription right now. Please try again." },
      { status: 500 }
    );
  }
}
