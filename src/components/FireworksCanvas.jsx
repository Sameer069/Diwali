import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Sparkles, ChevronDown } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function FireworksCanvas({ soundEnabled, onNext }) {
  const canvasRef = useRef(null)
  const [fireworkCount, setFireworkCount] = useState(0)
  const [showCrazyMode, setShowCrazyMode] = useState(false)
  const [rocketPositions, setRocketPositions] = useState([
    { id: 1, x: 25 },
    { id: 2, x: 50 },
    { id: 3, x: 75 },
  ])
  const fireworksRef = useRef([])
  const particlesRef = useRef([])
  const rocketsRef = useRef([])
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw rockets
      rocketsRef.current = rocketsRef.current.filter(rocket => {
        rocket.y -= rocket.speed
        rocket.life--

        if (rocket.life <= 0) {
          createFirework(rocket.x, rocket.y, rocket.color)
          return false
        }

        // Draw rocket
        ctx.beginPath()
        ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = rocket.color
        ctx.fill()

        // Rocket trail
        ctx.beginPath()
        ctx.moveTo(rocket.x, rocket.y)
        ctx.lineTo(rocket.x, rocket.y + 10)
        ctx.strokeStyle = rocket.color
        ctx.lineWidth = 2
        ctx.stroke()

        return true
      })

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1 // gravity
        particle.life--
        particle.alpha -= 0.01

        if (particle.life <= 0 || particle.alpha <= 0) return false

        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()

        return true
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const createFirework = (x, y, color) => {
    const particleCount = 50 + Math.random() * 50

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const speed = 2 + Math.random() * 4

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60 + Math.random() * 40,
        alpha: 1,
        color,
        size: 2 + Math.random() * 2
      })
    }

    // Add some random sparks
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 40,
        alpha: 1,
        color: '#FFD700',
        size: 1
      })
    }
  }

  const launchRocket = (x, y, color) => {
    rocketsRef.current.push({
      x,
      y,
      speed: 5 + Math.random() * 3,
      life: 40 + Math.random() * 20,
      color
    })

    if (soundEnabled) {
      playFireworkSound()
    }
  }

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const colors = ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493', '#00FF00']
    const color = colors[Math.floor(Math.random() * colors.length)]

    launchRocket(x, canvasRef.current.height, color)
    setFireworkCount(prev => prev + 1)

    // Canvas confetti as bonus
    confetti({
      particleCount: 10,
      spread: 40,
      origin: { x: x / canvasRef.current.width, y: y / canvasRef.current.height },
      colors: [color]
    })
  }

  const handleRocketClick = (rocket) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const x = (rocket.x / 100) * canvas.width
    const colors = ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493', '#00FF00']
    const color = colors[Math.floor(Math.random() * colors.length)]

    // Launch rocket that goes much higher (to top 10% of screen)
    launchRocket(x, canvas.height - 50, color)
    setFireworkCount(prev => prev + 1)

    // Create visual trail effect (rocket going up)
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 8,
          spread: 25,
          origin: { x: rocket.x / 100, y: 0.88 - (i * 0.1) },
          colors: ['#FFA500', '#FF4500', '#FFD700'],
          startVelocity: 30,
          gravity: 0.3,
          scalar: 0.6,
          ticks: 30
        })
      }, i * 80)
    }

    // Big explosion at the very top
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { x: rocket.x / 100, y: 0.15 },
        colors: [color, '#FFD700', '#FFA500'],
        startVelocity: 60,
        gravity: 1.2,
        scalar: 1.5
      })
    }, 1000)
  }

  const goCrazyWithFireworks = () => {
    setShowCrazyMode(true)

    const launchInterval = setInterval(() => {
      const x = Math.random() * canvasRef.current.width
      const colors = ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493', '#00FF00', '#FFA500']
      const color = colors[Math.floor(Math.random() * colors.length)]

      launchRocket(x, canvasRef.current.height, color)
      setFireworkCount(prev => prev + 1)
    }, 100)

    // Canvas confetti storm
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF']
      })
    }, 200)

    setTimeout(() => {
      clearInterval(launchInterval)
      clearInterval(confettiInterval)
      setShowCrazyMode(false)
    }, 5000)
  }

  const playFireworkSound = () => {
    if (!soundEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    // Create a realistic firecracker explosion sound
    const now = audioContext.currentTime

    // Low frequency boom
    const boom = audioContext.createOscillator()
    const boomGain = audioContext.createGain()
    boom.connect(boomGain)
    boomGain.connect(audioContext.destination)
    boom.type = 'sine'
    boom.frequency.setValueAtTime(100, now)
    boom.frequency.exponentialRampToValueAtTime(20, now + 0.1)
    boomGain.gain.setValueAtTime(0.5, now)
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
    boom.start(now)
    boom.stop(now + 0.3)

    // High frequency crackle
    const crackle = audioContext.createOscillator()
    const crackleGain = audioContext.createGain()
    crackle.connect(crackleGain)
    crackleGain.connect(audioContext.destination)
    crackle.type = 'sawtooth'
    crackle.frequency.setValueAtTime(8000, now)
    crackle.frequency.exponentialRampToValueAtTime(100, now + 0.15)
    crackleGain.gain.setValueAtTime(0.3, now)
    crackleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
    crackle.start(now)
    crackle.stop(now + 0.15)

    // White noise burst
    const bufferSize = audioContext.sampleRate * 0.1
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = audioContext.createBufferSource()
    const noiseGain = audioContext.createGain()
    noise.buffer = buffer
    noise.connect(noiseGain)
    noiseGain.connect(audioContext.destination)
    noiseGain.gain.setValueAtTime(0.2, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
    noise.start(now)
  }

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden overflow-y-auto pb-20">
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 sm:top-8 left-0 right-0 z-10 text-center px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient-gold mb-2 sm:mb-4 glow-text">
          Interactive Fireworks
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-white/80 mb-2">
          Click anywhere to launch fireworks! 🎆
        </p>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="glass-effect inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-2xl font-bold text-yellow-400"
        >
          Fireworks: {fireworkCount}
        </motion.div>
      </motion.div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 cursor-crosshair"
      />

      {/* Clickable Rocket Buttons at bottom */}
      <div className="fixed bottom-28 sm:bottom-40 left-0 right-0 z-20 
                    flex justify-center items-center gap-3 sm:gap-6 md:gap-8 px-4">
        {rocketPositions.map((rocket) => (
          <motion.button
            key={rocket.id}
            onClick={() => handleRocketClick(rocket)}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{
              scale: 0.8,
              y: -50,
              transition: { duration: 0.3 }
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl cursor-pointer relative
                     hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]
                     transition-all duration-300 flex-shrink-0"
            aria-label="Launch rocket"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255,165,0,0.6))'
            }}
          >
            <motion.span
              key={`rocket-${rocket.id}`}
              className="inline-block"
            >
              🚀
            </motion.span>
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full blur-xl bg-orange-400/20 -z-10"
            />
          </motion.button>
        ))}
      </div>

      {/* Floating rockets animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', x: `${20 + i * 15}%` }}
            animate={{
              y: ['-20%', '100%'],
              x: `${20 + i * 15 + Math.sin(i) * 10}%`
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear'
            }}
            className="absolute text-4xl"
          >
            🚀
          </motion.div>
        ))}
      </div>

      {/* Crazy mode button - centered and lower */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-10 flex justify-center px-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goCrazyWithFireworks}
          disabled={showCrazyMode}
          animate={!showCrazyMode ? {
            boxShadow: [
              '0 0 20px rgba(157, 78, 221, 0.5)',
              '0 0 40px rgba(157, 78, 221, 0.8)',
              '0 0 20px rgba(157, 78, 221, 0.5)',
            ],
          } : {}}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity
            }
          }}
          className={`w-full max-w-xs sm:max-w-sm px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                     rounded-full text-sm sm:text-base md:text-lg font-bold text-white
                     transition-all duration-300 glow-box
                     flex items-center justify-center gap-2
                     ${showCrazyMode ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-500 hover:to-pink-500'}`}
        >
          <Rocket className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">
            {showCrazyMode ? 'GOING CRAZY! 🤪' : 'GO CRAZY! 🎉'}
          </span>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        </motion.button>
      </motion.div>

      {/* Continue button */}
      {fireworkCount >= 10 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-10 flex justify-center px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            animate={{ y: [0, 8, 0] }}
            transition={{ y: { duration: 1.5, repeat: Infinity } }}
            className="px-4 sm:px-6 py-2 sm:py-3 glass-effect rounded-full text-sm sm:text-base md:text-lg font-semibold
                     hover:bg-white/10 transition-all duration-300
                     flex items-center gap-2 whitespace-nowrap"
          >
            Continue to Quiz
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
