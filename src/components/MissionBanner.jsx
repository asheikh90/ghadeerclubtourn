import React from 'react'
import { Star, Heart } from 'lucide-react'

const MissionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-900/90 via-emerald-800/90 to-emerald-900/90 border-b border-emerald-700/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-center space-x-3 text-center">
          <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
          <p className="text-emerald-100 font-medium text-sm md:text-base">
            <span className="font-bold text-yellow-400">Ghadeer Club</span> – 
            <span className="mx-2">Unite, Train, and Rise for</span>
            <span className="font-bold text-yellow-400">Imam al-Mahdi (ajtf)</span>
          </p>
          <Heart className="h-5 w-5 text-yellow-400 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default MissionBanner
