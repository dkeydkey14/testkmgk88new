'use client';
// FRONTEND - Admin Sidebar Component

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaWpforms, 
  FaImages, 
  FaBars, 
  FaTimes,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaLink
} from 'react-icons/fa';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaHome className="text-xl" />,
      path: '/admin',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      activeColor: 'bg-purple-100'
    },
    {
      title: 'Form Promotions',
      icon: <FaWpforms className="text-xl" />,
      path: '/admin/form-promotions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      activeColor: 'bg-blue-100',
      description: 'Dropdown Form'
    },
    {
      title: 'Display Promotions',
      icon: <FaImages className="text-xl" />,
      path: '/admin/display-promotions',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      activeColor: 'bg-orange-100',
      description: 'Grid Hình Ảnh'
    },
    {
      title: 'Quản Lý Links',
      icon: <FaLink className="text-xl" />,
      path: '/admin/links',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      activeColor: 'bg-green-100',
      description: 'Header & Footer'
    },
    {
      title: 'Cài Đặt',
      icon: <FaCog className="text-xl" />,
      path: '/admin/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      activeColor: 'bg-gray-100',
      description: 'Đổi MK & Đăng xuất'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-72 bg-white border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50">
          <Link href="/admin" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                <FaCog className="text-white text-2xl animate-spin-slow" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  GK88 Admin
                </h2>
                <p className="text-xs text-gray-500">Quản lý hệ thống</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={`
                    flex items-center gap-3 p-3 rounded-lg
                    transition-all duration-200 cursor-pointer
                    ${
                      isActive(item.path)
                        ? `${item.activeColor} ${item.color} shadow-md scale-105`
                        : `hover:${item.bgColor} text-gray-700 hover:scale-102`
                    }
                  `}
                >
                  <div className={`${isActive(item.path) ? item.color : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-gray-500">{item.description}</div>
                    )}
                  </div>
                  {isActive(item.path) && (
                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaChartBar />
              Thống Kê Nhanh
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Form Promotions</span>
                <span className="font-semibold text-blue-600">8 items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Display Promotions</span>
                <span className="font-semibold text-orange-600">8 items</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Link href="/">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-all cursor-pointer group">
              <FaSignOutAlt className="text-gray-400 group-hover:text-orange-500 transition-colors" />
              <span className="text-gray-700 group-hover:text-orange-600 font-medium transition-colors">
                Về Trang Chủ
              </span>
            </div>
          </Link>
          <div className="mt-3 text-center text-xs text-gray-400">
            GK88 Admin v2.0
          </div>
        </div>
      </aside>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  );
}

