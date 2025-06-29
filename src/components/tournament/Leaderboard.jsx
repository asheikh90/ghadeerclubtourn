import React, { useState } from 'react'
import { Trophy, Medal, Award, Star, TrendingUp, Users, Target, Crown } from 'lucide-react'

const Leaderboard = ({ matches, teams, games }) => {
  const [selectedGame, setSelectedGame] = useState('all')
  const [viewType, setViewType] = useState('teams') // 'teams' or 'players'

  // Calculate team statistics with Islamic ranks
  const teamStats = teams.map(team => {
    const teamMatches = matches.filter(match => 
      (match.team1.id === team.id || match.team2.id === team.id) && 
      match.status === 'completed'
    )
    
    const wins = teamMatches.filter(match => match.winner?.id === team.id).length
    const losses = teamMatches.length - wins
    const winRate = teamMatches.length > 0 ? (wins / teamMatches.length * 100) : 0
    
    // Calculate points scored and conceded
    let pointsFor = 0
    let pointsAgainst = 0
    
    teamMatches.forEach(match => {
      if (match.team1.id === team.id) {
        pointsFor += match.team1Score || 0
        pointsAgainst += match.team2Score || 0
      } else {
        pointsFor += match.team2Score || 0
        pointsAgainst += match.team1Score || 0
      }
    })

    // Assign Islamic rank based on performance
    let islamicRank = 'Hawariyun' // Default rank
    if (wins >= 10 && winRate >= 80) {
      islamicRank = '313 Elite'
    } else if (wins >= 7 && winRate >= 70) {
      islamicRank = 'Ashab al-Kahf'
    } else if (wins >= 4 && winRate >= 60) {
      islamicRank = 'Ansar'
    }
    
    return {
      ...team,
      matches: teamMatches.length,
      wins,
      losses,
      winRate,
      pointsFor,
      pointsAgainst,
      pointsDiff: pointsFor - pointsAgainst,
      points: wins * 3 + losses * 1, // 3 points for win, 1 for participation
      islamicRank
    }
  })

  // Filter by game if selected
  const filteredStats = selectedGame === 'all' 
    ? teamStats 
    : teamStats.filter(team => team.game === selectedGame)

  // Sort by points, then by win rate, then by points difference
  const sortedStats = filteredStats.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.winRate !== a.winRate) return b.winRate - a.winRate
    return b.pointsDiff - a.pointsDiff
  })

  // Get top performers
  const topTeams = sortedStats.slice(0, 3)
  const mostWins = [...teamStats].sort((a, b) => b.wins - a.wins)[0]
  const bestWinRate = [...teamStats].filter(t => t.matches >= 3).sort((a, b) => b.winRate - a.winRate)[0]
  const mostActive = [...teamStats].sort((a, b) => b.matches - a.matches)[0]

  const getRankIcon = (position) => {
    switch (position) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />
      case 2: return <Medal className="h-6 w-6 text-slate-300" />
      case 3: return <Award className="h-6 w-6 text-orange-400" />
      default: return <span className="text-lg font-bold text-slate-400">#{position}</span>
    }
  }

  const getRankColor = (position) => {
    switch (position) {
      case 1: return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30'
      case 2: return 'from-slate-400/20 to-slate-500/10 border-slate-400/30'
      case 3: return 'from-orange-500/20 to-orange-600/10 border-orange-500/30'
      default: return 'from-slate-600/20 to-slate-700/10 border-slate-600/30'
    }
  }

  const getIslamicRankColor = (rank) => {
    switch (rank) {
      case '313 Elite': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'Ashab al-Kahf': return 'text-purple-400 bg-purple-400/20 border-purple-400/30'
      case 'Ansar': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30'
      case 'Hawariyun': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Tournament Leaderboard</h1>
        <p className="text-slate-400 text-lg">
          Track team rankings and tournament statistics with Islamic honor ranks
        </p>
      </div>

      {/* Tournament Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Users className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{teams.length}</div>
          <div className="text-slate-400 text-sm">Total Teams</div>
        </div>
        <div className="card text-center">
          <Target className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{matches.filter(m => m.status === 'completed').length}</div>
          <div className="text-slate-400 text-sm">Matches Played</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{games.length}</div>
          <div className="text-slate-400 text-sm">Active Games</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">
            {teamStats.length > 0 ? Math.round(teamStats.reduce((acc, team) => acc + team.winRate, 0) / teamStats.length) : 0}%
          </div>
          <div className="text-slate-400 text-sm">Avg Win Rate</div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Most Wins</h3>
          {mostWins && (
            <div>
              <div className="font-bold text-white">{mostWins.teamName}</div>
              <div className="text-2xl font-bold text-yellow-400">{mostWins.wins}</div>
              <div className="text-slate-400 text-sm">victories</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getIslamicRankColor(mostWins.islamicRank)}`}>
                {mostWins.islamicRank}
              </div>
            </div>
          )}
        </div>

        <div className="card text-center">
          <Star className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Best Win Rate</h3>
          {bestWinRate && (
            <div>
              <div className="font-bold text-white">{bestWinRate.teamName}</div>
              <div className="text-2xl font-bold text-purple-400">{Math.round(bestWinRate.winRate)}%</div>
              <div className="text-slate-400 text-sm">win rate</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getIslamicRankColor(bestWinRate.islamicRank)}`}>
                {bestWinRate.islamicRank}
              </div>
            </div>
          )}
        </div>

        <div className="card text-center">
          <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Most Active</h3>
          {mostActive && (
            <div>
              <div className="font-bold text-white">{mostActive.teamName}</div>
              <div className="text-2xl font-bold text-blue-400">{mostActive.matches}</div>
              <div className="text-slate-400 text-sm">matches</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getIslamicRankColor(mostActive.islamicRank)}`}>
                {mostActive.islamicRank}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="select-field"
        >
          <option value="all">All Games</option>
          {games.map(game => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {/* Podium for Top 3 */}
      {topTeams.length >= 3 && (
        <div className="card-premium">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Tournament Champions</h2>
          
          <div className="flex items-end justify-center space-x-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className={`w-24 h-32 bg-gradient-to-br ${getRankColor(2)} rounded-2xl flex items-center justify-center mb-4 border`}>
                <Medal className="h-12 w-12 text-slate-300" />
              </div>
              <div className="font-bold text-white text-lg">{topTeams[1]?.teamName}</div>
              <div className="text-slate-400 text-sm">{topTeams[1]?.points} points</div>
              <div className="text-slate-400 text-sm">{topTeams[1]?.wins}W - {topTeams[1]?.losses}L</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getIslamicRankColor(topTeams[1]?.islamicRank)}`}>
                {topTeams[1]?.islamicRank}
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className={`w-28 h-40 bg-gradient-to-br ${getRankColor(1)} rounded-2xl flex items-center justify-center mb-4 border`}>
                <Crown className="h-16 w-16 text-yellow-400" />
              </div>
              <div className="font-bold text-white text-xl">{topTeams[0]?.teamName}</div>
              <div className="text-yellow-400 font-bold">{topTeams[0]?.points} points</div>
              <div className="text-slate-400 text-sm">{topTeams[0]?.wins}W - {topTeams[0]?.losses}L</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getIslamicRankColor(topTeams[0]?.islamicRank)}`}>
                {topTeams[0]?.islamicRank}
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className={`w-24 h-28 bg-gradient-to-br ${getRankColor(3)} rounded-2xl flex items-center justify-center mb-4 border`}>
                <Award className="h-10 w-10 text-orange-400" />
              </div>
              <div className="font-bold text-white text-lg">{topTeams[2]?.teamName}</div>
              <div className="text-slate-400 text-sm">{topTeams[2]?.points} points</div>
              <div className="text-slate-400 text-sm">{topTeams[2]?.wins}W - {topTeams[2]?.losses}L</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getIslamicRankColor(topTeams[2]?.islamicRank)}`}>
                {topTeams[2]?.islamicRank}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6">Full Rankings</h2>
        
        <div className="space-y-4">
          {sortedStats.map((team, index) => {
            const position = index + 1
            const game = games.find(g => g.id === team.game)
            
            return (
              <div 
                key={team.id} 
                className={`p-4 rounded-xl border bg-gradient-to-br ${getRankColor(position)} hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(position)}
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-white text-lg">{team.teamName}</h3>
                      <div className="flex items-center space-x-3 text-sm text-slate-400">
                        <span>Captain: {team.captainName}</span>
                        <span>•</span>
                        <span>{game?.name}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getIslamicRankColor(team.islamicRank)}`}>
                          {team.islamicRank}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">{team.points}</div>
                      <div className="text-slate-400 text-xs">Points</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{team.wins}</div>
                      <div className="text-slate-400 text-xs">Wins</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{team.losses}</div>
                      <div className="text-slate-400 text-xs">Losses</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{Math.round(team.winRate)}%</div>
                      <div className="text-slate-400 text-xs">Win Rate</div>
                    </div>
                    <div className="hidden md:block">
                      <div className="text-lg font-bold text-white">{team.pointsDiff > 0 ? '+' : ''}{team.pointsDiff}</div>
                      <div className="text-slate-400 text-xs">+/-</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {sortedStats.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">No rankings available</h3>
          <p className="text-slate-500">
            Rankings will appear once tournament matches are completed
          </p>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
