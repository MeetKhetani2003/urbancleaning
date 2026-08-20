import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="mobile-bottom-cta" aria-label="Quick actions">
          <a href="/contact#enquiry"><span className="bottom-cta-icon">⌕</span>Call</a>
          <a href="/book-service" className="bottom-cta-book">Book cleaning <span aria-hidden>↗</span></a>
        </div>
      </body>
    </html>
  );
}
