"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { CountdownTimer } from "@/components/CountdownTimer";

export function SpotlightHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 55, r: 320 });
  const [isMobile, setIsMobile] = useState(false);

  const stateRef = useRef({
    tx: 0.5,
    ty: 0.55,
    x: 0.5,
    y: 0.55,
    active: false,
    fine: false,
    t: 0,
    visible: true,
  });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !stateRef.current.fine) return;
    const rect = containerRef.current.getBoundingClientRect();
    stateRef.current.tx = Math.max(0.1, Math.min(0.9, (e.clientX - rect.left) / rect.width));
    stateRef.current.ty = Math.max(0.1, Math.min(0.9, (e.clientY - rect.top) / rect.height));
    stateRef.current.active = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    stateRef.current.active = false;
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const mobileCheck = window.innerWidth < 768 || !fine;
    setIsMobile(mobileCheck);
    stateRef.current.fine = fine;

    function handleResize() {
      const isMob = window.innerWidth < 768 || !window.matchMedia("(pointer: fine)").matches;
      setIsMobile(isMob);
    }
    window.addEventListener("resize", handleResize, { passive: true });

    let animId: number;

    function loop() {
      if (stateRef.current.visible) {
        // Slow organic drift across products when not hovering or on touch
        if (!stateRef.current.active || !stateRef.current.fine) {
          stateRef.current.t += 0.0035;
          stateRef.current.tx = 0.5 + Math.sin(stateRef.current.t) * 0.28;
          stateRef.current.ty = 0.55 + Math.sin(stateRef.current.t * 1.6) * 0.1;
        }

        // Smooth physics lerp
        stateRef.current.x += (stateRef.current.tx - stateRef.current.x) * 0.07;
        stateRef.current.y += (stateRef.current.ty - stateRef.current.y) * 0.07;

        const w = window.innerWidth || 1200;
        const h = window.innerHeight || 800;
        const radius = Math.max(220, Math.min(w, h) * 0.35);

        setCoords({
          x: stateRef.current.x * 100,
          y: stateRef.current.y * 100,
          r: radius,
        });
      }
      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    const observer = new IntersectionObserver(([entry]) => {
      stateRef.current.visible = entry.isIntersecting;
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Spotlight mask for desktop fine pointers
  const maskStyle = isMobile
    ? undefined
    : {
        WebkitMaskImage: `radial-gradient(circle ${coords.r}px at ${coords.x}% ${coords.y}%, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)`,
        maskImage: `radial-gradient(circle ${coords.r}px at ${coords.x}% ${coords.y}%, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)`,
      };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-8 md:px-16 pt-24 pb-16 cursor-default isolate text-center select-none"
    >
      <h1 id="hero-title" className="sr-only">
        Lumisa — Handbags, jewellery and accessories. Opening soon.
      </h1>

      {/* Layer 1: Base Responsive Background Image (Never pitch black on mobile) */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center md:bg-top transition-all duration-700 bg-[url('/images/hero-mobile.webp')] md:bg-[url('/images/hero-tablet.webp')] lg:bg-[url('/images/hero-desktop.webp')]"
        style={{
          filter: isMobile
            ? "brightness(0.72) contrast(1.08) saturate(1.05)"
            : "grayscale(100%) contrast(1.15) brightness(0.48)",
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Desktop Spotlight Reveal (Full warm golden radiance) */}
      {!isMobile && (
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center md:bg-top transition-opacity duration-300 bg-[url('/images/hero-mobile.webp')] md:bg-[url('/images/hero-tablet.webp')] lg:bg-[url('/images/hero-desktop.webp')]"
          style={{
            filter: "brightness(0.95) contrast(1.05) saturate(1.1)",
            ...maskStyle,
          }}
          aria-hidden="true"
        />
      )}

      {/* Vignette Gradients for Legibility (Balanced for mobile to prevent pitch blackness) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_55%_65%_at_50%_45%,rgba(0,0,0,0.35),rgba(0,0,0,0.65)_75%,#000000_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content: ONLY Logo, Description, Countdown */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Real Lumisa Logo */}
        <div className="relative w-[min(68vw,38svh,360px)] aspect-[900/820] mb-3 sm:mb-5">
          <Image
            src="/images/lumisa-logo-full.png"
            alt="Lumisa — For the woman you are"
            fill
            priority
            sizes="(max-width: 640px) 280px, 360px"
            className="object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] select-none pointer-events-none"
          />
        </div>

        {/* Description */}
        <p className="font-serif-lux italic font-light text-base sm:text-2xl md:text-3xl text-neutral-200 tracking-wide mt-2 sm:mt-4 max-w-lg mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] px-2">
          Handbags, jewellery and the finishing touches. Opening soon.
        </p>

        {/* Countdown */}
        <div className="mt-6 sm:mt-8 w-full flex justify-center">
          <CountdownTimer targetDate="2026-11-15T10:00:00+05:45" />
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#collections"
        aria-label="Scroll to see what's coming"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent overflow-hidden"
      >
        <span className="absolute left-0 -top-10 w-[1px] h-10 bg-white animate-drip" />
      </a>
    </section>
  );
}
