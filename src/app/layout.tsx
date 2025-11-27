import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GK88 - Trung Tâm Khuyến Mãi & Ưu Đãi Đặc Biệt | Quà Tặng Hấp Dẫn',
  description: 'Khám phá hàng trăm chương trình khuyến mãi và ưu đãi đặc biệt tại GK88. Tham gia ngay để nhận quà tặng giá trị, hoàn tiền, và nhiều phần thưởng hấp dẫn khác. Hỗ trợ 24/7.',
  keywords: 'GK88, khuyến mãi, ưu đãi, quà tặng, hoàn tiền, phần thưởng, chương trình khách hàng, thành viên VIP, giải trí trực tuyến, sự kiện đặc biệt',
  authors: [{ name: 'GK88' }],
  creator: 'GK88',
  publisher: 'GK88',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/GK88.png',
    apple: '/images/GK88.png',
    shortcut: '/images/GK88.png'
  },
  openGraph: {
    title: 'GK88 - Trung Tâm Khuyến Mãi & Ưu Đãi Đặc Biệt',
    description: 'Hàng trăm chương trình khuyến mãi hấp dẫn! Quà tặng giá trị, hoàn tiền, và nhiều ưu đãi độc quyền. Tham gia ngay!',
    url: 'https://gk88.com',
    siteName: 'GK88 Khuyến Mãi',
    images: [
      {
        url: 'https://newpei.pro/img/1150X650.jpg',
        alt: 'GK88 - Trung Tâm Khuyến Mãi & Ưu Đãi Đặc Biệt',
      }
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GK88 - Khuyến Mãi & Ưu Đãi Đặc Biệt',
    description: 'Khám phá hàng trăm chương trình khuyến mãi hấp dẫn. Quà tặng giá trị, hoàn tiền, ưu đãi độc quyền.',
    images: ['https://newpei.pro/img/1150X650.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ca4494aade5bb6d8',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        {/* Favicon - chỉ sử dụng GK88.png */}
        <link rel="icon" href="/images/GK88.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/GK88.png" />
        <meta name="msapplication-TileColor" content="#FB923C" />
        <meta name="theme-color" content="#FB923C" />
        
        {/* Google Analytics - sử dụng dangerouslySetInnerHTML để chèn script trực tiếp */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WXCZ7VS380"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WXCZ7VS380');
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
