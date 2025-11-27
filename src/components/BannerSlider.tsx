'use client';

export default function BannerSlider() {
  return (
    <section className="w-full aspect-[32/10] md:aspect-[32/6] m-0 p-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 md:gap-6 px-4 md:px-0">
        <img
          src="/images/Untitled-7.png"
          alt="Logo"
          className="w-full md:w-4/5 lg:w-3/5 h-auto object-contain animate-zoom"
        />
        <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-orange-400 drop-shadow-lg whitespace-nowrap">
          TRUNG TÂM KHUYẾN MÃI
        </h1>
      </div>
    </section>
  );
}