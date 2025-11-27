'use client';
// FRONTEND - Admin quản lý Links

import { useState, useEffect } from 'react';
import { FaSave, FaLink, FaHome, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';
import { getApiUrl } from '@/config/api';
import AdminAuthGuard from '@/components/AdminAuthGuard';

interface Links {
  header: {
    loginUrl: string;
    registerUrl: string;
  };
  topSection: {
    homeUrl: string;
    cskhUrl: string;
  };
  footer: {
    mainSiteUrl: string;
    telegramUrl: string;
    facebookUrl: string;
    spotifyUrl: string;
    linkedinUrl: string;
  };
}

function AdminLinksPageContent() {
  const [links, setLinks] = useState<Links>({
    header: { loginUrl: '', registerUrl: '' },
    topSection: { homeUrl: '', cskhUrl: '' },
    footer: { mainSiteUrl: '', telegramUrl: '', facebookUrl: '', spotifyUrl: '', linkedinUrl: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load links
  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const apiUrl = getApiUrl('/api/links');
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.success) {
        setLinks(data.links);
      }
    } catch (error) {
      console.error('Lỗi khi tải links:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save links
  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const apiUrl = getApiUrl('/api/links');
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(links)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Lưu thành công!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Lỗi: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Lỗi khi lưu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">🔗 Quản Lý Links</h1>
          <Link 
            href="/admin"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            ← Quay lại
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {/* Header Links */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaLink className="text-blue-500" />
              Header (Đăng nhập / Đăng ký)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">URL Đăng Nhập:</label>
                <input
                  type="url"
                  value={links.header.loginUrl}
                  onChange={(e) => setLinks({
                    ...links,
                    header: { ...links.header, loginUrl: e.target.value }
                  })}
                  className="w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="https://pr1gk.xyz/"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">URL Đăng Ký:</label>
                <input
                  type="url"
                  value={links.header.registerUrl}
                  onChange={(e) => setLinks({
                    ...links,
                    header: { ...links.header, registerUrl: e.target.value }
                  })}
                  className="w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="https://pr1gk.xyz/"
                />
              </div>
            </div>
          </div>

          {/* Top Section Links */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaHome className="text-green-500" />
              Top Section (Trang chủ / CSKH)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">URL Trang Chủ:</label>
                <input
                  type="url"
                  value={links.topSection.homeUrl}
                  onChange={(e) => setLinks({
                    ...links,
                    topSection: { ...links.topSection, homeUrl: e.target.value }
                  })}
                  className="w-full p-3 border-2 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="https://gk8801.99886633.pro/"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">URL CSKH (Telegram):</label>
                <input
                  type="url"
                  value={links.topSection.cskhUrl}
                  onChange={(e) => setLinks({
                    ...links,
                    topSection: { ...links.topSection, cskhUrl: e.target.value }
                  })}
                  className="w-full p-3 border-2 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="https://t.me/GK88HOTRO24H_BOT"
                />
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaHeadset className="text-orange-500" />
              Footer (Liên kết nhanh & Mạng xã hội)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">URL Trang Chính:</label>
                <input
                  type="url"
                  value={links.footer.mainSiteUrl}
                  onChange={(e) => setLinks({
                    ...links,
                    footer: { ...links.footer, mainSiteUrl: e.target.value }
                  })}
                  className="w-full p-3 border-2 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="https://8386.io/"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Dùng cho: Liên kết nhanh, Facebook, Spotify, LinkedIn
                </p>
              </div>
              <div>
                <label className="block font-semibold mb-2">URL Telegram:</label>
                <input
                  type="url"
                  value={links.footer.telegramUrl}
                  onChange={(e) => setLinks({
                    ...links,
                    footer: { ...links.footer, telegramUrl: e.target.value }
                  })}
                  className="w-full p-3 border-2 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="https://t.me/GK88HOTRO24H_BOT"
                />
              </div>
              
              {/* Optional: Riêng từng mạng xã hội */}
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-semibold text-gray-600 mb-3">Hoặc tùy chỉnh riêng từng mạng xã hội:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Facebook:</label>
                    <input
                      type="url"
                      value={links.footer.facebookUrl}
                      onChange={(e) => setLinks({
                        ...links,
                        footer: { ...links.footer, facebookUrl: e.target.value }
                      })}
                      className="w-full p-2 border rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Spotify:</label>
                    <input
                      type="url"
                      value={links.footer.spotifyUrl}
                      onChange={(e) => setLinks({
                        ...links,
                        footer: { ...links.footer, spotifyUrl: e.target.value }
                      })}
                      className="w-full p-2 border rounded-lg focus:border-green-500 focus:outline-none text-sm"
                      placeholder="https://spotify.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">LinkedIn:</label>
                    <input
                      type="url"
                      value={links.footer.linkedinUrl}
                      onChange={(e) => setLinks({
                        ...links,
                        footer: { ...links.footer, linkedinUrl: e.target.value }
                      })}
                      className="w-full p-2 border rounded-lg focus:border-blue-700 focus:outline-none text-sm"
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-lg transition-all ${
                saving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105'
              } text-white`}
            >
              <FaSave />
              {saving ? 'Đang lưu...' : 'Lưu Tất Cả Links'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLinksPage() {
  return (
    <AdminAuthGuard>
      <AdminLinksPageContent />
    </AdminAuthGuard>
  );
}

