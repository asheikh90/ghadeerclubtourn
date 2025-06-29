import React, { useState, useEffect } from 'react'
import { Clock, Calendar } from 'lucide-react'

const CountdownTimer = ({ tournamentStartTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    if (!tournamentStartTime) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const tournamentTime = new Date(tournamentStartTime).getTime()
      const difference = tournamentTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [tournamentStartTime])

  if (!tournamentStartTime) {
    return (
      <div className="card-premium text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calendar className="h-6 w-6 text-primary-400" />
          <h3 className="text-xl font-bold text-white">Tournament Schedule</h3>
        </div>
        <p className="text-slate-400">Tournament start time will be announced soon!</p>
      </div>
    )
  }

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className="card-premium text-center">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Clock className="h-6 w-6 text-primary-400" />
        <h3 className="text-xl font-bold text-white">
          {isExpired ? 'Tournament Started!' : 'Tournament Starts In'}
        </h3>
      </div>
      
      {isExpired ? (
        <div className="text-green-400 text-lg font-semibold">
          🎮 The tournament is now live!
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <div className="countdown-digit">
            <div className="text-2xl md:text-3xl font-bold text-primary-400">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">DAYS</div>
          </div>
          <div className="countdown-digit">
            <div className="text-2xl md:text-3xl font-bold text-primary-400">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">HOURS</div>
          </div>
          <div className="countdown-digit">
            <div className="text-2xl md:text-3xl font-bold text-primary-400">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">MINS</div>
          </div>
          <div className="countdown-digit">
            <div className="text-2xl md:text-3xl font-bold text-primary-400">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">SECS</div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-slate-400">
        {new Date(tournamentStartTime).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  )
}

export default CountdownTimer
