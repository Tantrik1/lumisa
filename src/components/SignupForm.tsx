"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { playLuxuryChime } from "./AudioChime";
import { Loader2, Check, Copy } from "lucide-react";

interface SignupFormProps {
  id?: string;
  source?: string;
  buttonLabel?: string;
  placeholder?: string;
}

export function SignupForm({
  id = "contact-signup",
  source = "offer-section",
  buttonLabel = "Claim 10% Off",
  placeholder = "Email address or phone number",
}: SignupFormProps) {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [promoCode, setPromoCode] = useState("LUMISA10");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = contact.trim();

    if (!clean) {
      setStatus("error");
      setMessage("Please enter your email or phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneClean = clean.replace(/[\s\-\(\)\.]/g, "");
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!emailRegex.test(clean) && !phoneRegex.test(phoneClean)) {
      setStatus("error");
      setMessage("Enter a valid email address or phone number.");
      return;
    }

    setStatus("loading");
    setMessage("Registering your 10% welcome offer…");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          contact: clean,
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to save your invitation.");
      }

      setStatus("success");
      setMessage(data.message || "You're on the list! Your 10% code is LUMISA10.");
      if (data.code) setPromoCode(data.code);

      // Play soft luxury chime
      playLuxuryChime();

      // Launch celebratory gold confetti
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.75 },
          colors: ["#d4af37", "#f3e5ab", "#ffffff"],
          disableForReducedMotion: true,
        });
      } catch {
        // Confetti is an enhancement
      }

      setContact("");
    } catch {
      setStatus("error");
      setMessage("Could not connect. Please check your connection and try again.");
    }
  }

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className="w-full text-left">
      {status === "success" ? (
        <div className="bg-white/[0.04] border border-amber-300/30 p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-2xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 mx-auto flex items-center justify-center text-amber-300">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif-lux text-2xl sm:text-3xl text-white font-normal">
              10% Inaugural Privilege Claimed
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-sm mx-auto font-light">
              We&apos;ll notify you for early access. Use this voucher code at checkout:
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black/80 border border-amber-300/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <span className="font-mono text-base sm:text-lg font-medium tracking-widest text-amber-200">
              {promoCode}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-neutral-400 hover:text-white transition-colors p-1"
              title="Copy voucher code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {copied && (
            <p className="text-xs text-amber-200 font-light">Copied to clipboard!</p>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                setStatus("idle");
                setMessage("");
              }}
              className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              Register another contact
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="w-full">
          <label htmlFor={id} className="sr-only">
            Email address or phone number
          </label>
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
            <div className="relative flex-1">
              <input
                id={id}
                type="text"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={placeholder}
                autoComplete="email tel"
                disabled={status === "loading"}
                className="w-full bg-white/[0.05] hover:bg-white/[0.08] focus:bg-white/[0.1] border border-white/15 focus:border-amber-300/70 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base placeholder-neutral-500 focus:outline-none transition-all duration-300 font-light shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-amber-100 text-black text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Saving…</span>
                </>
              ) : (
                <>
                  <span>{buttonLabel}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </>
              )}
            </button>
          </div>

          {/* Status Message */}
          <p
            role="status"
            aria-live="polite"
            className={`min-h-[22px] mt-2.5 text-xs sm:text-sm font-light transition-colors duration-200 ${
              status === "error" ? "text-rose-300" : "text-neutral-400"
            }`}
          >
            {message}
          </p>
        </form>
      )}
    </div>
  );
}
