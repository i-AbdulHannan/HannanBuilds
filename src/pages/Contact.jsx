import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import EngineeringScene from '../components/EngineeringModels'

function DecorativeBlob({ className, color }) {
  return (
    <div className={`absolute rounded-full mix-blend-multiply dark:mix-blend-screen opacity-20 dark:opacity-10 blur-3xl ${className}`}
      style={{ background: color }}
    />
  )
}

export default function Contact() {
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const formInView = useInView(formRef, { once: true })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e) => { mouse.current = { x: (e.clientX / window.innerWidth)*2-1, y: -(e.clientY / window.innerHeight)*2+1 } }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <>
      <section ref={headerRef} className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <DecorativeBlob color="#D2F801" className="w-72 h-72 top-0 -right-20" />
        <EngineeringScene variant="minimal" mouse={mouse} />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-[var(--bg-page)] pointer-events-none z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
              <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">Contact</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-body">Let&apos;s Build <span className="text-gradient">Something</span></h1>
            <p className="text-secondary text-sm leading-relaxed max-w-xl mx-auto">
              Have an idea? Let&apos;s take it from concept to launch. Whether it&apos;s a SaaS product, an MVP, or a full platform — I can help.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={formRef} className="section-padding pt-0">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={formInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              <DecorativeBlob color="#0367FC" className="w-40 h-40 -top-20 -right-20" />
              <div className="relative z-10">
                <h2 className="font-display text-xl font-semibold mb-6 text-body">Send a <span className="text-gradient">Message</span></h2>
                <form action="mailto:projects.abdulhannan@gmail.com" method="POST" encType="text/plain" className="space-y-5">
                  <input type="text" name="name" placeholder="Your Name"
                    className="w-full bg-[var(--glass-bg)] border border-light rounded-xl px-5 py-3.5 text-sm text-body placeholder:text-dim outline-none focus:border-[#0367FC]/50 focus:shadow-[0_0_15px_rgba(3,103,252,0.1)] transition-all duration-300" />
                  <input type="email" name="email" placeholder="Your Email"
                    className="w-full bg-[var(--glass-bg)] border border-light rounded-xl px-5 py-3.5 text-sm text-body placeholder:text-dim outline-none focus:border-[#0367FC]/50 focus:shadow-[0_0_15px_rgba(3,103,252,0.1)] transition-all duration-300" />
                  <input type="text" name="subject" placeholder="Subject"
                    className="w-full bg-[var(--glass-bg)] border border-light rounded-xl px-5 py-3.5 text-sm text-body placeholder:text-dim outline-none focus:border-[#0367FC]/50 focus:shadow-[0_0_15px_rgba(3,103,252,0.1)] transition-all duration-300" />
                  <textarea name="message" rows={5} placeholder="Tell me about your project..."
                    className="w-full bg-[var(--glass-bg)] border border-light rounded-xl px-5 py-3.5 text-sm text-body placeholder:text-dim outline-none focus:border-[#0367FC]/50 focus:shadow-[0_0_15px_rgba(3,103,252,0.1)] transition-all duration-300 resize-none" />
                  <button type="submit"
                    className="w-full px-8 py-3.5 bg-[#0367FC] text-white rounded-full font-medium text-sm hover:shadow-[0_0_30px_rgba(3,103,252,0.5)] hover:shadow-[0_0_60px_rgba(210,248,1,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={formInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-5">
              <div className="glass rounded-3xl p-8 lg:p-10">
                <h2 className="font-display text-xl font-semibold mb-6 text-body">Connect <span className="text-gradient">Directly</span></h2>
                <div className="space-y-4">
                  <a href="mailto:projects.abdulhannan@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl glass glass-hover transition-all duration-300 group hover:border-[#D2F801]/20">
                    <div className="w-10 h-10 rounded-lg bg-[#0367FC]/10 flex items-center justify-center text-[#0367FC] group-hover:bg-[#D2F801]/20 group-hover:text-[#D2F801] transition-all duration-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div><p className="text-xs text-dim uppercase tracking-wider">Email</p><p className="text-sm text-secondary">projects.abdulhannan@gmail.com</p></div>
                  </a>
                  <a href="https://www.linkedin.com/in/abdulhannan-projects/" target="_blank" rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl glass glass-hover transition-all duration-300 group hover:border-[#D2F801]/20">
                    <div className="w-10 h-10 rounded-lg bg-[#0367FC]/10 flex items-center justify-center text-[#0367FC] group-hover:bg-[#D2F801]/20 group-hover:text-[#D2F801] transition-all duration-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </div>
                    <div><p className="text-xs text-dim uppercase tracking-wider">LinkedIn</p><p className="text-sm text-secondary">/in/abdulhannan-projects</p></div>
                  </a>
                  <a href="https://www.instagram.com/hannanbuilds/" target="_blank" rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl glass glass-hover transition-all duration-300 group hover:border-[#D2F801]/20">
                    <div className="w-10 h-10 rounded-lg bg-[#0367FC]/10 flex items-center justify-center text-[#0367FC] group-hover:bg-[#D2F801]/20 group-hover:text-[#D2F801] transition-all duration-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </div>
                    <div><p className="text-xs text-dim uppercase tracking-wider">Instagram</p><p className="text-sm text-secondary">@hannanbuilds</p></div>
                  </a>
                </div>
              </div>

              <div className="glass rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                <DecorativeBlob color="#D2F801" className="w-32 h-32 -bottom-16 -right-16" />
                <div className="relative z-10">
                  <h2 className="font-display text-lg font-semibold mb-2 text-body">AI <span className="text-gradient">Integration</span></h2>
                  <p className="text-secondary text-sm italic mb-4 border-l-2 border-[#0367FC] pl-3">&ldquo;AI accelerates my workflow. It does not replace my thinking.&rdquo;</p>
                  <div className="flex flex-wrap gap-2">
                    {['Research', 'Planning', 'Architecture', 'Docs', 'Automation'].map((item) => (
                      <span key={item} className="px-3 py-1 text-xs border border-[#0367FC]/20 text-[#0367FC]/70 rounded-full hover:bg-[#0367FC]/10 transition-colors">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
