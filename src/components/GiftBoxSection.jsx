import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles, ChevronDown, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'

const gifts = [
  {
    id: 1,
    color: 'from-red-500 to-pink-500',
    message: "🎁 Surprise! You get unlimited permission to annoy me forever!",
    icon: "🤗"
  },
  {
    id: 2,
    color: 'from-purple-500 to-indigo-500',
    message: "💝 Here's a lifetime supply of my terrible jokes!",
    icon: "😄"
  },
  {
    id: 3,
    color: 'from-yellow-500 to-orange-500',
    message: "✨ You've unlocked: Premium friendship with zero ads!",
    icon: "🏆"
  },
  {
    id: 4,
    color: 'from-green-500 to-teal-500',
    message: "🌟 Congratulations! You're stuck with me forever!",
    icon: "🎉"
  },
  {
    id: 5,
    color: 'from-pink-500 to-rose-500',
    message: "💖 This gift contains my eternal love and infinite headaches!",
    icon: "💝"
  },
  {
    id: 6,
    color: 'from-blue-500 to-cyan-500',
    message: "🎊 You won a free pass to all my embarrassing moments!",
    icon: "😅"
  }
]

export default function GiftBoxSection({ soundEnabled, onNext }) {
  const [openedGifts, setOpenedGifts] = useState([])
  const [currentGift, setCurrentGift] = useState(null)

  const handleGiftOpen = (gift) => {
    if (openedGifts.includes(gift.id)) return

    setOpenedGifts([...openedGifts, gift.id])
    setCurrentGift(gift)

    // Massive confetti
    const count = 200
    const defaults = {
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF', '#FF1493']
    }

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })

    if (soundEnabled) {
      playGiftSound()
    }

    // Clear after 5 seconds
    setTimeout(() => {
      setCurrentGift(null)
    }, 5000)
  }

  const playGiftSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    // Pop sound
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-900 to-orange-900 
                    relative overflow-x-hidden overflow-y-auto flex items-center justify-center px-4 py-12">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100, -200]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              bottom: 0
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-4 glow-text">
            Surprise Gifts! 🎁
          </h2>
          <p className="text-xl text-white/80">
            Click each gift box to reveal your surprise!
          </p>
          <p className="text-lg text-yellow-400 mt-2">
            Opened: {openedGifts.length} / {gifts.length}
          </p>
        </motion.div>

        {/* Gift boxes grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {gifts.map((gift, index) => (
            <GiftBox
              key={gift.id}
              gift={gift}
              isOpened={openedGifts.includes(gift.id)}
              onOpen={handleGiftOpen}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Current message display */}
        <AnimatePresence>
          {currentGift && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
                className="glass-effect p-8 rounded-3xl glow-box max-w-2xl pointer-events-auto"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="text-8xl text-center mb-4"
                >
                  {currentGift.icon}
                </motion.div>
                <p className="text-2xl md:text-3xl font-bold text-white text-center">
                  {currentGift.message}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        {openedGifts.length >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              animate={{ y: [0, 10, 0] }}
              transition={{ y: { duration: 1.5, repeat: Infinity } }}
              className="px-6 py-3 glass-effect rounded-full text-lg font-semibold
                       hover:bg-white/10 transition-all duration-300
                       flex items-center gap-2 mx-auto"
            >
              Continue to Memory Lane
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function GiftBox({ gift, isOpened, onOpen, delay }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay, type: 'spring', duration: 0.8 }}
      className="relative"
    >
      <motion.button
        onClick={() => onOpen(gift)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={
          isOpened
            ? {}
            : isHovered
              ? { rotate: [-5, 5, -5, 5, 0], y: [-10, 0] }
              : { y: [0, -10, 0] }
        }
        transition={{
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 0.5 }
        }}
        disabled={isOpened}
        className={`relative w-full aspect-square rounded-2xl p-4
                   transform-gpu perspective-1000
                   ${isOpened ? 'cursor-default' : 'cursor-pointer'}
                   focus:outline-none focus:ring-4 focus:ring-yellow-500`}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Gift box */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gift.color}
                     shadow-2xl transition-all duration-300
                     ${isOpened ? 'opacity-50' : 'opacity-100'}`}
          style={{
            transform: isOpened ? 'rotateX(20deg) scale(0.9)' : 'rotateX(0deg) scale(1)'
          }}
        >
          {/* Box decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-4 bg-white/30 absolute top-1/2 -translate-y-1/2" />
            <div className="w-4 h-full bg-white/30 absolute left-1/2 -translate-x-1/2" />
          </div>

          {/* Ribbon bow */}
          <motion.div
            animate={isOpened ? {} : { rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-16 h-16 bg-white/40 rounded-full"
          />
        </div>

        {/* Lid (opens upward) */}
        <motion.div
          animate={
            isOpened
              ? { rotateX: -120, y: -100, z: 50 }
              : { rotateX: 0, y: 0, z: 0 }
          }
          transition={{ type: 'spring', damping: 15 }}
          className={`absolute inset-0 rounded-t-2xl bg-gradient-to-br ${gift.color}
                     shadow-2xl origin-bottom`}
          style={{
            transformStyle: 'preserve-3d',
            height: '60%'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-2 bg-white/30" />
            <div className="w-2 h-full bg-white/30 absolute left-1/2 -translate-x-1/2" />
          </div>
        </motion.div>

        {/* Gift icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={isOpened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            className="text-white text-5xl"
          >
            <Gift className="w-16 h-16 drop-shadow-lg" />
          </motion.div>
        </div>

        {/* Opened state icon */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-8xl"
            >
              {gift.icon}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        {!isOpened && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.1)'
            }}
          />
        )}

        {/* Golden particles when opened */}
        {isOpened && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, Math.cos((Math.PI * 2 * i) / 8) * 100],
                  y: [0, Math.sin((Math.PI * 2 * i) / 8) * 100],
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-2 h-2 rounded-full bg-yellow-400"
              />
            ))}
          </div>
        )}
      </motion.button>

      {/* Open status badge */}
      {isOpened && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 z-10"
        >
          <Heart className="w-5 h-5 fill-current" />
        </motion.div>
      )}
    </motion.div>
  )
}
