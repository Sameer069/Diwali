import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'
import confetti from 'canvas-confetti'

const funnyMessages = [
  "May your WiFi be strong and your patience stronger! 🔥",
  "Wishing you a Diwali brighter than your phone screen! ✨",
  "May your sweets be plenty and your calories invisible! 🍬",
  "Light up your life... and please charge your phone! 📱",
  "May your crackers be loud and your neighbors understanding! 🎆",
  "Wishing you light, laughter, and unlimited data! 💫",
  "May your Diwali shine brighter than your future! 🌟",
  "Light up, cheer up, and shut up... just kidding! 😂"
]

export default function InteractiveDiyas({ soundEnabled, onNext }) {
  const [litDiyas, setLitDiyas] = useState([])
  const [selectedDiya, setSelectedDiya] = useState(null)
  const [message, setMessage] = useState('')
  const [allLit, setAllLit] = useState(false)
  const [particles, setParticles] = useState([])

  const diyas = [
    // Four corners - main diyas
    { id: 1, x: 5, y: 8, delay: 0 },        // Top left corner
    { id: 2, x: 95, y: 8, delay: 0.2 },     // Top right corner
    { id: 3, x: 5, y: 92, delay: 0.4 },     // Bottom left corner
    { id: 4, x: 95, y: 92, delay: 0.6 },    // Bottom right corner

    // Top edge
    { id: 5, x: 30, y: 10, delay: 0.8 },    // Top left area
    { id: 6, x: 50, y: 8, delay: 1.0 },     // Top center
    { id: 7, x: 70, y: 10, delay: 1.2 },    // Top right area

    // Middle sides
    { id: 8, x: 8, y: 50, delay: 1.4 },     // Middle left
    { id: 9, x: 92, y: 50, delay: 1.6 },    // Middle right

    // Bottom edge
    { id: 10, x: 30, y: 90, delay: 1.8 },   // Bottom left area
    { id: 11, x: 50, y: 92, delay: 2.0 },   // Bottom center
    { id: 12, x: 70, y: 90, delay: 2.2 },   // Bottom right area
  ]

  const handleDiyaClick = (diya) => {
    if (!litDiyas.includes(diya.id)) {
      setLitDiyas([...litDiyas, diya.id])
      setSelectedDiya(diya.id)
      setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)])

      // Create particle burst
      createParticleBurst(diya.x, diya.y)

      // Confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: diya.x / 100, y: diya.y / 100 },
        colors: ['#FFD700', '#FFA500', '#FF6B35']
      })

      // Play sound effect (simulated)
      if (soundEnabled) {
        playLightSound()
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setSelectedDiya(null)
        setMessage('')
      }, 3000)
    }
  }

  const lightAllDiyas = () => {
    const unlitDiyas = diyas.filter(d => !litDiyas.includes(d.id))

    unlitDiyas.forEach((diya, index) => {
      setTimeout(() => {
        setLitDiyas(prev => [...prev, diya.id])
        createParticleBurst(diya.x, diya.y)

        confetti({
          particleCount: 30,
          spread: 50,
          origin: { x: diya.x / 100, y: diya.y / 100 },
          colors: ['#FFD700', '#FFA500', '#FF6B35']
        })
      }, index * 300)
    })

    setTimeout(() => {
      setAllLit(true)
      // Big celebration
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FFD700', '#FFA500', '#FF6B35', '#9D4EDD']
      })
    }, unlitDiyas.length * 300 + 500)
  }

  const createParticleBurst = (x, y) => {
    const newParticles = []
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        angle: (Math.PI * 2 * i) / 12
      })
    }
    setParticles(prev => [...prev, ...newParticles])

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 1000)
  }

  const playLightSound = () => {
    // Simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 
                    relative overflow-x-hidden overflow-y-auto flex items-center justify-center py-12 px-4">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              backgroundColor: '#FFD700'
            }}
          />
        ))}
      </div>

      {/* Ambient glow when all diyas are lit */}
      <AnimatePresence>
        {allLit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-radial from-yellow-500/30 via-orange-500/10 to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative w-full max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gradient-gold mb-4 glow-text">
            Light the Diyas
          </h2>
          <p className="text-lg sm:text-xl text-white/80">
            Click each diya to light it up and reveal a special message!
          </p>
          <p className="text-base sm:text-lg text-yellow-400 mt-2">
            Diyas lit: {litDiyas.length} / {diyas.length}
          </p>
        </motion.div>

        {/* Diyas container - Full screen spread */}
        <div className="fixed inset-0 pointer-events-none">
          {diyas.map((diya) => (
            <motion.div
              key={diya.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: diya.delay, type: 'spring' }}
              style={{
                position: 'absolute',
                left: `${diya.x}vw`,
                top: `${diya.y}vh`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
                zIndex: 10
              }}
            >
              <Diya
                isLit={litDiyas.includes(diya.id)}
                isSelected={selectedDiya === diya.id}
                onClick={() => handleDiyaClick(diya)}
              />
            </motion.div>
          ))}

          {/* Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                left: `${particle.x}vw`,
                top: `${particle.y}vh`,
                scale: 1,
                opacity: 1
              }}
              animate={{
                left: `${particle.x + Math.cos(particle.angle) * 5}vw`,
                top: `${particle.y + Math.sin(particle.angle) * 5}vh`,
                scale: 0,
                opacity: 0
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute w-2 h-2 rounded-full bg-yellow-400"
              style={{
                boxShadow: '0 0 10px #FFD700',
                transform: 'translate(-50%, -50%)',
                zIndex: 20
              }}
            />
          ))}
        </div>

        {/* Message display */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center mt-8"
            >
              <div className="inline-block glass-effect px-6 sm:px-8 py-3 sm:py-4 rounded-2xl glow-box">
                <p className="text-xl sm:text-2xl font-bold text-gradient-gold">{message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Light all button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 sm:mt-12 px-4"
        >
          {litDiyas.length < diyas.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={lightAllDiyas}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 
                       rounded-full text-lg sm:text-xl font-bold text-white
                       hover:from-yellow-400 hover:to-orange-400
                       transition-all duration-300 glow-box
                       flex items-center justify-center gap-2 mx-auto w-full sm:w-auto max-w-md"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              Light All Diyas
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          )}
        </motion.div>

        {/* Continue button */}
        {allLit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 sm:mt-8 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              animate={{ y: [0, 10, 0] }}
              transition={{ y: { duration: 1.5, repeat: Infinity } }}
              className="px-5 sm:px-6 py-3 glass-effect rounded-full text-base sm:text-lg font-semibold
                       hover:bg-white/10 transition-all duration-300
                       flex items-center justify-center gap-2 mx-auto"
            >
              Continue to Fireworks
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Diya component
function Diya({ isLit, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: isLit ? 1 : 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
      className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full"
      disabled={isLit}
    >
      {/* Diya base */}
      <div className={`w-24 h-16 bg-gradient-to-b from-yellow-600 to-yellow-800 
                    rounded-b-full relative overflow-hidden transition-all duration-300
                    ${isLit ? 'brightness-125' : 'brightness-75'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent 
                      animate-shimmer" />

        {/* Decorative patterns */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-red-600 mx-1"
            />
          ))}
        </div>
      </div>

      {/* Wick */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 
                    w-0.5 h-3 bg-yellow-900 rounded-full" />

      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-2, -4, -2],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="absolute -top-10 left-1/2 -translate-x-1/2"
          >
            <div className="relative">
              {/* Outer flame */}
              <div className="w-8 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 
                            rounded-full filter blur-[1px] animate-flicker" />

              {/* Inner flame */}
              <div className="absolute inset-0 w-5 h-8 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                            bg-gradient-to-t from-yellow-300 to-white 
                            rounded-full filter blur-[2px]" />

              {/* Glow */}
              <div className="absolute inset-0 w-20 h-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                            bg-yellow-400/30 rounded-full filter blur-xl animate-pulse-glow" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles when selected */}
      {isSelected && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                x: [0, Math.cos((Math.PI * 2 * i) / 4) * 40, 0],
                y: [0, Math.sin((Math.PI * 2 * i) / 4) * 40, 0],
              }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </>
      )}
    </motion.button>
  )
}
