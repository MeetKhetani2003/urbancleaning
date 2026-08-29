import Image from "next/image";
import Link from "next/link";
import type { Package } from "../../data/packages";

export function PackageCard({ item, featured = false }: { item: Package; featured?: boolean }) {
  return (
    <article className={`package-card ${featured ? "package-card--featured" : ""}`}>
      <div className="package-image">
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 92vw, 31vw" />
        {featured && <span className="package-flag">Most requested</span>}
      </div>
      <div className="package-content">
        <span className="eyebrow eyebrow--small">Home package</span>
        <div className="flex justify-between items-start mb-2">
          <h3 className="mb-0">{item.title}</h3>
          {item.price && <span className="text-[var(--green)] font-bold text-sm whitespace-nowrap ml-3 mt-1">{item.price}</span>}
        </div>
        <p>{item.description}</p>
        <div className="package-rule" />
        <p className="package-note">{item.rooms}</p>
        <Link href={`/packages/${item.slug}`} className="text-link">View package <span aria-hidden>→</span></Link>
      </div>
    </article>
  );
}
