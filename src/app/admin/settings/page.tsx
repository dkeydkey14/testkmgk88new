'use client';
// FRONTEND - Admin Settings (Đổi mật khẩu, Đăng xuất)

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaKey, FaSignOutAlt, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import { getApiUrl } from '@/config/api';

function AdminSettingsContent() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('❌ Mật khẩu mới không khớp!');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('❌ Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    setSaving(true);

    try {
      const apiUrl = getApiUrl('/api/auth/change-password');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Đổi mật khẩu thành công!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage('❌ ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Lỗi kết nối');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      localStorage.removeItem('admin-token');
      router.push('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">⚙️ Cài Đặt</h1>
          <Link 
            href="/admin"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            ← Quay lại
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Đổi mật khẩu */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaKey className="text-orange-500" />
              Đổi Mật Khẩu
            </h2>

            {message && (
              <div className={`mb-4 p-4 rounded-lg ${
                message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Mật khẩu hiện tại:</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border-2 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Mật khẩu mới:</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border-2 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Xác nhận mật khẩu mới:</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border-2 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPasswords"
                  checked={showPasswords}
                  onChange={(e) => setShowPasswords(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="showPasswords" className="text-sm text-gray-600 cursor-pointer">
                  {showPasswords ? <FaEye className="inline" /> : <FaEyeSlash className="inline" />} Hiện mật khẩu
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${
                  saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600'
                } text-white`}
              >
                <FaSave />
                {saving ? 'Đang lưu...' : 'Đổi Mật Khẩu'}
              </button>
            </form>
          </div>

          {/* Đăng xuất */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaSignOutAlt className="text-red-500" />
              Đăng Xuất
            </h2>
            <p className="text-gray-600 mb-4">
              Đăng xuất khỏi hệ thống quản trị
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 flex items-center justify-center gap-2"
            >
              <FaSignOutAlt />
              Đăng Xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminAuthGuard>
      <AdminSettingsContent />
    </AdminAuthGuard>
  );
}

