import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = { title: "Book a Cleaning Service", description: "Request home, office or specialised cleaning with Urban Shine Cleaning in Patna, Bihar." };

export default async function BookServicePage({ searchParams }: { searchParams: Promise<{ service?: string; package?: string }> }) {
  const query = await searchParams;
  return <>
    <section className="booking-page"><div className="booking-visual"><Image src="/images/hero/cleaning-team.jpg" alt="Professional cleaning team in a bright home" fill priority sizes="(max-width: 900px) 100vw, 42vw" /><div className="booking-visual-wash" /><div className="booking-visual-content"><p className="eyebrow eyebrow--light">Urban Shine Cleaning</p><h1>A Fresher Space<br />Starts <em>Here.</em></h1><p>Share the essentials below. Every request begins with your space and the cleaning attention you need.</p><div className="booking-visual-points"><span>Homes & apartments</span><span>Offices & workspaces</span><span>Specialised cleaning</span></div></div></div><div className="booking-panel"><div className="booking-panel-inner"><p className="eyebrow">Request a service</p><h2>Tell Us What<br /><em>Needs Cleaning.</em></h2><p className="booking-intro">Complete the form and share the details that will help us understand your request.</p>{query.package && <div className="package-query-note"><span>✦</span><p>Package selected: <strong>{query.package}</strong></p></div>}<BookingForm initialService={query.service ?? ""} /><p className="booking-help">Need a different starting point? You can <a href="/services">explore all services</a> before booking.</p></div></div></section>
  </>;
}
