import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Star, Award, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

const friendshipMessages = [
  "You're my favourite headache! 🤕",
  "Lifetime subscription to my nonsense 📝",
  "Friendship warranty: No expiry date ♾️",
  "Even Google can't find another idiot like you 🔍",
  "You're the reason I smile... and cringe! 😅",
  "Best friend: Definition = YOU 📖",
  "Partner in crime since forever 🎭",
  "My personal comedian (unpaid) 🎪"
]

export default function BestFriendMode({ onClose }) {
  const [friendshipMeter, setFriendshipMeter] = useState(0)
  const [showCertificate, setShowCertificate] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    // Fill friendship meter
    const timer = setTimeout(() => {
      if (friendshipMeter < 100) {
        setFriendshipMeter(friendshipMeter + 2)
      } else {
        setShowCertificate(true)
        // Celebration
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF69B4', '#FF1493', '#9D4EDD']
        })
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [friendshipMeter])

  useEffect(() => {
    // Rotate messages
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % friendshipMessages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, rotateY: -180 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, rotateY: 180 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 z-10 bg-pink-500 text-white 
                   p-2 sm:p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        <div className="glass-effect rounded-3xl p-6 sm:p-8 md:p-12 glow-box overflow-hidden relative max-h-[90vh] overflow-y-auto">
          {/* Floating hearts background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: '100%', x: `${i * 5}%`, opacity: 0 }}
                animate={{
                  y: '-100%',
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="absolute text-pink-400"
                style={{ fontSize: `${20 + Math.random() * 20}px` }}
              >
                💖
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Title */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                ❤️
              </motion.div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-gold mb-4">
                Best Friend Mode
              </h2>
              <p className="text-base sm:text-xl text-white/80">
                Activating special friendship powers...
              </p>
            </motion.div>

            {/* Friendship meter */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg text-white/80 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  Friendship Level
                </span>
                <motion.span
                  key={friendshipMeter}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-pink-400"
                >
                  {friendshipMeter}%
                </motion.span>
              </div>

              <div className="h-8 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${friendshipMeter}%` }}
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 
                           relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>

                {/* Sparkles on meter */}
                {friendshipMeter > 0 && (
                  <motion.div
                    animate={{
                      x: `${friendshipMeter}%`,
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      scale: { duration: 0.5, repeat: Infinity }
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400 fill-current" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Rotating messages */}
            <div className="mb-6 sm:mb-8 h-24 sm:h-32 flex items-center justify-center px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, rotateX: 90, y: 20 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: -90, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-fire">
                    {friendshipMessages[currentMessageIndex]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Friendship badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              {[
                { icon: '🏆', label: 'Best Friend' },
                { icon: '⭐', label: 'Superstar' },
                { icon: '💎', label: 'Precious' },
                { icon: '🎭', label: 'Drama Partner' }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="glass-effect p-3 sm:p-4 rounded-xl text-center"
                >
                  <div className="text-3xl sm:text-4xl mb-2">{badge.icon}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white/80">{badge.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certificate */}
            <AnimatePresence>
              {showCertificate && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-2xl
                           border-4 border-yellow-500 relative overflow-hidden"
                >
                  {/* Certificate decorations */}
                  <div className="absolute top-2 left-2 text-yellow-600 text-4xl">🌟</div>
                  <div className="absolute top-2 right-2 text-yellow-600 text-4xl">🌟</div>
                  <div className="absolute bottom-2 left-2 text-yellow-600 text-4xl">🌟</div>
                  <div className="absolute bottom-2 right-2 text-yellow-600 text-4xl">🌟</div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="text-6xl mb-4"
                    >
                      🏅
                    </motion.div>

                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      Official Friendship Certificate
                    </h3>

                    <div className="w-32 h-1 bg-yellow-600 mx-auto mb-4" />

                    <p className="text-lg text-gray-700 mb-4">
                      This certifies that you are officially my
                    </p>

                    <p className="text-4xl font-bold text-transparent bg-clip-text 
                                 bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                      BEST FRIEND FOREVER
                    </p>

                    <p className="text-md text-gray-600 italic mb-4">
                      Valid for: Eternity (No Returns, No Refunds)
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <Award className="w-8 h-8 text-yellow-600" />
                      <div className="text-sm text-gray-600">
                        <div className="font-bold">Issued: Right Now</div>
                        <div>Expires: Never</div>
                      </div>
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
