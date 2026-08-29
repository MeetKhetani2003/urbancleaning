"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

type ServiceData = {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  heroCopy: string;
  whatWeClean: string[];
  whatWeCleanImages: string[];
  benefit: string;
  price?: string;
};

export default function ServiceFormPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [formData, setFormData] = useState<ServiceData>({
    slug: '', title: '', category: '', image: '', description: '', 
    heroCopy: '', whatWeClean: [], whatWeCleanImages: [], benefit: '', price: ''
  });
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/services`)
        .then(res => res.json())
        .then(data => {
          const service = data.find((s: any) => s._id === resolvedParams.id);
          if (service) setFormData(service);
          setLoading(false);
        });
    }
  }, [isNew, resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let imageId = formData.image;
    
    if (file) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData
      });
      const uploadResult = await uploadRes.json();
      if (uploadResult.success) {
        imageId = uploadResult.fileId;
      } else {
        alert("Image upload failed");
        setSaving(false);
        return;
      }
    }

    const payload = { ...formData, image: imageId };
    
    const url = isNew ? '/api/admin/services' : `/api/admin/services/${resolvedParams.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/services');
      router.refresh();
    } else {
      alert("Failed to save");
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'Add New Service' : 'Edit Service'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="text" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. ₹1,999 or Starting at ₹1,999" className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Main Image</label>
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="mt-1 w-full" />
            {formData.image && !file && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/images/${formData.image}`} alt="Preview" className="h-32 object-cover rounded shadow-sm border border-gray-200" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" rows={3}></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hero Copy</label>
          <textarea required value={formData.heroCopy} onChange={e => setFormData({...formData, heroCopy: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" rows={2}></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Benefit Statement</label>
          <input type="text" required value={formData.benefit} onChange={e => setFormData({...formData, benefit: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
        </div>

        <button type="submit" disabled={saving} className="bg-[#0c5f50] text-white px-6 py-2 rounded hover:bg-[#09473c]">
          {saving ? 'Saving...' : 'Save Service'}
        </button>
      </form>
    </div>
  );
}
