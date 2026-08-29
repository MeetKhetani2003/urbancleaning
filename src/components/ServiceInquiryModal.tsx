"use client";

import { useState } from 'react';

type ServiceInquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePrice?: string;
  whatsappNumber?: string;
};

export default function ServiceInquiryModal({ isOpen, onClose, serviceName, servicePrice, whatsappNumber }: ServiceInquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    additionalInfo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Submit to API (saves to DB and sends Email)
      const res = await fetch('/api/service-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: serviceName }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit inquiry');
      }

      // 2. Redirect to WhatsApp
      const fallbackWaNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+910000000000';
      const waNumber = whatsappNumber || fallbackWaNumber;
      const waMessage = `Hello, I would like to inquire about the ${serviceName} service.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nAddress: ${formData.address}\n\nAdditional Info: ${formData.additionalInfo || 'N/A'}`;
      
      const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');
      
      // Close modal and reset
      onClose();
      setFormData({ name: '', phone: '', email: '', address: '', additionalInfo: '' });

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 bg-[var(--wash)] border-b border-gray-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Inquire About Service</h2>
            <p className="text-[var(--green)] font-medium text-sm mt-1">{serviceName} {servicePrice && `• ${servicePrice}`}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
          
          <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                type="text" 
                required 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)] outline-none transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)] outline-none transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)] outline-none transition-colors"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address of Service *</label>
              <textarea 
                required 
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)] outline-none transition-colors"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
              <textarea 
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--green)] focus:border-[var(--green)] outline-none transition-colors"
                value={formData.additionalInfo}
                onChange={e => setFormData({...formData, additionalInfo: e.target.value})}
              />
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t border-gray-100 shrink-0 flex justify-end gap-3 bg-gray-50">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="inquiry-form"
            disabled={loading}
            className="px-5 py-2.5 bg-[var(--green)] text-white hover:bg-[var(--green-deep)] rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </div>
      </div>
    </div>
  );
}
