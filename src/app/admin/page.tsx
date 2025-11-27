'use client';
// FRONTEND - Trang Admin Chính - Dashboard

import Link from 'next/link';
import { FaWpforms, FaImages, FaCog, FaChartLine, FaUsers, FaFire } from 'react-icons/fa';
import AdminAuthGuard from '@/components/AdminAuthGuard';

function AdminPageContent() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Chào mừng đến Admin Panel
          </h1>
          <p className="text-blue-100 text-lg">Quản lý hệ thống khuyến mãi GK88</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Form Promotions</p>
                <p className="text-3xl font-bold text-blue-600">8</p>
              </div>
              <FaWpforms className="text-4xl text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Display Promotions</p>
                <p className="text-3xl font-bold text-orange-600">8</p>
              </div>
              <FaImages className="text-4xl text-orange-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng Khuyến Mãi</p>
                <p className="text-3xl font-bold text-green-600">16</p>
              </div>
              <FaFire className="text-4xl text-green-200" />
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Form Promotions */}
          <Link href="/admin/form-promotions">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full mr-4">
                  <FaWpforms className="text-blue-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-blue-600">Khuyến Mãi FORM</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Quản lý khuyến mãi trong dropdown form đăng ký
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✓ Mã khuyến mãi (code)</li>
                <li>✓ Tiêu đề</li>
                <li>✓ API Endpoint</li>
                <li>✓ Sắp xếp thứ tự</li>
              </ul>
              <div className="mt-6 text-blue-600 font-semibold hover:underline">
                Quản lý →
              </div>
            </div>
          </Link>

          {/* Card 2: Display Promotions */}
          <Link href="/admin/display-promotions">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 border-t-4 border-orange-500">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full mr-4">
                  <FaImages className="text-orange-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-orange-600">Khuyến Mãi HIỂN THỊ</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Quản lý khuyến mãi hiển thị trong Body (có hình ảnh)
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✓ Mã khuyến mãi (code)</li>
                <li>✓ Tiêu đề & Hình ảnh</li>
                <li>✓ Nội dung HTML</li>
                <li>✓ Sắp xếp thứ tự</li>
              </ul>
              <div className="mt-6 text-orange-600 font-semibold hover:underline">
                Quản lý →
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaChartLine className="text-purple-600" />
            Hướng Dẫn Nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-blue-600 mb-1">Khuyến Mãi FORM</h3>
              <p className="text-sm text-gray-600">
                Quản lý dropdown chọn khuyến mãi trong form đăng ký. 
                Chỉ có mã + tiêu đề + API endpoint.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h3 className="font-semibold text-orange-600 mb-1">Khuyến Mãi HIỂN THỊ</h3>
              <p className="text-sm text-gray-600">
                Quản lý danh sách khuyến mãi hiển thị ở body. 
                Có hình ảnh + nội dung HTML chi tiết.
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>💡 Lưu ý:</strong> 2 hệ thống hoàn toàn độc lập. 
              Thay đổi ở một bên không ảnh hưởng bên kia. 
              Chỉ khuyến mãi "Bật" mới hiển thị trên trang chủ.
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaUsers className="text-green-600" />
            Tính Năng
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong>Thêm/Sửa/Xóa</strong>
                <p className="text-sm text-gray-600">Quản lý khuyến mãi dễ dàng</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong>Bật/Tắt nhanh</strong>
                <p className="text-sm text-gray-600">Toggle hiển thị khuyến mãi</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong>Sắp xếp thứ tự</strong>
                <p className="text-sm text-gray-600">Dùng nút ↑↓ để di chuyển</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong>Responsive</strong>
                <p className="text-sm text-gray-600">Hoạt động tốt trên mobile</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthGuard>
      <AdminPageContent />
    </AdminAuthGuard>
  );
}
