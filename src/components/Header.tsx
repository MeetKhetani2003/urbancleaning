"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./BrandMark";

const navItems = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Packages", "/packages"],
  ["How It Works", "/how-it-works"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["FAQs", "/faqs"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isCurrent = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className={isCurrent(href) ? "nav-link nav-link--active" : "nav-link"}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/contact#enquiry" className="call-link"><span className="call-dot" />Call now</Link>
          <Link href="/book-service" className="button button--small">Book a service <span aria-hidden>↗</span></Link>
        </div>
        <div className="mobile-header-actions">
          <Link href="/book-service" className="mobile-book">Book service</Link>
          <button type="button" onClick={() => setOpen(!open)} className={`menu-toggle ${open ? "menu-toggle--open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <i /><i />
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu">
          <nav className="shell" aria-label="Mobile navigation">
            {navItems.map(([label, href], index) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="mobile-nav-link" style={{ animationDelay: `${index * 35}ms` }}>
                <span>{label}</span><span aria-hidden>↗</span>
              </Link>
            ))}
            <Link href="/book-service" onClick={() => setOpen(false)} className="button mobile-menu-cta">Request cleaning service <span aria-hidden>↗</span></Link>
          </nav>
        </div>
      )}
    </header>
  );
}
