import React from 'react'
import { Trophy, Clock, CheckCircle, Circle, Gamepad2, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'

const TournamentBracket = ({ matches, currentRound, games }) => {
  const getRoundName = (round, totalRounds) => {
    if (round === totalRounds) return 'Final'
    if (round === totalRounds - 1) return 'Semi-Final'
    if (round === totalRounds - 2) return 'Quarter-Final'
    return `Round ${round}`
  }

  const getMatchesByGame = () => {
    const gameMatches = {}
    matches.forEach(match => {
      if (!gameMatches[match.game]) {
        gameMatches[match.game] = {}
      }
      if (!gameMatches[match.game][match.round]) {
        gameMatches[match.game][match.round] = []
      }
      gameMatches[match.game][match.round].push(match)
    })
    return gameMatches
  }

  const gameMatches = getMatchesByGame()
  const activeGames = Object.keys(gameMatches)

  if (matches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <Trophy className="h-24 w-24 text-slate-600 mx-auto mb-6" />
        <h2 className="text-3xl font-gaming font-bold text-white mb-4">
          Tournament Brackets
        </h2>
        <p className="text-slate-400 text-lg">
          Tournament brackets will appear here once teams are registered and the tournament begins.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent mb-4">
          Tournament Brackets
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="status-badge bg-green-600/20 text-green-300 border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            Live Tournament
          </div>
          <div className="status-badge bg-slate-800/50 text-slate-300 border border-slate-600/30">
            Current Round: {currentRound}
          </div>
          <div className="status-badge bg-primary-600/20 text-primary-300 border border-primary-500/30">
            {activeGames.length} Active Games
          </div>
        </div>
      </div>

      {/* Discord CTA */}
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <MessageCircle className="h-6 w-6 text-discord-500" />
            <span className="text-white font-semibold">Stay Connected</span>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Get live match updates and connect with other players
          </p>
          <a
            href="https://discord.gg/NmgBkgrn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-discord inline-flex items-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Join Discord</span>
          </a>
        </div>
      </div>

      {/* Game Brackets */}
      <div className="space-y-12">
        {activeGames.map(gameId => {
          const game = games.find(g => g.id === gameId)
          const rounds = Object.keys(gameMatches[gameId]).sort((a, b) => parseInt(a) - parseInt(b))
          const totalRounds = Math.max(...rounds.map(r => parseInt(r)))

          return (
            <div key={gameId} className="space-y-8">
              {/* Game Header */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Gamepad2 className="h-8 w-8 text-primary-400" />
                  <h3 className="text-2xl md:text-3xl font-gaming font-bold text-white">
                    {game?.name} Tournament
                  </h3>
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto rounded-full"></div>
              </div>

              {/* Rounds for this game */}
              <div className="space-y-10">
                {rounds.map(round => (
                  <div key={round} className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {getRoundName(parseInt(round), totalRounds)}
                      </h4>
                      <div className="w-16 h-0.5 bg-primary-500 mx-auto rounded"></div>
                    </div>

                    <div className={`grid gap-6 ${
                      gameMatches[gameId][round].length <= 1 
                        ? 'grid-cols-1 max-w-lg mx-auto' 
                        : gameMatches[gameId][round].length <= 2
                        ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                        : gameMatches[gameId][round].length <= 4
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    }`}>
                      {gameMatches[gameId][round].map(match => (
                        <MatchCard key={match.id} match={match} game={game} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MatchCard = ({ match, game }) => {
  const getStatusIcon = () => {
    switch (match.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-400 animate-pulse" />
      default:
        return <Circle className="h-5 w-5 text-slate-400" />
    }
  }

  const getStatusColor = () => {
    switch (match.status) {
      case 'completed':
        return 'border-green-500/50 bg-green-900/10'
      case 'in-progress':
        return 'border-yellow-500/50 bg-yellow-900/10'
      default:
        return 'border-slate-600/50 bg-slate-800/30'
    }
  }

  return (
    <div className={`card border-2 ${getStatusColor()} transition-all duration-300 hover:scale-105 hover:shadow-glow`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-slate-400">
            {match.id}
          </span>
          <span className="game-badge text-xs">
            {game?.name}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-xs text-slate-400 capitalize font-medium">
            {match.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Team 1 */}
        <div className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
          match.winner?.id === match.team1.id 
            ? 'bg-gradient-to-r from-green-600/20 to-green-500/10 border border-green-500/30' 
            : 'bg-slate-800/50 border border-slate-700/50'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              match.winner?.id === match.team1.id ? 'bg-green-400' : 'bg-slate-400'
            }`}></div>
            <div>
              <span className="font-medium text-white text-sm">{match.team1.teamName}</span>
              <div className="text-xs text-slate-400">
                {match.team1.players?.[0]?.gamertag}
              </div>
            </div>
          </div>
          {match.team1Score !== null && (
            <span className="text-lg font-bold text-white">
              {match.team1Score}
            </span>
          )}
        </div>

        {/* VS Divider */}
        <div className="text-center">
          <span className="text-slate-500 font-bold text-sm">VS</span>
        </div>

        {/* Team 2 */}
        <div className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
          match.winner?.id === match.team2.id 
            ? 'bg-gradient-to-r from-green-600/20 to-green-500/10 border border-green-500/30' 
            : 'bg-slate-800/50 border border-slate-700/50'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              match.winner?.id === match.team2.id ? 'bg-green-400' : 'bg-slate-400'
            }`}></div>
            <div>
              <span className="font-medium text-white text-sm">{match.team2.teamName}</span>
              <div className="text-xs text-slate-400">
                {match.team2.players?.[0]?.gamertag}
              </div>
            </div>
          </div>
          {match.team2Score !== null && (
            <span className="text-lg font-bold text-white">
              {match.team2Score}
            </span>
          )}
        </div>
      </div>

      {match.scheduledTime && (
        <div className="mt-4 pt-3 border-t border-slate-700/50">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            <span>
              {format(new Date(match.scheduledTime), 'MMM dd, HH:mm')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentBracket
