import Body from '@/components/Body'
import TopSection from '@/components/TopSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <TopSection />

      {/* Body Content */}
      <Body />

      {/* Footer */}
      <Footer />
    </main>
  )
}
