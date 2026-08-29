import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Package } from "@/models/Package";
import { Contact } from "@/models/Contact";
import { ServiceInquireButton } from "@/components/ServiceInquireButton";

export async function generateStaticParams() { 
  await connectDB();
  const pkgs = await Package.find({}, 'slug').lean();
  return pkgs.map((item) => ({ slug: item.slug })); 
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; 
  await connectDB();
  const item = await Package.findOne({ slug }).lean();
  return item ? { title: `${item.title} Patna`, description: `${item.description} Start an Urban Shine Cleaning enquiry in Patna.` } : {};
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  await connectDB();
  const item = await Package.findOne({ slug }).lean();
  if (!item) notFound();

  const contactData = await Contact.findOne({}).lean();
  const whatsappNumber = contactData?.whatsapp || '';
  const itemImage = `/api/images/${item.image}`;

  return <>
    <section className="service-hero package-detail-hero"><Image src={itemImage} alt={item.title} fill priority sizes="100vw" /><div className="service-hero-wash" /><div className="shell service-hero-content"><div><p className="eyebrow eyebrow--light">Home cleaning package</p><h1>{item.title}<br /><em>Made For Your Home.</em></h1>{item.price && <p className="text-xl font-medium text-[var(--mint)] mb-2 mt-[-10px]">{item.price}</p>}<p>{item.description} {item.rooms}</p><ServiceInquireButton serviceName={`${item.title} Package`} servicePrice={item.price} whatsappNumber={whatsappNumber} className="button button--light">Inquire Now <span>↗</span></ServiceInquireButton></div><div className="service-hero-mini"><span>Urban Shine</span><strong>A fresher feeling,<br />room by room.</strong></div></div></section>
    <section className="section shell package-focus"><div className="package-focus-intro"><p className="eyebrow">An editable scope</p><h2>A Thoughtful Starting<br />Point For <em>Your Home.</em></h2><p>This package page gives you a clear home-size reference. You can share the exact rooms and requirements you want to prioritise when you submit an enquiry.</p></div><div className="package-focus-list">{(item.included || []).map((focus: string, index: number) => <div key={focus}><span>0{index + 1}</span><strong>{focus}</strong><small>Share your specific requirement</small></div>)}</div></section>
    <section className="section process-section"><div className="shell package-journey"><div><p className="eyebrow">Your enquiry journey</p><h2>Simple From First<br /><em>Click To Clean.</em></h2></div><div className="journey-list"><p><b>01</b> Select the package that matches your home.</p><p><b>02</b> Tell us about the areas and date you prefer.</p><p><b>03</b> Confirm the right cleaning requirement for your space.</p></div></div></section>
    <section className="final-cta"><div className="shell final-cta-inner"><div><p className="eyebrow eyebrow--light">Your home, refreshed</p><h2>Ready To Request {item.title}?</h2><p>Start with your home size, then make the request your own.</p></div><ServiceInquireButton serviceName={`${item.title} Package`} servicePrice={item.price} whatsappNumber={whatsappNumber} className="button button--light">Inquire about this package <span>↗</span></ServiceInquireButton></div></section>
  </>;
}
