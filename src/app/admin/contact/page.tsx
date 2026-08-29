"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '', descriptor: '', location: '', serviceArea: '',
    phone: '', email: '', whatsapp: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/contact')
      .then(res => res.json())
      .then(data => {
        if (data.businessName) setFormData(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    const res = await fetch('/api/admin/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    setSaving(false);
    if (res.ok) {
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Error saving settings.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Manage Contact Info</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input type="text" required value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descriptor</label>
            <input type="text" required value={formData.descriptor} onChange={e => setFormData({...formData, descriptor: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Area</label>
            <input type="text" required value={formData.serviceArea} onChange={e => setFormData({...formData, serviceArea: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
            <input type="text" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-[#0c5f50] text-white px-6 py-2 rounded hover:bg-[#09473c]">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
