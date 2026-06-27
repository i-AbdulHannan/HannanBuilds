import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import EngineeringScene from '../components/EngineeringModels'

const stats = [
  { value: '100+', label: 'Websites Built' },
  { value: '30+', label: 'Clients Served' },
  { value: '3', label: 'SaaS Products' },
  { value: '$600k+', label: 'Revenue Generated' },
]

const services = [
  { title: 'SaaS Development', desc: 'Full-cycle SaaS from architecture to deployment. Scalable, secure, built for growth.', icon: '⚙️' },
  { title: 'MVP Development', desc: 'Rapid prototyping and MVP building. Validate your idea with a working product.', icon: '🚀' },
  { title: 'Full Stack Development', desc: 'End-to-end web development. Frontend, backend, deployment — everything included.', icon: '💻' },
]

function AnimatedCounter({ value, isInView }) {
  const [count, setCount] = useState(0)
  const num = parseInt(value)
  useEffect(() => {
    if (!isInView) return
    const steps = 60; let current = 0
    const timer = setInterval(() => {
      current += num / steps
      if (current >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 2000 / steps)
    return () => clearInterval(timer)
  }, [isInView, num])
  return <span>{count}{value.includes('+') ? '+' : ''}</span>
}

function HeroImage() {
  const [error, setError] = useState(false)
  return (
    <div className="relative w-72 h-72 xl:w-96 xl:h-96 rounded-full border border-light flex items-center justify-center overflow-hidden flex-shrink-0">
      {!error && <img src="/images/abdul-hannan.png" alt="Abdul Hannan" className="w-full h-full object-cover" onError={() => setError(true)} />}
      <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/10 to-transparent ${error ? 'opacity-100' : 'opacity-100'}`}>
        <span className="font-display text-8xl xl:text-9xl font-bold text-gradient">AH</span>
      </div>
    </div>
  )
}

function HeroSection() {
  const mouse = useRef({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const fn = (e) => { mouse.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 } }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {mounted && <EngineeringScene variant="full" mouse={mouse} />}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-page)]/50 to-[var(--bg-page)] pointer-events-none z-[1]" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs text-secondary tracking-widest uppercase">Available for Building</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6">
              <span className="text-body">Abdul</span><br />
              <span className="text-gradient">Hannan</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-secondary mb-3 font-light max-w-xl">
              AI-Integrated Product Engineer · Web Developer · Co-Founder @ VBuild
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="text-sm text-muted mb-8 font-light italic">
              &ldquo;An Engineer Who Turns Chaos Into Products&rdquo;
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/hannanbuilds/" target="_blank" rel="noreferrer"
                className="px-8 py-3.5 bg-brand text-[var(--text-on-brand)] rounded-full font-medium text-sm hover:shadow-[0_0_30px_rgba(3,38,252,0.4)] transition-all duration-300">
                Let&apos;s Build Together
              </a>
              <Link to="/projects"
                className="px-8 py-3.5 border border-medium text-body rounded-full font-medium text-sm glass-hover transition-all duration-300">
                View Projects
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent rounded-full blur-3xl opacity-50" />
              <HeroImage />
            </div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
              className="glass rounded-2xl p-4 -mt-6 relative z-10 mr-8 self-end">
              <p className="text-2xl font-bold text-brand">3+</p>
              <p className="text-xs text-muted">Years Building</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="relative -mt-20 z-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i*0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-[var(--border-medium)] transition-all duration-500 hover:-translate-y-1">
              <p className="font-display text-3xl sm:text-4xl font-bold text-brand mb-1">
                <AnimatedCounter value={stat.value} isInView={isInView} />
              </p>
              <p className="text-xs text-muted uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="section-padding pt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-brand/50 to-transparent" />
                <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">About</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-body">
                The <span className="text-gradient">Blueprint</span>
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                I&apos;m Abdul Hannan — an AI-Integrated Product Engineer and Co-Founder of VBuild.
                I specialize in transforming raw ideas into scalable digital products that solve
                real business problems. From SaaS platforms to full-stack applications, I bring
                a product-first mindset to every project.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm text-brand hover:text-body transition-colors duration-300 group">
                Know More About Me
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-4 4l4-4-4-4" /></svg>
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4">
            {[{ num: '100+', label: 'Websites' }, { num: '30+', label: 'Clients' }, { num: '3', label: 'SaaS' }, { num: '7+', label: 'Countries' }].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i*0.1 }}
                className="glass rounded-2xl p-6 text-center">
                <p className="font-display text-3xl font-bold text-brand"><AnimatedCounter value={item.num} isInView={isInView} /></p>
                <p className="text-xs text-muted mt-1">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServicesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
            <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">What I Do</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold"><span className="text-gradient">Services</span></h2>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i*0.1 }}
              className="glass rounded-2xl p-6 lg:p-8 glass-hover transition-all duration-500">
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="font-display text-lg font-semibold text-body mb-3">{s.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors group">
            View All Services
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-4 4l4-4-4-4" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const projects = [
    { title: 'WorkStation', tag: 'SaaS', subtitle: 'Team Productivity All-in-One', desc: 'An all-in-one workspace replacing WhatsApp, Email & Spreadsheets.' },
    { title: 'Talent Tree JP', tag: 'PaaS', subtitle: 'International Pakistan', desc: 'Talent acquisition platform for the Pakistan market.' },
    { title: 'ClinicFlowPro', tag: 'SaaS', subtitle: 'Healthcare Management', desc: 'Clinic management streamlining scheduling, records & billing.' },
  ]
  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
            <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">Featured Work</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold"><span className="text-gradient">Projects</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i*0.15 }}
              className="glass rounded-2xl p-6 lg:p-8 glass-hover transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium text-brand tracking-widest uppercase">{p.tag}</span>
                <span className="text-3xl font-display font-bold text-dim">{String(i+1).padStart(2,'0')}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-body mb-1">{p.title}</h3>
              <p className="text-sm text-muted mb-4">{p.subtitle}</p>
              <p className="text-secondary text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-6 pt-6 border-t border-light">
                <Link to="/projects" className="text-xs text-brand/60 hover:text-brand transition-colors inline-flex items-center gap-2">
                  View Case Study
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-4 4l4-4-4-4" /></svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-body">
              Have an idea? Let&apos;s build <span className="text-gradient">something</span>
            </h2>
            <p className="text-secondary text-sm max-w-lg mx-auto mb-8">
              Whether it&apos;s a SaaS product, an MVP, or a full platform — I can take your idea from concept to launch.
            </p>
            <a href="https://www.instagram.com/hannanbuilds/" target="_blank" rel="noreferrer"
              className="inline-block px-10 py-4 bg-brand text-[var(--text-on-brand)] rounded-full font-medium text-sm hover:shadow-[0_0_30px_rgba(3,38,252,0.4)] transition-all duration-300">
              Start Building
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <ProjectsPreview />
      <CTASection />
    </>
  )
}
