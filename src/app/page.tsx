"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { SpotlightHero } from "@/components/SpotlightHero";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SignupForm } from "@/components/SignupForm";
import { CollectionModal, CollectionItem } from "@/components/CollectionModal";
import { KeyRound, Sparkles, Feather, MapPin } from "lucide-react";

const collectionsData: CollectionItem[] = [
  {
    id: "handbags",
    title: "Handbags",
    subtitle: "Structured leather, soft quilting & signature chains",
    description:
      "Crafted from full-grain Italian calfskin with hand-finished edge paint and polished brass hardware. Designed to move seamlessly from daylight appointments to evening celebrations.",
    image: "/images/collection-handbags.png",
    highlights: ["Full-Grain Calfskin", "24K Gold Plated Locks", "Convertible Chain"],
    materials: "Full-grain Italian calfskin, hand-dyed edge lacquer, satin lining.",
    pieces: [
      { name: "The Lumisa Trapeze", detail: "Structured Top Handle in Obsidian" },
      { name: "The Quilted Minuit", detail: "Crossbody Chain Bag in Noir" },
      { name: "The Day Clutch", detail: "Soft Envelope Pouch in Espresso" },
    ],
  },
  {
    id: "jewellery",
    title: "Fine Jewellery",
    subtitle: "Fine chains, drop earrings and statement rings",
    description:
      "Sculpted in solid 925 sterling silver dipped in heavy 18K yellow and champagne gold vermeil. Intended to layer intuitively or command attention when worn alone.",
    image: "/images/collection-jewellery.png",
    highlights: ["18K Gold Vermeil", "Solid 925 Silver", "Hypoallergenic"],
    materials: "18k gold vermeil over recycled 925 sterling silver, hand-set stones.",
    pieces: [
      { name: "Solaris Drop Earrings", detail: "Champagne Gold Cascade" },
      { name: "Aethel Layering Choker", detail: "Twisted Herringbone Link" },
      { name: "Signet Meridian Ring", detail: "Hand-carved Satin Finish" },
    ],
  },
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "Watches, silk scarves & bespoke fragrance",
    description:
      "The finishing accents that linger in memory. Featuring custom Swiss-movement timepieces and an inaugural Extrait de Parfum blended with rare Himalayan woods and amber.",
    image: "/images/collection-accessories.png",
    highlights: ["Extrait de Parfum", "Swiss Movement", "Silk Twill"],
    materials: "French glass flacon, botanical perfume concentrate, sapphire crystal.",
    pieces: [
      { name: "Nectar d'Or Parfum", detail: "50ml Extrait with Amber & Cedar" },
      { name: "The Petite Square Watch", detail: "Black Sunray Dial with Milanese Mesh" },
      { name: "L'Etoile Silk Carre", detail: "Hand-rolled Mulberry Silk 90x90cm" },
    ],
  },
];

