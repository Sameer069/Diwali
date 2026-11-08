import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RotateCcw, Gift, Share2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function GrandFinale({ soundEnabled, onRestart, userName = 'Friend' }) {
  const [showMessage, setShowMessage] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [lastSurprise, setLastSurprise] = useState(null)
  const canvasRef = useRef(null)
  const fireworksIntervalRef = useRef(null)

  useEffect(() => {
    // Initial massive celebration
    const celebrationDuration = 5000
    const interval = 100

    fireworksIntervalRef.current = setInterval(() => {
      launchRandomFirework()

      confetti({
        particleCount: 30,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493']
      })
    }, interval)

    setTimeout(() => {
      if (fireworksIntervalRef.current) {
        clearInterval(fireworksIntervalRef.current)
      }
      setShowMessage(true)
    }, celebrationDuration)

    setTimeout(() => {
      setShowButtons(true)
    }, celebrationDuration + 2000)

    // Canvas fireworks
    setupCanvas()

    return () => {
      if (fireworksIntervalRef.current) {
        clearInterval(fireworksIntervalRef.current)
      }
    }
  }, [])

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []

    const createParticle = (x, y, color) => {
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30
        const speed = 2 + Math.random() * 3

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 60,
          color,
          size: 2 + Math.random() * 2
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1
        p.life--

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.life / 60
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.restore()
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Store createParticle for external use
    canvas.createParticle = createParticle
  }

  const launchRandomFirework = () => {
    const colors = ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493', '#00FF00']
    const color = colors[Math.floor(Math.random() * colors.length)]
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight * 0.6

    if (canvasRef.current && canvasRef.current.createParticle) {
      canvasRef.current.createParticle(x, y, color)
    }
  }

  const handleLastSurprise = () => {
    const surprises = [
      { emoji: "🎁", message: "You've unlocked a secret achievement: 'Best Friend Forever'!" },
      { emoji: "💝", message: "Surprise! You're officially stuck with me for life!" },
      { emoji: "🎊", message: "Plot twist: This friendship has no end credits!" },
      { emoji: "✨", message: "Congratulations! You're now a certified legend in my book!" },
      { emoji: "🏆", message: "Achievement Unlocked: 'Survived My Nonsense'!" }
    ]

    const surprise = surprises[Math.floor(Math.random() * surprises.length)]
    setLastSurprise(surprise)

    // Extra celebration
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#FFD700', '#FF6B35', '#9D4EDD']
        })
        launchRandomFirework()
      }, i * 200)
    }

    setTimeout(() => {
      setLastSurprise(null)
    }, 5000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Happy Diwali!',
        text: 'Check out this amazing Diwali celebration! 🪔✨',
        url: window.location.href
      }).catch(() => {
        // Fallback - copy to clipboard
        copyToClipboard()
      })
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard! Share the Diwali love! 🪔')
  }

  return (
    <div className="min-h-screen bg-black
                    overflow-y-auto overflow-x-hidden relative pb-20">
      {/* Canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Floating diyas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: `${i * 12.5}%`, y: '100%' }}
            animate={{
              y: ['-20%', '100%'],
              x: `${i * 12.5 + Math.sin(i) * 5}%`,
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5
            }}
            className="absolute text-6xl"
          >
            🪔
          </motion.div>
        ))}
      </div>

      {/* Golden particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-2 h-2 rounded-full bg-yellow-400"
            style={{
              boxShadow: '0 0 10px #FFD700'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="text-center max-w-4xl w-full"
        >
          {/* Main title */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold mb-4 glow-text px-4">
              HAPPY DIWALI, {userName.toUpperCase()}!
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🪔
            </motion.div>
          </motion.div>

          {/* Message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-effect p-8 md:p-12 rounded-3xl glow-box mb-8"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-relaxed"
                >
                  <span className="text-gradient-gold">Dear {userName}, YOU'RE A LEGEND! </span>
                  <span className="inline-block">🎉</span>
                </motion.p>

                <div className="space-y-3 md:space-y-4 text-base sm:text-lg md:text-xl text-white/90">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    May your <span className="text-green-400 font-bold">happiness multiply</span>,
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    your <span className="text-red-400 font-bold">problems divide</span>,
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    your <span className="text-yellow-400 font-bold">success reach infinity</span>,
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    and your <span className="text-purple-400 font-bold">enemies experience permanent buffering</span>! 😂
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8, type: 'spring' }}
                  className="mt-6 md:mt-8 space-y-2 md:space-y-3 text-lg sm:text-xl md:text-2xl font-semibold"
                >
                  <p className="text-pink-400">{userName}, stay happy. Stay crazy.</p>
                  <p className="text-yellow-400">And never stop being yourself!</p>
                  <motion.p
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-red-400 text-2xl sm:text-3xl mt-4 md:mt-6"
                  >
                    With love, Sam ❤️
                  </motion.p>
                  <p className="text-white/60 text-sm sm:text-base italic mt-2">
                    Your favourite human 😊
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <AnimatePresence>
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch 
                         w-full max-w-md mx-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRestart}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                           rounded-full text-sm sm:text-base md:text-lg font-semibold text-white
                           hover:from-purple-500 hover:to-pink-500
                           transition-all duration-300 glow-box
                           flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  Celebrate Again 🎆
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLastSurprise}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 
                           rounded-full text-sm sm:text-base md:text-lg font-semibold text-white
                           hover:from-yellow-500 hover:to-orange-500
                           transition-all duration-300 glow-box
                           flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                  One Last Surprise 🎁
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 
                           rounded-full text-sm sm:text-base md:text-lg font-semibold text-white
                           hover:from-green-500 hover:to-teal-500
                           transition-all duration-300 glow-box
                           flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send This Wish 📲
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Last surprise modal */}
          <AnimatePresence>
            {lastSurprise && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="glass-effect p-12 rounded-3xl glow-box max-w-2xl text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="text-9xl mb-6"
                  >
                    {lastSurprise.emoji}
                  </motion.div>
                  <p className="text-3xl font-bold text-gradient-gold">
                    {lastSurprise.message}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Continuous sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
