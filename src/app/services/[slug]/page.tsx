import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQAccordion } from "@/components/FAQAccordion";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";

export async function generateStaticParams() { 
  await connectDB();
  const services = await Service.find({}, 'slug').lean();
  return services.map((service) => ({ slug: service.slug })); 
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const service = await Service.findOne({ slug }).lean();
  if (!service) return {};
  return { 
    title: `${service.title} Patna | Urban Shine Cleaning`, 
    description: `${service.description} Request ${service.title.toLowerCase()} from Urban Shine Cleaning in Patna, Bihar.`,
    keywords: [`${service.title} Patna`, `${service.category} Bihar`, "Cleaning Services", "Urban Shine Cleaning"],
    alternates: { canonical: `/services/${slug}` }
  };
}

const process = [
  ["Inspection", "We begin by understanding the cleaning areas and requirements you have shared.", "/images/home-cleaning/home_cleaning_inspection_1787974195393.jpg"],
  ["Surface preparation", "The accessible space is prepared thoughtfully for the cleaning requirement.", "/images/home-cleaning/home_cleaning_preparation_1787974207746.jpg"],
  ["Deep cleaning", "The selected areas receive the focused professional cleaning attention requested.", "/images/home-cleaning/home_cleaning_deep_clean_1787974235234.jpg"],
  ["Final inspection", "A final look helps ensure the agreed focus areas have received attention.", "/images/home-cleaning/home_cleaning_final_1787974250860.jpg"],
];

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const service = await Service.findOne({ slug }).lean();
  if (!service) notFound();

  const serviceImage = `/api/images/${service.image}`;
  const whatWeCleanImages = (service.whatWeCleanImages || []).map((id: string) => `/api/images/${id}`);

  const serviceFaqs = [
    { question: `What areas can be included in ${service.title.toLowerCase()}?`, answer: `The focus can be shaped around your accessible areas and needs. Examples include ${(service.whatWeClean || []).slice(0, 3).join(", ").toLowerCase()} and more.` },
    { question: "Can I share a specific cleaning requirement?", answer: "Yes. Please use the additional requirements field while booking to explain your space and the areas you would like to prioritise." },
    { question: "How do I request this service in Patna?", answer: "Choose the book-this-service option and share your preferred date, property details and requirement. This is an enquiry, so relevant details can be understood before service." },
  ];
  return <>
    <section className="service-hero"><Image src={serviceImage} alt={service.title} fill priority sizes="100vw" /><div className="service-hero-wash" /><div className="shell service-hero-content"><div><p className="eyebrow eyebrow--light">{service.category}</p><h1>Professional<br /><em>{service.title}</em></h1><p>{service.heroCopy}</p><Link href={`/book-service?service=${encodeURIComponent(service.title)}`} className="button button--light">Book {service.title} <span>↗</span></Link></div><div className="service-hero-mini"><span>Urban Shine</span><strong>Fresh attention<br />to every detail.</strong></div></div></section>
    <section className="section shell what-section"><div className="section-heading split-heading"><div><p className="eyebrow">Service focus</p><h2>What We <em>Clean</em></h2></div><p>These are editable examples of the accessible areas that may be included in your cleaning requirement.</p></div><div className="what-grid">{(service.whatWeClean || []).map((area: string, index: number) => <article key={area} className="what-card"><Image src={whatWeCleanImages[index] || serviceImage} alt={`Urban Shine cleaning ${area}`} fill sizes="(max-width: 700px) 44vw, 16vw" /><div><span>0{index + 1}</span><h3>{area}</h3></div></article>)}</div></section>
    <section className="section process-section"><div className="shell"><div className="section-heading center-heading"><p className="eyebrow">A clear approach</p><h2>Our Cleaning <em>Process</em></h2><p>A simple, considered sequence from your shared requirement through to the final look.</p></div><div className="process-grid">{process.map(([title, copy, image], index) => <article className="process-card" key={title}><div className="process-image"><Image src={image as string} alt={`Cleaning process: ${title}`} fill sizes="(max-width: 700px) 90vw, 22vw" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="section shell education-split"><div className="education-image image-frame"><Image src="/images/about/cleaning-equipment.jpg" alt="Professional cleaning equipment and team" fill sizes="(max-width: 800px) 92vw, 50vw" /></div><div className="education-copy"><p className="eyebrow">Made for real spaces</p><h2>Why Professional<br /><em>Cleaning?</em></h2><p>{service.benefit}</p><p>Whether you are preparing for guests, resetting after a busy week, or giving a high-use area more focused care, a professional approach helps bring clarity to your space.</p><Link href={`/book-service?service=${encodeURIComponent(service.title)}`} className="text-link">Request this service <span>→</span></Link></div></section>
    <section className="section shell service-faq-section"><div className="service-faq-copy"><p className="eyebrow">Helpful answers</p><h2>Questions About<br /><em>{service.title}?</em></h2><p>Start with these common questions, or share your own requirement when you book.</p></div><FAQAccordion items={serviceFaqs} compact /></section>
    <section className="final-cta"><div className="shell final-cta-inner"><div><p className="eyebrow eyebrow--light">A fresher space starts here</p><h2>Ready For A Cleaner Space?</h2><p>Request {service.title.toLowerCase()} for your Patna home or workplace.</p></div><Link href={`/book-service?service=${encodeURIComponent(service.title)}`} className="button button--light">Book this service <span>↗</span></Link></div></section>
  </>;
}
