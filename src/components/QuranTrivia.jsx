import React, { useState, useEffect } from 'react'
import { X, BookOpen, CheckCircle, XCircle, Star } from 'lucide-react'

const QuranTrivia = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const questions = [
    {
      question: "In which Surah is the verse about Wilayah mentioned: 'Your guardian is only Allah, His Messenger, and those who believe...'?",
      options: ["Al-Ma'ida", "Al-Baqarah", "An-Nisa", "Al-Imran"],
      correct: 0,
      verse: "Surah Al-Ma'ida 5:55"
    },
    {
      question: "Complete the verse: 'And whoever takes Allah and His Messenger and those who believe as guardians...'",
      options: [
        "...will be successful",
        "...then the party of Allah - they will be the predominant",
        "...will find peace",
        "...will be guided"
      ],
      correct: 1,
      verse: "Surah Al-Ma'ida 5:56"
    },
    {
      question: "What does 'Ghadeer' refer to in Islamic history?",
      options: [
        "A battle",
        "A treaty", 
        "The event where Prophet (PBUH) declared Ali's succession",
        "A pilgrimage site"
      ],
      correct: 2,
      verse: "Ghadeer Khumm Event"
    },
    {
      question: "According to Islamic teachings, how should believers prepare for Imam al-Mahdi's return?",
      options: [
        "By accumulating wealth",
        "By strengthening faith and good deeds",
        "By isolating from society",
        "By only focusing on worship"
      ],
      correct: 1,
      verse: "Hadith traditions"
    }
  ]

  useEffect(() => {
    if (isOpen) {
      // Reset game state when opened
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setGameComplete(false)
    }
  }, [isOpen])

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameComplete(true)
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameComplete(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl border border-emerald-600/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Quran Trivia Warmup</h2>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!gameComplete ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between">
                <span className="text-emerald-200">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-yellow-400 font-bold">
                  Score: {score}/{questions.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-emerald-800/50 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <div className="bg-emerald-800/50 rounded-xl p-6 border border-emerald-600/30">
                <h3 className="text-lg font-bold text-white mb-4 leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                        showResult
                          ? index === questions[currentQuestion].correct
                            ? 'bg-green-600/30 border-green-500 text-green-100'
                            : index === selectedAnswer && index !== questions[currentQuestion].correct
                            ? 'bg-red-600/30 border-red-500 text-red-100'
                            : 'bg-emerald-700/30 border-emerald-600 text-emerald-200'
                          : selectedAnswer === index
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-100'
                          : 'bg-emerald-700/30 border-emerald-600 text-emerald-200 hover:bg-emerald-600/40 hover:border-emerald-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {showResult && (
                          <div className="flex-shrink-0">
                            {index === questions[currentQuestion].correct ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : index === selectedAnswer ? (
                              <XCircle className="h-5 w-5 text-red-400" />
                            ) : null}
                          </div>
                        )}
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {showResult && (
                  <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                    <p className="text-yellow-200 text-sm">
                      <span className="font-bold">Reference:</span> {questions[currentQuestion].verse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Game Complete
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-10 w-10 text-yellow-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Trivia Complete!</h3>
                <p className="text-emerald-200">
                  You scored {score} out of {questions.length} questions correctly
                </p>
              </div>

              <div className="bg-emerald-800/50 rounded-xl p-6 border border-emerald-600/30">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <div className="text-emerald-200">
                    {score === questions.length ? 'Perfect Score! Mashallah!' :
                     score >= questions.length * 0.7 ? 'Great Job!' :
                     'Keep Learning!'}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
                <p className="text-yellow-200 text-sm text-center leading-relaxed">
                  <span className="font-bold">"And We made from them leaders guiding by Our command when they were patient and were certain of Our signs"</span>
                  <br />
                  <span className="text-yellow-300">- Quran 32:24</span>
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={resetGame}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Start Tournament
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuranTrivia
