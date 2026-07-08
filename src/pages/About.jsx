import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import EngineeringScene from '../components/EngineeringModels'

const philosophies = [
  { num: '01', text: 'Build before perfect.' },
  { num: '02', text: 'Ship before overthinking.' },
  { num: '03', text: 'Products solve problems.' },
  { num: '04', text: 'Learning compounds.' },
  { num: '05', text: 'Execution beats ideas.' },
]

const timeline = [
  { year: '2023', event: 'Started VBuild — a product engineering venture' },
  { year: '2024', event: 'Launched 3 SaaS products & served 30+ clients' },
  { year: '2025', event: 'Expanded internationally — 7+ countries reached' },
  { year: '2026', event: 'Building AI-powered product ecosystem & scaling VBuild' },
]

const values = [
  { title: 'Product First', desc: 'Every line of code serves a purpose. If it doesn\'t solve a problem, it doesn\'t belong.' },
  { title: 'Speed with Substance', desc: 'Move fast, but never at the cost of quality. Ship before overthinking.' },
  { title: 'AI-Augmented', desc: 'AI accelerates workflow but doesn\'t replace human judgment and creativity.' },
  { title: 'User Obsessed', desc: 'Build for the people who will use it. Their experience is the only metric that matters.' },
]

function DecorativeBlob({ className, color }) {
  return (
    <div className={`absolute rounded-full mix-blend-multiply dark:mix-blend-screen opacity-20 dark:opacity-10 blur-3xl ${className}`}
      style={{ background: color }}
    />
  )
}

function AboutImage() {
  const [error, setError] = useState(false)
  return (
    <div className="w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0 relative">
      <div className="absolute -inset-3 bg-gradient-to-tr from-[#0367FC]/20 to-[#D2F801]/20 rounded-3xl blur-xl" />
      <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#0367FC]/40 shadow-[0_0_30px_rgba(3,103,252,0.15)]">
        {!error && <img src="/images/abdul-hannan.png" alt="Abdul Hannan" className="w-full h-full object-cover" onError={() => setError(true)} />}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/10 to-[var(--bg-page)]/80">
            <div className="w-16 h-16 rounded-full border-2 border-brand/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PageHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e) => { mouse.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 } }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
      <DecorativeBlob color="#0367FC" className="w-80 h-80 -top-40 -left-40" />
      <DecorativeBlob color="#D2F801" className="w-60 h-60 top-20 -right-20" />
      <EngineeringScene variant="simple" mouse={mouse} />
      <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-[var(--bg-page)] pointer-events-none z-[1]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-[#0367FC]/50 to-transparent" />
              <span className="text-[#0367FC] text-sm tracking-[0.3em] uppercase font-medium">About</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-body">
              Engineer. Founder. <br /><span className="text-gradient">Product Builder.</span>
            </h1>
            <p className="text-secondary text-sm leading-relaxed max-w-lg border-l-2 border-[#D2F801] pl-4">
              I turn chaos into products. With a background in full-stack engineering and
              a passion for AI, I help startups and businesses build things that actually work.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center relative">
            <AboutImage />
            <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 1, type: 'spring' }}
              className="glass rounded-2xl p-4 -mt-8 relative z-10 mr-12 self-end border border-[#D2F801]/30 shadow-[0_0_20px_rgba(210,248,1,0.1)]">
              <p className="text-xl font-bold text-[#D2F801]">100+</p>
              <p className="text-[10px] text-muted">Websites</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="section-padding pt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <DecorativeBlob color="#0367FC" className="w-48 h-48 -bottom-24 -right-24" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl font-bold mb-6 text-body">The Full <span className="text-gradient">Story</span></h2>
              <div className="space-y-4 text-secondary text-sm leading-relaxed">
                <p>I&apos;m Abdul Hannan — an AI-Integrated Product Engineer and Co-Founder of <span className="text-body font-medium">VBuild</span>. I don&apos;t just build software; I build products that solve real problems for real people.</p>
                <p>My journey started with a simple belief: <span className="text-body/70">execution beats ideas</span>. While others spend months planning, I focus on shipping — learning from real users, iterating fast, and building things that matter.</p>
                <p>Today, I&apos;ve built 100+ websites, launched 3 SaaS products, served 30+ clients across 7+ countries, and generated $600k+ in revenue. Each project taught me something new about product engineering, user psychology, and the art of building.</p>
                <p>I leverage AI strategically in my workflow — for research, planning, architecture discussions, and automation. But the product decisions, architecture, and quality standards are mine. AI accelerates the process; it doesn&apos;t replace the thinking.</p>
                <p>My mission? To grow <span className="text-body/70">VBuild</span> into a respected product company and build an ecosystem of AI-powered SaaS businesses that solve problems at scale.</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4">
            <div className="glass rounded-3xl p-6 lg:p-8">
              <h3 className="font-display text-lg font-semibold mb-4 text-body">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  { label: 'Role', value: 'Product Engineer' },
                  { label: 'Company', value: 'Co-Founder @ VBuild' },
                  { label: 'Location', value: 'Pakistan (Global)' },
                  { label: 'Experience', value: '3+ Years' },
                  { label: 'Focus', value: 'SaaS & AI Products' },
                  { label: 'Clients', value: '30+ Worldwide' },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between text-sm py-2 border-b border-light last:border-0">
                    <span className="text-dim">{f.label}</span>
                    <span className="text-secondary">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="section-padding pt-0">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#0367FC]" />
            <span className="text-[#0367FC] text-sm tracking-[0.3em] uppercase font-medium">Journey</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#0367FC]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-body">The <span className="text-gradient">Timeline</span></h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0367FC]/50 via-[#D2F801]/30 to-transparent" />
          {timeline.map((item, i) => (
            <motion.div key={item.year} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i*0.2 }}
              className="relative flex gap-6 pb-10 last:pb-0">
              <div className="relative z-10 w-16 h-16 rounded-full glass flex items-center justify-center flex-shrink-0 border border-[#D2F801]/20">
                <span className="font-display font-bold text-[#0367FC] text-sm">{item.year}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ delay: i*0.2 + 0.3, duration: 0.5 }}
                className="glass rounded-2xl p-5 flex-1 self-center overflow-hidden">
                <p className="text-secondary text-sm">{item.event}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="section-padding pt-0 relative overflow-hidden">
      <DecorativeBlob color="#D2F801" className="w-64 h-64 -right-32 top-1/3" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#0367FC]" />
            <span className="text-[#0367FC] text-sm tracking-[0.3em] uppercase font-medium">Mindset</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#0367FC]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-body">Operating <span className="text-gradient">Principles</span></h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i*0.1 }}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D2F801]/20 group">
              <span className="text-[#0367FC] group-hover:text-[#D2F801] transition-colors text-sm font-mono block mb-2">{String(i+1).padStart(2,'0')}</span>
              <h3 className="font-display text-lg font-semibold text-body mb-2">{v.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto mt-8 space-y-3">
          {philosophies.map((item, i) => (
            <motion.div key={item.num} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i*0.08 }}
              className="glass rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:border-[#0367FC]/30 hover:-translate-y-0.5">
              <span className="font-display text-xl font-bold text-[#D2F801]/60 min-w-[36px]">{item.num}</span>
              <p className="text-secondary text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHeader />
      <BioSection />
      <Timeline />
      <PhilosophySection />
    </>
  )
}
