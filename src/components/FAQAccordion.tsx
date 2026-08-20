"use client";

import { useState } from "react";

type Question = { question: string; answer: string };

export function FAQAccordion({ items, compact = false }: { items: Question[]; compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`faq-list ${compact ? "faq-list--compact" : ""}`}>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className={`faq-item ${expanded ? "faq-item--open" : ""}`}>
            <button type="button" className="faq-button" onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}>
              <span>{item.question}</span><span className="faq-icon" aria-hidden>{expanded ? "−" : "+"}</span>
            </button>
            <div className="faq-answer-wrap" aria-hidden={!expanded}>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
