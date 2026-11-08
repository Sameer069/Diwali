import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black
                 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-6"
        >
          🪔
        </motion.div>
        
        <motion.h2
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-bold text-gradient-gold flex items-center gap-2 justify-center"
        >
          <Sparkles className="w-6 h-6" />
          Preparing Something Special...
          <Sparkles className="w-6 h-6" />
        </motion.h2>
        
        <motion.div
          className="mt-8 flex gap-2 justify-center"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-diwali-gold"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
