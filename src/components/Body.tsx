"use client";
// FRONTEND - Component hiển thị danh sách khuyến mãi
import { useState, useEffect } from "react";
import { getApiUrl } from "@/config/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Promotion {
  id: number;
  code: string;
  image: string;
  title: string;
  content: string;
  active: boolean;
  apiEndpoint: string;
}

// Helper: Lấy full URL cho ảnh (gọi từ backend)
const getImageUrl = (imagePath: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  if (!baseUrl) return imagePath; // Fallback to relative path
  // Nếu imagePath đã có http://, return nguyên
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Thêm baseUrl vào đầu
  return `${baseUrl}${imagePath}`;
};

export default function Body() {
  const [showModal, setShowModal] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<Promotion | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Lấy dữ liệu khuyến mãi HIỂN THỊ từ API
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const apiUrl = getApiUrl('/api/display-promotions?active=true');
        console.log('🔵 Fetching display promotions from:', apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('📦 Response data:', data);
        
        if (data.success && Array.isArray(data.promotions)) {
          console.log('✅ Valid promotions array, length:', data.promotions.length);
          setPromotions(data.promotions);
        } else {
          console.error('❌ Invalid response format:', data);
          setPromotions([]);
        }
      } catch (error) {
        console.error('❌ Lỗi khi tải khuyến mãi:', error);
        setPromotions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const openModal = (promo: Promotion) => {
    setCurrentPromo(promo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <section className="py-6 md:py-10 lg:py-12">
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-orange-600 font-semibold">Đang tải khuyến mãi...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-10 lg:py-12">
      <div className="container mx-auto px-3 md:px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10 relative animate-pulse-text text-orange-500">
          SỰ KIỆN HOT TẠI <span className="relative inline-block">
            <span className="text-[#007BCB] animate-pulse-blue">GK</span><span className="text-orange-500 animate-pulse-orange">88</span>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#007BCB] to-orange-500 animate-width-expand"></span>
          </span>
        </h2>        
        <div className="max-w-7xl mx-auto">
          {promotions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Hiện không có khuyến mãi nào đang hoạt động</p>
            </div>
          ) : !showAll ? (
            // SLIDER MODE - Hiển thị slider khi chưa "Xem tất cả"
            <div className="mb-6">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="promotions-swiper"
              >
                {promotions.map((promo) => (
                  <SwiperSlide key={promo.id}>
                    <div
                      className="bg-black/30 backdrop-blur-sm rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 duration-200 overflow-hidden border border-orange-200 h-full"
                      onClick={() => openModal(promo)}
                    >
                      <div className="aspect-[760/480] w-full">
                        <img
                          src={getImageUrl(promo.image)}
                          alt={promo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Nút "Hiển thị tất cả" */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  Hiển Thị Tất Cả ({promotions.length} Khuyến Mãi)
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            // GRID MODE - Hiển thị tất cả khi nhấn "Xem tất cả"
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="bg-black/30 backdrop-blur-sm rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 duration-200 overflow-hidden border border-orange-200"
                    onClick={() => openModal(promo)}
                  >
                    <div className="aspect-[760/480] w-full">
                      <img
                        src={getImageUrl(promo.image)}
                        alt={promo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Nút "Thu gọn" */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(false)}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  Thu Gọn
                  <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && currentPromo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-4 backdrop-blur-sm transition-all duration-300 overflow-y-auto">
          <div
            className="bg-white backdrop-blur-md rounded-xl shadow-[0_20px_50px_rgba(249,115,22,0.2)] w-full max-w-full sm:max-w-[90%] md:max-w-5xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-[2px] md:border-[3px] border-gradient-to-r border-orange-200 relative my-4 md:my-auto"
            style={{
              animation:
                "modalFadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow:
                "0 10px 50px rgba(249,115,22,0.2), 0 6px 20px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            <div className="sticky top-0 left-0 right-0 z-20 bg-gradient-to-r from-white/90 via-white/80 to-white/90 shadow-sm backdrop-blur-md">
              <div className="h-12 md:h-16 relative flex items-center justify-end px-2 md:px-6">
                <div className="absolute left-3 md:left-6 top-1/2 transform -translate-y-1/2 max-w-[75%] md:max-w-[85%]">
                  <span className="text-orange-500 font-semibold text-sm md:text-base lg:text-lg truncate block">
                    GK88 CƯỢC GIẢI TRÍ, THƯỞNG NGHÌN TỶ!
                  </span>
                </div>
                {/* Nút đóng ở góc phải trên */}
                <button
                  onClick={closeModal}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 duration-200"
                  aria-label="Đóng"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Content */}
              <div className="p-4 md:p-6 lg:p-8 pt-2 md:pt-4">
                {/* Nội dung */}
                <div className="mb-5 md:mb-8 bg-orange-50/50 backdrop-blur-sm p-3 md:p-6 rounded-xl border border-orange-200 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                  <h4 className="text-lg md:text-xl font-bold text-gradient bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-3 md:mb-4 pb-2 border-b border-orange-200 flex items-center">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 mr-1.5 md:mr-2 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                    <span className="truncate">GK88 CƯỢC GIẢI TRÍ, THƯỞNG NGHÌN TỶ!</span>
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: currentPromo.content }}
                  />
                </div>

                {/* Footer */}
                <div className="mt-5 md:mt-8 pt-3 md:pt-4 flex flex-col sm:flex-row justify-center border-t border-orange-200 gap-3 sm:gap-0">
                  <button
                    onClick={closeModal}
                    className="bg-orange-50 backdrop-blur-sm text-orange-600 px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold hover:bg-orange-100 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .text-gradient {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 640px) {
          .text-gradient {
            background-size: 100%;
          }
        }

        /* Swiper Navigation Buttons */
        .promotions-swiper .swiper-button-next,
        .promotions-swiper .swiper-button-prev {
          color: #f97316;
          background: rgba(255, 255, 255, 0.9);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .promotions-swiper .swiper-button-next:after,
        .promotions-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .promotions-swiper .swiper-button-next:hover,
        .promotions-swiper .swiper-button-prev:hover {
          background: rgba(249, 115, 22, 0.9);
          color: white;
        }

        /* Swiper Pagination */
        .promotions-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
        }

        .promotions-swiper .swiper-pagination-bullet-active {
          background: #f97316;
          width: 32px;
          border-radius: 6px;
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .promotions-swiper .swiper-button-next,
          .promotions-swiper .swiper-button-prev {
            width: 32px;
            height: 32px;
          }
          
          .promotions-swiper .swiper-button-next:after,
          .promotions-swiper .swiper-button-prev:after {
            font-size: 16px;
          }
        }

        /* Padding bottom for pagination */
        .promotions-swiper {
          padding-bottom: 50px;
        }
      `}</style>
    </section>
  );
}
