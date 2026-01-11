import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import HomePage from './pages/home'
import LinuxPage from './pages/linux'
import LinuxPostPage from './pages/linux-post'
import NotFound from './pages/not-found'

export default function App() {
  return (
    <div className="antialiased max-w-2xl mx-4 mt-8 lg:mx-auto text-neutral-900 dark:text-neutral-100">
      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/linux" element={<LinuxPage />} />
          <Route path="/linux/:slug" element={<LinuxPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  )
}
