import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import services from "../../../data/services";

export const metadata: Metadata = { title: "Cleaning Services in Patna", description: "Explore professional home, office, furniture and specialised cleaning services in Patna from Urban Shine Cleaning." };

export default function ServicesPage() {
  const groups = [
    ["Home & furniture care", "Everyday spaces, from one important room to the whole home.", services.filter((s) => ["Home Cleaning", "Furniture Care"].includes(s.category))],
    ["Professional spaces", "A clear, polished start for workspaces and meeting rooms.", services.filter((s) => s.category === "Commercial Cleaning")],
    ["Outdoor & specialised", "The small details and open-air areas that complete a space.", services.filter((s) => ["Outdoor Cleaning", "Specialised Cleaning"].includes(s.category))],
  ] as const;
  return <>
    <section className="page-hero page-hero--services"><Image src="/images/hero/clean-home.jpg" alt="Beautiful clean home interior" fill priority sizes="100vw" /><div className="page-hero-wash" /><div className="shell page-hero-content"><p className="eyebrow eyebrow--light">Our service menu</p><h1>Cleaning That <em>Meets You</em><br />Where You Are.</h1><p>One-room refreshes, complete homes, professional workspaces and the practical details in between.</p><Link className="button button--light" href="/book-service">Book a cleaning <span>↗</span></Link></div></section>
    <section className="section shell services-page-intro"><div className="section-heading split-heading"><div><p className="eyebrow">Complete cleaning solutions</p><h2>Choose Your <em>Starting Point.</em></h2></div><p>Every service is a simple starting point for your requirement. Select what needs care, then tell us more when you book.</p></div></section>
    {groups.map(([title, copy, list], groupIndex) => <section className={`section shell service-group ${groupIndex === 1 ? "service-group--tint" : ""}`} key={title}><div className="group-heading"><span>0{groupIndex + 1}</span><div><h2>{title}</h2><p>{copy}</p></div></div><div className="service-grid">{list.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section>)}
    <section className="section shell service-enquiry-banner"><div><p className="eyebrow">Need something specific?</p><h2>Tell us about your<br /><em>cleaning requirement.</em></h2></div><Link href="/book-service" className="button">Request cleaning service <span>↗</span></Link></section>
  </>;
}
