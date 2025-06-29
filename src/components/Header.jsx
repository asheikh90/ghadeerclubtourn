import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trophy, Users, Target, Award, Settings, Shield, MessageCircle, Home, Gamepad2, Calendar, BookOpen, User, LogIn, LogOut, Menu, X } from 'lucide-react'
import LoginModal from './LoginModal'

const Header = ({ isAdmin, setIsAdmin, tournamentStarted, teamsCount, maxTeams, games, user, isAuthenticated, login, logout }) => {
  const location = useLocation()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mainNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/games', label: 'Games', icon: Gamepad2 },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/islamic-content', label: 'Islamic', icon: BookOpen }
  ]

  const tournamentNavItems = [
    { path: '/tournament', label: 'Join', icon: Users, show: !tournamentStarted },
    { path: '/tournament/bracket', label: 'Bracket', icon: Target, show: tournamentStarted },
    { path: '/tournament/submit-score', label: 'Submit', icon: Trophy, show: tournamentStarted },
    { path: '/tournament/leaderboard', label: 'Rankings', icon: Award, show: tournamentStarted },
    { path: '/tournament/admin', label: 'Admin', icon: Settings, show: isAdmin }
  ]

  const handleLogin = (userData) => {
    login(userData)
    setShowLoginModal(false)
  }

  return (
    <>
      <header className="bg-slate-950/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-card">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Logo Banner */}
          <div className="flex items-center justify-between py-4 border-b border-slate-800/50">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                  GHADEER CLUB
                </h1>
                <p className="text-sm text-slate-400 font-medium">Shia Gaming Community</p>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden nav-link nav-link-inactive p-2"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link to="/profile" className="flex items-center space-x-2 text-slate-300 hover:text-white">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{user?.username}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="nav-link nav-link-inactive text-red-400 hover:text-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Join Community</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
              {/* Main Navigation */}
              <nav className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-1">
                {mainNavItems.map(item => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Tournament & Actions */}
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-1">
                {/* Tournament Status */}
                {tournamentStarted && (
                  <div className="flex items-center space-x-3 text-sm px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">TOURNAMENT LIVE</span>
                    </div>
                    <div className="text-slate-400">•</div>
                    <span className="text-slate-300">{teamsCount} Teams</span>
                  </div>
                )}

                {/* Tournament Navigation */}
                {tournamentNavItems.filter(item => item.show).map(item => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
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
                  <span className="text-sm">Discord</span>
                </a>
                
                {/* Admin Toggle */}
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

                {/* Mobile User Actions */}
                <div className="md:hidden flex flex-col space-y-2 pt-2 border-t border-slate-700/50">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="nav-link nav-link-inactive"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm">Profile ({user?.username})</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                        className="nav-link nav-link-inactive text-red-400 hover:text-red-300"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLoginModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="btn-primary flex items-center justify-center space-x-2"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Join Community</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  )
}

export default Header
