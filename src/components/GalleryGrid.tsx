"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "../../data/gallery";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const visible = useMemo(() => category === "All" ? items : items.filter((item) => item.category === category), [category, items]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") setSelected(null); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <div className="gallery-filters" aria-label="Gallery categories">
        {categories.map((item) => <button key={item} className={category === item ? "filter-button filter-button--active" : "filter-button"} onClick={() => setCategory(item)} type="button">{item}</button>)}
      </div>
      <div className="gallery-grid">
        {visible.map((item, index) => (
          <button className={`gallery-item gallery-item--${item.orientation ?? "landscape"}`} key={`${item.src}-${index}`} type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.category} image`}>
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" />
            <span className="gallery-overlay"><span>{item.category}</span><b aria-hidden>↗</b></span>
          </button>
        ))}
      </div>
      {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.alt} onClick={() => setSelected(null)}>
        <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
          <Image src={selected.src} alt={selected.alt} width={1500} height={1000} sizes="92vw" />
          <p>{selected.category}</p>
          <button onClick={() => setSelected(null)} type="button" className="lightbox-close" aria-label="Close image">×</button>
        </div>
      </div>}
    </>
  );
}
