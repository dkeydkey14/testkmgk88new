// FRONTEND - Layout cho Admin với Sidebar
import { Metadata } from 'next';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin - Quản Lý Khuyến Mãi GK88',
  description: 'Trang quản trị khuyến mãi',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="lg:p-8 p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
