import React from 'react'
import { Trophy, Medal, Award, Target, Users, Gamepad2 } from 'lucide-react'

const Leaderboard = ({ matches, teams, games }) => {
  const getTeamStats = () => {
    const stats = {}
    
    teams.forEach(team => {
      stats[team.id] = {
        team,
        wins: 0,
        losses: 0,
        totalScore: 0,
        matchesPlayed: 0,
        averageScore: 0,
        winRate: 0
      }
    })

    matches.filter(match => match.status === 'completed').forEach(match => {
      const team1Stats = stats[match.team1.id]
      const team2Stats = stats[match.team2.id]

      if (team1Stats) {
        team1Stats.totalScore += match.team1Score || 0
        team1Stats.matchesPlayed++
        if (match.winner?.id === match.team1.id) {
          team1Stats.wins++
        } else {
          team1Stats.losses++
        }
      }

      if (team2Stats) {
        team2Stats.totalScore += match.team2Score || 0
        team2Stats.matchesPlayed++
        if (match.winner?.id === match.team2.id) {
          team2Stats.wins++
        } else {
          team2Stats.losses++
        }
      }
    })

    Object.values(stats).forEach(stat => {
      stat.averageScore = stat.matchesPlayed > 0 ? stat.totalScore / stat.matchesPlayed : 0
      stat.winRate = stat.matchesPlayed > 0 ? (stat.wins / stat.matchesPlayed) * 100 : 0
    })

    return Object.values(stats)
  }

  const getStatsByGame = () => {
    const gameStats = {}
    
    games.forEach(game => {
      gameStats[game.id] = {
        game,
        teams: teams.filter(team => team.game === game.id),
        matches: matches.filter(match => match.game === game.id),
        completedMatches: matches.filter(match => match.game === game.id && match.status === 'completed')
      }
    })

    return gameStats
  }

  const teamStats = getTeamStats()
  const gameStats = getStatsByGame()
  
  const sortedTeams = teamStats.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins
    if (b.winRate !== a.winRate) return b.winRate - a.winRate
    return b.averageScore - a.averageScore
  })

  const topTeams = sortedTeams.slice(0, 3)
  const mostKills = sortedTeams.sort((a, b) => b.totalScore - a.totalScore)[0]
  const bestWinRate = sortedTeams.filter(t => t.matchesPlayed > 0).sort((a, b) => b.winRate - a.winRate)[0]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-slate-400 font-bold">{rank}</div>
    }
  }

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 border-yellow-500/50'
      case 2:
        return 'bg-gradient-to-r from-gray-600/20 to-gray-500/10 border-gray-500/50'
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-500/10 border-amber-500/50'
      default:
        return 'bg-slate-800/50 border-slate-600/50'
    }
  }

  if (matches.filter(m => m.status === 'completed').length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <Trophy className="h-24 w-24 text-slate-600 mx-auto mb-6" />
        <h2 className="text-3xl font-gaming font-bold text-white mb-4">
          Tournament Rankings
        </h2>
        <p className="text-slate-400 text-lg">
          Complete some matches to see the leaderboard!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent mb-4">
          Tournament Rankings
        </h2>
        <p className="text-slate-300 text-lg">
          Current standings and achievements across all games
        </p>
      </div>

      {/* Game Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {Object.values(gameStats).filter(stat => stat.teams.length > 0).map(stat => (
          <div key={stat.game.id} className="card text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Gamepad2 className="h-4 w-4 text-primary-400" />
              <span className="text-sm font-medium text-white">{stat.game.name}</span>
            </div>
            <div className="text-lg font-bold text-primary-400">{stat.teams.length}</div>
            <div className="text-xs text-slate-400">Teams</div>
            <div className="text-sm text-slate-300 mt-1">{stat.completedMatches.length} matches</div>
          </div>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {topTeams.map((team, index) => (
          <div
            key={team.team.id}
            className={`card border-2 ${getRankBg(index + 1)} text-center transform hover:scale-105 transition-all duration-300`}
          >
            <div className="flex justify-center mb-4">
              {getRankIcon(index + 1)}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {team.team.teamName}
            </h3>
            <div className="game-badge mb-3">
              {games.find(g => g.id === team.team.game)?.name}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Wins:</span>
                <span className="text-white font-bold">{team.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Win Rate:</span>
                <span className="text-white font-bold">{team.winRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg Score:</span>
                <span className="text-white font-bold">{team.averageScore.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Awards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {mostKills && mostKills.totalScore > 0 && (
          <div className="card bg-red-900/20 border-red-500/50">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-6 w-6 text-red-400" />
              <h3 className="text-xl font-bold text-white">Highest Scorer</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-medium text-white">
                  {mostKills.team.teamName}
                </span>
                <div className="game-badge mt-1">
                  {games.find(g => g.id === mostKills.team.game)?.name}
                </div>
              </div>
              <span className="text-2xl font-bold text-red-400">
                {mostKills.totalScore}
              </span>
            </div>
          </div>
        )}

        {bestWinRate && bestWinRate.winRate > 0 && (
          <div className="card bg-green-900/20 border-green-500/50">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Best Win Rate</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-medium text-white">
                  {bestWinRate.team.teamName}
                </span>
                <div className="game-badge mt-1">
                  {games.find(g => g.id === bestWinRate.team.game)?.name}
                </div>
              </div>
              <span className="text-2xl font-bold text-green-400">
                {bestWinRate.winRate.toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Full Rankings Table */}
      <div className="card-premium max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-primary-400" />
          <h3 className="text-2xl font-bold text-white">Full Rankings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600/50">
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Rank</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Team</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Game</th>
                <th className="text-center py-3 px-4 text-slate-300 font-medium">Wins</th>
                <th className="text-center py-3 px-4 text-slate-300 font-medium">Losses</th>
                <th className="text-center py-3 px-4 text-slate-300 font-medium">Win Rate</th>
                <th className="text-center py-3 px-4 text-slate-300 font-medium">Total Score</th>
                <th className="text-center py-3 px-4 text-slate-300 font-medium">Avg Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => (
                <tr
                  key={team.team.id}
                  className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200 ${
                    index < 3 ? 'bg-slate-800/20' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(index + 1)}
                      <span className="text-white font-medium">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-white font-medium">{team.team.teamName}</div>
                      <div className="text-slate-400 text-sm">
                        Captain: {team.team.captainName}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="game-badge">
                      {games.find(g => g.id === team.team.game)?.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-400 font-bold">{team.wins}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-red-400 font-bold">{team.losses}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-white font-medium">
                      {team.winRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-primary-400 font-bold">{team.totalScore}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-white">{team.averageScore.toFixed(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
