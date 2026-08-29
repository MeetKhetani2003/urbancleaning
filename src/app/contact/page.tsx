import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { connectDB } from "@/lib/db";
import { Contact } from "@/models/Contact";

export const metadata: Metadata = {
  title: "Contact Urban Shine Cleaning | Book in Patna",
  description: "Contact Urban Shine Cleaning for home, office and specialised cleaning enquiries in Patna, Bihar. Get a free quote today.",
  keywords: ["Contact Urban Shine Cleaning", "Book Cleaning Service Patna", "Cleaning Enquiry Bihar"],
  alternates: { canonical: "/contact" }
};

export default async function ContactPage() {
  await connectDB();
  const contact = await Contact.findOne({}).lean() || { phone: '', email: '', whatsapp: '', location: 'Patna, Bihar' };
  const hasDirectDetails = contact.phone || contact.email || contact.whatsapp;
  return <>
    <section className="page-top page-top--contact"><div className="shell"><p className="eyebrow">Get in touch</p><h1>Let&apos;s Make Your<br /><em>Space Shine.</em></h1><p>Tell us about your home, office or focused cleaning requirement. Urban Shine Cleaning serves Patna, Bihar.</p></div></section>
    <section className="section shell contact-grid">
      <div className="contact-info"><p className="eyebrow">Urban Shine Cleaning</p><h2>Professional<br /><em>Cleaning Service.</em></h2><div className="location-card"><span>⌖</span><div><small>Service location</small><strong>{contact.location}</strong><p>Home, office and specialised cleaning enquiries.</p></div></div>{hasDirectDetails && <div className="direct-contact">{contact.phone && <a href={`tel:${contact.phone}`}>Call {contact.phone}</a>}{contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}{contact.whatsapp && <a href={`https://wa.me/${contact.whatsapp}`}>WhatsApp us</a>}</div>}<p className="contact-note">Share your requirement through the form and we&apos;ll have the details needed to understand your request.</p></div>
      <div className="contact-form-wrap" id="enquiry"><p className="eyebrow">Send an enquiry</p><h2>How can we help?</h2><BookingForm variant="contact" /></div>
    </section>
    <section className="section section-tint"><div className="shell map-section"><div><p className="eyebrow">Our service area</p><h2>Made For The<br /><em>Spaces Of Patna.</em></h2><p>Urban Shine Cleaning is based in Patna, Bihar. Use the booking page for a full cleaning-service request with preferred date and property details.</p><Link href="/book-service" className="button">Book a service <span>↗</span></Link></div><div className="map-placeholder" aria-label="Patna, Bihar location placeholder"><div className="map-grain" /><span className="map-pin">⌖</span><strong>Patna, Bihar</strong><small>Location map placeholder</small></div></div></section>
  </>;
}
