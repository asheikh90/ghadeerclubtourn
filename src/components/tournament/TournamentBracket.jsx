import React, { useState } from 'react'
import { Trophy, Users, Clock, Calendar, Filter, ChevronRight } from 'lucide-react'

const TournamentBracket = ({ matches, currentRound, games }) => {
  const [selectedGame, setSelectedGame] = useState('all')
  const [selectedRound, setSelectedRound] = useState('all')

  // Group matches by game and round
  const matchesByGame = matches.reduce((acc, match) => {
    if (!acc[match.game]) acc[match.game] = {}
    if (!acc[match.game][match.round]) acc[match.game][match.round] = []
    acc[match.game][match.round].push(match)
    return acc
  }, {})

  const availableGames = Object.keys(matchesByGame)
  const maxRound = Math.max(...matches.map(m => m.round), 0)

  const filteredMatches = matches.filter(match => {
    const gameMatch = selectedGame === 'all' || match.game === selectedGame
    const roundMatch = selectedRound === 'all' || match.round === parseInt(selectedRound)
    return gameMatch && roundMatch
  })

  const getMatchStatus = (match) => {
    if (match.status === 'completed') return 'Completed'
    if (match.status === 'live') return 'Live'
    return 'Pending'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'live': return 'text-red-400 bg-red-400/20 border-red-400/30'
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30'
    }
  }

  const getRoundName = (round) => {
    if (round === 1) return 'First Round'
    if (round === 2) return 'Quarter Finals'
    if (round === 3) return 'Semi Finals'
    if (round === 4) return 'Finals'
    return `Round ${round}`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Tournament Bracket</h1>
        <p className="text-slate-400 text-lg">
          Follow the tournament progress and match results
        </p>
      </div>

      {/* Tournament Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{matches.length}</div>
          <div className="text-slate-400 text-sm">Total Matches</div>
        </div>
        <div className="card text-center">
          <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{availableGames.length}</div>
          <div className="text-slate-400 text-sm">Active Games</div>
        </div>
        <div className="card text-center">
          <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{currentRound}</div>
          <div className="text-slate-400 text-sm">Current Round</div>
        </div>
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{matches.filter(m => m.status === 'completed').length}</div>
          <div className="text-slate-400 text-sm">Completed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="select-field"
        >
          <option value="all">All Games</option>
          {availableGames.map(gameId => {
            const game = games.find(g => g.id === gameId)
            return (
              <option key={gameId} value={gameId}>
                {game?.name || gameId}
              </option>
            )
          })}
        </select>

        <select
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
          className="select-field"
        >
          <option value="all">All Rounds</option>
          {Array.from({length: maxRound}, (_, i) => i + 1).map(round => (
            <option key={round} value={round}>
              {getRoundName(round)}
            </option>
          ))}
        </select>
      </div>

      {/* Bracket View */}
      {selectedGame === 'all' ? (
        // Show all games
        <div className="space-y-8">
          {availableGames.map(gameId => {
            const game = games.find(g => g.id === gameId)
            const gameMatches = matchesByGame[gameId]
            
            return (
              <div key={gameId} className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-lg flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{game?.name}</h2>
                  <span className="game-badge">
                    {Object.values(gameMatches).flat().length} matches
                  </span>
                </div>

                <div className="space-y-6">
                  {Object.entries(gameMatches).map(([round, roundMatches]) => (
                    <div key={round}>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                        <span>{getRoundName(parseInt(round))}</span>
                        <span className="text-slate-400 text-sm">({roundMatches.length} matches)</span>
                      </h3>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {roundMatches.map(match => (
                          <div key={match.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-3">
                              <span className={`status-badge ${getStatusColor(getMatchStatus(match))}`}>
                                {getMatchStatus(match)}
                              </span>
                              <span className="text-slate-400 text-sm">
                                {new Date(match.scheduledTime).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-medium text-white">{match.team1.teamName}</div>
                                  <div className="text-slate-400 text-sm">{match.team1.captainName}</div>
                                </div>
                                <div className="text-xl font-bold text-white px-3">
                                  {match.team1Score !== null ? match.team1Score : '-'}
                                </div>
                              </div>

                              <div className="flex items-center justify-center">
                                <div className="text-slate-400 text-sm">VS</div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-medium text-white">{match.team2.teamName}</div>
                                  <div className="text-slate-400 text-sm">{match.team2.captainName}</div>
                                </div>
                                <div className="text-xl font-bold text-white px-3">
                                  {match.team2Score !== null ? match.team2Score : '-'}
                                </div>
                              </div>

                              {match.winner && (
                                <div className="pt-3 border-t border-slate-700/50">
                                  <div className="flex items-center justify-center space-x-2 text-green-400">
                                    <Trophy className="h-4 w-4" />
                                    <span className="font-medium">Winner: {match.winner.teamName}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        // Show single game bracket
        <div className="card">
          {(() => {
            const game = games.find(g => g.id === selectedGame)
            const gameMatches = matchesByGame[selectedGame] || {}
            
            return (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-lg flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{game?.name} Bracket</h2>
                </div>

                <div className="space-y-8">
                  {Object.entries(gameMatches).map(([round, roundMatches]) => (
                    <div key={round}>
                      <h3 className="text-xl font-bold text-white mb-6 text-center">
                        {getRoundName(parseInt(round))}
                      </h3>
                      
                      <div className="grid gap-6" style={{gridTemplateColumns: `repeat(${Math.ceil(roundMatches.length / 2)}, 1fr)`}}>
                        {roundMatches.map(match => (
                          <div key={match.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                            <div className="text-center mb-4">
                              <span className={`status-badge ${getStatusColor(getMatchStatus(match))}`}>
                                {getMatchStatus(match)}
                              </span>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                <div>
                                  <div className="font-bold text-white">{match.team1.teamName}</div>
                                  <div className="text-slate-400 text-sm">{match.team1.captainName}</div>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                  {match.team1Score !== null ? match.team1Score : '-'}
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                <div>
                                  <div className="font-bold text-white">{match.team2.teamName}</div>
                                  <div className="text-slate-400 text-sm">{match.team2.captainName}</div>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                  {match.team2Score !== null ? match.team2Score : '-'}
                                </div>
                              </div>

                              {match.winner && (
                                <div className="text-center pt-3 border-t border-slate-700/50">
                                  <div className="flex items-center justify-center space-x-2 text-green-400">
                                    <Trophy className="h-5 w-5" />
                                    <span className="font-bold">{match.winner.teamName} Wins!</span>
                                  </div>
                                </div>
                              )}

                              <div className="text-center text-slate-400 text-sm">
                                {new Date(match.scheduledTime).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          })()}
        </div>
      )}

      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">No matches found</h3>
          <p className="text-slate-500">
            {matches.length === 0 
              ? 'Tournament bracket will appear once teams are registered and tournament starts'
              : 'Try adjusting your filters to see matches'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default TournamentBracket
