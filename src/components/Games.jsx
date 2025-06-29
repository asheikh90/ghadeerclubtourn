import React, { useState } from 'react'
import { Gamepad2, Shield, Star, Users, Trophy, Search, Filter, ExternalLink } from 'lucide-react'

const Games = ({ games }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')

  const categories = ['all', ...new Set(games.map(game => game.category))]
  const ratings = ['all', ...new Set(games.map(game => game.rating))]

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
    const matchesRating = selectedRating === 'all' || game.rating === selectedRating
    return matchesSearch && matchesCategory && matchesRating
  })

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'E': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'E10+': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      case 'T': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'M': return 'text-red-400 bg-red-400/20 border-red-400/30'
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'FPS': return '🎯'
      case 'Battle Royale': return '⚔️'
      case 'Sports': return '⚽'
      case 'Sandbox': return '🏗️'
      case 'Platform': return '🎮'
      case 'Party': return '🎉'
      default: return '🎮'
    }
  }

  // Mock additional game data
  const gameStats = {
    'cod': { players: 1250, tournaments: 45, rating: 4.8 },
    'fortnite': { players: 980, tournaments: 32, rating: 4.6 },
    'minecraft': { players: 1500, tournaments: 28, rating: 4.9 },
    'roblox': { players: 2100, tournaments: 15, rating: 4.7 },
    'fifa': { players: 850, tournaments: 38, rating: 4.5 },
    'madden': { players: 420, tournaments: 22, rating: 4.3 },
    'nba2k': { players: 380, tournaments: 18, rating: 4.4 },
    'apex': { players: 720, tournaments: 25, rating: 4.6 },
    'rocket-league': { players: 650, tournaments: 30, rating: 4.8 },
    'fall-guys': { players: 890, tournaments: 12, rating: 4.5 }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Gaming Library</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Discover age-appropriate games approved by our community, built on Islamic values and principles
        </p>
      </div>

      {/* Game Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Gamepad2 className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{games.length}</div>
          <div className="text-slate-400 text-sm">Games Available</div>
        </div>
        <div className="card text-center">
          <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">8,500+</div>
          <div className="text-slate-400 text-sm">Active Players</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">265</div>
          <div className="text-slate-400 text-sm">Tournaments</div>
        </div>
        <div className="card text-center">
          <Shield className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">100%</div>
          <div className="text-slate-400 text-sm">Approved</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="select-field"
            >
              {ratings.map(rating => (
                <option key={rating} value={rating}>
                  {rating === 'all' ? 'All Ratings' : `${rating} Rated`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const stats = gameStats[game.id] || { players: 0, tournaments: 0, rating: 0 }
          
          return (
            <div key={game.id} className="card-premium group hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-2xl flex items-center justify-center text-2xl">
                    {getCategoryIcon(game.category)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{game.category}</p>
                  </div>
                </div>
                
                {game.ageAppropriate && (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs font-medium">Approved</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRatingColor(game.rating)}`}>
                    {game.rating} Rated
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-white">{stats.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{stats.players.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Players</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{stats.tournaments}</div>
                    <div className="text-xs text-slate-400">Tournaments</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Platform: {game.platform}</span>
                    <button className="text-primary-400 hover:text-primary-300 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">No games found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Islamic Gaming Guidelines */}
      <div className="card-premium">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3">Islamic Gaming Guidelines</h3>
            <div className="space-y-2 text-slate-300">
              <p>• All games are reviewed for Islamic appropriateness and age-suitability</p>
              <p>• Games promoting violence against innocents or inappropriate content are excluded</p>
              <p>• Community members can suggest new games for review and approval</p>
              <p>• Gaming sessions should not interfere with prayer times and religious obligations</p>
              <p>• Maintain good character and Islamic ethics while gaming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Games
