import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { PackageCard } from "@/components/PackageCard";
import { ServiceCard } from "@/components/ServiceCard";
import packages from "../../data/packages";
import services from "../../data/services";
import { comparisons } from "../../data/gallery";

export const metadata: Metadata = {
  title: "Professional Cleaning Service in Patna",
  description: "Book home, office and specialised cleaning services with Urban Shine Cleaning in Patna, Bihar.",
};

const spaceItems = [
  ["Home", "Bedrooms, living rooms, kitchens, bathrooms and more.", "/services/full-home-cleaning"],
  ["Apartment", "2 BHK, 3 BHK and 4 BHK cleaning.", "/packages"],
  ["Office", "Workspaces, meeting rooms and common areas.", "/services/office-cleaning"],
  ["Outdoor", "Balconies, windows and garden areas.", "/services/balcony-cleaning"],
];

export default function HomePage() {
  const featured = services.slice(0, 8);
  const specialised = services.filter((service) => service.category === "Specialised Cleaning" || service.slug === "window-cleaning" || service.slug === "balcony-cleaning" || service.slug === "garden-cleaning");
  return (
    <>
      <section className="hero">
        <div className="hero-image"><Image src="/images/hero/cleaning-team.jpg" alt="Professional Urban Shine Cleaning team working in a bright home" fill priority sizes="100vw" /><div className="hero-image-wash" /></div>
        <div className="shell hero-content">
          <div className="hero-copy fade-up">
            <p className="eyebrow eyebrow--light">Professional cleaning services in Patna</p>
            <h1>A Cleaner Home.<br /><em>A Fresher Space.</em><br />A Better Day.</h1>
            <p className="hero-description">Professional cleaning solutions for homes, apartments, offices and every space that deserves a spotless finish.</p>
            <div className="hero-buttons"><Link href="/book-service" className="button button--light">Book a cleaning <span aria-hidden>↗</span></Link><Link href="/services" className="button button--ghost">Explore services <span aria-hidden>→</span></Link></div>
            <div className="hero-trust"><span>Home cleaning</span><span>Office cleaning</span><span>Specialised cleaning</span></div>
          </div>
          <div className="hero-float-card">
            <span className="float-card-mark">✦</span><div><small>Made for Patna</small><strong>Complete cleaning<br />for every space.</strong></div><span className="float-arrow">↗</span>
          </div>
        </div>
      </section>

      <section className="section shell services-home-section">
        <div className="section-heading split-heading"><div><p className="eyebrow">Our cleaning services</p><h2>Whatever Needs Cleaning,<br /><em>We&apos;ve Got It Covered.</em></h2></div><div><p>From bathrooms and kitchens to sofas, mattresses, windows, balconies and complete homes — Urban Shine Cleaning brings professional cleaning to your doorstep.</p><Link href="/services" className="text-link">Explore all services <span aria-hidden>→</span></Link></div></div>
        <div className="service-grid">
          {featured.map((service, index) => <ServiceCard key={service.slug} service={service} priority={index < 3} />)}
        </div>
      </section>

      <section className="section section-tint"><div className="shell space-split">
        <div className="space-image image-frame"><Image src="/images/hero/clean-home.jpg" alt="Fresh and thoughtfully arranged modern home" fill sizes="(max-width: 800px) 92vw, 48vw" /><span className="image-note">Patna, Bihar <b>•</b> At your doorstep</span></div>
        <div className="space-copy"><p className="eyebrow">Cleaning for every space</p><h2>From One Room To<br /><em>The Entire Property</em></h2><div className="space-links">{spaceItems.map(([title, text, href], index) => <Link href={href} key={title} className="space-link"><span className="space-number">0{index + 1}</span><span><strong>{title}</strong><small>{text}</small></span><i>↗</i></Link>)}</div><Link href="/services" className="button">Explore all services <span aria-hidden>↗</span></Link></div>
      </div></section>

      <section className="section shell packages-section"><div className="section-heading center-heading"><p className="eyebrow">BHK cleaning packages</p><h2>Choose The Cleaning Package<br /><em>For Your Home</em></h2><p>Explore a home-size starting point, then share the cleaning requirements that matter to you.</p></div><div className="package-grid">{packages.map((item, index) => <PackageCard key={item.slug} item={item} featured={index === 1} />)}</div></section>

      <section className="section commercial-section"><div className="shell commercial-grid"><div className="commercial-copy"><p className="eyebrow eyebrow--light">Commercial cleaning</p><h2>Professional Cleaning<br />For <em>Professional Spaces</em></h2><p>From everyday workspaces to rooms made for big conversations, choose a more polished setting for your people and visitors.</p><Link href="/book-service" className="button button--light">Request office cleaning <span aria-hidden>↗</span></Link></div><div className="commercial-image"><Image src="/images/services/office-cleaning.jpg" alt="Professional cleaner caring for a bright office" fill sizes="(max-width: 800px) 92vw, 48vw" /><div className="commercial-list"><Link href="/services/office-cleaning">Office cleaning <span>↗</span></Link><Link href="/services/meeting-room-cleaning">Meeting rooms <span>↗</span></Link><Link href="/services/window-cleaning">Window cleaning <span>↗</span></Link></div></div></div></section>

      <section className="section shell specialised-section"><div className="section-heading split-heading"><div><p className="eyebrow">Specialised cleaning</p><h2>Even The Small Things<br /><em>Deserve A Professional Clean.</em></h2></div><p>Discover dedicated cleaning for the everyday details around your home or workplace.</p></div><div className="specialised-grid">{specialised.map((service) => <Link href={`/services/${service.slug}`} className="special-pill" key={service.slug}><Image src={service.image} alt="" fill sizes="(max-width: 700px) 46vw, 20vw" /><span>{service.title}</span><b>↗</b></Link>)}</div></section>

      <section className="section why-section"><div className="shell"><div className="section-heading split-heading"><div><p className="eyebrow">The Urban Shine approach</p><h2>Why Choose <em>Urban Shine?</em></h2></div><p>One clear place to begin when your space needs a fresher, more considered clean.</p></div><div className="trust-grid"><article><span>01</span><h3>Complete Cleaning Solutions</h3><p>From individual spaces to complete homes and offices.</p></article><article><span>02</span><h3>Convenient Service</h3><p>Designed around the customer&apos;s cleaning requirements.</p></article><article><span>03</span><h3>Professional Approach</h3><p>A clean, organised and service-focused experience.</p></article><article><span>04</span><h3>One Place For Every Cleaning Need</h3><p>Home, office, furniture, appliances and outdoor spaces.</p></article></div></div></section>

      <section className="section shell difference-section"><div className="section-heading center-heading"><p className="eyebrow">The clean difference</p><h2>See The <em>Difference</em></h2><p>Move the slider to explore an illustrative before-and-after view of cleaning attention across everyday spaces.</p></div><div className="comparison-grid">{comparisons.slice(0, 2).map((item) => <BeforeAfterCard key={item.title} item={item} />)}</div><div className="section-cta-center"><Link href="/gallery" className="text-link">Explore the gallery <span aria-hidden>→</span></Link></div></section>

      <section className="final-cta"><div className="shell final-cta-inner"><div><p className="eyebrow eyebrow--light">Ready when you are</p><h2>Ready For A Cleaner Space?</h2><p>Tell us what needs attention and start your cleaning enquiry today.</p></div><Link href="/book-service" className="button button--light">Book a service <span aria-hidden>↗</span></Link></div></section>
    </>
  );
}
