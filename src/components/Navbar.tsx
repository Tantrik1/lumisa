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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Mark */}
        <a
          href="#top"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          aria-label="Lumisa - Back to top"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 relative rounded-full overflow-hidden border border-white/10 bg-white/5 p-1">
            <Image
              src="/images/brand-mark.png"
              alt="Lumisa Insignia"
              fill
              className="object-contain p-1 invert brightness-200"
            />
          </div>
          <span className="font-serif-lux text-xl sm:text-2xl tracking-[0.15em] uppercase text-white font-normal group-hover:text-amber-200 transition-colors">
            Lumisa
          </span>
        </a>

        {/* Actions & Socials */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lumisa on Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r=".6" fill="currentColor" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lumisa on Facebook"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path d="M15.5 3.5H14a4 4 0 0 0-4 4V10H7.5v3.5H10v7h3.5v-7H16l.5-3.5h-3V8a1 1 0 0 1 1-1h2z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lumisa on TikTok"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path d="M14 3.5v11.3a3.8 3.8 0 1 1-3.8-3.8" />
                  <path d="M14 3.5c.4 2.6 2.3 4.4 5 4.6" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Lumisa on WhatsApp"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path d="M4 20.5l1.4-4.1A8.5 8.5 0 1 1 8.6 19.4z" />
                  <path d="M9 8.6c0 3.2 2.9 6.3 6.3 6.3l1-1.5-1.8-.9-.9.9c-1.1-.4-2.5-1.8-2.9-2.9l.9-.9-.9-1.8z" />
                </svg>
              </a>
            </li>
          </ul>

          <a
            href="#signup-section"
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all duration-300"
          >
            Guestlist
          </a>
        </div>
      </div>
    </header>
  );
}
