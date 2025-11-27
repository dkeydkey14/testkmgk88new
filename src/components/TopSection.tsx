'use client';

import { useState, useEffect } from 'react';
import BannerSlider from './BannerSlider'
import RegistrationForm from './RegistrationForm'
import { getApiUrl } from '@/config/api';

export default function TopSection() {
  const [links, setLinks] = useState({ homeUrl: '', cskhUrl: '' });

  useEffect(() => {
    // Load links from API
    const loadLinks = async () => {
      try {
        const response = await fetch(getApiUrl('/api/links'));
        const data = await response.json();
        if (data.success) {
          setLinks(data.links.topSection);
        }
      } catch (error) {
        console.error('Lỗi khi tải links:', error);
      }
    };
    loadLinks();
  }, []);

  return (
    <div className="relative mb-8 md:mb-16">
      {/* Nội dung chính */}
      <div className="relative z-10">
        {/* Banner */}
        <BannerSlider />
        
        {/* Login/Register Buttons */}
        <div className="container mx-auto px-4 py-4 flex justify-center space-x-8">
          <a href={links.homeUrl || '#'} className="block">
            <img 
              src="/images/trangchunl.png" 
              alt="Trang chủ" 
              className="h-10 md:h-14 lg:h-16" 
              style={{
                animation: 'pulse-scale 2.5s infinite alternate',
              }}
            />
          </a>
          <a href={links.cskhUrl || '#'} className="block">
            <img 
              src="/images/cskhnl.png" 
              alt="CSKH" 
              className="h-10 md:h-14 lg:h-16" 
              style={{
                animation: 'pulse-scale 2.5s infinite alternate',
              }}
            />
          </a>
        </div>

        {/* Form wrapper với padding và shadow */}
        <div className="px-4 pb-8 md:pb-16">
          <div className="max-w-[1024px] mx-auto shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-lg">
            <RegistrationForm />
          </div>
        </div>
      </div>
      
      {/* Phần nền và bo góc với hình nền responsive */}
      <div 
        className="absolute inset-0 shadow-lg bg-center bg-no-repeat md:bg-[url('/images/NOELBGDKEY.webp')] bg-[url('/images/dt.gif')]" 
        style={{ 
          borderRadius: '0 0 var(--curve-radius) var(--curve-radius)',
          '--curve-radius': 'min(100px, 25vw)',
          backgroundSize: '100% 110%',
          backgroundPosition: 'center top',
        } as React.CSSProperties}
      ></div>

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            --curve-radius: min(80px, 20vw);
          }
        }
      `}</style>
    </div>
  )
} 
