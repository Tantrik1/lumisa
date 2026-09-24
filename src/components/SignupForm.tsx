"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { playLuxuryChime } from "./AudioChime";
import { Loader2 } from "lucide-react";

interface SignupFormProps {
  id?: string;
  source?: string;
  buttonLabel?: string;
  placeholder?: string;
}

export function SignupForm({
  id = "email-signup",
  source = "hero-section",
  buttonLabel = "Notify me",
  placeholder = "Your email address",
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setStatus("error");
      setMessage("Enter your email address to join the list.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus("error");
      setMessage("That email address looks incomplete. Check it and try again.");
      return;
    }

    setStatus("loading");
    setMessage("Adding you to the list…");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to save signup.");
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll email you on opening day.");

      // Soft luxury chime
      playLuxuryChime();

      // Delicate gold shimmer confetti
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.75 },
          colors: ["#d4af37", "#f3e5ab", "#ffffff"],
          disableForReducedMotion: true,
        });
      } catch {
        // Enhancement
      }

      setEmail("");
    } catch {
      setStatus("error");
      setMessage("That didn’t go through. Check your connection and try again.");
    }
  }

  return (
    <div className="w-full max-w-[440px] mx-auto text-left">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <div className="flex items-center border-b border-white/50 focus-within:border-white transition-colors duration-250 pb-0.5">
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
            className="flex-1 min-w-0 bg-transparent py-3 px-1 text-white text-base placeholder-neutral-500 focus:outline-none font-light"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group relative bg-transparent py-3 pl-4 pr-1 text-white text-sm font-normal tracking-[0.06em] whitespace-nowrap cursor-pointer disabled:opacity-50 transition-opacity"
          >
            <span className="flex items-center gap-1.5">
              {status === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{buttonLabel}</span>
            </span>
            <span className="absolute left-4 right-1 bottom-2 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>

        {/* Status Message */}
        <p
          role="status"
          aria-live="polite"
          className={`min-h-[24px] mt-2.5 text-sm transition-colors duration-200 ${
            status === "success"
              ? "text-white"
              : status === "error"
              ? "text-neutral-300"
              : "text-neutral-400"
          }`}
        >
          {message}
        </p>
      </form>
    </div>
  );
}
