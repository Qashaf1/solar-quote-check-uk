import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
});

const siteUrl = "https://www.solarquotecheck.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Solar Quote Check UK | Free Solar Panel Eligibility Check",
    template: "%s | Solar Quote Check UK",
  },
  description:
    "Check if your home could benefit from solar panels in 60 seconds. Get a free, no-obligation quote from trusted UK solar installers.",
  keywords: [
    "solar panels UK",
    "solar quote",
    "solar panel eligibility check",
    "UK solar installers",
    "free solar quote",
  ],
  authors: [{ name: "Solar Quote Check UK" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Solar Quote Check UK",
    title: "Solar Quote Check UK | Free Solar Panel Eligibility Check",
    description:
      "Check if your home could benefit from solar panels in 60 seconds. Get a free, no-obligation quote from trusted UK solar installers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solar Quote Check UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Quote Check UK | Free Solar Panel Eligibility Check",
    description:
      "Check if your home could benefit from solar panels in 60 seconds. Get a free, no-obligation quote from trusted UK solar installers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Solar Quote Check UK",
      url: siteUrl,
      description:
        "Free solar panel eligibility checker and quote-matching service connecting UK homeowners with trusted solar installers.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Solar Quote Check UK",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      name: "Solar Panel Quote Matching",
      areaServed: "GB",
      provider: { "@id": `${siteUrl}/#organization` },
      description:
        "A free, no-obligation eligibility check that matches UK homeowners with trusted solar panel installers.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the quote free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Completing the eligibility checker and receiving a quote is completely free, with no hidden charges.",
          },
        },
        {
          "@type": "Question",
          name: "Am I obligated to buy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Your quote is no-obligation. You're free to compare it, think it over, or decide not to proceed at all.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The eligibility checker takes about 60 seconds to complete. Installers typically get in touch within a few working days.",
          },
        },
        {
          "@type": "Question",
          name: "Can I compare installers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Depending on your details, you may be contacted by more than one trusted installer so you can compare options.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
