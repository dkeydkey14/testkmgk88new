'use client';
// FRONTEND - Admin Auth Guard

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem('admin-token');
    
    if (token) {
      // Token tồn tại = đã đăng nhập
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      // Không có token = redirect về login
      router.push('/admin/login');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Đang redirect
  }

  return <>{children}</>;
}

