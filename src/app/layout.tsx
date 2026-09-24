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
  title: "Lumisa — Opening Soon | Luxury Handbags, Jewellery & Accessories",
  description:
    "Lumisa is a luxury boutique for handbags, fine jewellery, and exquisite accessories. Opening soon in Kathmandu, Nepal. Request private access.",
  metadataBase: new URL("https://lumisanepal.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lumisa — Opening Soon",
    description:
      "Handbags, fine jewellery, and accessories. Curated for the woman you are. Opening soon in Kathmandu.",
    url: "https://lumisanepal.com",
    siteName: "Lumisa",
    images: [
      {
        url: "/images/hero-product.png",
        width: 1200,
        height: 630,
        alt: "Lumisa Luxury Boutique - Opening Soon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumisa — Opening Soon",
    description: "Handbags, fine jewellery, and accessories. For the woman you are.",
    images: ["/images/hero-product.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/images/brand-mark.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Lumisa",
              image: "https://lumisanepal.com/images/hero-product.png",
              description: "Luxury boutique for handbags, jewellery and accessories.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kathmandu",
                addressCountry: "NP",
              },
              url: "https://lumisanepal.com",
            }),
          }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-amber-500/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
