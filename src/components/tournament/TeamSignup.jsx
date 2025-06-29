import React, { useState, useEffect } from 'react'
import { Users, Trophy, Clock, Calendar, Plus, X, AlertCircle, CheckCircle } from 'lucide-react'

const TeamSignup = ({ teams, addTeam, maxTeams, generateBracket, games, tournamentStartTime }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    captainContact: '',
    game: '',
    players: ['']
  })
  const [showForm, setShowForm] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (tournamentStartTime) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const start = new Date(tournamentStartTime).getTime()
        const difference = start - now

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          })
        } else {
          setTimeLeft(null)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [tournamentStartTime])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.teamName || !formData.captainName || !formData.game) {
      alert('Please fill in all required fields')
      return
    }

    const success = addTeam({
      ...formData,
      players: formData.players.filter(player => player.trim() !== '')
    })

    if (success) {
      setFormData({
        teamName: '',
        captainName: '',
        captainContact: '',
        game: '',
        players: ['']
      })
      setShowForm(false)
    } else {
      alert('Unable to add team. Tournament may be full or already started.')
    }
  }

  const addPlayer = () => {
    if (formData.players.length < 6) {
      setFormData({
        ...formData,
        players: [...formData.players, '']
      })
    }
  }

  const removePlayer = (index) => {
    if (formData.players.length > 1) {
      setFormData({
        ...formData,
        players: formData.players.filter((_, i) => i !== index)
      })
    }
  }

  const updatePlayer = (index, value) => {
    const newPlayers = [...formData.players]
    newPlayers[index] = value
    setFormData({
      ...formData,
      players: newPlayers
    })
  }

  const teamsByGame = teams.reduce((acc, team) => {
    if (!acc[team.game]) acc[team.game] = []
    acc[team.game].push(team)
    return acc
  }, {})

  const canStartTournament = teams.length >= 2

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Tournament Registration</h1>
        <p className="text-slate-400 text-lg">
          Join the Ghadeer Club Tournament and compete with fellow gamers
        </p>
      </div>

      {/* Tournament Status */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <Users className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{teams.length}</div>
          <div className="text-slate-400 text-sm">Teams Registered</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{maxTeams - teams.length}</div>
          <div className="text-slate-400 text-sm">Spots Remaining</div>
        </div>
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{Object.keys(teamsByGame).length}</div>
          <div className="text-slate-400 text-sm">Games Active</div>
        </div>
      </div>

      {/* Countdown Timer */}
      {timeLeft && (
        <div className="card-premium text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Tournament Starts In</h2>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="countdown-digit">
              <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-slate-400 text-sm">Days</div>
            </div>
            <div className="countdown-digit">
              <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-slate-400 text-sm">Hours</div>
            </div>
            <div className="countdown-digit">
              <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-slate-400 text-sm">Minutes</div>
            </div>
            <div className="countdown-digit">
              <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-slate-400 text-sm">Seconds</div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {teams.length < maxTeams && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Register Team</span>
          </button>
        )}
        
        {canStartTournament && (
          <button
            onClick={generateBracket}
            className="btn-secondary flex items-center space-x-2"
          >
            <Trophy className="h-5 w-5" />
            <span>Start Tournament</span>
          </button>
        )}
      </div>

      {/* Registration Form */}
      {showForm && (
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Register Your Team</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                  className="input-field"
                  placeholder="Enter team name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Game *
                </label>
                <select
                  value={formData.game}
                  onChange={(e) => setFormData({...formData, game: e.target.value})}
                  className="select-field"
                  required
                >
                  <option value="">Select a game</option>
                  {games.map(game => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Captain Name *
                </label>
                <input
                  type="text"
                  value={formData.captainName}
                  onChange={(e) => setFormData({...formData, captainName: e.target.value})}
                  className="input-field"
                  placeholder="Team captain name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contact Info
                </label>
                <input
                  type="text"
                  value={formData.captainContact}
                  onChange={(e) => setFormData({...formData, captainContact: e.target.value})}
                  className="input-field"
                  placeholder="Discord, email, etc."
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-slate-300">
                  Team Members
                </label>
                <button
                  type="button"
                  onClick={addPlayer}
                  className="btn-secondary text-sm flex items-center space-x-1"
                  disabled={formData.players.length >= 6}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Player</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.players.map((player, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={player}
                      onChange={(e) => updatePlayer(index, e.target.value)}
                      className="input-field flex-1"
                      placeholder={`Player ${index + 1} ${index === 0 ? '(Captain)' : ''}`}
                    />
                    {formData.players.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePlayer(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Register Team
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Registered Teams */}
      {teams.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Registered Teams</h2>
          
          {Object.entries(teamsByGame).map(([gameId, gameTeams]) => {
            const game = games.find(g => g.id === gameId)
            return (
              <div key={gameId} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-lg flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{game?.name}</h3>
                  <span className="game-badge">{gameTeams.length} teams</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameTeams.map(team => (
                    <div key={team.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-white">{team.teamName}</h4>
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Users className="h-4 w-4" />
                          <span>Captain: {team.captainName}</span>
                        </div>
                        <div className="text-slate-400">
                          Players: {team.players.filter(p => p.trim()).length}
                        </div>
                        <div className="text-slate-400 text-xs">
                          Registered: {new Date(team.registeredAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tournament Rules */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Tournament Rules</h2>
        <div className="space-y-3 text-slate-300">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>All participants must maintain Islamic ethics and good sportsmanship</p>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>Teams must be available during scheduled match times</p>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>Matches will be played according to standard game rules</p>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>Disputes will be resolved by tournament administrators</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSignup
