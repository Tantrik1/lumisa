"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 30;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transform-gpu transition-colors duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-3 sm:py-4 flex items-center justify-between">
        {/* Real Logo Only */}
        <a
          href="#top"
          className="pointer-events-auto flex items-center transition-opacity duration-200 hover:opacity-85 focus:outline-none"
          aria-label="Lumisa — Back to top"
        >
          <Image
            src="/images/lumisa-logo-full.png"
            alt="Lumisa"
            width={160}
            height={55}
            priority
            className="h-8 sm:h-10 w-auto object-contain select-none"
          />
        </a>

        {/* Social Links Only: Instagram & Facebook */}
        <ul className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          <li>
            <a
              href="https://instagram.com/lumisa_official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumisa on Instagram (@lumisa_official)"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.4" cy="6.6" r=".6" fill="currentColor" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/lumisa.official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumisa on Facebook (@lumisa.official)"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                <path d="M15.5 3.5H14a4 4 0 0 0-4 4V10H7.5v3.5H10v7h3.5v-7H16l.5-3.5h-3V8a1 1 0 0 1 1-1h2z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
