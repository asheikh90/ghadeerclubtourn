import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Community from './components/Community'
import Games from './components/Games'
import Events from './components/Events'
import IslamicContent from './components/IslamicContent'
import Profile from './components/Profile'
import TeamSignup from './components/tournament/TeamSignup'
import TournamentBracket from './components/tournament/TournamentBracket'
import ScoreSubmission from './components/tournament/ScoreSubmission'
import Leaderboard from './components/tournament/Leaderboard'
import AdminPanel from './components/tournament/AdminPanel'
import MissionBanner from './components/MissionBanner'
import SalahReminder from './components/SalahReminder'
import QuranTrivia from './components/QuranTrivia'
import Footer from './components/Footer'

const GAMES = [
  { id: 'cod', name: 'Call of Duty', platform: 'Activision ID', category: 'FPS', rating: 'M', ageAppropriate: true },
  { id: 'fortnite', name: 'Fortnite', platform: 'Epic Games', category: 'Battle Royale', rating: 'T', ageAppropriate: true },
  { id: 'minecraft', name: 'Minecraft', platform: 'Minecraft Username', category: 'Sandbox', rating: 'E10+', ageAppropriate: true },
  { id: 'roblox', name: 'Roblox', platform: 'Roblox Username', category: 'Platform', rating: 'E10+', ageAppropriate: true },
  { id: 'fifa', name: 'FIFA', platform: 'EA ID', category: 'Sports', rating: 'E', ageAppropriate: true },
  { id: 'madden', name: 'Madden', platform: 'EA ID', category: 'Sports', rating: 'E', ageAppropriate: true },
  { id: 'nba2k', name: 'NBA 2K', platform: 'PSN/Xbox/Steam', category: 'Sports', rating: 'E', ageAppropriate: true },
  { id: 'apex', name: 'Apex Legends', platform: 'Origin/Steam', category: 'Battle Royale', rating: 'T', ageAppropriate: true },
  { id: 'rocket-league', name: 'Rocket League', platform: 'Epic Games', category: 'Sports', rating: 'E', ageAppropriate: true },
  { id: 'fall-guys', name: 'Fall Guys', platform: 'Epic Games', category: 'Party', rating: 'E', ageAppropriate: true }
]

