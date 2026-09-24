"use client";

import Image from "next/image";
import { CountdownTimer } from "@/components/CountdownTimer";

export function SpotlightHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-8 md:px-16 pt-24 pb-16 cursor-default isolate text-center select-none"
    >
      <h1 id="hero-title" className="sr-only">
        Lumisa — Handbags, jewellery and accessories. Opening soon.
      </h1>

      {/* High Quality Responsive Background: Mobile, Tablet, Desktop */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center md:bg-top bg-no-repeat bg-[url('/images/hero-mobile.webp')] md:bg-[url('/images/hero-tablet.webp')] lg:bg-[url('/images/hero-desktop.webp')]"
        aria-hidden="true"
      />

      {/* Small Tint Black to Background for Clear Contrast & Vivid Depth */}
      <div
        className="absolute inset-0 -z-10 bg-black/[0.44] md:bg-black/40 pointer-events-none transition-colors"
        aria-hidden="true"
      />

      {/* Subtle Bottom Fade to Next Section */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content: ONLY Logo, Description, Countdown */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Real Lumisa Logo */}
        <div className="relative w-[min(70vw,36svh,360px)] aspect-[900/820] mb-3 sm:mb-5 animate-lux-fade-up">
          <Image
            src="/images/lumisa-logo-full.png"
            alt="Lumisa — For the woman you are"
            fill
            priority
            sizes="(max-width: 640px) 280px, 360px"
            className="object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] select-none pointer-events-none"
          />
        </div>

        {/* Description */}
        <p className="font-serif-lux italic font-light text-lg sm:text-2xl md:text-3xl text-neutral-100 tracking-wide mt-2 sm:mt-3 max-w-lg mx-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] px-2 animate-lux-fade-up-delay-1">
          Handbags, jewellery and the finishing touches. Opening soon.
        </p>

        {/* Countdown (30 Days) */}
        <div className="mt-6 sm:mt-8 w-full flex justify-center animate-lux-fade-up-delay-2">
          <CountdownTimer daysCount={30} />
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#collections"
        aria-label="Scroll to see what's coming"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-b from-white/25 to-transparent overflow-hidden"
      >
        <span className="absolute left-0 -top-10 w-[1px] h-10 bg-white animate-drip" />
      </a>
    </section>
  );
}
