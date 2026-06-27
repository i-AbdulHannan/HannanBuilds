import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + Math.random() * 8 + 2
      })
    }, 120)

    const timer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 600)
      }, 400)
    }, 2800)

    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg-page)' }}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full border-2 border-brand flex items-center justify-center">
                <span className="font-display text-3xl font-bold text-brand">AH</span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-brand/20 border-t-brand"
              />
            </motion.div>

            <div className="w-48">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
                className="h-[2px] bg-brand"
              />
              <div className="flex justify-between mt-2">
                <span className="text-dim text-[10px] font-mono tracking-widest">LOADING</span>
                <span className="text-dim text-[10px] font-mono">{Math.floor(Math.min(progress, 100))}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
