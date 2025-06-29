import React, { useState } from 'react'
import { Settings, Trash2, Edit, CheckCircle, XCircle, Clock, Calendar, Gamepad2 } from 'lucide-react'

const AdminPanel = ({ teams, matches, resetTournament, updateMatchScore, games, tournamentStartTime, setTournamentTime }) => {
  const [editingMatch, setEditingMatch] = useState(null)
  const [editScores, setEditScores] = useState({ team1Score: '', team2Score: '' })
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [newTournamentTime, setNewTournamentTime] = useState('')

  const handleEditMatch = (match) => {
    setEditingMatch(match.id)
    setEditScores({
      team1Score: match.team1Score?.toString() || '',
      team2Score: match.team2Score?.toString() || ''
    })
  }

  const handleSaveEdit = () => {
    if (!editingMatch || !editScores.team1Score || !editScores.team2Score) return

    const team1Score = parseInt(editScores.team1Score)
    const team2Score = parseInt(editScores.team2Score)
    const match = matches.find(m => m.id === editingMatch)
    const winner = team1Score > team2Score ? match.team1 : match.team2

    updateMatchScore(editingMatch, team1Score, team2Score, winner)
    setEditingMatch(null)
    setEditScores({ team1Score: '', team2Score: '' })
  }

  const handleCancelEdit = () => {
    setEditingMatch(null)
    setEditScores({ team1Score: '', team2Score: '' })
  }

  const handleResetTournament = () => {
    resetTournament()
    setShowResetConfirm(false)
  }

  const handleSetTournamentTime = () => {
    if (newTournamentTime) {
      setTournamentTime(newTournamentTime)
      setNewTournamentTime('')
    }
  }

  const completedMatches = matches.filter(m => m.status === 'completed')
  const pendingMatches = matches.filter(m => m.status === 'pending')

  const getTeamsByGame = () => {
    return teams.reduce((acc, team) => {
      if (!acc[team.game]) acc[team.game] = 0
      acc[team.game]++
      return acc
    }, {})
  }

  const teamsByGame = getTeamsByGame()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent mb-4">
          Admin Panel
        </h2>
        <p className="text-slate-300 text-lg">
          Manage tournament settings and match results
        </p>
      </div>

      {/* Tournament Controls */}
      <div className="card-premium">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="h-6 w-6 text-primary-400" />
          <h3 className="text-2xl font-bold text-white">Tournament Controls</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-2xl font-bold text-primary-400">{teams.length}</div>
            <div className="text-slate-400 text-sm">Registered Teams</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-2xl font-bold text-primary-400">{matches.length}</div>
            <div className="text-slate-400 text-sm">Total Matches</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-2xl font-bold text-primary-400">{completedMatches.length}</div>
            <div className="text-slate-400 text-sm">Completed</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-2xl font-bold text-primary-400">{Object.keys(teamsByGame).length}</div>
            <div className="text-slate-400 text-sm">Active Games</div>
          </div>
        </div>

        {/* Tournament Time Setting */}
        <div className="mb-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-5 w-5 text-primary-400" />
            <h4 className="text-lg font-semibold text-white">Tournament Schedule</h4>
          </div>
          
          {tournamentStartTime && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="text-green-300 text-sm">
                Current start time: {new Date(tournamentStartTime).toLocaleString()}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="datetime-local"
              value={newTournamentTime}
              onChange={(e) => setNewTournamentTime(e.target.value)}
              className="input-field flex-1"
            />
            <button
              onClick={handleSetTournamentTime}
              disabled={!newTournamentTime}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                newTournamentTime ? 'btn-primary' : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
            >
              Set Time
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700/50">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg"
          >
            <Trash2 className="h-4 w-4" />
            <span>Reset Tournament</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-600/50 rounded-2xl p-6 max-w-md w-full shadow-card">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Reset</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to reset the entire tournament? This will delete all teams, matches, and scores. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleResetTournament}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teams by Game */}
      {Object.keys(teamsByGame).length > 0 && (
        <div className="card-premium">
          <div className="flex items-center space-x-3 mb-6">
            <Gamepad2 className="h-6 w-6 text-primary-400" />
            <h3 className="text-2xl font-bold text-white">Teams by Game</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(teamsByGame).map(([gameId, count]) => {
              const game = games.find(g => g.id === gameId)
              return (
                <div key={gameId} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center">
                  <div className="text-lg font-bold text-primary-400">{count}</div>
                  <div className="text-slate-300 text-sm">{game?.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Match Management */}
      <div className="card-premium">
        <div className="flex items-center space-x-3 mb-6">
          <Edit className="h-6 w-6 text-primary-400" />
          <h3 className="text-2xl font-bold text-white">Match Management</h3>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No matches available</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pending Matches */}
            {pendingMatches.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span>Pending Matches ({pendingMatches.length})</span>
                </h4>
                <div className="space-y-3">
                  {pendingMatches.map(match => {
                    const game = games.find(g => g.id === match.game)
                    return (
                      <div key={match.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <span className="text-white font-medium">
                                {match.team1.teamName} vs {match.team2.teamName}
                              </span>
                              <span className="game-badge">{game?.name}</span>
                            </div>
                            <div className="text-slate-400 text-sm">
                              Round {match.round} • {match.id}
                            </div>
                          </div>
                          <div className="status-badge bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
                            Pending
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Completed Matches */}
            {completedMatches.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Completed Matches ({completedMatches.length})</span>
                </h4>
                <div className="space-y-3">
                  {completedMatches.map(match => {
                    const game = games.find(g => g.id === match.game)
                    return (
                      <div key={match.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                        {editingMatch === match.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-slate-300 text-sm mb-1">
                                  {match.team1.teamName} Score
                                </label>
                                <input
                                  type="number"
                                  value={editScores.team1Score}
                                  onChange={(e) => setEditScores(prev => ({
                                    ...prev,
                                    team1Score: e.target.value
                                  }))}
                                  className="input-field"
                                  min="0"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-300 text-sm mb-1">
                                  {match.team2.teamName} Score
                                </label>
                                <input
                                  type="number"
                                  value={editScores.team2Score}
                                  onChange={(e) => setEditScores(prev => ({
                                    ...prev,
                                    team2Score: e.target.value
                                  }))}
                                  className="input-field"
                                  min="0"
                                />
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSaveEdit}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1 transition-all duration-300"
                              >
                                <CheckCircle className="h-3 w-3" />
                                <span>Save</span>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1 transition-all duration-300"
                              >
                                <XCircle className="h-3 w-3" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-3 mb-1">
                                <span className="text-white font-medium">
                                  {match.team1.teamName} {match.team1Score} - {match.team2Score} {match.team2.teamName}
                                </span>
                                <span className="game-badge">{game?.name}</span>
                              </div>
                              <div className="text-slate-400 text-sm">
                                Round {match.round} • Winner: {match.winner.teamName}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="status-badge bg-green-600/20 text-green-300 border-green-500/30">
                                Completed
                              </div>
                              <button
                                onClick={() => handleEditMatch(match)}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1 transition-all duration-300"
                              >
                                <Edit className="h-3 w-3" />
                                <span>Edit</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Team Management */}
      <div className="card-premium">
        <h3 className="text-2xl font-bold text-white mb-6">Team Management</h3>
        
        {teams.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No teams registered</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Team</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Game</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Captain</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Players</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => {
                  const game = games.find(g => g.id === team.game)
                  return (
                    <tr key={team.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                      <td className="py-4 px-4 text-white font-medium">{team.teamName}</td>
                      <td className="py-4 px-4">
                        <span className="game-badge">{game?.name}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{team.captainName}</td>
                      <td className="py-4 px-4 text-slate-300">{team.captainEmail}</td>
                      <td className="py-4 px-4 text-slate-300">{team.players.length}</td>
                      <td className="py-4 px-4 text-slate-300">
                        {new Date(team.registeredAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
