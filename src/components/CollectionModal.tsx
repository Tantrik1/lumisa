"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, ShieldCheck, Gem } from "lucide-react";

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  materials: string;
  pieces: { name: string; detail: string }[];
}

interface CollectionModalProps {
  item: CollectionItem | null;
  onClose: () => void;
  onSelectInterest?: (category: string) => void;
}

export function CollectionModal({
  item,
  onClose,
  onSelectInterest,
}: CollectionModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white/20 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="relative h-64 md:h-auto min-h-[320px] bg-neutral-900 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent md:hidden" />
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs tracking-widest uppercase font-mono">
                <Sparkles className="w-3 h-3" />
                <span>Opening Edit</span>
              </div>

              <h3 className="font-serif-lux text-3xl sm:text-4xl text-white font-normal mt-3">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-400 italic mt-1 font-serif-lux">
                {item.subtitle}
              </p>

              <p className="text-sm text-neutral-300 font-light leading-relaxed mt-4">
                {item.description}
              </p>

              {/* Craftsmanship & Materials */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-start gap-3">
                  <Gem className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                      Materials & Craft
                    </span>
                    <span className="text-sm text-neutral-200">
                      {item.materials}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                      Authenticity & Care
                    </span>
                    <span className="text-sm text-neutral-200">
                      Hand-inspected, individually numbered with certificate of craftsmanship.
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Pieces in this edit */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-3">
                  Inaugural Pieces Preview
                </h4>
                <div className="space-y-2">
                  {item.pieces.map((piece, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0"
                    >
                      <span className="text-neutral-200 font-medium">{piece.name}</span>
                      <span className="text-neutral-500 font-light">{piece.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <a
                href="#signup-section"
                onClick={() => {
                  onSelectInterest?.(item.id);
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-black hover:bg-amber-100 font-medium text-xs tracking-wider uppercase transition-colors"
              >
                <span>Reserve VIP Access for {item.title}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
