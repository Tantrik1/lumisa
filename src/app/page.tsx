"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { SpotlightHero } from "@/components/SpotlightHero";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SignupForm } from "@/components/SignupForm";
import { CollectionModal, CollectionItem } from "@/components/CollectionModal";

const collectionsData: CollectionItem[] = [
  {
    id: "handbags",
    title: "Handbags",
    subtitle: "Structured leather, soft quilting and chain straps for day into evening.",
    description:
      "Crafted from full-grain Italian calfskin with hand-finished edge paint and polished brass hardware. Designed to move seamlessly from daylight appointments to evening celebrations.",
    image: "/images/collection-handbags.webp",
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
    title: "Jewellery",
    subtitle: "Fine chains, drop earrings and rings to layer or wear alone.",
    description:
      "Sculpted in solid 925 sterling silver dipped in heavy 18K yellow and champagne gold vermeil. Intended to layer intuitively or command attention when worn alone.",
    image: "/images/collection-jewellery.webp",
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
    subtitle: "Watches and fragrance to finish the look.",
    description:
      "The finishing accents that linger in memory. Featuring custom Swiss-movement timepieces and an inaugural Extrait de Parfum blended with rare Himalayan woods and amber.",
    image: "/images/collection-accessories.webp",
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
    <main id="top" className="relative bg-black text-white min-h-screen overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Fixed Header with Real Logo and IG/FB Only */}
      <Navbar />

      {/* Hero Section: Only Title, Description, Countdown */}
      <SpotlightHero />

      {/* Collections Section ("What's Coming") */}
      <section
        id="collections"
        aria-labelledby="collections-heading"
        className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <h2
            id="collections-heading"
            className="font-serif-lux text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-none"
          >
            What&apos;s coming
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-sm font-light">
            Three edits at launch, each picked piece by piece. Here&apos;s a first look.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-4 sm:gap-6 min-h-[580px] md:h-[720px]">
          {/* Primary Feature: Handbags (spans 2 rows on desktop) */}
          <figure
            onClick={() => setSelectedCollection(collectionsData[0])}
            className="group relative overflow-hidden bg-neutral-950 cursor-pointer rounded-none md:row-span-2 min-h-[420px] flex flex-col justify-end"
          >
            <Image
              src={collectionsData[0].image}
              alt={collectionsData[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-[center_30%]"
              priority
            />
            {/* Deep black to transparent gradient from bottom for crisp text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-40% to-transparent pointer-events-none" />
            <figcaption className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="font-serif-lux text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                {collectionsData[0].title}
              </h3>
              <p className="text-neutral-200 text-sm sm:text-base mt-2 max-w-md font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,1)]">
                {collectionsData[0].subtitle}
              </p>
            </figcaption>
          </figure>

          {/* Jewellery */}
          <figure
            onClick={() => setSelectedCollection(collectionsData[1])}
            className="group relative overflow-hidden bg-neutral-950 cursor-pointer rounded-none min-h-[290px] flex flex-col justify-end"
          >
            <Image
              src={collectionsData[1].image}
              alt={collectionsData[1].title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />
            {/* Deep black to transparent gradient from bottom for crisp text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-45% to-transparent pointer-events-none" />
            <figcaption className="relative z-10 p-6 sm:p-8">
              <h3 className="font-serif-lux text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                {collectionsData[1].title}
              </h3>
              <p className="text-neutral-200 text-sm sm:text-base mt-1.5 max-w-md font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,1)]">
                {collectionsData[1].subtitle}
              </p>
            </figcaption>
          </figure>

          {/* Accessories */}
          <figure
            onClick={() => setSelectedCollection(collectionsData[2])}
            className="group relative overflow-hidden bg-neutral-950 cursor-pointer rounded-none min-h-[290px] flex flex-col justify-end"
          >
            <Image
              src={collectionsData[2].image}
              alt={collectionsData[2].title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />
            {/* Deep black to transparent gradient from bottom for crisp text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-45% to-transparent pointer-events-none" />
            <figcaption className="relative z-10 p-6 sm:p-8">
              <h3 className="font-serif-lux text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                {collectionsData[2].title}
              </h3>
              <p className="text-neutral-200 text-sm sm:text-base mt-1.5 max-w-md font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,1)]">
                {collectionsData[2].subtitle}
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Statement Section: Centered Editorial Quote */}
      <section
        aria-label="About Lumisa"
        className="pt-8 sm:pt-14 pb-20 sm:pb-28 px-6 sm:px-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-200/40 to-transparent mx-auto mb-6" />
        <blockquote className="space-y-4 text-center">
          <p className="font-serif-lux text-2xl sm:text-4xl md:text-5xl font-light text-white leading-snug tracking-tight">
            &ldquo;Lumisa is a boutique for the pieces you reach for every day, and the ones you save for the nights that matter.&rdquo;
          </p>
          <p className="font-serif-lux italic text-lg sm:text-2xl text-neutral-400 font-light">
            Chosen with care. Made to be worn, not kept in a box.
          </p>
          <div className="pt-2">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-300 font-light">
              For the woman you are
            </span>
          </div>
        </blockquote>
      </section>

      {/* Modern Creative Luxury 10% Inaugural Privilege Card */}
      <section
        id="signup"
        aria-labelledby="f-title"
        className="pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto"
      >
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-neutral-900/90 via-black to-neutral-950/95 backdrop-blur-xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
          {/* Subtle gold ambient glow behind card */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column (5 cols on desktop) */}
            <div className="relative lg:col-span-5 min-h-[320px] lg:min-h-[480px] overflow-hidden group">
              <Image
                src="/images/collection-accessories.webp"
                alt="Lumisa Inaugural Privilege"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/40 lg:to-black" />
              
              {/* Floating chic badge on image */}
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest text-amber-200/90 bg-black/70 backdrop-blur-md border border-amber-300/30 font-medium">
                  ✦ Opening Privilege
                </span>
              </div>

              {/* Bottom tag on image */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-serif-lux text-xl sm:text-2xl italic text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  The Inaugural Edit
                </p>
                <p className="text-xs text-neutral-300 font-light mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  Handcrafted pieces, packaged with intention. Complimentary delivery across Nepal.
                </p>
              </div>
            </div>

            {/* Content & Form Column (7 cols on desktop) */}
            <div className="relative lg:col-span-7 p-7 sm:p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-amber-200/90 font-medium">
                  Inaugural Guest Privilege
                </span>
              </div>

              <h2
                id="f-title"
                className="font-serif-lux text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-[1.15]"
              >
                Enjoy 10% off your first order
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base font-light mt-3 max-w-lg leading-relaxed">
                Join our private opening list with your email address or mobile number to unlock your instant 10% discount voucher and early lookbook access.
              </p>

              {/* The Interactive Signup Form */}
              <div className="mt-7 w-full">
                <SignupForm
                  id="offer-contact"
                  source="inaugural-offer-card"
                  buttonLabel="Claim 10% Off"
                  placeholder="Email address or phone number"
                />
              </div>

              {/* 3 Luxury Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-7 mt-7 border-t border-white/10 text-neutral-400">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-300/80 text-sm mt-0.5">✦</span>
                  <div>
                    <h5 className="text-xs font-medium text-white tracking-wide">10% Voucher</h5>
                    <p className="text-[11px] text-neutral-400 font-light mt-0.5">Instant code reveal</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-amber-300/80 text-sm mt-0.5">✦</span>
                  <div>
                    <h5 className="text-xs font-medium text-white tracking-wide">Private Preview</h5>
                    <p className="text-[11px] text-neutral-400 font-light mt-0.5">Early lookbook access</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-amber-300/80 text-sm mt-0.5">✦</span>
                  <div>
                    <h5 className="text-xs font-medium text-white tracking-wide">Nepal Courier</h5>
                    <p className="text-[11px] text-neutral-400 font-light mt-0.5">Complimentary delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centered Luxury Footer */}
      <footer className="pt-6 pb-16 sm:pt-10 sm:pb-20 px-6 max-w-xl mx-auto flex flex-col items-center text-center space-y-4 text-xs text-neutral-400 font-light">
        {/* Social Links Centered */}
        <div className="flex items-center gap-5 text-neutral-300">
          <a
            href="https://instagram.com/lumisa_official"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors tracking-wide"
          >
            Instagram
          </a>
          <span className="text-neutral-600">&bull;</span>
          <a
            href="https://facebook.com/lumisa.official"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors tracking-wide"
          >
            Facebook
          </a>
          <span className="text-neutral-600">&bull;</span>
          <a
            href="#top"
            className="hover:text-white transition-colors tracking-wide"
          >
            Back to top ↑
          </a>
        </div>

        {/* Signature Editorial Tagline */}
        <p className="italic font-serif-lux text-base sm:text-lg text-neutral-300 tracking-wide">
          For the woman you are
        </p>

        {/* Copyright */}
        <p className="text-[11px] text-neutral-500 tracking-wider">
          &copy; {new Date().getFullYear()} Lumisa. All rights reserved.
        </p>
      </footer>

      {/* Lookbook Modal */}
      <CollectionModal
        item={selectedCollection}
        onClose={() => setSelectedCollection(null)}
      />
    </main>
  );
}
