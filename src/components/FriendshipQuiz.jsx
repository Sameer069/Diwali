import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Laugh, Heart, Zap, Users } from 'lucide-react'
import confetti from 'canvas-confetti'

const questions = [
  {
    id: 1,
    question: "Who is the biggest idiot?",
    emoji: "🤪",
    answers: [
      { text: "You, obviously!", reaction: "😂", emoji: "🤡" },
      { text: "Me, no doubt!", reaction: "🎯", emoji: "🙈" },
      { text: "Both of us equally!", reaction: "🤝", emoji: "👯" },
      { text: "Let's not discuss this...", reaction: "😅", emoji: "🤐" }
    ]
  },
  {
    id: 2,
    question: "Who replies after 3 business days?",
    emoji: "📱",
    answers: [
      { text: "You, the ghost!", reaction: "👻", emoji: "💀" },
      { text: "Me, I'm busy okay?!", reaction: "⏰", emoji: "🐌" },
      { text: "Both, we're terrible!", reaction: "📵", emoji: "🤷" },
      { text: "We reply instantly... NOT!", reaction: "😆", emoji: "⏳" }
    ]
  },
  {
    id: 3,
    question: "Who eats more but never shares?",
    emoji: "🍕",
    answers: [
      { text: "You, the food monster!", reaction: "🍔", emoji: "🦖" },
      { text: "Me, food is love!", reaction: "❤️", emoji: "😋" },
      { text: "We both hoard food!", reaction: "🤫", emoji: "🐷" },
      { text: "We always share... right?", reaction: "🤔", emoji: "🙃" }
    ]
  },
  {
    id: 4,
    question: "Who creates unnecessary drama?",
    emoji: "🎭",
    answers: [
      { text: "You, the drama queen/king!", reaction: "👑", emoji: "🎪" },
      { text: "Me, I'm theatrical!", reaction: "🎬", emoji: "🎨" },
      { text: "Drama is our language!", reaction: "💥", emoji: "🎆" },
      { text: "We're perfectly calm... ALWAYS!", reaction: "😏", emoji: "🌪️" }
    ]
  },
  {
    id: 5,
    question: "Who is the permanent headache?",
    emoji: "🤕",
    answers: [
      { text: "You, my dear headache!", reaction: "💊", emoji: "🤪" },
      { text: "Me, I'm your aspirin!", reaction: "💝", emoji: "😇" },
      { text: "We're each other's migraine!", reaction: "🤯", emoji: "💫" },
      { text: "Headache? More like heart-ache!", reaction: "💔", emoji: "🥺" }
    ]
  }
]

export default function FriendshipQuiz({ soundEnabled, onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswer = (answerIndex) => {
    const answer = questions[currentQuestion].answers[answerIndex]
    setSelectedAnswer(answerIndex)
    setAnswers([...answers, answer])

    // Celebration
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6B35', '#9D4EDD']
    })

    if (soundEnabled) {
      playSelectSound()
    }

    // Move to next question or show results
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
        // Big celebration
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FF6B35', '#9D4EDD', '#00F5FF']
        })
      }
    }, 1500)
  }

  const playSelectSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 600
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const getResults = () => {
    const funnyResults = [
      "🎉 Congratulations! You both are certified idiots! But you're OUR idiots! ❤️",
      "🏆 Achievement Unlocked: 'Perfectly Imperfect Friendship'!",
      "💫 Friendship Level: Over 9000! You're stuck together forever!",
      "🎪 You two are a complete circus... and we're here for it!",
      "🌟 Official Diagnosis: Terminal case of awesome friendship!",
      "🎭 Drama Queens/Kings forever! Long live the chaos!",
      "💝 You're like a dysfunctional family... but make it wholesome!",
      "🚀 Friendship goals? More like friendship chaos! Perfect! ✨"
    ]

    return funnyResults[Math.floor(Math.random() * funnyResults.length)]
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 
                      flex items-center justify-center relative overflow-hidden px-4">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              className="text-4xl"
            >
              {answers[Math.floor(Math.random() * answers.length)]?.emoji || '✨'}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-8"
          >
            🎊
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-8 glow-text">
            Quiz Complete!
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect p-8 rounded-3xl glow-box mb-8"
          >
            <p className="text-3xl font-bold text-white mb-6">
              {getResults()}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {answers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-5xl"
                >
                  {answer.reaction}
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              💖
            </motion.div>

            <p className="text-xl text-white/80">
              Friendship Compatibility: <span className="text-gradient-gold font-bold">INFINITE% ∞</span>
            </p>
          </motion.div>

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
            Continue to Gifts
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 
                    relative overflow-x-hidden overflow-y-auto flex items-center justify-center px-4 py-12">
      {/* Progress bar */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-yellow-400 font-bold">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100, rotateY: 90 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -100, rotateY: -90 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="relative z-10 w-full max-w-3xl"
        >
          <div className="glass-effect p-8 md:p-12 rounded-3xl glow-box">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6 text-center"
            >
              {question.emoji}
            </motion.div>

            <h3 className="text-3xl md:text-5xl font-bold text-gradient-gold text-center mb-8">
              {question.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.answers.map((answer, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, rotateZ: index % 2 === 0 ? 2 : -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-6 rounded-2xl text-lg font-semibold
                           transition-all duration-300 relative overflow-hidden
                           ${selectedAnswer === index
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'glass-effect hover:bg-white/10 text-white'}`}
                >
                  {selectedAnswer === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-yellow-400 rounded-2xl"
                    />
                  )}

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-3xl">{answer.emoji}</span>
                    <span>{answer.text}</span>
                  </span>

                  {selectedAnswer === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 text-4xl"
                    >
                      {answer.reaction}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', x: `${i * 10}%`, opacity: 0 }}
            animate={{
              y: '-20%',
              opacity: [0, 1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-4xl"
          >
            {['😂', '❤️', '🎉', '⭐', '💫', '🎊', '🎈', '💝'][i % 8]}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
