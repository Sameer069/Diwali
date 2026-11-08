import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AudioControl({ soundEnabled, setSoundEnabled }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setSoundEnabled(!soundEnabled)}
      className="glass-effect p-3 rounded-full hover:bg-white/10 transition-all duration-300"
      aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {soundEnabled ? (
        <Volume2 className="w-6 h-6 text-diwali-gold" />
      ) : (
        <VolumeX className="w-6 h-6 text-gray-400" />
      )}
    </motion.button>
  )
}
