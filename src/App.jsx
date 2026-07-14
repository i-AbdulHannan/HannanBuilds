import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import Loader from './components/Loader'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'

function LiveUsers() {
  const [users, setUsers] = useState(() => Math.floor(Math.random() * 15) + 48)

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(42, Math.min(72, prev + change * Math.floor(Math.random() * 3 + 1)))
      })
    }, 3000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 glass rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 shadow-lg border border-green-500/20">
      <span className="relative flex w-2 h-2">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
      </span>
      <span className="text-[11px] sm:text-xs text-muted whitespace-nowrap">
        <span className="font-bold text-body">{users}</span>
        <span className="hidden xs:inline"> people viewing now</span>
        <span className="inline xs:hidden"> live</span>
      </span>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppContent() {
  const { dark } = useTheme()
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className="relative min-h-screen overflow-hidden">
        {!loading && (
          <>
            <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${dark ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 grid-overlay" />
            </div>
            <Navbar />
            <ScrollToTop />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
            <LiveUsers />
          </>
        )}
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  )
}
