'use client';

import { useState, useEffect } from 'react';
import { getApiUrl } from '@/config/api';

export default function Header() {
  const [links, setLinks] = useState({ loginUrl: '', registerUrl: '' });

  useEffect(() => {
    // Load links from API
    const loadLinks = async () => {
      try {
        const response = await fetch(getApiUrl('/api/links'));
        const data = await response.json();
        if (data.success) {
          setLinks(data.links.header);
        }
      } catch (error) {
        console.error('Lỗi khi tải links:', error);
      }
    };
    loadLinks();
  }, []);

  return (
    <header className="w-full z-50 absolute">
      <nav className="container mx-auto px-4 py-2 flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <a href={links.loginUrl || '#'} className="block transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg">
            <img
              src="/images/dang-nhap.png"
              alt="Đăng nhập"
              className="h-8"
            />
          </a>
          <a href={links.registerUrl || '#'} className="block transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg">
            <img
              src="/images/dang-kí.png"
              alt="Đăng ký"
              className="h-8"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
