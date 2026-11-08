import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import LoadingScreen from './components/LoadingScreen'
import AudioControl from './components/AudioControl'
import ReducedMotionToggle from './components/ReducedMotionToggle'
import NameInput from './components/NameInput'
import CinematicIntro from './components/CinematicIntro'
import InteractiveDiyas from './components/InteractiveDiyas'
import FireworksCanvas from './components/FireworksCanvas'
import FriendshipQuiz from './components/FriendshipQuiz'
import GiftBoxSection from './components/GiftBoxSection'
import BestFriendMode from './components/BestFriendMode'
import MemoryLane from './components/MemoryLane'
import GrandFinale from './components/GrandFinale'

function App() {
  const [userName, setUserName] = useState('')
  const [showNameInput, setShowNameInput] = useState(true)
  const [currentSection, setCurrentSection] = useState('intro')
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [bestFriendMode, setBestFriendMode] = useState(false)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleNameSubmit = (name) => {
    setUserName(name)
    setShowNameInput(false)
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
    setCurrentSection('diyas')
  }

  const handleRestart = () => {
    setShowIntro(true)
    setCurrentSection('intro')
  }

  const sections = [
    { id: 'intro', component: CinematicIntro, props: { onComplete: handleIntroComplete } },
    { id: 'diyas', component: InteractiveDiyas, props: { soundEnabled, userName } },
    { id: 'fireworks', component: FireworksCanvas, props: { soundEnabled, userName } },
    { id: 'quiz', component: FriendshipQuiz, props: { soundEnabled, userName } },
    { id: 'gifts', component: GiftBoxSection, props: { soundEnabled, userName } },
    { id: 'memories', component: MemoryLane, props: { userName } },
    { id: 'finale', component: GrandFinale, props: { soundEnabled, userName, onRestart: handleRestart } },
  ]

  const navigateToSection = (sectionId) => {
    setCurrentSection(sectionId)
  }

  const goBack = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection)
    if (currentIndex > 1) { // Don't go back to intro
      navigateToSection(sections[currentIndex - 1].id)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (showNameInput) {
    return <NameInput onSubmit={handleNameSubmit} />
  }

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Fixed Controls */}
      <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50 flex gap-2">
        <AudioControl soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
        <ReducedMotionToggle />
      </div>

      {/* Back button */}
      {!showIntro && currentSection !== 'intro' && currentSection !== 'diyas' && currentSection !== 'finale' && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="fixed top-2 sm:top-4 left-2 sm:left-4 z-50 glass-effect p-2 sm:p-3 rounded-full 
                   hover:bg-white/10 transition-all duration-300"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.button>
      )}

      {/* Best Friend Mode Toggle */}
      {!showIntro && currentSection !== 'finale' && !bestFriendMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 sm:top-20 left-2 sm:left-4 z-40"
        >
          <button
            onClick={() => setBestFriendMode(!bestFriendMode)}
            className="glass-effect px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold
                     hover:bg-pink-500/20 transition-all duration-300
                     flex items-center gap-1 sm:gap-2 glow-box"
          >
            <span className="text-base sm:text-lg">❤️</span>
            <span className="hidden sm:inline">Best Friend Mode</span>
            <span className="sm:hidden">BFF</span>
          </button>
        </motion.div>
      )}

      {/* Navigation Dots - Hidden on mobile */}
      {!showIntro && currentSection !== 'finale' && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4"
        >
          {sections.slice(1, -1).map((section) => (
            <button
              key={section.id}
              onClick={() => navigateToSection(section.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                         ${currentSection === section.id
                  ? 'bg-diwali-gold scale-150 glow-box'
                  : 'bg-white/30 hover:bg-white/50'}`}
              aria-label={`Navigate to ${section.id}`}
            />
          ))}
        </motion.nav>
      )}

      {/* Best Friend Mode Overlay */}
      <AnimatePresence>
        {bestFriendMode && (
          <BestFriendMode onClose={() => setBestFriendMode(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showIntro ? (
          <CinematicIntro key="intro" onComplete={handleIntroComplete} />
        ) : (
          <>
            {sections.map((section) => {
              if (section.id === 'intro') return null
              const Component = section.component
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentSection === section.id ? 1 : 0,
                    pointerEvents: currentSection === section.id ? 'auto' : 'none'
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`${currentSection === section.id ? 'relative' : 'absolute inset-0'}`}
                >
                  <Component {...section.props} onNext={() => {
                    const currentIndex = sections.findIndex(s => s.id === section.id)
                    if (currentIndex < sections.length - 1) {
                      navigateToSection(sections[currentIndex + 1].id)
                    }
                  }} />
                </motion.div>
              )
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
