"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";

export function SpotlightHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 62, r: 260 });

  const stateRef = useRef({
    tx: 0.5,
    ty: 0.62,
    x: 0.5,
    y: 0.62,
    active: false,
    fine: false,
    t: 0,
    visible: true,
  });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    stateRef.current.tx = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width));
    stateRef.current.ty = Math.max(0.05, Math.min(0.95, (e.clientY - rect.top) / rect.height));
    stateRef.current.active = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    stateRef.current.active = false;
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stateRef.current.fine = fine;

    if (reducedMotion) {
      setCoords({ x: 50, y: 60, r: 800 });
      return;
    }

    let animId: number;

    function loop() {
      if (stateRef.current.visible) {
        // Organic drift across the product set when idle or on touch
        if (!stateRef.current.active || !stateRef.current.fine) {
          stateRef.current.t += 0.0035;
          stateRef.current.tx = 0.5 + Math.sin(stateRef.current.t) * 0.38;
          stateRef.current.ty = 0.62 + Math.sin(stateRef.current.t * 1.7) * 0.1;
        }

        // Smooth physics interpolation (lerp)
        stateRef.current.x += (stateRef.current.tx - stateRef.current.x) * 0.07;
        stateRef.current.y += (stateRef.current.ty - stateRef.current.y) * 0.07;

        const w = typeof window !== "undefined" ? window.innerWidth : 1200;
        const h = typeof window !== "undefined" ? window.innerHeight : 800;
        const radius = Math.max(170, Math.min(w, h) * 0.32);

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
    };
  }, []);

  const maskStyle = {
    WebkitMaskImage: `radial-gradient(circle ${coords.r}px at ${coords.x}% ${coords.y}%, #000 0%, rgba(0,0,0,0.55) 45%, transparent 100%)`,
    maskImage: `radial-gradient(circle ${coords.r}px at ${coords.x}% ${coords.y}%, #000 0%, rgba(0,0,0,0.55) 45%, transparent 100%)`,
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden px-6 sm:px-10 md:px-16 pt-24 pb-16 cursor-default isolate text-center"
    >
      {/* Background Layer 1: Monochrome Room */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center md:bg-[center_70%] transition-opacity"
        style={{
          backgroundImage: "url(/images/hero-background.webp)",
          filter: "grayscale(1) contrast(1.12) brightness(0.5)",
        }}
        aria-hidden="true"
      />

      {/* Background Layer 2: Dynamic Spotlight */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center md:bg-[center_70%]"
        style={{
          backgroundImage: "url(/images/hero-background.webp)",
          ...maskStyle,
        }}
        aria-hidden="true"
      />

      {/* Vignette Depth */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_42%_58%_at_50%_48%,rgba(0,0,0,0.72),rgba(0,0,0,0.25)_70%,transparent),linear-gradient(to_bottom,rgba(0,0,0,0.55),transparent_22%,transparent_70%,#000)]"
        aria-hidden="true"
      />

      {/* Hero Content: ONLY Title, Description, Countdown. No any other things. */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h1
          id="hero-title"
          className="font-serif-lux font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-[-0.02em] leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
        >
          Lumisa
        </h1>

        {/* Description */}
        <p className="font-serif-lux italic font-light text-lg sm:text-2xl md:text-3xl text-neutral-300 tracking-wide mt-4 sm:mt-6 max-w-xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
          Handbags, jewellery and the finishing touches. Opening soon.
        </p>

        {/* Countdown */}
        <div className="mt-8 sm:mt-10">
          <CountdownTimer targetDate="2026-11-15T10:00:00+05:45" />
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#collections"
        aria-label="Scroll to see what's coming"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[1px] h-11 bg-gradient-to-b from-white/16 to-transparent overflow-hidden"
      >
        <span className="absolute left-0 -top-11 w-[1px] h-11 bg-white animate-drip" />
      </a>
    </section>
  );
}
