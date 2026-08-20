"use client";

import { FormEvent, useState } from "react";
import services from "../../data/services";

type BookingFormProps = { initialService?: string; variant?: "full" | "contact" };

export function BookingForm({ initialService = "", variant = "full" }: BookingFormProps) {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState(initialService);
  const isContact = variant === "contact";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  if (sent) {
    return (
      <div className="form-success" role="status">
        <span className="success-check">✓</span>
        <p className="eyebrow eyebrow--small">Enquiry ready</p>
        <h3>Thanks for reaching out.</h3>
        <p>Your request details have been completed in this demo. This self-contained form does not transmit or store personal information.</p>
        <button type="button" className="text-link" onClick={() => setSent(false)}>Send another request <span aria-hidden>→</span></button>
      </div>
    );
  }
  return (
    <form className={`booking-form ${isContact ? "booking-form--contact" : ""}`} onSubmit={submit}>
      <div className="form-grid">
        <label>Full name<input name="fullName" required placeholder="Your full name" /></label>
        <label>Mobile number<input name="mobile" type="tel" inputMode="tel" required placeholder="Your mobile number" /></label>
        <label>Email<input name="email" type="email" required placeholder="name@example.com" /></label>
        <label>Service required<select name="service" required value={selected} onChange={(event) => setSelected(event.target.value)}><option value="" disabled>Select a service</option>{services.map((service) => <option value={service.title} key={service.slug}>{service.title}</option>)}</select></label>
        {!isContact && <><label>Property type<select name="property" required defaultValue=""><option value="" disabled>Select property type</option><option>Apartment</option><option>House</option><option>Office</option><option>Other</option></select></label><label>BHK<select name="bhk" required defaultValue=""><option value="" disabled>Select home size</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option><option>Other</option></select></label><label>Preferred date<input name="date" type="date" required /></label><label>Preferred time<input name="time" type="time" required /></label></>}
      </div>
      {!isContact && <label className="form-full">Address<textarea name="address" required rows={3} placeholder="Share your service address" /></label>}
      <label className="form-full">{isContact ? "How can we help?" : "Additional requirements"}<textarea name="notes" rows={4} placeholder={isContact ? "Tell us about your cleaning requirement" : "Tell us about any rooms, items or requirements to prioritise"} /></label>
      <button type="submit" className="button button--wide">{isContact ? "Send enquiry" : "Request cleaning service"} <span aria-hidden>↗</span></button>
      <p className="form-disclaimer">This is a request form. Service details can be confirmed after your enquiry is reviewed.</p>
    </form>
  );
}
