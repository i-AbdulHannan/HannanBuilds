import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const knowledge = {
  greeting: ['hi', 'hello', 'hey', 'yo', 'sup'],
  about: ['about', 'who', 'hannan', 'abdul', 'yourself', 'background'],
  services: ['service', 'build', 'saas', 'develop', 'mvp', 'product'],
  projects: ['project', 'workstation', 'clinicflow', 'talent tree', 'case study'],
  skills: ['skill', 'tech', 'tool', 'stack', 'technology', 'framework', 'expertise'],
  experience: ['experience', 'year', 'work', 'career', 'professional'],
  contact: ['contact', 'email', 'reach', 'hire', 'instagram', 'linkedin'],
  pricing: ['price', 'cost', 'rate', 'charge', 'budget', 'hire', 'freelance'],
  location: ['location', 'based', 'pakistan', 'country', 'where'],
}

const responses = {
  greeting: [
    "Hey! 👋 Welcome. I'm Abdul Hannan's virtual assistant. Ask me anything about his work, skills, or services!",
    "Hello there! Ready to learn about Abdul Hannan? Just ask away!",
    "Hey! Need info about Abdul Hannan's work? I'm here to help!",
  ],
  about: [
    "Abdul Hannan is an AI-Integrated Product Engineer and Co-Founder of VBuild. He turns chaos into products — SaaS platforms, web apps, and full-stack solutions. He's built 100+ websites, 3 SaaS products, and served 30+ clients globally.",
    "Abdul Hannan: Product Engineer, Web Developer, Co-Founder @ VBuild. His motto: 'An Engineer Who Turns Chaos Into Products.' He specializes in AI-powered product development with a product-first mindset.",
    "He's Abdul Hannan — an engineer who thinks beyond code. With a focus on solving real problems, he's helped startups and businesses launch products that actually work. 100+ websites, 3 SaaS products, and counting!",
  ],
  services: [
    "Here are Abdul's services:\n\n🔹 SaaS Product Development — Full-cycle SaaS from architecture to deployment\n🔹 MVP Development — Rapid prototyping to validate your idea\n🔹 Full Stack Development — Frontend, backend, deployment\n🔹 Product Planning — Strategy, flows, documentation\n🔹 Product Validation — Market research & feasibility\n🔹 Startup Prototyping — Interactive prototypes for testing\n\nFrom idea to launch — he builds products that solve real business problems.",
    "Services offered:\n• SaaS Development\n• MVP Development\n• Full Stack Development\n• Product Planning\n• Product Validation\n• Startup Prototyping\nAll with AI-powered efficiency!",
  ],
  projects: [
    "Featured projects:\n\n🔸 WorkStation — All-in-one team workspace replacing WhatsApp, Email & Spreadsheets. Built by a founder for founders.\n🔸 Talent Tree JP — Talent acquisition platform for the Pakistan market.\n🔸 ClinicFlowPro — Healthcare management platform for patient scheduling & billing.\n\nEach one solves a real problem.",
    "Abdul's key projects:\n1. WorkStation (SaaS) — Team Productivity\n2. Talent Tree JP (PaaS) — Talent Acquisition\n3. ClinicFlowPro (SaaS) — Healthcare Management\n\nWant details on any specific project?",
  ],
  skills: [
    "Technical skills & expertise:\n\n• Frontend: HTML, CSS, JavaScript, Tailwind CSS, Bootstrap, GSAP\n• Backend: PHP, MySQL\n• Deployment: GitHub, Netlify, Vercel, Traditional Hosting\n• Product: Research, PRD, TRD, User Flows, Product Planning, Feature Prioritization\n• AI: Prompt Engineering, AI Workflows, AI-Assisted Development, Documentation, Research, Content Generation\n\nHe also leverages AI strategically for research, planning, architecture, documentation, and workflow automation.",
  ],
  experience: [
    "Abdul has built 100+ websites, launched 3 SaaS products, served 30+ clients, and generated $600k+ in revenue. He has 7+ international clients and 3+ years of hands-on product building experience. He's the Co-Founder of VBuild.",
    "Experience highlights:\n• 100+ Websites Built\n• 30+ Clients Served\n• 3 SaaS Products Launched\n• $600k+ Revenue Generated\n• 7+ International Clients\n• Co-Founder @ VBuild\n\nAll with a product-first engineering mindset!",
  ],
  contact: [
    "You can reach Abdul Hannan through:\n\n📧 Email: projects.abdulhannan@gmail.com\n🔗 LinkedIn: /in/abdulhannan-projects\n📸 Instagram: @hannanbuilds\n\nOr use the contact form on this site. He's always open to building something useful!",
    "Contact options:\n• Email: projects.abdulhannan@gmail.com\n• LinkedIn: /in/abdulhannan-projects\n• Instagram: @hannanbuilds\n\nHe's available for product building opportunities!",
  ],
  pricing: [
    "For pricing inquiries, it's best to reach out directly to Abdul via email at projects.abdulhannan@gmail.com or through the contact form. Every project is different and he provides custom quotes based on scope and requirements.",
    "Rates depend on project scope. Contact Abdul directly for a custom quote:\n📧 projects.abdulhannan@gmail.com\n\nHe believes in building value, not just writing code!",
  ],
  location: [
    "Abdul Hannan is based in Pakistan and works with clients globally — he's served 7+ international clients across different time zones. Location is never a barrier to building great products!",
  ],
  fallback: [
    "I'm not sure about that. Try asking about Abdul's services, projects, skills, or experience. I'm here to help!",
    "Hmm, I don't have info on that. You can ask me about his services, projects, skills, or how to contact him.",
    "Didn't quite catch that. Try asking: 'What services do you offer?' or 'Tell me about your projects.'",
  ],
}

function getResponse(input) {
  const lower = input.toLowerCase()
  for (const [category, keywords] of Object.entries(knowledge)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        const replies = responses[category]
        return replies[Math.floor(Math.random() * replies.length)]
      }
    }
  }
  const fallbacks = responses.fallback
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hey! I'm AH's virtual assistant. Ask me anything about his work! 🚀" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = getResponse(input)
      setMessages(prev => [...prev, { role: 'bot', text: reply }])
      setTyping(false)
    }, 800 + Math.random() * 700)
  }

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand text-white shadow-lg hover:shadow-[0_0_30px_rgba(3,38,252,0.4)] transition-all duration-300 flex items-center justify-center">
        {open ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] glass rounded-2xl overflow-hidden shadow-2xl border border-light">
            <div className="bg-brand p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium">AH Assistant</p>
                <p className="text-white/50 text-[10px]">AI-Powered • No API Key Needed</p>
              </div>
            </div>

            <div className="h-[350px] overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' ? 'bg-brand text-white rounded-br-md' : 'bg-[var(--glass-bg)] text-secondary rounded-bl-md'
                  }`}>
                    {msg.text.split('\n').map((line, j) => (
                      <React.Fragment key={j}>{j > 0 && <br />}{line}</React.Fragment>
                    ))}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-[var(--glass-bg)] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-secondary/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-secondary/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-light flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Abdul's work..."
                className="flex-1 bg-[var(--glass-bg)] border border-light rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim outline-none focus:border-brand/50 transition-all" />
              <button type="submit" disabled={!input.trim()}
                className="px-4 py-2.5 bg-brand text-white rounded-xl text-sm font-medium disabled:opacity-40 transition-all hover:shadow-[0_0_20px_rgba(3,38,252,0.3)]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
