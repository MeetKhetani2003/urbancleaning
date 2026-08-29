import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import faqs from "../../../data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Urban Shine Cleaning Patna",
  description: "Find answers to common questions about home, office, and specialised cleaning services in Patna from Urban Shine Cleaning.",
  keywords: ["Urban Shine FAQs", "Cleaning Service Questions Patna", "Cleaning Enquiry Help"],
  alternates: { canonical: "/faqs" }
};

export default function FAQsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(group => group.questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    })))
  };

  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <section className="page-top page-top--faq"><div className="shell"><p className="eyebrow">Helpful answers</p><h1>Questions, <em>Made Clear.</em></h1><p>Find a starting point for common home, specialised and office-cleaning enquiries. Your specific requirement can always be shared when you book.</p></div></section>
    <section className="section shell faq-page-list">{faqs.map((group, index) => <div className="faq-group" key={group.title}><div className="faq-group-intro"><span>0{index + 1}</span><p className="eyebrow">{group.title}</p><h2>{group.title}</h2><p>{group.intro}</p></div><FAQAccordion items={group.questions} /></div>)}</section>
    <section className="section shell faq-outro"><div><p className="eyebrow">Still need help?</p><h2>Your Space Is Unique.<br /><em>Tell Us About It.</em></h2></div><div><p>Use the enquiry form to describe the room, office or detail you would like to have cleaned.</p><Link href="/book-service" className="button">Request cleaning service <span>↗</span></Link></div></section>
  </>;
}
