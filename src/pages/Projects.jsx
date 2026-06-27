import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import EngineeringScene from '../components/EngineeringModels'

const projects = [
  {
    title: 'WorkStation', tag: 'SaaS', subtitle: 'Team Productivity All-in-One',
    desc: 'An all-in-one team workspace that replaces WhatsApp, Email, and Spreadsheets. Built by a founder for founders.',
    problem: 'Scattered team communication', solution: 'Unified workspace',
    features: 'Tasks, Leads, Voice Notes', impact: 'Streamlined team operations',
    color: 'from-blue-600/20 to-blue-800/5',
  },
  {
    title: 'Talent Tree JP', tag: 'PaaS', subtitle: 'International Pakistan',
    desc: 'A talent acquisition and management platform built for the Pakistan market. Connecting companies with top talent.',
    client: 'International (Pakistan)', type: 'Full Stack Platform',
    color: 'from-indigo-600/20 to-indigo-800/5',
  },
  {
    title: 'ClinicFlowPro', tag: 'SaaS', subtitle: 'Healthcare Management',
    desc: 'A comprehensive clinic management platform that streamlines patient scheduling, medical records, billing, and administrative workflows.',
    problem: 'Manual clinic operations', solution: 'Digital clinic management',
    features: 'Scheduling, Records, Billing', impact: 'Operational efficiency',
    color: 'from-violet-600/20 to-violet-800/5',
  },
]

function ProjectCard({ project, index, isInView }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index*0.15 }}
      className="glass rounded-3xl overflow-hidden glass-hover transition-all duration-500">
      <div className="p-8 lg:p-10 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-medium text-brand tracking-widest uppercase bg-brand/10 px-3 py-1.5 rounded-full">{project.tag}</span>
            <span className="font-display text-4xl font-bold text-dim">{String(index+1).padStart(2,'0')}</span>
          </div>
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-body mb-2">{project.title}</h3>
          <p className="text-muted text-sm mb-6">{project.subtitle}</p>
          <p className="text-secondary text-sm leading-relaxed mb-8">{project.desc}</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {project.problem && (
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] text-dim uppercase tracking-wider mb-1">Problem</p>
                <p className="text-sm text-secondary">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] text-dim uppercase tracking-wider mb-1">Solution</p>
                <p className="text-sm text-secondary">{project.solution}</p>
              </div>
            )}
            {project.features && (
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] text-dim uppercase tracking-wider mb-1">Features</p>
                <p className="text-sm text-secondary">{project.features}</p>
              </div>
            )}
            {project.impact && (
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] text-dim uppercase tracking-wider mb-1">Impact</p>
                <p className="text-sm text-secondary">{project.impact}</p>
              </div>
            )}
            {project.client && (
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] text-dim uppercase tracking-wider mb-1">Client</p>
                <p className="text-sm text-secondary">{project.client}</p>
              </div>
            )}
            {project.type && (
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] text-dim uppercase tracking-wider mb-1">Type</p>
                <p className="text-sm text-secondary">{project.type}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const projectsRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const projectsInView = useInView(projectsRef, { once: true })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e) => { mouse.current = { x: (e.clientX / window.innerWidth)*2-1, y: -(e.clientY / window.innerHeight)*2+1 } }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <>
      <section ref={headerRef} className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <EngineeringScene variant="minimal" mouse={mouse} />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-[var(--bg-page)] pointer-events-none z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
              <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">Featured Work</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-body">Products That <span className="text-gradient">Solve Problems</span></h1>
            <p className="text-secondary text-sm leading-relaxed max-w-xl mx-auto">
              Real products built for real businesses. Each one tells a story of identifying a problem and engineering the right solution.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={projectsRef} className="section-padding pt-0">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-8">
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} isInView={projectsInView} />)}
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="glass rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-body">Want to be the next <span className="text-gradient">case study?</span></h2>
              <p className="text-secondary text-sm max-w-md mx-auto mb-8">Let's build something remarkable together. Your project could be here next.</p>
              <Link to="/contact" className="inline-block px-10 py-4 bg-brand text-[var(--text-on-brand)] rounded-full font-medium text-sm hover:shadow-[0_0_30px_rgba(3,38,252,0.4)] transition-all duration-300">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
