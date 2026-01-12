import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import HomePage from './pages/home'
import SectionPage from './pages/section'
import SectionPostPage from './pages/section-post'
import NotFound from './pages/not-found'
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="antialiased max-w-2xl mx-4 mt-8 lg:mx-auto text-neutral-900 dark:text-neutral-100">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/linux" element={<SectionPage section="linux" title="Linux" />} />
            <Route path="/linux/:slug" element={<SectionPostPage section="linux" />} />
            <Route path="/apple" element={<SectionPage section="apple" title="Apple" />} />
            <Route path="/apple/:slug" element={<SectionPostPage section="apple" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Analytics />
        </main>
      </div>
    </ThemeProvider>
  )
}
