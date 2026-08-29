import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanshinecleaning.in"),
  title: { default: "Urban Shine Cleaning | Professional Cleaning Service in Patna", template: "%s | Urban Shine Cleaning" },
  description: "Urban Shine Cleaning offers professional home, office and specialised cleaning service enquiries in Patna, Bihar.",
  keywords: ["Urban Shine Cleaning", "Cleaning Service in Patna", "Home Cleaning Service Patna", "Bathroom Cleaning Patna", "Office Cleaning Patna"],
  openGraph: { title: "Urban Shine Cleaning | Professional Cleaning Service in Patna", description: "Fresh, professional cleaning solutions for homes, offices and every space in between.", type: "website", locale: "en_IN" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0c5f50", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Urban Shine Cleaning",
    "image": "https://urbanshinecleaning.in/images/hero/cleaning-team.jpg",
    "description": "Urban Shine Cleaning offers professional home, office and specialised cleaning service enquiries in Patna, Bihar.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Patna",
      "addressRegion": "Bihar",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.5941,
      "longitude": 85.1376
    },
    "url": "https://urbanshinecleaning.in",
    "telephone": "+91-0000000000",
    "priceRange": "?"
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="mobile-bottom-cta" aria-label="Quick actions">
          <a href="/contact#enquiry"><span className="bottom-cta-icon">⌕ </span>Call</a>
          <a href="/book-service" className="bottom-cta-book">Book cleaning <span aria-hidden>↗</span></a>
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
