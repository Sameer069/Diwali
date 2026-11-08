import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Calendar, Heart, Laugh, MessageCircle, Infinity } from 'lucide-react'

const memories = [
  {
    id: 1,
    title: "First Meeting",
    icon: "👋",
    date: "The Beginning",
    front: "Remember when we first met?",
    back: "Little did we know we'd become inseparable troublemakers! From awkward hellos to endless laughs. Best decision ever! 🎉",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "First Funny Moment",
    icon: "😂",
    date: "Can't Forget This",
    front: "That hilarious moment...",
    back: "We laughed so hard we cried! It was the moment I knew you were my kind of crazy. Still makes me smile thinking about it! 🤣",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 3,
    title: "Craziest Memory",
    icon: "🎪",
    date: "Legendary Day",
    front: "Our wildest adventure!",
    back: "The day we threw caution to the wind and just lived! Pure chaos, zero regrets. This is why we're best friends! 🎊",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "Endless Conversations",
    icon: "💬",
    date: "Every Day",
    front: "3 AM deep talks...",
    back: "From silly memes to life problems, we talk about everything! You're my favorite person to annoy at any hour! 🌙",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 5,
    title: "Support System",
    icon: "🤝",
    date: "Always There",
    front: "When I needed you...",
    back: "You showed up without hesitation! Through thick and thin, you've been my rock. Forever grateful for you! 💪",
    color: "from-red-500 to-rose-500"
  },
  {
    id: 6,
    title: "Forever Friendship",
    icon: "♾️",
    date: "Eternal",
    front: "Our friendship is...",
    back: "Unbreakable, irreplaceable, and absolutely priceless! Here's to countless more memories together! 🥂✨",
    color: "from-indigo-500 to-purple-500"
  }
]

export default function MemoryLane({ onNext }) {
  const [flippedCards, setFlippedCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardClick = (memoryId) => {
    if (flippedCards.includes(memoryId)) {
      setFlippedCards(flippedCards.filter(id => id !== memoryId))
    } else {
      setFlippedCards([...flippedCards, memoryId])
      setSelectedCard(memoryId)

      setTimeout(() => setSelectedCard(null), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 
                    relative overflow-x-hidden overflow-y-auto py-12 px-4">
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', x: `${i * 7}%` }}
            animate={{
              y: '-20%',
              x: `${i * 7 + Math.sin(i) * 10}%`,
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute text-3xl"
          >
            {['💖', '✨', '🌟', '💫'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-4 glow-text">
            Memory Lane 🛤️
          </h2>
          <p className="text-xl text-white/80 mb-2">
            Click each card to relive our special moments!
          </p>
          <p className="text-lg text-yellow-400">
            Memories explored: {flippedCards.length} / {memories.length}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-12">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b 
                         from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 hidden md:block" />

          {/* Memory cards */}
          <div className="space-y-12">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, type: 'spring' }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Card */}
                <div className="flex-1">
                  <MemoryCard
                    memory={memory}
                    isFlipped={flippedCards.includes(memory.id)}
                    isSelected={selectedCard === memory.id}
                    onClick={() => handleCardClick(memory.id)}
                  />
                </div>

                {/* Timeline dot */}
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="hidden md:block relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 
                                flex items-center justify-center text-3xl shadow-lg">
                    {memory.icon}
                  </div>
                  {flippedCards.includes(memory.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-full bg-yellow-400 opacity-30"
                    />
                  )}
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue button */}
        {flippedCards.length >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              animate={{ y: [0, 10, 0] }}
              transition={{ y: { duration: 1.5, repeat: Infinity } }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                       rounded-full text-xl font-bold text-white
                       hover:from-purple-500 hover:to-pink-500
                       transition-all duration-300 glow-box
                       flex items-center gap-2 mx-auto"
            >
              Continue to Grand Finale
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function MemoryCard({ memory, isFlipped, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3 }}
      className="relative h-64 cursor-pointer perspective-1000"
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl p-6 
                     bg-gradient-to-br ${memory.color} shadow-2xl
                     flex flex-col items-center justify-center text-center`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {memory.icon}
          </motion.div>

          <h3 className="text-3xl font-bold text-white mb-2">
            {memory.title}
          </h3>

          <div className="flex items-center gap-2 text-white/80 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{memory.date}</span>
          </div>

          <p className="text-xl text-white/90 italic">
            {memory.front}
          </p>

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-4 text-white/60"
          >
            Click to reveal →
          </motion.div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl p-6 
                     bg-gradient-to-br ${memory.color} shadow-2xl
                     flex flex-col items-center justify-center text-center`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Heart className="w-12 h-12 text-white mb-4 fill-current" />

          <p className="text-lg md:text-xl text-white leading-relaxed">
            {memory.back}
          </p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isFlipped ? 1 : 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex gap-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                ⭐
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Glow effect when selected */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: '0 0 60px rgba(255, 215, 0, 0.8)'
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
