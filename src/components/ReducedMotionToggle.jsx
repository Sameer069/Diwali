import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, ZapOff } from 'lucide-react'

export default function ReducedMotionToggle() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handler = (e) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (!prefersReduced) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-effect p-3 rounded-full"
      title="Reduced motion is enabled"
    >
      <ZapOff className="w-6 h-6 text-yellow-500" />
    </motion.div>
  )
}
