import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import gsap from 'gsap'

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState('dark') // dark -> stars -> matchstick -> light -> text -> button
  const canvasRef = useRef(null)
  const matchstickRef = useRef(null)
  const diyaRef = useRef(null)

  useEffect(() => {
    // Stage 1: Dark screen with appearing stars
    const timer1 = setTimeout(() => {
      setStage('stars')
      drawStars()
    }, 500)

    // Stage 2: Matchstick animation
    const timer2 = setTimeout(() => {
      setStage('matchstick')
      animateMatchstick()
    }, 3000)

    // Stage 3: Light up
    const timer3 = setTimeout(() => {
      setStage('light')
    }, 5500)

    // Stage 4: Show text
    const timer4 = setTimeout(() => {
      setStage('text')
    }, 6500)

    // Stage 5: Show button
    const timer5 = setTimeout(() => {
      setStage('button')
    }, 8000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  const drawStars = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = []
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: 0,
        targetOpacity: Math.random() * 0.8 + 0.2
      })
    }

    let animationFrame
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        if (star.opacity < star.targetOpacity) {
          star.opacity += 0.01
        }
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
        
        // Twinkle effect
        if (Math.random() > 0.99) {
          star.targetOpacity = Math.random() * 0.8 + 0.2
        }
      })
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => cancelAnimationFrame(animationFrame)
  }

  const animateMatchstick = () => {
    if (matchstickRef.current) {
      gsap.to(matchstickRef.current, {
        rotation: 45,
        duration: 1,
        ease: 'power2.inOut'
      })
      
      gsap.to('.match-flame', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 1,
        ease: 'back.out'
      })
      
      // Move matchstick to diya
      gsap.to(matchstickRef.current, {
        x: 0,
        y: 50,
        duration: 1.5,
        delay: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          // Light the diya
          gsap.to('.diya-flame', {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out'
          })
        }
      })
    }
  }

  const handleCelebrate = () => {
    // Trigger massive fireworks before transitioning
    const colors = ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF']
    
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createFireworkBurst(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          colors[Math.floor(Math.random() * colors.length)]
        )
      }, i * 100)
    }

    setTimeout(() => {
      onComplete()
    }, 3500)
  }

  const createFireworkBurst = (x, y, color) => {
    const burst = document.createElement('div')
    burst.className = 'fixed pointer-events-none'
    burst.style.left = `${x}px`
    burst.style.top = `${y}px`
    burst.style.zIndex = '1000'
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.style.position = 'absolute'
      particle.style.width = '4px'
      particle.style.height = '4px'
      particle.style.borderRadius = '50%'
      particle.style.backgroundColor = color
      particle.style.boxShadow = `0 0 10px ${color}`
      
      burst.appendChild(particle)
      
      const angle = (Math.PI * 2 * i) / 20
      const velocity = 2 + Math.random() * 2
      
      gsap.to(particle, {
        x: Math.cos(angle) * 100 * velocity,
        y: Math.sin(angle) * 100 * velocity,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: 'power2.out'
      })
    }
    
    document.body.appendChild(burst)
    setTimeout(() => burst.remove(), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Stars canvas */}
      {stage !== 'dark' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />
      )}

      {/* Glowing background that appears when light */}
      <AnimatePresence>
        {stage === 'light' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-orange-900/30 to-yellow-900/20"
          />
        )}
      </AnimatePresence>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Matchstick and Diya */}
        {(stage === 'matchstick' || stage === 'light') && (
          <div className="relative">
            {/* Matchstick */}
            <motion.div
              ref={matchstickRef}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-32 left-1/2 -translate-x-1/2"
            >
              <div className="w-2 h-24 bg-yellow-900 rounded-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-red-600 rounded-full" />
                <motion.div
                  className="match-flame absolute -top-8 left-1/2 -translate-x-1/2"
                  style={{ opacity: 0, scale: 0 }}
                >
                  <div className="w-6 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 
                                rounded-full filter blur-sm animate-flicker" />
                </motion.div>
              </div>
            </motion.div>

            {/* Diya */}
            <motion.div
              ref={diyaRef}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              className="relative"
            >
              {/* Diya base */}
              <div className="w-32 h-20 bg-gradient-to-b from-yellow-600 to-yellow-800 
                            rounded-b-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent 
                              animate-shimmer" />
              </div>
              
              {/* Diya wick */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 
                            w-1 h-4 bg-yellow-900 rounded-full" />
              
              {/* Diya flame */}
              <motion.div
                className="diya-flame absolute -top-12 left-1/2 -translate-x-1/2"
                style={{ opacity: 0, scale: 0 }}
              >
                <div className="relative">
                  <div className="w-12 h-16 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 
                                rounded-full filter blur-[2px] animate-flicker" />
                  <div className="absolute inset-0 w-8 h-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                bg-gradient-to-t from-yellow-300 to-white 
                                rounded-full filter blur-sm" />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                bg-yellow-400/20 rounded-full filter blur-2xl animate-pulse-glow" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Text message */}
      <AnimatePresence>
        {stage === 'text' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center pt-64"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-center px-4 glow-text">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="block text-gradient-gold"
              >
                Something special
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="block text-gradient-gold mt-2"
              >
                is waiting for you...
              </motion.span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebrate button */}
      <AnimatePresence>
        {stage === 'button' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={handleCelebrate}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                  '0 0 40px rgba(255, 215, 0, 0.8)',
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 
                       rounded-full text-xl font-bold text-white
                       flex items-center gap-3 hover:from-yellow-400 hover:to-orange-400
                       transition-all duration-300"
            >
              <Sparkles className="w-6 h-6" />
              LET'S CELEBRATE 🎉
              <Sparkles className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
