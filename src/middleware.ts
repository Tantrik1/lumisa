import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host") || "";

  // Auto-redirect HTTP to HTTPS in production (exclude localhost and LAN IP addresses)
  if (
    proto === "http" &&
    !host.includes("localhost") &&
    !host.includes("127.0.0.1") &&
    !host.startsWith("192.168.") &&
    !host.startsWith("10.") &&
    !host.startsWith("172.")
  ) {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl.toString(), 301);
  }

  const response = NextResponse.next();

  // Add HSTS and security headers
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images
     */
    "/((?!_next/static|_next/image|images/|favicon.ico).*)",
  ],
};
