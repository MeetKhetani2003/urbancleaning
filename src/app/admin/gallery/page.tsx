"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(res => res.json())
      .then(data => {
        setGallery(data.items || []);
        setComparisons(data.comparisons || []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string, type: 'item' | 'comparison') => {
    if (confirm('Are you sure you want to delete this?')) {
      await fetch(`/api/admin/gallery/${id}?type=${type}`, { method: 'DELETE' });
      if (type === 'comparison') {
        setComparisons(comparisons.filter(c => c._id !== id));
      } else {
        setGallery(gallery.filter(g => g._id !== id));
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
        <div>
          <Link href="/admin/gallery/new?type=item" className="bg-[#0c5f50] text-white px-4 py-2 rounded hover:bg-[#09473c] mr-2">
            Add Image
          </Link>
          <Link href="/admin/gallery/new?type=comparison" className="bg-[#0c5f50] text-white px-4 py-2 rounded hover:bg-[#09473c]">
            Add Before/After
          </Link>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-8">
          {/* Gallery Items */}
          <div>
            <h2 className="text-xl font-bold mb-4">Gallery Images</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gallery.map((g) => (
                    <tr key={g._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{g.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{g.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/gallery/${g._id}?type=item`} className="text-[#0c5f50] hover:text-[#09473c] mr-4">Edit</Link>
                        <button onClick={() => handleDelete(g._id, 'item')} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparisons */}
          <div>
            <h2 className="text-xl font-bold mb-4">Before/After Comparisons</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisons.map((c) => (
                    <tr key={c._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/gallery/${c._id}?type=comparison`} className="text-[#0c5f50] hover:text-[#09473c] mr-4">Edit</Link>
                        <button onClick={() => handleDelete(c._id, 'comparison')} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
