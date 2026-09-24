import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Lumisa — Handbags, Jewellery & Accessories | Opening Soon",
  description:
    "Lumisa is an exclusive luxury boutique in Kathmandu, Nepal, curating structured leather handbags, 18K gold vermeil jewellery, and fine accessories. Register to claim 10% off your inaugural order.",
  applicationName: "Lumisa",
  authors: [{ name: "Lumisa" }],
  generator: "Next.js",
  keywords: [
    "Lumisa",
    "Lumisa Nepal",
    "luxury boutique Nepal",
    "designer handbags Kathmandu",
    "fine jewellery Nepal",
    "18K gold vermeil jewellery",
    "luxury accessories Nepal",
    "boutique opening Kathmandu",
    "For the woman you are",
  ],
  metadataBase: new URL("https://lumisanepal.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Lumisa — Handbags, Jewellery & The Finishing Touches",
    description:
      "A boutique for the pieces you reach for every day, and the ones you save for the nights that matter. Opening soon in Kathmandu. Claim 10% off.",
    url: "https://lumisanepal.com",
    siteName: "Lumisa",
    images: [
      {
        url: "https://lumisanepal.com/images/og-image.jpg",
        secureUrl: "https://lumisanepal.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Lumisa Luxury Boutique — Handbags, Jewellery & Accessories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumisa — Handbags, Jewellery & The Finishing Touches",
    description:
      "A boutique for the pieces you reach for every day, and the ones you save for the nights that matter. Opening soon. Claim 10% off.",
    images: ["https://lumisanepal.com/images/og-image.jpg"],
    creator: "@lumisa_official",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/images/brand-mark.png" }],
  },
  other: {
    "theme-color": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JewelryStore",
      "@id": "https://lumisanepal.com/#store",
      name: "Lumisa",
      alternateName: ["Lumisa Nepal", "Lumisa Boutique"],
      url: "https://lumisanepal.com",
      logo: "https://lumisanepal.com/images/lumisa-logo-full.png",
      image: "https://lumisanepal.com/images/og-image.jpg",
      description:
        "Lumisa is an exclusive luxury boutique in Kathmandu, Nepal, curating structured leather handbags, fine jewellery in 18K gold vermeil, and designer accessories.",
      priceRange: "$$$",
      currenciesAccepted: "NPR, USD",
      paymentAccepted: "Credit Card, Debit Card, FonePay, Cash on Delivery",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressRegion: "Bagmati",
        addressCountry: "NP",
      },
      sameAs: [
        "https://instagram.com/lumisa_official",
        "https://facebook.com/lumisa.official",
      ],
      makesOffer: {
        "@type": "Offer",
        name: "10% Inaugural Guest Privilege",
        description: "10% off inaugural purchase voucher code LUMISA10 upon registration.",
        priceCurrency: "NPR",
        availability: "https://schema.org/PreOrder",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://lumisanepal.com/#website",
      url: "https://lumisanepal.com",
      name: "Lumisa",
      publisher: {
        "@id": "https://lumisanepal.com/#store",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://lumisanepal.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Lumisa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lumisa is an exclusive luxury boutique based in Kathmandu, Nepal, presenting three curated launch edits: structured Italian leather handbags, 18K gold vermeil fine jewellery, and bespoke accessories including Swiss-movement timepieces and Extrait de Parfum.",
          },
        },
        {
          "@type": "Question",
          name: "When does Lumisa open?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lumisa is opening soon in Kathmandu, Nepal. Registered guests receive 48-hour priority pre-launch lookbook access before doors officially open to the public.",
          },
        },
        {
          "@type": "Question",
          name: "How can I claim the 10% inaugural discount?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter your email address or mobile number on lumisanepal.com to immediately receive voucher code LUMISA10 for 10% off your first purchase.",
          },
        },
        {
          "@type": "Question",
          name: "Does Lumisa deliver across Nepal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Lumisa provides insured, complimentary doorstep courier delivery across Nepal on all inaugural orders.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} dark`}>
      <head>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-amber-500/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
