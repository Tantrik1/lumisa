import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawContact = typeof body.contact === "string" 
      ? body.contact.trim() 
      : typeof body.email === "string" 
      ? body.email.trim() 
      : "";
    const source = typeof body.source === "string" ? body.source : "lumisanepal-offer";

    // Validate either valid email OR valid phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneClean = rawContact.replace(/[\s\-\(\)\.]/g, "");
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    const isEmail = emailRegex.test(rawContact);
    const isPhone = phoneRegex.test(phoneClean);

    if (!rawContact || (!isEmail && !isPhone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address or phone number." },
        { status: 400 }
      );
    }

    const contact = isEmail ? rawContact.toLowerCase() : phoneClean;
    const timestamp = new Date().toISOString();

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
            .bind(contact, timestamp, source)
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
            contact,
            type: isEmail ? "email" : "phone",
            source,
            timestamp,
            ip: req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown",
            country: req.headers.get("cf-ipcountry") || "NP",
          });
          await env.LUMISA_WAITLIST.put(`sub:${contact}`, payload);
          savedToKV = true;
        } catch (kvErr) {
          console.error("KV write error:", kvErr);
        }
      }
    } catch {
      // Local development fallback
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list! Use code LUMISA10 for 10% off your first order on opening day.",
      code: "LUMISA10",
      saved: { d1: savedToD1, kv: savedToKV },
    });
  } catch (err: unknown) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { success: false, error: "Unable to process right now. Please try again." },
      { status: 500 }
    );
  }
}
