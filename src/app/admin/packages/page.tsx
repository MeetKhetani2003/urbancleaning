"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/packages')
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      setPackages(packages.filter(p => p._id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Packages</h1>
        <Link href="/admin/packages/new" className="bg-[#0c5f50] text-white px-4 py-2 rounded hover:bg-[#09473c]">
          Add New Package
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.rooms}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.price || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/packages/${pkg._id}`} className="text-[#0c5f50] hover:text-[#09473c] mr-4">Edit</Link>
                    <button onClick={() => handleDelete(pkg._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
