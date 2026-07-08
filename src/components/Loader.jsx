import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const commands = [
  'INITIALIZING_SECURE_KERNEL...',
  'LOADING_NEURAL_NETWORKS...',
  'ESTABLISHING_ENCRYPTED_TUNNEL...',
  'DEPLOYING_AI_PROTOCOLS...',
  'SCANNING_THREAT_VECTORS...',
  'CALIBRATING_CYBER_DEFENSES...',
  'ACTIVATING_DEEP_LEARNING...',
  'SYSTEM_READY.',
]

function MatrixRain({ cols = 40 }) {
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|&^%$#@!'
  const drops = useMemo(() =>
    Array.from({ length: cols }, () => ({
      x: Math.random() * 100,
      delay: Math.random() * 5,
      speed: 0.5 + Math.random() * 1.5,
      length: 5 + Math.floor(Math.random() * 15),
    })), [cols])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="absolute text-[10px] leading-[14px] font-mono text-[#0367FC]"
          style={{
            left: `${drop.x}%`,
            animation: `matrix ${8 / drop.speed}s linear ${drop.delay}s infinite`,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}
        >
          {Array.from({ length: drop.length }, (_, j) =>
            chars[Math.floor(Math.random() * chars.length)]
          ).join('')}
        </div>
      ))}
    </div>
  )
}

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [cmdIndex, setCmdIndex] = useState(0)
  const [typing, setTyping] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + Math.random() * 6 + 1
      })
    }, 100)

    const timer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 800)
      }, 600)
    }, 3500)

    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [onComplete])

  useEffect(() => {
    if (cmdIndex >= commands.length) return
    const fullCmd = commands[cmdIndex]
    let i = 0
    const t = setInterval(() => {
      i++
      setTyping(fullCmd.slice(0, i))
      if (i >= fullCmd.length) {
        clearInterval(t)
        setTimeout(() => {
          setCmdIndex(prev => prev + 1)
          setTyping('')
        }, 400)
      }
    }, 40 + Math.random() * 30)
    return () => clearInterval(t)
  }, [cmdIndex])

  useEffect(() => {
    const c = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(c)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#161616' }}
        >
          <MatrixRain />

          <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full px-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-2xl border border-[#0367FC]/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0367FC]/10 to-transparent" />
                <svg className="w-12 h-12 text-[#0367FC] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 2a4 4 0 014 4c0 2-2 4-4 6-2-2-4-4-4-6a4 4 0 014-4z" />
                  <path d="M8 14h8" />
                  <path d="M9 18l1-4h4l1 4" />
                  <path d="M12 22v-4" />
                </svg>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  className="absolute -inset-2 rounded-2xl border border-[#0367FC]/20 border-t-[#0367FC]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="absolute -inset-3 rounded-2xl border border-[#0367FC]/10 border-b-[#D2F801]"
                />
              </div>
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 w-4 h-4"
              >
                <div className="w-full h-full rounded-full bg-[#D2F801] blur-sm" />
              </motion.div>
            </motion.div>

            <div className="w-full bg-[#1F1F1F]/80 rounded-xl border border-[#0367FC]/15 p-4 font-mono text-xs">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#0367FC]/10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-[#9CA3AF] ml-2 text-[10px]">ah@system:~</span>
              </div>
              <div className="space-y-1.5">
                {commands.slice(0, cmdIndex).map((cmd, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#0367FC] shrink-0">$</span>
                    <span className="text-[#FFFFFF]/80">{cmd}</span>
                    <span className="text-[#10B981] text-[10px] mt-0.5">✓</span>
                  </div>
                ))}
                {cmdIndex < commands.length && (
                  <div className="flex items-start gap-2">
                    <span className="text-[#0367FC] shrink-0">$</span>
                    <span className="text-[#FFFFFF]/80">
                      {typing}
                      {showCursor && <span className="text-[#D2F801] ml-0.5">▊</span>}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full max-w-xs">
              <div className="relative h-[2px] bg-[#1F1F1F] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#0367FC] to-[#D2F801] rounded-full relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" />
                </motion.div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[#9CA3AF] text-[10px] font-mono tracking-widest">PROCESSING</span>
                <span className="text-[#D2F801] text-[10px] font-mono">{Math.floor(Math.min(progress, 100))}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
