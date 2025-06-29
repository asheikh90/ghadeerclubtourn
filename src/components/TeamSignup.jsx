import React, { useState } from 'react'
import { Users, Plus, Play, MessageCircle, Gamepad2, User } from 'lucide-react'
import CountdownTimer from './CountdownTimer'

const TeamSignup = ({ teams, addTeam, maxTeams, generateBracket, games, tournamentStartTime }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    captainEmail: '',
    game: '',
    players: [
      { name: '', gamertag: '' },
      { name: '', gamertag: '' },
      { name: '', gamertag: '' },
      { name: '', gamertag: '' }
    ]
  })
  const [errors, setErrors] = useState({})

  const selectedGame = games.find(g => g.id === formData.game)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...formData.players]
    newPlayers[index] = { ...newPlayers[index], [field]: value }
    setFormData(prev => ({
      ...prev,
      players: newPlayers
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required'
    } else if (teams.some(team => team.teamName.toLowerCase() === formData.teamName.toLowerCase())) {
      newErrors.teamName = 'Team name already exists'
    }
    
    if (!formData.captainName.trim()) {
      newErrors.captainName = 'Captain name is required'
    }
    
    if (!formData.captainEmail.trim()) {
      newErrors.captainEmail = 'Captain email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.captainEmail)) {
      newErrors.captainEmail = 'Invalid email format'
    }

    if (!formData.game) {
      newErrors.game = 'Please select a game'
    }
    
    const filledPlayers = formData.players.filter(player => player.name.trim())
    if (filledPlayers.length < 2) {
      newErrors.players = 'At least 2 players are required'
    }

    // Check if gamertags are provided for filled players
    const playersWithoutGamertags = filledPlayers.filter(player => !player.gamertag.trim())
    if (playersWithoutGamertags.length > 0) {
      newErrors.gamertags = `${selectedGame?.platform || 'Gamertag'} required for all players`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const success = addTeam({
      ...formData,
      players: formData.players.filter(player => player.name.trim())
    })
    
    if (success) {
      setFormData({
        teamName: '',
        captainName: '',
        captainEmail: '',
        game: '',
        players: [
          { name: '', gamertag: '' },
          { name: '', gamertag: '' },
          { name: '', gamertag: '' },
          { name: '', gamertag: '' }
        ]
      })
      setErrors({})
    }
  }

  const getTeamsByGame = () => {
    return teams.reduce((acc, team) => {
      if (!acc[team.game]) acc[team.game] = 0
      acc[team.game]++
      return acc
    }, {})
  }

  const teamsByGame = getTeamsByGame()
  const canStartTournament = teams.length >= 2 && Object.values(teamsByGame).some(count => count >= 2)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent mb-4">
          Tournament Registration
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Join the ultimate gaming competition at Ghadeer Club. Register your team and compete across multiple games!
        </p>
      </div>

      {/* Countdown Timer */}
      {tournamentStartTime && (
        <div className="max-w-2xl mx-auto">
          <CountdownTimer tournamentStartTime={tournamentStartTime} />
        </div>
      )}

      {/* Discord CTA */}
      <div className="max-w-2xl mx-auto">
        <div className="card-premium text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MessageCircle className="h-8 w-8 text-discord-500" />
            <h3 className="text-xl font-bold text-white">Join Our Community</h3>
          </div>
          <p className="text-slate-300 mb-6">
            Connect with other players, get tournament updates, and stay in the loop!
          </p>
          <a
            href="https://discord.gg/NmgBkgrn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-discord inline-flex items-center space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Join Discord Server</span>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-400">{teams.length}</div>
          <div className="text-slate-400 text-sm">Teams Registered</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-400">{maxTeams}</div>
          <div className="text-slate-400 text-sm">Max Teams</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-400">{Object.keys(teamsByGame).length}</div>
          <div className="text-slate-400 text-sm">Active Games</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-400">{games.length}</div>
          <div className="text-slate-400 text-sm">Total Games</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Registration Form */}
        <div className="card-premium">
          <div className="flex items-center space-x-3 mb-6">
            <Plus className="h-6 w-6 text-primary-400" />
            <h3 className="text-2xl font-bold text-white">Register Your Team</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-slate-300 font-medium mb-2">
                Team Name *
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => handleInputChange('teamName', e.target.value)}
                className={`input-field ${errors.teamName ? 'border-red-500 ring-red-500/50' : ''}`}
                placeholder="Enter your team name"
                disabled={teams.length >= maxTeams}
              />
              {errors.teamName && (
                <p className="text-red-400 text-sm mt-1">{errors.teamName}</p>
              )}
            </div>

            {/* Game Selection */}
            <div>
              <label className="block text-slate-300 font-medium mb-2">
                Game *
              </label>
              <select
                value={formData.game}
                onChange={(e) => handleInputChange('game', e.target.value)}
                className={`select-field ${errors.game ? 'border-red-500 ring-red-500/50' : ''}`}
                disabled={teams.length >= maxTeams}
              >
                <option value="">Select a game...</option>
                {games.map(game => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
              {errors.game && (
                <p className="text-red-400 text-sm mt-1">{errors.game}</p>
              )}
            </div>

            {/* Captain Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  Captain Name *
                </label>
                <input
                  type="text"
                  value={formData.captainName}
                  onChange={(e) => handleInputChange('captainName', e.target.value)}
                  className={`input-field ${errors.captainName ? 'border-red-500 ring-red-500/50' : ''}`}
                  placeholder="Captain's name"
                  disabled={teams.length >= maxTeams}
                />
                {errors.captainName && (
                  <p className="text-red-400 text-sm mt-1">{errors.captainName}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  Captain Email *
                </label>
                <input
                  type="email"
                  value={formData.captainEmail}
                  onChange={(e) => handleInputChange('captainEmail', e.target.value)}
                  className={`input-field ${errors.captainEmail ? 'border-red-500 ring-red-500/50' : ''}`}
                  placeholder="captain@email.com"
                  disabled={teams.length >= maxTeams}
                />
                {errors.captainEmail && (
                  <p className="text-red-400 text-sm mt-1">{errors.captainEmail}</p>
                )}
              </div>
            </div>

            {/* Players */}
            <div>
              <label className="block text-slate-300 font-medium mb-2">
                Players (minimum 2) *
              </label>
              <div className="space-y-3">
                {formData.players.map((player, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                      className="input-field"
                      placeholder={`Player ${index + 1} name`}
                      disabled={teams.length >= maxTeams}
                    />
                    <input
                      type="text"
                      value={player.gamertag}
                      onChange={(e) => handlePlayerChange(index, 'gamertag', e.target.value)}
                      className="input-field"
                      placeholder={selectedGame ? `${selectedGame.platform}` : 'Gamertag/ID'}
                      disabled={teams.length >= maxTeams || !formData.game}
                    />
                  </div>
                ))}
              </div>
              {errors.players && (
                <p className="text-red-400 text-sm mt-1">{errors.players}</p>
              )}
              {errors.gamertags && (
                <p className="text-red-400 text-sm mt-1">{errors.gamertags}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={teams.length >= maxTeams}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                teams.length >= maxTeams
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {teams.length >= maxTeams ? 'Registration Full' : 'Register Team'}
            </button>
          </form>
        </div>

        {/* Registered Teams */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-primary-400" />
              <h3 className="text-2xl font-bold text-white">Registered Teams</h3>
            </div>
            
            {canStartTournament && (
              <button
                onClick={generateBracket}
                className="btn-primary flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Start Tournament</span>
              </button>
            )}
          </div>

          {teams.length === 0 ? (
            <div className="text-center py-12">
              <Gamepad2 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No teams registered yet</p>
              <p className="text-slate-500">Be the first to join the competition!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {teams.map((team, index) => (
                <div key={team.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-slate-400 text-sm">#{index + 1}</span>
                        <h4 className="text-lg font-bold text-white">{team.teamName}</h4>
                        <span className="game-badge">
                          {games.find(g => g.id === team.game)?.name}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-3">
                        Captain: {team.captainName}
                      </p>
                      <div className="space-y-2">
                        {team.players.map((player, playerIndex) => (
                          <div key={playerIndex} className="flex items-center space-x-3 text-sm">
                            <User className="h-3 w-3 text-slate-500" />
                            <span className="text-slate-300">{player.name}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-primary-400 font-mono text-xs">{player.gamertag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Game Summary */}
          {Object.keys(teamsByGame).length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-400 mb-3">Teams by Game</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(teamsByGame).map(([gameId, count]) => {
                  const game = games.find(g => g.id === gameId)
                  return (
                    <div key={gameId} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{game?.name}</span>
                      <span className="text-primary-400 font-bold">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamSignup
