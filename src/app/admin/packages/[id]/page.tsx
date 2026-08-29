"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function PackageFormPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    slug: '', title: '', description: '', rooms: '', image: '', included: [] as string[], price: ''
  });
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [includedText, setIncludedText] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/packages`)
        .then(res => res.json())
        .then(data => {
          const pkg = data.find((p: any) => p._id === resolvedParams.id);
          if (pkg) {
            setFormData(pkg);
            setIncludedText(pkg.included.join('\n'));
          }
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
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: uploadData });
      const uploadResult = await uploadRes.json();
      if (uploadResult.success) imageId = uploadResult.fileId;
    }

    const payload = { 
      ...formData, 
      image: imageId,
      included: includedText.split('\n').filter(i => i.trim() !== '')
    };
    
    const url = isNew ? '/api/admin/packages' : `/api/admin/packages/${resolvedParams.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/packages');
      router.refresh();
    } else {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'Add New Package' : 'Edit Package'}</h1>
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
            <label className="block text-sm font-medium text-gray-700">Rooms</label>
            <input type="text" required value={formData.rooms} onChange={e => setFormData({...formData, rooms: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="text" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. ₹4,999" className="mt-1 w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
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
          <label className="block text-sm font-medium text-gray-700">Included Items (one per line)</label>
          <textarea required value={includedText} onChange={e => setIncludedText(e.target.value)} className="mt-1 w-full border border-gray-300 p-2 rounded" rows={6}></textarea>
        </div>

        <button type="submit" disabled={saving} className="bg-[#0c5f50] text-white px-6 py-2 rounded hover:bg-[#09473c]">
          {saving ? 'Saving...' : 'Save Package'}
        </button>
      </form>
    </div>
  );
}
