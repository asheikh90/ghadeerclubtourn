import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import TeamSignup from './components/TeamSignup'
import TournamentBracket from './components/TournamentBracket'
import ScoreSubmission from './components/ScoreSubmission'
import Leaderboard from './components/Leaderboard'
import AdminPanel from './components/AdminPanel'

const GAMES = [
  { id: 'cod', name: 'Call of Duty', platform: 'Activision ID' },
  { id: 'fortnite', name: 'Fortnite', platform: 'Epic Games' },
  { id: 'minecraft', name: 'Minecraft', platform: 'Minecraft Username' },
  { id: 'roblox', name: 'Roblox', platform: 'Roblox Username' },
  { id: 'fifa', name: 'FIFA', platform: 'EA ID' },
  { id: 'madden', name: 'Madden', platform: 'EA ID' },
  { id: 'nba2k', name: 'NBA 2K', platform: 'PSN/Xbox/Steam' },
  { id: 'apex', name: 'Apex Legends', platform: 'Origin/Steam' }
]

function App() {
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([])
  const [tournamentStarted, setTournamentStarted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentRound, setCurrentRound] = useState(1)
  const [maxTeams] = useState(30)
  const [tournamentStartTime, setTournamentStartTime] = useState(null)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTeams = localStorage.getItem('tournament-teams')
    const savedMatches = localStorage.getItem('tournament-matches')
    const savedTournamentStarted = localStorage.getItem('tournament-started')
    const savedCurrentRound = localStorage.getItem('current-round')
    const savedTournamentStartTime = localStorage.getItem('tournament-start-time')

    if (savedTeams) setTeams(JSON.parse(savedTeams))
    if (savedMatches) setMatches(JSON.parse(savedMatches))
    if (savedTournamentStarted) setTournamentStarted(JSON.parse(savedTournamentStarted))
    if (savedCurrentRound) setCurrentRound(JSON.parse(savedCurrentRound))
    if (savedTournamentStartTime) setTournamentStartTime(JSON.parse(savedTournamentStartTime))
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
    localStorage.clear()
  }

  const setTournamentTime = (dateTime) => {
    setTournamentStartTime(dateTime)
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Header 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin}
          tournamentStarted={tournamentStarted}
          teamsCount={teams.length}
          maxTeams={maxTeams}
          games={GAMES}
        />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <Routes>
            <Route 
              path="/" 
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
                  <Navigate to="/bracket" replace />
                )
              } 
            />
            <Route 
              path="/bracket" 
              element={
                <TournamentBracket 
                  matches={matches}
                  currentRound={currentRound}
                  games={GAMES}
                />
              } 
            />
            <Route 
              path="/submit-score" 
              element={
                <ScoreSubmission 
                  matches={matches}
                  updateMatchScore={updateMatchScore}
                  games={GAMES}
                />
              } 
            />
            <Route 
              path="/leaderboard" 
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
                path="/admin" 
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
      </div>
    </Router>
  )
}

export default App
