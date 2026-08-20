"use client";

import Image from "next/image";
import { useState } from "react";

type Comparison = { title: string; before: string; after: string; alt: string };

export function BeforeAfterCard({ item }: { item: Comparison }) {
  const [position, setPosition] = useState(52);
  return (
    <article className="comparison-card">
      <div className="comparison-image">
        <Image src={item.after} alt={`${item.alt} after`} fill sizes="(max-width: 700px) 92vw, 45vw" />
        <div className="comparison-before" style={{ width: `${position}%` }}>
          <Image src={item.before} alt={`${item.alt} before`} fill sizes="(max-width: 700px) 92vw, 45vw" />
        </div>
        <span className="compare-label compare-label--before">Before</span><span className="compare-label compare-label--after">After</span>
        <div className="comparison-handle" style={{ left: `${position}%` }} aria-hidden><span>↔</span></div>
        <input className="comparison-range" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label={`Compare ${item.title} before and after`} />
      </div>
      <div className="comparison-title"><span>Spotless detail</span><h3>{item.title}</h3></div>
    </article>
  );
}
