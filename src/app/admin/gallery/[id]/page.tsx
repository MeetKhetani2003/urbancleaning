"use client";

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GalleryFormPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'item'; // 'item' or 'comparison'
  
  const [formData, setFormData] = useState({
    title: '', category: '', span: '', image: '', before: '', after: '', type
  });
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileBefore, setFileBefore] = useState<File | null>(null);
  const [fileAfter, setFileAfter] = useState<File | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/gallery`)
        .then(res => res.json())
        .then(data => {
          const list = type === 'comparison' ? data.comparisons : data.items;
          const item = list.find((p: any) => p._id === resolvedParams.id);
          if (item) {
            setFormData({ ...item, type });
          }
          setLoading(false);
        });
    }
  }, [isNew, resolvedParams.id, type]);

  const uploadFile = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadData });
    const data = await res.json();
    return data.success ? data.fileId : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let payload = { ...formData };

    if (type === 'item') {
      if (fileImage) payload.image = await uploadFile(fileImage);
    } else {
      if (fileBefore) payload.before = await uploadFile(fileBefore);
      if (fileAfter) payload.after = await uploadFile(fileAfter);
    }
    
    const url = isNew ? '/api/admin/gallery' : `/api/admin/gallery/${resolvedParams.id}?type=${type}`;
    const method = isNew ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/gallery');
      router.refresh();
    } else {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? `Add New ${type === 'comparison' ? 'Comparison' : 'Gallery Image'}` : `Edit ${type === 'comparison' ? 'Comparison' : 'Gallery Image'}`}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
        </div>

        {type === 'item' ? (
          <>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Span (e.g. col-span-2 row-span-1)</label>
                <input type="text" value={formData.span} onChange={e => setFormData({...formData, span: e.target.value})} className="mt-1 w-full border border-gray-300 p-2 rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input type="file" onChange={e => setFileImage(e.target.files?.[0] || null)} className="mt-1 w-full" />
              {formData.image && !fileImage && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/api/images/${formData.image}`} alt="Preview" className="h-32 object-cover rounded shadow-sm border border-gray-200" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Before Image</label>
              <input type="file" onChange={e => setFileBefore(e.target.files?.[0] || null)} className="mt-1 w-full" />
              {formData.before && !fileBefore && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Current Before Image:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/api/images/${formData.before}`} alt="Preview Before" className="h-32 object-cover rounded shadow-sm border border-gray-200" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">After Image</label>
              <input type="file" onChange={e => setFileAfter(e.target.files?.[0] || null)} className="mt-1 w-full" />
              {formData.after && !fileAfter && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Current After Image:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/api/images/${formData.after}`} alt="Preview After" className="h-32 object-cover rounded shadow-sm border border-gray-200" />
                </div>
              )}
            </div>
          </div>
        )}

        <button type="submit" disabled={saving} className="bg-[#0c5f50] text-white px-6 py-2 rounded hover:bg-[#09473c]">
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
