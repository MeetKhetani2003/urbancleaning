import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PackageCard } from "@/components/PackageCard";
import { connectDB } from "@/lib/db";
import { Package } from "@/models/Package";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "2 BHK, 3 BHK & 4 BHK Cleaning Packages | Patna",
  description: "Explore editable home cleaning package enquiries for 2 BHK, 3 BHK and 4 BHK homes in Patna. Professional whole-home cleaning services.",
  keywords: ["2 BHK Cleaning Patna", "3 BHK Cleaning Service", "4 BHK Deep Cleaning Patna", "Home Cleaning Packages"],
  alternates: { canonical: "/packages" }
};

export default async function PackagesPage() {
  await connectDB();
  
  const rawPackages = await Package.find({}).lean();
  const packages = rawPackages.map(p => ({
    ...p,
    _id: p._id.toString(),
    image: `/api/images/${p.image}`
  }));
  return <>
    <section className="page-hero page-hero--packages"><Image src="/images/packages/3bhk-cleaning.jpg" alt="Freshly cleaned modern apartment interior" fill priority sizes="100vw" /><div className="page-hero-wash" /><div className="shell page-hero-content"><p className="eyebrow eyebrow--light">Home cleaning packages</p><h1>Your Home, <em>Thoughtfully<br />Cared For.</em></h1><p>Choose a home-size starting point, then tell us about the rooms and cleaning attention your space needs.</p><Link className="button button--light" href="/book-service">Request a package <span>↗</span></Link></div></section>
    <section className="section shell packages-intro"><div className="section-heading center-heading"><p className="eyebrow">Find your fit</p><h2>Choose Your Home&apos;s<br /><em>Starting Point.</em></h2><p>Our BHK pages are designed to make a home-cleaning enquiry clearer. Exact requirements can be shared before service.</p></div><div className="package-grid">{packages.map((item, index) => <PackageCard key={item.slug} item={item} featured={index === 1} />)}</div></section>
    <section className="section section-tint"><div className="shell package-explainer"><div className="package-explainer-image image-frame"><Image src="/images/hero/cleaning-team.jpg" alt="Professional cleaning service at a home" fill sizes="(max-width: 800px) 92vw, 45vw" /></div><div><p className="eyebrow">A flexible request</p><h2>Cleaning That Starts<br />With <em>Your Space.</em></h2><div className="check-list"><p><span>✓</span> Choose the BHK size that best matches your home.</p><p><span>✓</span> Share the areas you would like to prioritise.</p><p><span>✓</span> Submit an enquiry with your preferred date and time.</p></div><Link href="/book-service" className="button">Start your enquiry <span>↗</span></Link></div></div></section>
  </>;
}
