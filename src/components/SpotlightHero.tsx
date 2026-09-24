"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles, SunMedium } from "lucide-react";

interface SpotlightHeroProps {
  children?: React.ReactNode;
}

export function SpotlightHero({ children }: SpotlightHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 55, r: 280 });
  const [isFullLit, setIsFullLit] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Target coordinates for smooth lerp
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
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    stateRef.current.tx = Math.max(0.1, Math.min(0.9, (e.clientX - rect.left) / rect.width));
    stateRef.current.ty = Math.max(0.1, Math.min(0.9, (e.clientY - rect.top) / rect.height));
    stateRef.current.active = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    stateRef.current.active = false;
  }, []);

  useEffect(() => {
    setMounted(true);
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stateRef.current.fine = fine;

    if (reducedMotion) {
      setIsFullLit(true);
      return;
    }

    let animId: number;

    function loop() {
      if (stateRef.current.visible) {
        // Slow organic drift across products when not actively hovering or on touch
        if (!stateRef.current.active || !stateRef.current.fine) {
          stateRef.current.t += 0.005;
          stateRef.current.tx = 0.5 + Math.sin(stateRef.current.t) * 0.35;
          stateRef.current.ty = 0.52 + Math.sin(stateRef.current.t * 1.6) * 0.12;
        }

        // Smooth physics interpolation (lerp)
        stateRef.current.x += (stateRef.current.tx - stateRef.current.x) * 0.08;
        stateRef.current.y += (stateRef.current.ty - stateRef.current.y) * 0.08;

        const w = typeof window !== "undefined" ? window.innerWidth : 1200;
        const h = typeof window !== "undefined" ? window.innerHeight : 800;
        const radius = Math.max(180, Math.min(w, h) * 0.32);

        setCoords({
          x: stateRef.current.x * 100,
          y: stateRef.current.y * 100,
          r: radius,
        });
      }
      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    // Observe visibility
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

  const maskStyle = isFullLit
    ? undefined
    : {
        WebkitMaskImage: `radial-gradient(circle ${coords.r}px at ${coords.x}% ${coords.y}%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 100%)`,
        maskImage: `radial-gradient(circle ${coords.r}px at ${coords.x}% ${coords.y}%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 100%)`,
      };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[92svh] md:min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 md:px-8 pt-24 pb-16 selection:bg-amber-400/20"
      id="hero"
    >
      {/* Background layer 1: Noir & High Contrast Shadow */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: "url(/images/hero-background.png)",
          filter: "grayscale(100%) contrast(1.18) brightness(0.38)",
        }}
        aria-hidden="true"
      />

      {/* Background layer 2: Dynamic Spotlight Reveal (Full Warmth & Color) */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url(/images/hero-background.png)",
          filter: "brightness(0.95) contrast(1.05) saturate(1.1)",
          ...maskStyle,
        }}
        aria-hidden="true"
      />

      {/* Vignette Overlay for Dramatic Depth */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(0,0,0,0.65),rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.95))]"
        aria-hidden="true"
      />

      {/* Top and Bottom Gradient Blends */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/40 to-transparent -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Interactive Light Mode Pill */}
      {mounted && (
        <div className="absolute top-24 right-4 sm:right-8 z-20">
          <button
            onClick={() => setIsFullLit(!isFullLit)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 backdrop-blur-md transition-all duration-300"
            title="Toggle lighting experience"
          >
            {isFullLit ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Spotlight</span>
              </>
            ) : (
              <>
                <SunMedium className="w-3.5 h-3.5 text-neutral-400" />
                <span>Illuminate</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Foreground Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Centerpiece Luxury Product Floating with Soft Glow */}
        <div className="relative group cursor-pointer mb-2 max-w-[280px] sm:max-w-[340px] md:max-w-[420px] transition-transform duration-700 ease-out hover:scale-105">
          <div className="absolute -inset-4 bg-amber-400/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <Image
            src="/images/hero-product.png"
            alt="Lumisa Centerpiece Luxury Leather Handbag"
            width={720}
            height={660}
            priority
            className="relative drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] select-none pointer-events-none"
          />
        </div>

        {/* Brand Wordmark & Slogan */}
        <div className="mb-4">
          <Image
            src="/images/logo-wordmark.png"
            alt="Lumisa"
            width={280}
            height={80}
            priority
            className="h-12 sm:h-16 w-auto mx-auto filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] invert brightness-200"
          />
        </div>

        <p className="font-serif-lux italic text-lg sm:text-2xl md:text-3xl text-neutral-300 font-light tracking-wide max-w-xl mx-auto mb-6">
          Handbags, fine jewellery and the finishing touches.
        </p>

        {children}
      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#collections"
        aria-label="Scroll to discover the collections"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-light">Explore</span>
        <div className="relative w-[1px] h-10 bg-white/20 overflow-hidden">
          <div className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-amber-200 to-transparent animate-drip" />
        </div>
      </a>
    </div>
  );
}
