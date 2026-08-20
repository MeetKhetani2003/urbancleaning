import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "How It Works", description: "See how to request home, office and specialised cleaning with Urban Shine Cleaning in Patna." };

const steps = [
  ["Choose Your Service", "Browse the cleaning service you need, from one focused area to a full home or professional workspace.", "/images/how-it-works/choose-service.jpg"],
  ["Book Your Service", "Share the details of your property, preferred date and the areas you would like to prioritise.", "/images/how-it-works/schedule-service.jpg"],
  ["Our Team Gets To Work", "Your cleaning requirement becomes the starting point for professional attention at your location.", "/images/how-it-works/professional-cleaning.jpg"],
  ["Enjoy A Cleaner Space", "Step back into a fresher-feeling space, thoughtfully cared for around the details you shared.", "/images/how-it-works/spotless-home.jpg"],
];

export default function HowItWorksPage() {
  return <>
    <section className="page-top page-top--how"><div className="shell"><p className="eyebrow">A simple experience</p><h1>From Your First Click<br />To A <em>Fresher Space.</em></h1><p>Requesting cleaning should feel clear and straightforward. Here&apos;s the journey from choosing a service to enjoying the result.</p><Link href="/book-service" className="button">Start your booking <span>↗</span></Link></div></section>
    <section className="section shell how-timeline"><div className="timeline-line" />{steps.map(([title, copy, image], index) => <article className={`how-step ${index % 2 ? "how-step--reverse" : ""}`} key={title}><div className="how-step-number"><span>0{index + 1}</span><i>{index < steps.length - 1 ? "↓" : "✦"}</i></div><div className="how-step-image"><Image src={image} alt={title} fill sizes="(max-width: 800px) 92vw, 44vw" /></div><div className="how-step-copy"><p className="eyebrow">Step 0{index + 1}</p><h2>{title}</h2><p>{copy}</p>{index === 0 && <Link href="/services" className="text-link">Explore all services <span>→</span></Link>}{index === 1 && <Link href="/book-service" className="text-link">Request cleaning service <span>→</span></Link>}</div></article>)}</section>
    <section className="section why-section"><div className="shell how-values"><div><p className="eyebrow">Designed around your needs</p><h2>A Cleaner Process,<br />From The <em>Start.</em></h2></div><p>Whether your request is for a single bathroom, an office meeting room or an entire home, the journey starts with the specific cleaning attention your space needs.</p></div></section>
  </>;
}
