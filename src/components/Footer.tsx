'use client';

import { useState, useEffect } from 'react';
import { getApiUrl } from '@/config/api';

export default function Footer() {
  const [links, setLinks] = useState({
    mainSiteUrl: '',
    telegramUrl: '',
    facebookUrl: '',
    spotifyUrl: '',
    linkedinUrl: ''
  });

  useEffect(() => {
    // Load links from API
    const loadLinks = async () => {
      try {
        const response = await fetch(getApiUrl('/api/links'));
        const data = await response.json();
        if (data.success) {
          setLinks(data.links.footer);
        }
      } catch (error) {
        console.error('Lỗi khi tải links:', error);
      }
    };
    loadLinks();
  }, []);

  return (
    <footer className="relative border-t border-orange-400 mt-12 pt-8 pb-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
      {/* Hiệu ứng sóng */}
      <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: '15px', transform: 'translateY(-100%)' }}>
        <svg className="absolute bottom-0 w-full h-16 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,186.7C672,192,768,224,864,224C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between mb-6">
          {/* Logo và giới thiệu */}
          <div className="w-full md:w-4/12 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/images/Untitled-7.png" alt="GK88 Logo" className="h-12 mr-3" />
              <h4 className="text-2xl font-bold"></h4>
            </div>
            <p className="text-orange-100 mb-4 leading-relaxed">
              Trung tâm khuyến mãi GK88 - Nơi mang đến cho bạn những ưu đãi tốt nhất, các chương trình khuyến mãi hấp dẫn và giá trị.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div className="w-full md:w-3/12 mb-6 md:mb-0 px-0 md:px-6">
            <h5 className="text-lg font-semibold mb-4 text-white border-b border-orange-400 pb-2">
              Liên Kết Nhanh
            </h5>
            <ul className="list-none">
              <li className="py-1.5">
                <a href={links.mainSiteUrl || '#'} className="text-orange-100 hover:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Trang Chủ
                </a>
              </li>
              <li className="py-1.5">
                <a href={links.mainSiteUrl || '#'} className="text-orange-100 hover:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Khuyến Mãi
                </a>
              </li>
              <li className="py-1.5">
                <a href={links.mainSiteUrl || '#'} className="text-orange-100 hover:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Hướng Dẫn
                </a>
              </li>
              <li className="py-1.5">
                <a href={links.mainSiteUrl || '#'} className="text-orange-100 hover:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Đăng Ký
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="w-full md:w-3/12 mb-6 md:mb-0">
            <h5 className="text-lg font-semibold mb-4 text-white border-b border-orange-400 pb-2">
              Liên Hệ & Hỗ Trợ
            </h5>
            <ul className="list-none">
              <li className="py-1.5">
                <a href={links.telegramUrl || '#'} className="text-orange-100 hover:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  CSKH 24/7
                </a>
              </li>
              <li className="py-1.5">
                <a href={links.telegramUrl || '#'} className="text-orange-100 hover:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                  </svg>
                  Telegram
                </a>
              </li>
              <li className="py-1.5">
                <a href={links.mainSiteUrl || '#'} className="text-orange-100 hover:text-white flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Câu Hỏi Thường Gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div className="w-full md:w-2/12">
            <h5 className="text-lg font-semibold mb-4 text-white border-b border-orange-400 pb-2">
              Kết Nối
            </h5>
            <div className="flex gap-2">
              <a href={links.facebookUrl || '#'} className="bg-orange-400 hover:bg-white text-white hover:text-orange-500 w-9 h-9 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href={links.spotifyUrl || '#'} className="bg-orange-400 hover:bg-white text-white hover:text-orange-500 w-9 h-9 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm4.99 19.406a1.2 1.2 0 01-1.222.094c-3.339-2.035-7.54-2.497-12.476-1.367a1.2 1.2 0 01-.465-2.354c5.424-1.209 10.102-.687 13.851 1.615a1.2 1.2 0 01.312 2.012zm1.336-2.982a1.5 1.5 0 01-1.511.12c-3.828-2.349-9.662-3.03-14.184-1.657a1.5 1.5 0 11-.866-2.817c5.175-1.551 11.618-.811 16.012 1.841a1.5 1.5 0 01.549 2.513zm.114-3.097c-4.586-2.729-12.165-2.981-16.551-1.649a1.8 1.8 0 11-1.03-3.447c5.031-1.493 13.394-1.227 18.675 1.906a1.8 1.8 0 01-1.094 3.19z"/>
                </svg>
              </a>
              <a href={links.telegramUrl || '#'} className="bg-orange-400 hover:bg-white text-white hover:text-orange-500 w-9 h-9 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm3.224 17.871c.188.133.43.166.646.85.215-.082.389-.249.467-.462a.75.75 0 00-.256-.902l-3.2-2.136 3.2-2.136a.75.75 0 00.256-.902.744.744 0 00-.867-.442.75.75 0 00-.535.579l-1.7 5.55a.75.75 0 00.989 1.316zm-.217-7.391c-.285 2.595-1.522 8.21-2.15 10.899-.192.82-1.216 1.047-1.742.408-1.186-1.447-3.307-4.03-3.307-4.03l4.7-3.064a.75.75 0 00-.129-1.318l-5.8-2.039a.75.75 0 00-.785.136c-.18.181-.242.445-.165.685l1.974 6.425a.75.75 0 001.358.123z"/>
                </svg>
              </a>
              <a href={links.linkedinUrl || '#'} className="bg-orange-400 hover:bg-white text-white hover:text-orange-500 w-9 h-9 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-400 pt-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-orange-100 mb-2 md:mb-0">
            © 2025 <span className="font-semibold"><a href={links.mainSiteUrl || '#'} className="hover:text-white transition-colors">GK88</a></span>. Trung Tâm Khuyến Mãi GK88. Tất cả các quyền được bảo lưu bởi NEWPEI.
          </div>
          <div className="text-xs text-orange-200">
            <a href={links.mainSiteUrl || '#'} className="hover:text-white mx-2">Điều khoản sử dụng</a>
            <span className="mx-2">|</span>
            <a href={links.mainSiteUrl || '#'} className="hover:text-white mx-2">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

