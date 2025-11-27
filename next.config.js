/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static HTML Export - Required for Cloudflare Pages
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Required for static hosting
  // Note: redirects() không hoạt động với output: 'export'
  // Dùng _redirects file trong public/ folder thay thế
}

module.exports = nextConfig 