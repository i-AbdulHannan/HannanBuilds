import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { dark, toggle: toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const isActive = (path) => location.pathname === path

  const navBg = scrolled
    ? 'bg-[var(--bg-page)]/80 backdrop-blur-xl border-b border-light'
    : 'bg-transparent'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl border-2 border-brand flex items-center justify-center font-display font-bold text-sm text-brand transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(3,103,252,0.3)]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-display text-lg text-body hidden sm:block">
              <span className="text-muted">Abdul</span> <span className="text-brand">Hannan</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-sm tracking-wide transition-colors duration-300 py-1 ${
                  isActive(link.href) ? 'text-brand' : 'text-secondary hover:text-body'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand" />
                )}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-light flex items-center justify-center text-secondary hover:text-brand transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Link to="/contact"
               className="px-5 py-2.5 text-sm font-medium text-white bg-brand rounded-full hover:shadow-[0_0_20px_rgba(3,103,252,0.35)] hover:shadow-[0_0_20px_rgba(210,248,1,0.15)] transition-all duration-300">
              Let&apos;s Build
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-light flex items-center justify-center text-secondary"
              aria-label="Toggle theme">
              {dark ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-6 h-[2px] bg-body" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-[2px] bg-body" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-6 h-[2px] bg-body" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--bg-page)]/95 backdrop-blur-xl border-b border-light">
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href}
                  className={`text-base font-medium transition-colors ${isActive(link.href) ? 'text-brand' : 'text-secondary'}`}>
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="mt-2 px-5 py-3 text-center text-white bg-brand rounded-full font-medium">
                Let&apos;s Build
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
