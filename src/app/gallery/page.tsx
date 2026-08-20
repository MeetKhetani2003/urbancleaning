import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { GalleryGrid } from "@/components/GalleryGrid";
import gallery, { comparisons } from "../../../data/gallery";

export const metadata: Metadata = { title: "Cleaning Service Gallery", description: "Explore Urban Shine Cleaning’s local service gallery, from bathrooms and kitchens to offices and outdoor spaces." };

export default function GalleryPage() {
  return <>
    <section className="page-top page-top--gallery"><div className="shell"><p className="eyebrow">Urban Shine moments</p><h1>Fresh Spaces,<br /><em>In Focus.</em></h1><p>Explore a visual look at the thoughtful cleaning attention given to homes, workspaces and the details in between.</p></div></section>
    <section className="section shell gallery-before"><div className="section-heading split-heading"><div><p className="eyebrow">A closer look</p><h2>See The <em>Difference.</em></h2></div><p>Move each slider to explore an illustrative before-and-after view. These local gallery image slots are ready for future client project photography.</p></div><div className="comparison-grid comparison-grid--four">{comparisons.map((item) => <BeforeAfterCard item={item} key={item.title} />)}</div></section>
    <section className="section section-tint"><div className="shell"><div className="section-heading center-heading"><p className="eyebrow">Service gallery</p><h2>Every Detail Has<br /><em>Its Place.</em></h2><p>Filter the gallery by the kind of space you are looking to refresh.</p></div><GalleryGrid items={gallery} /></div></section>
    <section className="section shell gallery-outro"><p className="eyebrow">Your space next</p><h2>Ready to make your own<br /><em>space feel fresh again?</em></h2><Link href="/book-service" className="button">Request cleaning service <span>↗</span></Link></section>
  </>;
}
