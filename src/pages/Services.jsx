import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import EngineeringScene from '../components/EngineeringModels'

const services = [
  {
    title: 'SaaS Product Development', desc: 'Full-cycle SaaS development from architecture to deployment. I build scalable, secure platforms designed for growth from day one.',
    details: ['Cloud-native architecture', 'Scalable infrastructure', 'CI/CD pipelines', 'Monitoring & analytics'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  },
  {
    title: 'MVP Development', desc: 'From idea to working prototype in weeks. I help validate your concept with a real product — not a pitch deck or wireframes.',
    details: ['Rapid prototyping', 'Lean methodology', 'User testing ready', 'Iterative development'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  },
  {
    title: 'Full Stack Development', desc: 'End-to-end web application development. From beautiful frontends to robust backends — everything needed to launch and scale.',
    details: ['React / Next.js / Node.js', 'RESTful & GraphQL APIs', 'Database design', 'DevOps & deployment'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  },
  {
    title: 'Product Planning', desc: 'Strategic clarity before code. User flows, requirement docs, architecture planning — so you know exactly what you\'re building and why.',
    details: ['User flow mapping', 'Technical specifications', 'Architecture design', 'Milestone planning'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    title: 'Product Validation', desc: 'Before investing months of development, let\'s validate your idea with market research, competitor analysis, and feasibility studies.',
    details: ['Market research', 'Competitor analysis', 'Feasibility studies', 'Risk assessment'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    title: 'Startup Prototyping', desc: 'Interactive, high-fidelity prototypes that look and feel like the real product. Perfect for user testing and investor demos.',
    details: ['High-fidelity mockups', 'Interactive flows', 'User testing ready', 'Investor pitch ready'],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
]

const process = [
  { step: '01', title: 'Discovery', desc: 'Understanding your vision, goals, and target users.' },
  { step: '02', title: 'Strategy', desc: 'Mapping out the solution, architecture, and timeline.' },
  { step: '03', title: 'Build', desc: 'Rapid development with continuous feedback loops.' },
  { step: '04', title: 'Launch', desc: 'Deployment, testing, and going live.' },
  { step: '05', title: 'Scale', desc: 'Optimize, iterate, and grow your product.' },
]

export default function Services() {
  const headerRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true })
  const processInView = useInView(processRef, { once: true })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e) => { mouse.current = { x: (e.clientX / window.innerWidth)*2-1, y: -(e.clientY / window.innerHeight)*2+1 } }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <>
      <section ref={headerRef} className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <EngineeringScene variant="simple" mouse={mouse} />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-[var(--bg-page)] pointer-events-none z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
              <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">What I Do</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-body">From Idea to <span className="text-gradient">Launch</span></h1>
            <p className="text-secondary text-sm leading-relaxed max-w-xl mx-auto">
              I build products that solve real business problems. Every service is designed to take you from concept to scalable solution — with speed, quality, and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={servicesRef} className="section-padding pt-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 40 }} animate={servicesInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i*0.1 }}
                className="glass rounded-2xl p-6 lg:p-8 glass-hover transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-5 transition-all duration-500">{s.icon}</div>
                <h3 className="font-display text-xl font-semibold text-body mb-3">{s.title}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="space-y-2">
                  {s.details.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-xs text-dim"><span className="w-1 h-1 rounded-full bg-brand/50" />{d}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={processRef} className="section-padding">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} animate={processInView ? { opacity: 1 } : {}} className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
              <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">How I Work</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-body">The <span className="text-gradient">Process</span></h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent hidden md:block" />
            <div className="grid md:grid-cols-5 gap-6">
              {process.map((item, i) => (
                <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i*0.15 }} className="text-center">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="font-display font-bold text-brand">{item.step}</span>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-body mb-2">{item.title}</h3>
                  <p className="text-secondary text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={processInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="text-center mt-12">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand text-[var(--text-on-brand)] rounded-full font-medium text-sm hover:shadow-[0_0_30px_rgba(3,38,252,0.4)] transition-all duration-300">
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
