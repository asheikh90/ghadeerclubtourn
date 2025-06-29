import React, { useState, useEffect } from 'react'
import { X, Clock, MapPin } from 'lucide-react'

const SalahReminder = ({ isOpen, onClose }) => {
  const [currentPrayer, setCurrentPrayer] = useState('')
  const [nextPrayer, setNextPrayer] = useState('')
  const [timeUntilNext, setTimeUntilNext] = useState('')

  useEffect(() => {
    if (isOpen) {
      const now = new Date()
      const hour = now.getHours()
      
      // Determine current and next prayer
      if (hour >= 5 && hour < 12) {
        setCurrentPrayer('Fajr')
        setNextPrayer('Dhuhr')
      } else if (hour >= 12 && hour < 15) {
        setCurrentPrayer('Dhuhr')
        setNextPrayer('Asr')
      } else if (hour >= 15 && hour < 18) {
        setCurrentPrayer('Asr')
        setNextPrayer('Maghrib')
      } else if (hour >= 18 && hour < 20) {
        setCurrentPrayer('Maghrib')
        setNextPrayer('Isha')
      } else {
        setCurrentPrayer('Isha')
        setNextPrayer('Fajr')
      }

      // Calculate time until next prayer (simplified)
      const nextHour = hour >= 20 || hour < 5 ? 5 : 
                      hour < 12 ? 12 : 
                      hour < 15 ? 15 : 
                      hour < 18 ? 18 : 20
      
      const hoursUntil = nextHour > hour ? nextHour - hour : (24 - hour) + nextHour
      setTimeUntilNext(`${hoursUntil} hours`)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl border border-emerald-600/50 shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Prayer Time Reminder</h2>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕌</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Time for {currentPrayer}</h3>
            <p className="text-emerald-200">
              Remember to pause your gaming and fulfill your prayer obligation
            </p>
          </div>

          <div className="bg-emerald-800/50 rounded-xl p-4 border border-emerald-600/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-emerald-200">Current Prayer:</span>
              <span className="font-bold text-yellow-400">{currentPrayer}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-emerald-200">Next Prayer:</span>
              <span className="font-bold text-white">{nextPrayer}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">Time Until Next:</span>
              <span className="font-bold text-white">{timeUntilNext}</span>
            </div>
          </div>

          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
            <p className="text-yellow-200 text-sm text-center leading-relaxed">
              <span className="font-bold">"And establish prayer and give zakah and bow with those who bow"</span>
              <br />
              <span className="text-yellow-300">- Quran 2:43</span>
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              I'll Pray Now
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              Remind Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalahReminder
