import Link from "next/link";
import { BrandMark } from "./BrandMark";

const nav = [
  ["Home", "/"], ["Services", "/services"], ["Packages", "/packages"], ["How It Works", "/how-it-works"],
  ["Gallery", "/gallery"], ["About", "/about"], ["FAQs", "/faqs"], ["Contact", "/contact"],
];
const serviceLinks = [
  ["Bathroom Cleaning", "/services/bathroom-cleaning"], ["Kitchen Cleaning", "/services/kitchen-cleaning"],
  ["Sofa Cleaning", "/services/sofa-cleaning"], ["Mattress Cleaning", "/services/mattress-cleaning"],
  ["Full Home Cleaning", "/services/full-home-cleaning"], ["Office Cleaning", "/services/office-cleaning"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-intro">
          <BrandMark inverse />
          <p>Professional cleaning solutions for the spaces that make up your everyday life in Patna.</p>
          <Link href="/book-service" className="button button--light">Book a cleaning <span aria-hidden>↗</span></Link>
        </div>
        <div className="footer-col">
          <p className="footer-label">Navigate</p>
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div className="footer-col">
          <p className="footer-label">Popular services</p>
          {serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div className="footer-col footer-location">
          <p className="footer-label">Service location</p>
          <strong>Patna, Bihar</strong>
          <p>For home, office and specialised cleaning enquiries.</p>
          <Link href="/contact" className="footer-text-link">Send an enquiry <span aria-hidden>→</span></Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Urban Shine Cleaning</span>
        <span>Fresh spaces, thoughtfully cared for.</span>
      </div>
    </footer>
  );
}
