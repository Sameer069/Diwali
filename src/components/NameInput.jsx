import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function NameInput({ onSubmit }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const canvasRef = useRef(null)
  const [explosions, setExplosions] = useState([])

  // Continuous confetti and fireworks
  useEffect(() => {
    // Random confetti bursts
    const confettiInterval = setInterval(() => {
      const colors = ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493']
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2
      })
    }, 1500)

    // Bigger explosions occasionally
    const bigBoomInterval = setInterval(() => {
      const x = Math.random()
      const y = Math.random() * 0.4

      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x, y },
        colors: ['#FFD700', '#FFA500', '#FF6B35'],
        startVelocity: 45,
        gravity: 0.9,
        scalar: 1.5
      })

      // Add visual explosion
      createExplosion(x * window.innerWidth, y * window.innerHeight)
    }, 3000)

    // Canvas fireworks
    setupCanvas()

    return () => {
      clearInterval(confettiInterval)
      clearInterval(bigBoomInterval)
    }
  }, [])

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const rockets = []

    // Launch rockets periodically
    const launchRocket = () => {
      const x = Math.random() * canvas.width
      const color = ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF'][Math.floor(Math.random() * 4)]

      rockets.push({
        x,
        y: canvas.height,
        targetY: 100 + Math.random() * 200,
        speed: 5 + Math.random() * 3,
        color
      })
    }

    setInterval(launchRocket, 2000)

    const createParticles = (x, y, color) => {
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50
        const speed = 2 + Math.random() * 4

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 80,
          color,
          size: 2 + Math.random() * 2
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i]
        rocket.y -= rocket.speed

        if (rocket.y <= rocket.targetY) {
          createParticles(rocket.x, rocket.y, rocket.color)
          rockets.splice(i, 1)
        } else {
          // Draw rocket trail
          ctx.beginPath()
          ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = rocket.color
          ctx.shadowBlur = 10
          ctx.shadowColor = rocket.color
          ctx.fill()
        }
      }

      // Update particles
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
        ctx.globalAlpha = p.life / 80
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.restore()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }

  const createExplosion = (x, y) => {
    const id = Date.now()
    setExplosions(prev => [...prev, { id, x, y }])

    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== id))
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Please enter your name!')
      return
    }

    if (name.trim().length < 2) {
      setError('Name is too short!')
      return
    }

    // MASSIVE Celebration!
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493'],
          startVelocity: 60,
          gravity: 1.2,
          scalar: 2
        })
      }, i * 200)
    }

    setTimeout(() => {
      onSubmit(name.trim())
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-pink-950 
                    flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Canvas for continuous fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Explosion effects */}
      {explosions.map((exp) => (
        <motion.div
          key={exp.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: exp.x,
            top: exp.y,
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,107,53,0.4) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />
      ))}

      {/* Animated shooting stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: [0, 1, 1, 0],
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear'
            }}
            className="absolute"
          >
            <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-transparent rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Floating firecrackers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`cracker-${i}`}
            initial={{
              y: '100%',
              x: `${5 + i * 6}%`,
              rotate: 0,
              scale: 1
            }}
            animate={{
              y: ['-20%', '100%'],
              rotate: [0, 360, 720],
              scale: [1, 1.2, 1],
              x: `${5 + i * 6 + Math.sin(i) * 10}%`
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.4
            }}
            className="absolute"
          >
            <motion.div
              animate={{
                filter: [
                  'brightness(1) drop-shadow(0 0 5px rgba(255,215,0,0.5))',
                  'brightness(1.5) drop-shadow(0 0 15px rgba(255,215,0,0.8))',
                  'brightness(1) drop-shadow(0 0 5px rgba(255,215,0,0.5))'
                ]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-3xl md:text-5xl"
            >
              🎆
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Animated blast rings */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 3],
              opacity: [0.8, 0.4, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '300px',
              height: '300px',
              marginLeft: '-150px',
              marginTop: '-150px',
              border: '3px solid',
              borderColor: ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493'][i],
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
      {/* Floating diyas - spread to all 4 corners */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Left Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="absolute top-0 left-0"
          style={{ left: '5vw', top: '5vh' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-5xl md:text-7xl"
          >
            🪔
          </motion.div>
        </motion.div>

        {/* Top Right Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="absolute top-0 right-0"
          style={{ right: '5vw', top: '5vh' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-5xl md:text-7xl"
          >
            🪔
          </motion.div>
        </motion.div>

        {/* Bottom Left Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="absolute bottom-0 left-0"
          style={{ left: '5vw', bottom: '5vh' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-5xl md:text-7xl"
          >
            🪔
          </motion.div>
        </motion.div>

        {/* Bottom Right Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="absolute bottom-0 right-0"
          style={{ right: '5vw', bottom: '5vh' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-5xl md:text-7xl"
          >
            🪔
          </motion.div>
        </motion.div>

        {/* Middle edge diyas - stationary */}
        {/* Top center */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: 'spring' }}
          className="absolute"
          style={{ left: '50%', top: '5vh', transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-4xl md:text-6xl"
          >
            🪔
          </motion.div>
        </motion.div>

        {/* Left middle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          className="absolute"
          style={{ left: '5vw', top: '50%', transform: 'translateY(-50%)' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-4xl md:text-6xl"
          >
            🪔
          </motion.div>
        </motion.div>

        {/* Right middle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: 'spring' }}
          className="absolute"
          style={{ right: '5vw', top: '50%', transform: 'translateY(-50%)' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-4xl md:text-6xl"
          >
            🪔
          </motion.div>
        </motion.div>

        {/* Bottom center */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, type: 'spring' }}
          className="absolute"
          style={{ left: '50%', bottom: '5vh', transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
                'brightness(1.5) drop-shadow(0 0 20px rgba(255,165,0,0.9))',
                'brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.6))'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-4xl md:text-6xl"
          >
            🪔
          </motion.div>
        </motion.div>
      </div>

      {/* Sparkles explosion */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      {/* Lightning flashes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`lightning-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              left: `${10 + i * 11}%`,
              top: `${Math.random() * 80}%`
            }}
          >
            <Zap className="w-8 h-8 text-yellow-300 fill-yellow-300" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 1, delay: 0.3 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glow effect behind card */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 
                   rounded-3xl blur-3xl"
        />

        <div className="relative glass-effect p-6 md:p-10 rounded-3xl glow-box 
                      border-2 border-white/20 backdrop-blur-xl">
          {/* Title */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl md:text-8xl text-center mb-6 relative"
          >
            <motion.span
              animate={{
                filter: [
                  'brightness(1) drop-shadow(0 0 20px rgba(255,215,0,0.8))',
                  'brightness(1.5) drop-shadow(0 0 40px rgba(255,165,0,1))',
                  'brightness(1) drop-shadow(0 0 20px rgba(255,215,0,0.8))'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              🪔
            </motion.span>
          </motion.div>

          <motion.h1
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
            className="text-3xl md:text-5xl font-bold text-center mb-3 glow-text
                     bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 
                     bg-clip-text text-transparent"
          >
            Happy Diwali!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-white/80 text-center mb-8"
          >
            A special celebration awaits you! ✨
          </motion.p>

          {/* Name input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm md:text-base font-semibold text-white/90 mb-2"
              >
                Enter your name to begin:
              </label>
              <motion.input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Your beautiful name..."
                animate={name ? {
                  borderColor: ['rgba(255, 215, 0, 0.3)', 'rgba(255, 165, 0, 0.6)', 'rgba(255, 215, 0, 0.3)']
                } : {}}
                transition={name ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                } : {}}
                className="w-full px-4 py-3 md:py-4 rounded-xl bg-white/10 border-2 border-white/20
                         text-white placeholder-white/40 text-base md:text-lg
                         focus:outline-none focus:border-yellow-400 focus:bg-white/15
                         transition-all duration-300"
                maxLength={30}
                autoFocus
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  ⚠️ {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!name.trim()}
              animate={name.trim() ? {
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                  '0 0 40px rgba(255, 165, 0, 0.8)',
                  '0 0 60px rgba(255, 107, 53, 1)',
                  '0 0 40px rgba(255, 165, 0, 0.8)',
                  '0 0 20px rgba(255, 215, 0, 0.5)'
                ]
              } : {}}
              transition={name.trim() ? {
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              } : {}}
              className={`w-full py-3 md:py-4 rounded-xl text-base md:text-lg font-bold
                       transition-all duration-300 flex items-center justify-center gap-2
                       relative overflow-hidden
                       ${name.trim()
                  ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white hover:from-yellow-400 hover:to-orange-400'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
            >
              {name.trim() && (
                <motion.div
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start the Celebration
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </form>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-white/60 text-xs md:text-sm mt-6 relative"
          >
            <motion.span
              animate={{
                color: ['rgba(255, 255, 255, 0.6)', 'rgba(255, 215, 0, 0.8)', 'rgba(255, 255, 255, 0.6)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              Prepared with love by Sam ❤️
            </motion.span>
          </motion.p>

          {/* Floating particles around the card */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`card-particle-${i}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.cos((Math.PI * 2 * i) / 8) * 80],
                y: [0, Math.sin((Math.PI * 2 * i) / 8) * 80]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeOut'
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-400"
              style={{
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)'
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
