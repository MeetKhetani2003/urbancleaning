"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0c5f50]">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Dashboard
          </Link>
          <Link href="/admin/services" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Services
          </Link>
          <Link href="/admin/packages" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Packages
          </Link>
          <Link href="/admin/gallery" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Gallery
          </Link>
          <Link href="/admin/contact" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Contact Info
          </Link>
          <Link href="/admin/inquiries" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Inquiries
          </Link>
          <button 
            onClick={() => {
              document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = '/admin/login';
            }}
            className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 mt-8"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
