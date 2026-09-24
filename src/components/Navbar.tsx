"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Real Logo Only */}
        <a
          href="#top"
          className="pointer-events-auto block transition-opacity duration-300 hover:opacity-80"
          aria-label="Lumisa — Back to top"
        >
          <div className="relative h-10 sm:h-12 w-32 sm:w-36">
            <Image
              src="/images/lumisa-logo-full.png"
              alt="Lumisa"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </a>

        {/* Social Links Only: Instagram & Facebook */}
        <ul className="pointer-events-auto flex items-center gap-2">
          <li>
            <a
              href="https://instagram.com/lumisa_official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumisa on Instagram (@lumisa_official)"
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
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
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                <path d="M15.5 3.5H14a4 4 0 0 0-4 4V10H7.5v3.5H10v7h3.5v-7H16l.5-3.5h-3V8a1 1 0 0 1 1-1h2z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
