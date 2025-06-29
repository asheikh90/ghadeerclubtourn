import React, { useState } from 'react'
import { Settings, Users, Trophy, Calendar, Trash2, Edit, Plus, Download, Upload, AlertTriangle } from 'lucide-react'

const AdminPanel = ({ 
  teams, 
  matches, 
  resetTournament, 
  updateMatchScore, 
  games, 
  tournamentStartTime, 
  setTournamentTime 
}) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [editingMatch, setEditingMatch] = useState(null)
  const [newStartTime, setNewStartTime] = useState(
    tournamentStartTime ? new Date(tournamentStartTime).toISOString().slice(0, 16) : ''
  )

  const handleMatchEdit = (matchId, team1Score, team2Score) => {
    const match = matches.find(m => m.id === matchId)
    if (!match) return

    const score1 = parseInt(team1Score)
    const score2 = parseInt(team2Score)
    const winner = score1 > score2 ? match.team1 : match.team2

    updateMatchScore(matchId, score1, score2, winner)
    setEditingMatch(null)
  }

  const handleSetTournamentTime = () => {
    if (newStartTime) {
      setTournamentTime(newStartTime)
      alert('Tournament start time updated successfully!')
    }
  }

  const exportData = () => {
    const data = {
      teams,
      matches,
      tournamentStartTime,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tournament-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const stats = {
    totalTeams: teams.length,
    totalMatches: matches.length,
    completedMatches: matches.filter(m => m.status === 'completed').length,
    pendingMatches: matches.filter(m => m.status === 'pending').length,
    activeGames: [...new Set(teams.map(t => t.game))].length
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Tournament Administration</h1>
        <p className="text-slate-400 text-lg">
          Manage tournament settings, teams, and matches
        </p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="card text-center">
          <Users className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stats.totalTeams}</div>
          <div className="text-slate-400 text-sm">Teams</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stats.totalMatches}</div>
          <div className="text-slate-400 text-sm">Matches</div>
        </div>
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stats.completedMatches}</div>
          <div className="text-slate-400 text-sm">Completed</div>
        </div>
        <div className="card text-center">
          <Settings className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stats.pendingMatches}</div>
          <div className="text-slate-400 text-sm">Pending</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stats.activeGames}</div>
          <div className="text-slate-400 text-sm">Games</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
        {[
          { id: 'overview', label: 'Overview', icon: Settings },
          { id: 'teams', label: 'Teams', icon: Users },
          { id: 'matches', label: 'Matches', icon: Trophy },
          { id: 'settings', label: 'Settings', icon: Calendar }
        ].map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={exportData}
                  className="btn-secondary w-full flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Tournament Data</span>
                </button>
                <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Import Data</span>
                </button>
                <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Manual Match</span>
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Tournament Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Registration:</span>
                  <span className="text-green-400">Open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tournament:</span>
                  <span className="text-yellow-400">
                    {matches.length > 0 ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Start Time:</span>
                  <span className="text-white">
                    {tournamentStartTime 
                      ? new Date(tournamentStartTime).toLocaleString()
                      : 'Not Set'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-red-900/20 border-red-500/30">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-400 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-300 mb-2">Danger Zone</h3>
                <p className="text-red-200 mb-4">
                  This action will permanently delete all tournament data including teams, matches, and results.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset the entire tournament? This action cannot be undone.')) {
                      resetTournament()
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Reset Tournament</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-6">Team Management</h3>
          
          <div className="space-y-4">
            {teams.map(team => {
              const game = games.find(g => g.id === team.game)
              return (
                <div key={team.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-white">{team.teamName}</h4>
                        <span className="game-badge">{game?.name}</span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-400">
                        <div>Captain: {team.captainName}</div>
                        <div>Contact: {team.captainContact || 'Not provided'}</div>
                        <div>Players: {team.players.filter(p => p.trim()).length}</div>
                      </div>
                      <div className="text-xs text-slate-500 mt-2">
                        Registered: {new Date(team.registeredAt).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-6">Match Management</h3>
          
          <div className="space-y-4">
            {matches.map(match => {
              const game = games.find(g => g.id === match.game)
              const isEditing = editingMatch === match.id
              
              return (
                <div key={match.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="game-badge">{game?.name}</span>
                      <span className="text-slate-400 text-sm">Round {match.round}</span>
                      <span className={`status-badge ${
                        match.status === 'completed' ? 'text-green-400 bg-green-400/20 border-green-400/30' :
                        match.status === 'live' ? 'text-red-400 bg-red-400/20 border-red-400/30' :
                        'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingMatch(isEditing ? null : match.id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">
                            {match.team1.teamName} Score
                          </label>
                          <input
                            type="number"
                            defaultValue={match.team1Score || ''}
                            className="input-field"
                            id={`team1-${match.id}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">
                            {match.team2.teamName} Score
                          </label>
                          <input
                            type="number"
                            defaultValue={match.team2Score || ''}
                            className="input-field"
                            id={`team2-${match.id}`}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingMatch(null)}
                          className="btn-secondary text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const team1Score = document.getElementById(`team1-${match.id}`).value
                            const team2Score = document.getElementById(`team2-${match.id}`).value
                            handleMatchEdit(match.id, team1Score, team2Score)
                          }}
                          className="btn-primary text-sm"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-medium text-white">{match.team1.teamName}</div>
                          <div className="text-2xl font-bold text-white">
                            {match.team1Score !== null ? match.team1Score : '-'}
                          </div>
                        </div>
                        
                        <div className="text-slate-400">VS</div>
                        
                        <div className="text-center">
                          <div className="font-medium text-white">{match.team2.teamName}</div>
                          <div className="text-2xl font-bold text-white">
                            {match.team2Score !== null ? match.team2Score : '-'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-slate-400">
                        <div>Scheduled: {new Date(match.scheduledTime).toLocaleString()}</div>
                        {match.winner && (
                          <div className="text-green-400 font-medium">
                            Winner: {match.winner.teamName}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-6">Tournament Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tournament Start Time
                </label>
                <div className="flex gap-4">
                  <input
                    type="datetime-local"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="input-field flex-1"
                  />
                  <button
                    onClick={handleSetTournamentTime}
                    className="btn-primary"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tournament Rules
                </label>
                <textarea
                  className="input-field"
                  rows="4"
                  placeholder="Enter tournament rules and guidelines..."
                  defaultValue="1. All participants must maintain Islamic ethics and good sportsmanship
2. Teams must be available during scheduled match times
3. Matches will be played according to standard game rules
4. Disputes will be resolved by tournament administrators"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Prize Information
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter prize details..."
                  defaultValue="$500 + Islamic Books for 1st Place"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-white mb-6">System Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Auto-advance rounds</div>
                  <div className="text-sm text-slate-400">Automatically create next round when current round completes</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Email notifications</div>
                  <div className="text-sm text-slate-400">Send email updates to team captains</div>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Public leaderboard</div>
                  <div className="text-sm text-slate-400">Make tournament results publicly visible</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
