import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Urban Shine Cleaning | Our Story in Patna",
  description: "Learn about Urban Shine Cleaning, a Patna-based professional cleaning service for homes, offices and specialised spaces. We make your space feel fresh again.",
  keywords: ["About Urban Shine Cleaning", "Cleaning Company Patna", "Local Cleaners Bihar", "Professional Cleaners in Patna"],
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return <>
    <section className="page-hero page-hero--about"><Image src="/images/about/professional-cleaning-team.jpg" alt="Professional Urban Shine Cleaning team" fill priority sizes="100vw" /><div className="page-hero-wash" /><div className="shell page-hero-content"><p className="eyebrow eyebrow--light">About Urban Shine</p><h1>Making Spaces Feel<br /><em>Fresh Again.</em></h1><p>Urban Shine Cleaning is a Patna-based cleaning service for homes, apartments, offices and the everyday spaces that deserve thoughtful care.</p></div></section>
    <section className="section shell about-intro"><div className="about-intro-image image-frame"><Image src="/images/about/cleaning-equipment.jpg" alt="Professional cleaning equipment ready for service" fill sizes="(max-width: 800px) 92vw, 46vw" /></div><div><p className="eyebrow">Our point of view</p><h2>A Fresh Start For<br /><em>Everyday Spaces.</em></h2><p>Cleaning can be a practical task, but the way a clean space feels can change the whole day. Urban Shine Cleaning exists to make that feeling more accessible for people across Patna.</p><p>From a familiar living room to a busy office, the focus is simple: a clean, organised and service-focused experience around the spaces you use most.</p><Link href="/services" className="text-link">Explore cleaning services <span>→</span></Link></div></section>
    <section className="section section-tint"><div className="shell"><div className="section-heading center-heading"><p className="eyebrow">What guides us</p><h2>Thoughtful Service,<br /><em>Clear Choices.</em></h2></div><div className="about-principles"><article><span>✦</span><h3>Complete solutions</h3><p>One place to explore home, office, furniture, appliance and outdoor cleaning requirements.</p></article><article><span>⌁</span><h3>Space-led planning</h3><p>Start with a room, a home size or a focused requirement and tell us what matters to you.</p></article><article><span>→</span><h3>Easy to begin</h3><p>A clear online booking form helps you share the key details before service.</p></article></div></div></section>
    <section className="section shell about-location"><div><p className="eyebrow">Proudly local</p><h2>Cleaning Service<br />For <em>Patna, Bihar.</em></h2></div><div><p>Urban Shine Cleaning is focused on serving the spaces where Patna lives and works—homes, apartments, offices and the small spaces in between.</p><Link href="/contact" className="button">Contact Urban Shine <span>↗</span></Link></div></section>
  </>;
}
