import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trophy, Users, Target, Award, Settings, Shield, MessageCircle } from 'lucide-react'

const Header = ({ isAdmin, setIsAdmin, tournamentStarted, teamsCount, maxTeams, games }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Teams', icon: Users, show: !tournamentStarted },
    { path: '/bracket', label: 'Bracket', icon: Target, show: tournamentStarted },
    { path: '/submit-score', label: 'Submit', icon: Trophy, show: tournamentStarted },
    { path: '/leaderboard', label: 'Rankings', icon: Award, show: tournamentStarted },
    { path: '/admin', label: 'Admin', icon: Settings, show: isAdmin }
  ]

  const getTeamsByGame = () => {
    // This would need teams data passed down, but for header we'll keep it simple
    return games.length
  }

  return (
    <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Logo Banner Space */}
        <div className="flex items-center justify-center py-3 border-b border-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                GHADEER CLUB
              </h1>
              <p className="text-xs text-slate-400 font-medium">TOURNAMENT PLATFORM</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {tournamentStarted && (
              <div className="hidden md:flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">LIVE</span>
                </div>
                <div className="text-slate-400">•</div>
                <span className="text-slate-300">{teamsCount} Teams</span>
                <div className="text-slate-400">•</div>
                <span className="text-slate-300">{getTeamsByGame()} Games</span>
              </div>
            )}
          </div>

          <nav className="flex items-center space-x-1">
            {navItems.filter(item => item.show).map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">{item.label}</span>
                </Link>
              )
            })}
            
            {/* Discord Button */}
            <a
              href="https://discord.gg/NmgBkgrn"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link nav-link-inactive bg-discord-600/20 border-discord-500/30 hover:bg-discord-600/30"
              title="Join Discord"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Discord</span>
            </a>
            
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`nav-link ${
                isAdmin 
                  ? 'bg-red-600/20 text-red-300 border-red-500/30' 
                  : 'nav-link-inactive'
              }`}
              title={isAdmin ? 'Exit Admin Mode' : 'Enter Admin Mode'}
            >
              <Shield className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
