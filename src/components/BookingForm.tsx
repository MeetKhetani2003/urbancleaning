"use client";

import { FormEvent, useState, useEffect } from "react";

type BookingFormProps = { initialService?: string; variant?: "full" | "contact" };

export function BookingForm({ initialService = "", variant = "full" }: BookingFormProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(initialService);
  const [servicesList, setServicesList] = useState<{title: string, slug: string}[]>([]);
  const isContact = variant === "contact";

  useEffect(() => {
    fetch('/api/admin/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setServicesList(data);
        }
      })
      .catch(err => console.error("Failed to load services", err));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('fullName'),
      mobile: formData.get('mobile'),
      phone: formData.get('mobile'), // Send phone explicitly for model
      email: formData.get('email'),
      service: formData.get('service'),
      property: formData.get('property'),
      bhk: formData.get('bhk'),
      date: formData.get('date') || new Date().toISOString(),
      time: formData.get('time'),
      address: formData.get('address'),
      additionalInfo: formData.get('notes')
    };

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert("There was an error submitting your request. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span className="success-check">✓</span>
        <p className="eyebrow eyebrow--small">Enquiry ready</p>
        <h3>Thanks for reaching out.</h3>
        <p>Your request has been successfully submitted! Our team will contact you shortly.</p>
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
        <label>Service required
          <select name="service" required value={selected} onChange={(event) => setSelected(event.target.value)}>
            <option value="" disabled>Select a service</option>
            {servicesList.map((service) => <option value={service.title} key={service.slug}>{service.title}</option>)}
          </select>
        </label>
        {!isContact && <><label>Property type<select name="property" required defaultValue=""><option value="" disabled>Select property type</option><option>Apartment</option><option>House</option><option>Office</option><option>Other</option></select></label><label>BHK<select name="bhk" required defaultValue=""><option value="" disabled>Select home size</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option><option>Other</option></select></label><label>Preferred date<input name="date" type="date" required /></label><label>Preferred time<input name="time" type="time" required /></label></>}
      </div>
      {!isContact && <label className="form-full">Address<textarea name="address" required rows={3} placeholder="Share your service address" /></label>}
      <label className="form-full">{isContact ? "How can we help?" : "Additional requirements"}<textarea name="notes" rows={4} placeholder={isContact ? "Tell us about your cleaning requirement" : "Tell us about any rooms, items or requirements to prioritise"} /></label>
      <button type="submit" disabled={loading} className="button button--wide">{loading ? "Sending..." : (isContact ? "Send enquiry" : "Request cleaning service")} <span aria-hidden>↗</span></button>
      <p className="form-disclaimer">This is a request form. Service details can be confirmed after your enquiry is reviewed.</p>
    </form>
  );
}