export default function Home() {
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(null);

  return (
    <main id="top" className="relative bg-black text-white min-h-screen overflow-x-hidden">
      {/* Fixed Header */}
      <Navbar />

      {/* Hero Section with Interactive Spotlight */}
      <SpotlightHero>
        <div className="w-full flex flex-col items-center gap-6 mt-2">
          {/* Kathmandu Countdown Timer */}
          <CountdownTimer targetDate="2026-11-15T10:00:00+05:45" />

          {/* Hero VIP Signup Form */}
          <div className="w-full max-w-lg mt-2">
            <SignupForm
              id="hero-email"
              source="hero-section"
              buttonLabel="Join Guestlist"
              placeholder="Your email address"
              variant="hero"
            />
          </div>
        </div>
      </SpotlightHero>

      {/* Collections Showcase ("What's Coming") */}
      <section
        id="collections"
        aria-labelledby="collections-heading"
        className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Inaugural Collection</span>
            </div>
            <h2
              id="collections-heading"
              className="font-serif-lux text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight"
            >
              What&apos;s coming
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Three curated edits at launch, each picked piece by piece. Tap any collection to inspect craftsmanship and piece previews.
          </p>
        </div>

        {/* Dynamic Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Tile 1: Handbags (Primary Feature - 7 cols) */}
          <div
            onClick={() => setSelectedCollection(collectionsData[0])}
            className="md:col-span-7 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[440px] sm:min-h-[520px] bg-neutral-950 border border-white/10 transition-all duration-700 hover:border-amber-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-end"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={collectionsData[0].image}
                alt={collectionsData[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center grayscale contrast-110 brightness-75 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-10 space-y-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-amber-300 font-mono">
                Curation 01
              </span>
              <h3 className="font-serif-lux text-3xl sm:text-4xl text-white font-normal group-hover:text-amber-100 transition-colors">
                {collectionsData[0].title}
              </h3>
              <p className="text-sm text-neutral-300 max-w-lg font-light">
                {collectionsData[0].subtitle}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/80 group-hover:text-amber-200 group-hover:translate-x-1 transition-all duration-300">
                  Inspect Edit &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) with Jewellery and Accessories */}
          <div className="md:col-span-5 flex flex-col gap-6 sm:gap-8">
            {/* Tile 2: Fine Jewellery */}
            <div
              onClick={() => setSelectedCollection(collectionsData[1])}
              className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[250px] sm:min-h-[280px] bg-neutral-950 border border-white/10 transition-all duration-700 hover:border-amber-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={collectionsData[1].image}
                  alt={collectionsData[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center grayscale contrast-110 brightness-75 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300 font-mono">
                  Curation 02
                </span>
                <h3 className="font-serif-lux text-2xl sm:text-3xl text-white font-normal group-hover:text-amber-100 transition-colors">
                  {collectionsData[1].title}
                </h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-2">
                  {collectionsData[1].subtitle}
                </p>
              </div>
            </div>

            {/* Tile 3: Accessories */}
            <div
              onClick={() => setSelectedCollection(collectionsData[2])}
              className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[250px] sm:min-h-[280px] bg-neutral-950 border border-white/10 transition-all duration-700 hover:border-amber-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={collectionsData[2].image}
                  alt={collectionsData[2].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center grayscale contrast-110 brightness-75 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300 font-mono">
                  Curation 03
                </span>
                <h3 className="font-serif-lux text-2xl sm:text-3xl text-white font-normal group-hover:text-amber-100 transition-colors">
                  {collectionsData[2].title}
                </h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-2">
                  {collectionsData[2].subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy & Statement Section */}
      <section
        aria-label="About Lumisa"
        className="relative py-28 sm:py-36 border-t border-white/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.04),transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-8">
          <div className="w-12 h-12 relative mx-auto opacity-70">
            <Image
              src="/images/brand-mark.png"
              alt="Lumisa Insignia"
              fill
              className="object-contain invert brightness-200"
            />
          </div>

          <blockquote className="font-serif-lux text-2xl sm:text-4xl md:text-5xl font-light text-white leading-snug tracking-tight">
            &ldquo;Lumisa is a boutique for the pieces you reach for every day, and the ones you save for the nights that matter.&rdquo;
          </blockquote>

          <p className="font-serif-lux italic text-xl sm:text-2xl text-neutral-400 font-light max-w-xl mx-auto">
            Chosen with care. Made to be worn, not kept in a box.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-amber-300 font-medium">
            <span>For the woman you are</span>
          </div>
        </div>
      </section>

      {/* VIP Privileges Pillar Section */}
      <section
        aria-labelledby="perks-heading"
        className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-300 font-mono">
            Guestlist Benefits
          </span>
          <h2
            id="perks-heading"
            className="font-serif-lux text-3xl sm:text-4xl md:text-5xl text-white font-light mt-2"
          >
            Reserved For Our First Guests
          </h2>
          <p className="text-neutral-400 text-sm mt-3 font-light">
            When our doors open in Kathmandu, our private list receives unparalleled privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-8 rounded-3xl bg-neutral-950/60 border border-white/10 backdrop-blur-sm space-y-4 hover:border-amber-400/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="font-serif-lux text-2xl text-white font-normal">
              48-Hour Private Access
            </h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Explore the inaugural boutique collections two full days prior to the public opening. Limited edition pieces reserved.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-950/60 border border-white/10 backdrop-blur-sm space-y-4 hover:border-amber-400/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif-lux text-2xl text-white font-normal">
              Bespoke Monogramming
            </h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Complimentary blind-debossed or 24K gold foil personalized initials on all handbag purchases during opening week.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-950/60 border border-white/10 backdrop-blur-sm space-y-4 hover:border-amber-400/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-lux text-2xl text-white font-normal">
              15% Inaugural Gift
            </h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              A private inaugural credit applied to your first boutique acquisition, along with an invitation to our opening evening.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section
        id="signup-section"
        aria-labelledby="final-heading"
        className="py-28 sm:py-36 px-4 sm:px-6 md:px-12 border-t border-white/10 relative overflow-hidden bg-neutral-950"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>Kathmandu, Nepal</span>
          </div>

          <h2
            id="final-heading"
            className="font-serif-lux text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight"
          >
            Be first through the door
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
            Join the list to hear our opening date first and receive your private access pass to the boutique.
          </p>

          <div className="pt-4">
            <SignupForm
              id="final-email"
              source="final-section"
              buttonLabel="Reserve Access"
              placeholder="Your email address"
              variant="final"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-12 border-t border-white/10 bg-black text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative opacity-70">
              <Image
                src="/images/brand-mark.png"
                alt="Lumisa"
                fill
                className="object-contain invert brightness-200"
              />
            </div>
            <span>&copy; {new Date().getFullYear()} Lumisa Nepal. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <span>Kathmandu Flagship Atelier</span>
            <span>&bull;</span>
            <span className="italic font-serif-lux text-neutral-300 text-sm">
              For the woman you are
            </span>
          </div>
        </div>
      </footer>

      {/* Interactive Collection Detail Modal */}
      <CollectionModal
        item={selectedCollection}
        onClose={() => setSelectedCollection(null)}
      />
    </main>
  );
}