function App() {
  // Tournament state
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([])
  const [tournamentStarted, setTournamentStarted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentRound, setCurrentRound] = useState(1)
  const [maxTeams] = useState(30)
  const [tournamentStartTime, setTournamentStartTime] = useState(null)

  // Community state
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Islamic features state
  const [showSalahReminder, setShowSalahReminder] = useState(false)
  const [showQuranTrivia, setShowQuranTrivia] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTeams = localStorage.getItem('tournament-teams')
    const savedMatches = localStorage.getItem('tournament-matches')
    const savedTournamentStarted = localStorage.getItem('tournament-started')
    const savedCurrentRound = localStorage.getItem('current-round')
    const savedTournamentStartTime = localStorage.getItem('tournament-start-time')
    const savedUser = localStorage.getItem('ghadeer-user')

    if (savedTeams) setTeams(JSON.parse(savedTeams))
    if (savedMatches) setMatches(JSON.parse(savedMatches))
    if (savedTournamentStarted) setTournamentStarted(JSON.parse(savedTournamentStarted))
    if (savedCurrentRound) setCurrentRound(JSON.parse(savedCurrentRound))
    if (savedTournamentStartTime) setTournamentStartTime(JSON.parse(savedTournamentStartTime))
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  // Check for prayer times and show reminders
  useEffect(() => {
    const checkPrayerTime = () => {
      const now = new Date()
      const hour = now.getHours()
      const minute = now.getMinutes()
      
      // Prayer times (approximate - should be calculated based on location)
      const prayerTimes = [
        { name: 'Fajr', hour: 5, minute: 30 },
        { name: 'Dhuhr', hour: 12, minute: 30 },
        { name: 'Asr', hour: 15, minute: 30 },
        { name: 'Maghrib', hour: 18, minute: 30 },
        { name: 'Isha', hour: 20, minute: 0 }
      ]

      prayerTimes.forEach(prayer => {
        if (hour === prayer.hour && minute >= prayer.minute && minute < prayer.minute + 5) {
          setShowSalahReminder(true)
        }
      })
    }

    const interval = setInterval(checkPrayerTime, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('tournament-teams', JSON.stringify(teams))
  }, [teams])

  useEffect(() => {
    localStorage.setItem('tournament-matches', JSON.stringify(matches))
  }, [matches])

  useEffect(() => {
    localStorage.setItem('tournament-started', JSON.stringify(tournamentStarted))
  }, [tournamentStarted])

  useEffect(() => {
    localStorage.setItem('current-round', JSON.stringify(currentRound))
  }, [currentRound])

  useEffect(() => {
    localStorage.setItem('tournament-start-time', JSON.stringify(tournamentStartTime))
  }, [tournamentStartTime])

  useEffect(() => {
    if (user) {
      localStorage.setItem('ghadeer-user', JSON.stringify(user))
    }
  }, [user])

  const addTeam = (team) => {
    if (teams.length < maxTeams && !tournamentStarted) {
      const newTeam = {
        ...team,
        id: Date.now(),
        registeredAt: new Date().toISOString()
      }
      setTeams([...teams, newTeam])
      return true
    }
    return false
  }

  const generateBracket = () => {
    if (teams.length < 2) return

    // Show Quran trivia before tournament starts
    setShowQuranTrivia(true)

    // Group teams by game
    const teamsByGame = teams.reduce((acc, team) => {
      if (!acc[team.game]) acc[team.game] = []
      acc[team.game].push(team)
      return acc
    }, {})

    // Generate matches for each game
    const allMatches = []
    let matchCounter = 1

    Object.entries(teamsByGame).forEach(([game, gameTeams]) => {
      if (gameTeams.length < 2) return

      // Shuffle teams for random bracket
      const shuffledTeams = [...gameTeams].sort(() => Math.random() - 0.5)
      
      // Create first round matches for this game
      for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (shuffledTeams[i + 1]) {
          allMatches.push({
            id: `match-${matchCounter}`,
            game,
            round: 1,
            team1: shuffledTeams[i],
            team2: shuffledTeams[i + 1],
            winner: null,
            team1Score: null,
            team2Score: null,
            status: 'pending',
            scheduledTime: new Date(Date.now() + matchCounter * 30 * 60 * 1000).toISOString()
          })
          matchCounter++
        }
      }
    })

    setMatches(allMatches)
    setTournamentStarted(true)
    setCurrentRound(1)
  }

  const updateMatchScore = (matchId, team1Score, team2Score, winner) => {
    setMatches(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        if (match.id === matchId) {
          return {
            ...match,
            team1Score,
            team2Score,
            winner,
            status: 'completed'
          }
        }
        return match
      })

      // Check if round is complete for each game and generate next round
      const gameRounds = {}
      updatedMatches.forEach(match => {
        if (!gameRounds[match.game]) gameRounds[match.game] = {}
        if (!gameRounds[match.game][match.round]) gameRounds[match.game][match.round] = []
        gameRounds[match.game][match.round].push(match)
      })

      let newMatches = [...updatedMatches]
      let matchCounter = Math.max(...updatedMatches.map(m => parseInt(m.id.split('-')[1]))) + 1

      Object.entries(gameRounds).forEach(([game, rounds]) => {
        const currentRoundMatches = rounds[currentRound] || []
        const completedMatches = currentRoundMatches.filter(m => m.status === 'completed')
        
        if (completedMatches.length === currentRoundMatches.length && completedMatches.length > 1) {
          // Generate next round for this game
          const winners = completedMatches.map(m => m.winner)
          
          for (let i = 0; i < winners.length; i += 2) {
            if (winners[i + 1]) {
              newMatches.push({
                id: `match-${matchCounter}`,
                game,
                round: currentRound + 1,
                team1: winners[i],
                team2: winners[i + 1],
                winner: null,
                team1Score: null,
                team2Score: null,
                status: 'pending',
                scheduledTime: new Date(Date.now() + matchCounter * 30 * 60 * 1000).toISOString()
              })
              matchCounter++
            }
          }
        }
      })

      // Update current round if any game has advanced
      const maxRound = Math.max(...newMatches.map(m => m.round))
      if (maxRound > currentRound) {
        setCurrentRound(maxRound)
      }

      return newMatches
    })
  }

  const resetTournament = () => {
    setTeams([])
    setMatches([])
    setTournamentStarted(false)
    setCurrentRound(1)
    setTournamentStartTime(null)
    localStorage.removeItem('tournament-teams')
    localStorage.removeItem('tournament-matches')
    localStorage.removeItem('tournament-started')
    localStorage.removeItem('current-round')
    localStorage.removeItem('tournament-start-time')
  }

  const setTournamentTime = (dateTime) => {
    setTournamentStartTime(dateTime)
  }

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('ghadeer-user')
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
        <MissionBanner />
        
        <Header 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin}
          tournamentStarted={tournamentStarted}
          teamsCount={teams.length}
          maxTeams={maxTeams}
          games={GAMES}
          user={user}
          isAuthenticated={isAuthenticated}
          login={login}
          logout={logout}
        />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home games={GAMES} user={user} />} />
            <Route path="/community" element={<Community user={user} isAuthenticated={isAuthenticated} />} />
            <Route path="/games" element={<Games games={GAMES} />} />
            <Route path="/events" element={<Events />} />
            <Route path="/islamic-content" element={<IslamicContent />} />
            <Route path="/profile" element={<Profile user={user} isAuthenticated={isAuthenticated} />} />
            
            {/* Tournament Routes */}
            <Route 
              path="/tournament" 
              element={
                !tournamentStarted ? (
                  <TeamSignup 
                    teams={teams}
                    addTeam={addTeam}
                    maxTeams={maxTeams}
                    generateBracket={generateBracket}
                    games={GAMES}
                    tournamentStartTime={tournamentStartTime}
                  />
                ) : (
                  <Navigate to="/tournament/bracket" replace />
                )
              } 
            />
            <Route 
              path="/tournament/bracket" 
              element={
                <TournamentBracket 
                  matches={matches}
                  currentRound={currentRound}
                  games={GAMES}
                />
              } 
            />
            <Route 
              path="/tournament/submit-score" 
              element={
                <ScoreSubmission 
                  matches={matches}
                  updateMatchScore={updateMatchScore}
                  games={GAMES}
                />
              } 
            />
            <Route 
              path="/tournament/leaderboard" 
              element={
                <Leaderboard 
                  matches={matches}
                  teams={teams}
                  games={GAMES}
                />
              } 
            />
            {isAdmin && (
              <Route 
                path="/tournament/admin" 
                element={
                  <AdminPanel 
                    teams={teams}
                    matches={matches}
                    resetTournament={resetTournament}
                    updateMatchScore={updateMatchScore}
                    games={GAMES}
                    tournamentStartTime={tournamentStartTime}
                    setTournamentTime={setTournamentTime}
                  />
                } 
              />
            )}
          </Routes>
        </main>

        <Footer />

        {/* Islamic Feature Modals */}
        <SalahReminder 
          isOpen={showSalahReminder}
          onClose={() => setShowSalahReminder(false)}
        />
        
        <QuranTrivia 
          isOpen={showQuranTrivia}
          onClose={() => setShowQuranTrivia(false)}
        />
      </div>
    </Router>
  )
}

export default App
