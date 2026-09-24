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
    title: "Jewellery",
    subtitle: "Fine chains, drop earrings and rings to layer or wear alone.",
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
    subtitle: "Watches and fragrance to finish the look.",
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
    <main id="top" className="relative bg-black text-white min-h-screen overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Fixed Header with Real Logo and IG/FB Only */}
      <Navbar />

      {/* Hero Section: Only Title, Description, Countdown */}
      <SpotlightHero />

      {/* Collections Section ("What's Coming") */}
      <section
        id="collections"
        aria-labelledby="collections-heading"
        className="py-24 sm:py-36 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
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
            className="group relative overflow-hidden bg-neutral-950 cursor-pointer rounded-none md:row-span-2 min-h-[380px]"
          >
            <Image
              src={collectionsData[0].image}
              alt={collectionsData[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-[40%_50%] grayscale contrast-110 brightness-[0.72] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-95 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <h3 className="font-serif-lux text-3xl sm:text-4xl font-normal leading-tight">
                {collectionsData[0].title}
              </h3>
              <p className="text-neutral-400 text-sm mt-1.5 max-w-md font-light">
                {collectionsData[0].subtitle}
              </p>
            </figcaption>
          </figure>

          {/* Jewellery */}
          <figure
            onClick={() => setSelectedCollection(collectionsData[1])}
            className="group relative overflow-hidden bg-neutral-950 cursor-pointer rounded-none min-h-[280px]"
          >
            <Image
              src={collectionsData[1].image}
              alt={collectionsData[1].title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center grayscale contrast-110 brightness-[0.72] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-95 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <h3 className="font-serif-lux text-2xl sm:text-3xl font-normal leading-tight">
                {collectionsData[1].title}
              </h3>
              <p className="text-neutral-400 text-sm mt-1.5 max-w-md font-light">
                {collectionsData[1].subtitle}
              </p>
            </figcaption>
          </figure>

          {/* Accessories */}
          <figure
            onClick={() => setSelectedCollection(collectionsData[2])}
            className="group relative overflow-hidden bg-neutral-950 cursor-pointer rounded-none min-h-[280px]"
          >
            <Image
              src={collectionsData[2].image}
              alt={collectionsData[2].title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center grayscale contrast-110 brightness-[0.72] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-95 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <h3 className="font-serif-lux text-2xl sm:text-3xl font-normal leading-tight">
                {collectionsData[2].title}
              </h3>
              <p className="text-neutral-400 text-sm mt-1.5 max-w-md font-light">
                {collectionsData[2].subtitle}
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Statement Section */}
      <section
        aria-label="About Lumisa"
        className="py-28 sm:py-36 px-6 sm:px-10 md:px-16 border-t border-white/16"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <blockquote className="font-serif-lux text-2xl sm:text-4xl md:text-5xl font-light text-white leading-[1.2] tracking-[-0.01em]">
            <p>Lumisa is a boutique for the pieces you reach for every day, and the ones you save for the nights that matter.</p>
            <p className="text-neutral-400 mt-4">Chosen with care. Made to be worn, not kept in a box.</p>
          </blockquote>

          <div className="pt-8 flex items-center gap-4 text-sm text-neutral-400 tracking-[0.04em]">
            <div className="relative w-9 h-11">
              <Image
                src="/images/brand-mark.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span>For the woman you are</span>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section
        id="signup"
        aria-labelledby="f-title"
        className="py-24 sm:py-32 px-6 sm:px-10 md:px-16 border-t border-white/16 text-center flex flex-col items-center"
      >
        <h2
          id="f-title"
          className="font-serif-lux text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white max-w-sm"
        >
          Be first through the door
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base font-light mt-4 max-w-md">
          Join the list to hear our opening date first and get early access to the collection.
        </p>

        <div className="w-full mt-8">
          <SignupForm
            id="final-email"
            source="final-section"
            buttonLabel="Notify me"
            placeholder="Your email address"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 sm:px-10 md:px-16 border-t border-white/16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-light">
        <span>&copy; {new Date().getFullYear()} Lumisa. All rights reserved.</span>
        <div className="flex items-center gap-4 text-neutral-300">
          <a
            href="https://instagram.com/lumisa_official"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @lumisa_official
          </a>
          <span>&bull;</span>
          <a
            href="https://facebook.com/lumisa.official"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @lumisa.official
          </a>
          <span>&bull;</span>
          <span className="italic font-serif-lux">For the woman you are</span>
        </div>
      </footer>

      {/* Lookbook Modal */}
      <CollectionModal
        item={selectedCollection}
        onClose={() => setSelectedCollection(null)}
      />
    </main>
  );
}
