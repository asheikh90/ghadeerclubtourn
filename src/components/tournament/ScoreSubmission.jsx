import React, { useState } from 'react'
import { Trophy, Upload, Camera, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react'

const ScoreSubmission = ({ matches, updateMatchScore, games }) => {
  const [selectedMatch, setSelectedMatch] = useState('')
  const [team1Score, setTeam1Score] = useState('')
  const [team2Score, setTeam2Score] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const pendingMatches = matches.filter(match => match.status === 'pending')
  const completedMatches = matches.filter(match => match.status === 'completed')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedMatch || team1Score === '' || team2Score === '') {
      alert('Please fill in all required fields')
      return
    }

    const match = matches.find(m => m.id === selectedMatch)
    if (!match) return

    const score1 = parseInt(team1Score)
    const score2 = parseInt(team2Score)
    
    if (score1 < 0 || score2 < 0) {
      alert('Scores cannot be negative')
      return
    }

    if (score1 === score2) {
      alert('Matches cannot end in a tie. Please enter the correct scores.')
      return
    }

    const winner = score1 > score2 ? match.team1 : match.team2

    setSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      updateMatchScore(selectedMatch, score1, score2, winner)
      
      // Reset form
      setSelectedMatch('')
      setTeam1Score('')
      setTeam2Score('')
      setScreenshot(null)
      setSubmitting(false)
      
      alert('Score submitted successfully!')
    }, 1000)
  }

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      
      setScreenshot(file)
    }
  }

  const selectedMatchData = matches.find(m => m.id === selectedMatch)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Submit Match Results</h1>
        <p className="text-slate-400 text-lg">
          Report your match scores and upload proof of results
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{pendingMatches.length}</div>
          <div className="text-slate-400 text-sm">Pending Matches</div>
        </div>
        <div className="card text-center">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{completedMatches.length}</div>
          <div className="text-slate-400 text-sm">Completed</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{matches.length}</div>
          <div className="text-slate-400 text-sm">Total Matches</div>
        </div>
        <div className="card text-center">
          <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{games.length}</div>
          <div className="text-slate-400 text-sm">Active Games</div>
        </div>
      </div>

      {/* Score Submission Form */}
      <div className="card-premium">
        <h2 className="text-2xl font-bold text-white mb-6">Submit Match Score</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Match *
            </label>
            <select
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
              className="select-field"
              required
            >
              <option value="">Choose a match to report</option>
              {pendingMatches.map(match => {
                const game = games.find(g => g.id === match.game)
                return (
                  <option key={match.id} value={match.id}>
                    {game?.name} - {match.team1.teamName} vs {match.team2.teamName} 
                    ({new Date(match.scheduledTime).toLocaleDateString()})
                  </option>
                )
              })}
            </select>
          </div>

          {selectedMatchData && (
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Match Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {selectedMatchData.team1.teamName} Score *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={team1Score}
                      onChange={(e) => setTeam1Score(e.target.value)}
                      className="input-field"
                      placeholder="Enter score"
                      required
                    />
                  </div>
                  
                  <div className="text-center text-slate-400 font-medium">VS</div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {selectedMatchData.team2.teamName} Score *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={team2Score}
                      onChange={(e) => setTeam2Score(e.target.value)}
                      className="input-field"
                      placeholder="Enter score"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Match Information
                    </label>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div>Game: {games.find(g => g.id === selectedMatchData.game)?.name}</div>
                      <div>Scheduled: {new Date(selectedMatchData.scheduledTime).toLocaleString()}</div>
                      <div>Round: {selectedMatchData.round}</div>
                    </div>
                  </div>

                  {team1Score !== '' && team2Score !== '' && (
                    <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-primary-300">
                        <Trophy className="h-4 w-4" />
                        <span className="font-medium">
                          Winner: {parseInt(team1Score) > parseInt(team2Score) 
                            ? selectedMatchData.team1.teamName 
                            : selectedMatchData.team2.teamName}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Screenshot Proof (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotUpload}
                className="hidden"
                id="screenshot-upload"
              />
              <label htmlFor="screenshot-upload" className="cursor-pointer">
                <div className="space-y-3">
                  <div className="flex justify-center">
                    {screenshot ? (
                      <CheckCircle className="h-12 w-12 text-green-400" />
                    ) : (
                      <Upload className="h-12 w-12 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {screenshot ? screenshot.name : 'Upload Screenshot'}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {screenshot ? 'File uploaded successfully' : 'PNG, JPG up to 5MB'}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setSelectedMatch('')
                setTeam1Score('')
                setTeam2Score('')
                setScreenshot(null)
              }}
              className="btn-secondary"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Trophy className="h-4 w-4" />
                  <span>Submit Score</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Submissions */}
      {completedMatches.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Match Results</h2>
          
          <div className="space-y-4">
            {completedMatches.slice(0, 5).map(match => {
              const game = games.find(g => g.id === match.game)
              return (
                <div key={match.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="game-badge">{game?.name}</span>
                        <span className="text-slate-400 text-sm">
                          Round {match.round}
                        </span>
                        <span className="status-badge text-green-400 bg-green-400/20 border-green-400/30">
                          Completed
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-medium text-white">{match.team1.teamName}</div>
                          <div className="text-2xl font-bold text-white">{match.team1Score}</div>
                        </div>
                        
                        <div className="text-slate-400">VS</div>
                        
                        <div className="text-center">
                          <div className="font-medium text-white">{match.team2.teamName}</div>
                          <div className="text-2xl font-bold text-white">{match.team2Score}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-green-400 mb-2">
                        <Trophy className="h-4 w-4" />
                        <span className="font-medium">{match.winner.teamName}</span>
                      </div>
                      <div className="text-slate-400 text-sm">
                        {new Date(match.scheduledTime).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Submission Guidelines</h2>
        <div className="space-y-3 text-slate-300">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>Only team captains or designated members can submit match results</p>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>Screenshots are highly recommended as proof of results</p>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>Disputed results will be reviewed by tournament administrators</p>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p>Submit results within 24 hours of match completion</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreSubmission
