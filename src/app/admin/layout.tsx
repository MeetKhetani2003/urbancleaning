"use client";

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm flex items-center justify-between p-4 sticky top-0 z-20">
        <h2 className="text-xl font-bold text-[#0c5f50]">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 focus:outline-none">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white shadow-md flex-shrink-0 z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 hidden md:block">
          <h2 className="text-2xl font-bold text-[#0c5f50]">Admin Panel</h2>
        </div>
        <nav className="mt-2 md:mt-6">
          <Link href="/admin" onClick={() => setSidebarOpen(false)} className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Dashboard
          </Link>
          <Link href="/admin/services" onClick={() => setSidebarOpen(false)} className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Services
          </Link>
          <Link href="/admin/packages" onClick={() => setSidebarOpen(false)} className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Packages
          </Link>
          <Link href="/admin/about" onClick={() => setSidebarOpen(false)} className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            About Page
          </Link>
          <Link href="/admin/gallery" onClick={() => setSidebarOpen(false)} className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Gallery
          </Link>
          <Link href="/admin/contact" onClick={() => setSidebarOpen(false)} className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
            Contact Info
          </Link>
          <Link href="/admin/inquiries" onClick={() => setSidebarOpen(false)} className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#0c5f50]">
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
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
