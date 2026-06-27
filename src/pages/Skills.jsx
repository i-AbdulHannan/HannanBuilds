import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import EngineeringScene from '../components/EngineeringModels'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'GSAP'],
    color: '#0326FC',
  },
  {
    title: 'Backend',
    skills: ['PHP', 'MySQL'],
    color: '#ffffff',
  },
  {
    title: 'Deployment',
    skills: ['GitHub', 'Netlify', 'Vercel', 'Traditional Hosting'],
    color: '#0326FC',
  },
  {
    title: 'Product',
    skills: ['Research', 'PRD', 'TRD', 'User Flows', 'Product Planning', 'Feature Prioritization'],
    color: '#ffffff',
  },
  {
    title: 'AI',
    skills: ['Prompt Engineering', 'AI Workflows', 'AI-Assisted Development', 'Documentation', 'Research', 'Content Generation'],
    color: '#0326FC',
  },
]

function SkillCard({ category, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-6 lg:p-8 glass-hover transition-all duration-300"
    >
      <h3 className="font-display text-lg font-semibold text-body mb-5 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 text-sm border border-light text-secondary rounded-xl hover:border-brand/30 hover:text-brand transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const aiTools = ['Research', 'Planning', 'Architecture', 'Documentation', 'Automation', 'Problem Solving', 'Multi-Agent Systems', 'Product Development']

export default function Skills() {
  const headerRef = useRef(null)
  const skillsRef = useRef(null)
  const quoteRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const skillsInView = useInView(skillsRef, { once: true })
  const quoteInView = useInView(quoteRef, { once: true })
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
              <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">Expertise</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-body">What I <span className="text-gradient">Know</span></h1>
            <p className="text-secondary text-sm leading-relaxed max-w-xl mx-auto">
              Not just technical skills — product skills. Because building products requires more than code.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={skillsRef} className="section-padding pt-0">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            {skillCategories.map((cat, i) => (
              <SkillCard key={cat.title} category={cat} index={i} isInView={skillsInView} />
            ))}
          </div>
        </div>
      </section>

      <section ref={quoteRef} className="section-padding">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} animate={quoteInView ? { opacity: 1 } : {}} className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
              <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">Mindset</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={quoteInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
              className="glass rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="font-display text-2xl font-bold text-body mb-4">
                  Skills Are <span className="text-gradient">Tools</span>,<br />Not Identity
                </h2>
                <p className="text-secondary text-sm leading-relaxed">
                  I don&apos;t define myself by the technologies I use. I define myself by the problems I solve.
                  Every tool in my skillset exists for one reason — to build products that work.
                </p>
                <p className="text-secondary text-sm leading-relaxed mt-4">
                  Whether it&apos;s frontend, backend, product strategy, or AI workflows — the goal is always
                  the same: move the product forward.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={quoteInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}
              className="glass rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
              <div className="relative z-10">
                <h2 className="font-display text-2xl font-bold text-body mb-4">
                  Product <span className="text-gradient">Over Tech</span>
                </h2>
                <p className="text-secondary text-sm leading-relaxed">
                  The best product engineers don&apos;t just know technology — they understand people,
                  problems, and what makes a product actually useful.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Product Thinking', 'Fast Execution', 'Founder Mindset'].map((item) => (
                    <span key={item} className="px-3 py-1.5 text-xs border border-brand/20 text-brand/80 rounded-full">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={quoteInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden mt-6">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
                <span className="text-brand text-sm tracking-[0.3em] uppercase font-medium">AI Integration</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
              </div>
              <blockquote className="text-secondary text-sm italic mb-6 max-w-lg mx-auto">
                &ldquo;AI accelerates my workflow. It does not replace my thinking.&rdquo;
              </blockquote>
              <p className="text-muted text-xs leading-relaxed max-w-xl mx-auto mb-6">
                I use AI strategically. For research, planning, architecture discussions, documentation,
                and workflow automation. The product decisions, architecture, and quality standards are mine.
                AI is a tool, not a crutch.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {aiTools.map((item) => (
                  <span key={item} className="px-4 py-2 text-xs border border-brand/20 text-brand/70 rounded-full glass-hover transition-colors">{item}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
