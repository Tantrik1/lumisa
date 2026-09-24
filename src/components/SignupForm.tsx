"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { playLuxuryChime } from "./AudioChime";
import { Check, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface SignupFormProps {
  id?: string;
  source?: string;
  buttonLabel?: string;
  placeholder?: string;
  variant?: "hero" | "compact" | "final";
}

export function SignupForm({
  id = "hero-signup",
  source = "lumisanepal-hero",
  buttonLabel = "Request Invitation",
  placeholder = "Enter your email address",
  variant = "hero",
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<"all" | "handbags" | "jewellery" | "accessories">("all");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [vipCode, setVipCode] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setStatus("error");
      setMessage("Please enter your email to join the Lumisa guestlist.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus("error");
      setMessage("Kindly check your email address and try again.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          interest,
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to reserve your spot right now.");
      }

      setStatus("success");
      setMessage(data.message || "You are on the Lumisa private guestlist.");
      setVipCode(data.vipNumber || "VIP-001");

      // Play soft luxury chime
      playLuxuryChime();

      // Launch celebratory gold and champagne confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.75 },
          colors: ["#d4af37", "#f3e5ab", "#ffffff", "#c5a059"],
          disableForReducedMotion: true,
        });
      } catch {
        // Confetti is an enhancement
      }

      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Connection issue. Please verify and try again."
      );
    }
  }

  return (
    <div className={`w-full ${variant === "final" ? "max-w-md" : "max-w-lg"} mx-auto`}>
      {status === "success" ? (
        <div className="bg-black/60 border border-amber-400/30 backdrop-blur-xl p-6 rounded-2xl text-center space-y-3 shadow-[0_0_50px_rgba(212,175,55,0.15)] animate-in fade-in zoom-in-95 duration-500">
          <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/40 mx-auto flex items-center justify-center text-amber-300">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif-lux text-2xl text-white font-normal">
              You are on the Guestlist
            </h4>
            <p className="text-sm text-neutral-400 mt-1">
              We look forward to welcoming you on opening day in Kathmandu.
            </p>
          </div>
          {vipCode && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>GUEST TICKET: {vipCode}</span>
            </div>
          )}
          <div className="pt-2">
            <button
              onClick={() => {
                setStatus("idle");
                setMessage("");
                setVipCode(null);
              }}
              className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              Add another email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {variant !== "compact" && (
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">Interest:</span>
              {(
                [
                  { id: "all", label: "All Curations" },
                  { id: "handbags", label: "Handbags" },
                  { id: "jewellery", label: "Jewellery" },
                  { id: "accessories", label: "Accessories" },
                ] as const
              ).map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setInterest(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all duration-300 ${
                    interest === cat.id
                      ? "bg-white text-black font-medium"
                      : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-white/10 to-amber-500/20 rounded-xl blur opacity-30 group-focus-within:opacity-80 transition duration-500 pointer-events-none" />
            <div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-white/20 group-focus-within:border-amber-400/70 rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
              <input
                id={id}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={placeholder}
                autoComplete="email"
                disabled={status === "loading"}
                className="w-full bg-transparent px-4 sm:px-5 py-3.5 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none disabled:opacity-50 font-light"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-white text-black hover:bg-amber-100 font-medium text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Reserving...</span>
                  </>
                ) : (
                  <>
                    <span>{buttonLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {status === "error" && (
            <p className="text-xs text-rose-300 text-center animate-in fade-in duration-300">
              {message}
            </p>
          )}

          <p className="text-[11px] text-neutral-400 text-center tracking-wide">
            Private 48h opening access &bull; Complimentary bespoke monogramming &bull; No spam
          </p>
        </form>
      )}
    </div>
  );
}
