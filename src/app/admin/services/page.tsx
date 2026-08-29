"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Service = {
  _id: string;
  title: string;
  category: string;
  slug: string;
  price?: string;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      setServices(services.filter(s => s._id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
        <Link href="/admin/services/new" className="bg-[#0c5f50] text-white px-4 py-2 rounded hover:bg-[#09473c]">
          Add New Service
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.price || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/services/${service._id}`} className="text-[#0c5f50] hover:text-[#09473c] mr-4">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
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
