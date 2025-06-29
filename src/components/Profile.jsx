import React, { useState } from 'react'
import { User, Trophy, Star, Calendar, Gamepad2, Award, Settings, Edit3, Save, X } from 'lucide-react'

const Profile = ({ user, isAuthenticated }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
    country: user?.country || '',
    favoriteGames: user?.favoriteGames || [],
    bio: user?.bio || ''
  })

  // Mock user data if not authenticated
  const mockUser = {
    username: 'GuestUser',
    email: 'guest@example.com',
    country: 'Unknown',
    joinDate: '2024-01-01',
    favoriteGames: ['COD', 'FIFA'],
    bio: 'Gaming enthusiast and proud member of the Ummah',
    stats: {
      tournamentsJoined: 0,
      wins: 0,
      totalMatches: 0,
      rank: 'Newcomer'
    },
    achievements: [],
    recentActivity: []
  }

  const currentUser = user || mockUser

  // Mock data for demonstration
  const userStats = {
    tournamentsJoined: 15,
    wins: 8,
    totalMatches: 45,
    rank: 'Elite Player',
    winRate: 67,
    currentStreak: 3
  }

  const achievements = [
    { id: 1, title: 'First Victory', description: 'Won your first tournament match', icon: Trophy, rarity: 'common', unlocked: true },
    { id: 2, title: 'Tournament Champion', description: 'Won a complete tournament', icon: Award, rarity: 'rare', unlocked: true },
    { id: 3, title: 'Community Helper', description: 'Helped 10+ community members', icon: Star, rarity: 'epic', unlocked: false },
    { id: 4, title: 'Faith Guardian', description: 'Promoted Islamic values in gaming', icon: Star, rarity: 'legendary', unlocked: true }
  ]

  const recentActivity = [
    { id: 1, type: 'tournament', description: 'Joined FIFA Weekly Tournament', date: '2024-02-20' },
    { id: 2, type: 'win', description: 'Won match against TeamAlpha in COD', date: '2024-02-18' },
    { id: 3, type: 'achievement', description: 'Unlocked "Tournament Champion" achievement', date: '2024-02-15' },
    { id: 4, type: 'community', description: 'Posted in Islamic Gaming Discussion', date: '2024-02-12' }
  ]

  const favoriteGames = [
    { id: 'cod', name: 'Call of Duty', matches: 15, wins: 9 },
    { id: 'fifa', name: 'FIFA', matches: 12, wins: 7 },
    { id: 'minecraft', name: 'Minecraft', matches: 8, wins: 5 },
    { id: 'fortnite', name: 'Fortnite', matches: 10, wins: 4 }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      case 'epic': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
      case 'rare': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
      case 'common': return 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
      default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'tournament': return Trophy
      case 'win': return Award
      case 'achievement': return Star
      case 'community': return User
      default: return Gamepad2
    }
  }

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', editedProfile)
    setIsEditing(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Profile</h1>
          <p className="text-slate-400 text-lg">Please log in to view your profile</p>
        </div>
        
        <div className="card-premium text-center py-12">
          <User className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Join Ghadeer Club</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Create your profile to track your gaming progress, join tournaments, 
            and connect with the global Shia gaming community.
          </p>
          <button className="btn-primary">
            Create Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="card-premium">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow">
              <span className="text-3xl font-bold text-white">
                {currentUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedProfile.username}
                    onChange={(e) => setEditedProfile({...editedProfile, username: e.target.value})}
                    className="input-field text-2xl font-bold"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    className="input-field"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={editedProfile.country}
                    onChange={(e) => setEditedProfile({...editedProfile, country: e.target.value})}
                    className="input-field"
                    placeholder="Country"
                  />
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                    className="input-field"
                    rows="3"
                    placeholder="Bio"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{currentUser.username}</h1>
                  <p className="text-slate-400 mb-2">{currentUser.email}</p>
                  <p className="text-slate-400 mb-4">{currentUser.country}</p>
                  <p className="text-slate-300 leading-relaxed">{currentUser.bio}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userStats.tournamentsJoined}</div>
            <div className="text-slate-400 text-sm">Tournaments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userStats.wins}</div>
            <div className="text-slate-400 text-sm">Wins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userStats.winRate}%</div>
            <div className="text-slate-400 text-sm">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userStats.currentStreak}</div>
            <div className="text-slate-400 text-sm">Win Streak</div>
          </div>
        </div>
      </div>

      {/* Gaming Stats */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Favorite Games */}
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary-400" />
            <span>Favorite Games</span>
          </h2>
          
          <div className="space-y-4">
            {favoriteGames.map(game => (
              <div key={game.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div>
                  <h3 className="font-bold text-white">{game.name}</h3>
                  <p className="text-slate-400 text-sm">{game.matches} matches played</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{game.wins}</div>
                  <div className="text-slate-400 text-sm">wins</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span>Achievements</span>
          </h2>
          
          <div className="space-y-4">
            {achievements.map(achievement => {
              const Icon = achievement.icon
              return (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-xl border bg-gradient-to-br ${getRarityColor(achievement.rarity)} ${
                    achievement.unlocked ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{achievement.title}</h3>
                      <p className="text-slate-300 text-sm">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-400">
                        <Award className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-blue-400" />
          <span>Recent Activity</span>
        </h2>
        
        <div className="space-y-4">
          {recentActivity.map(activity => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.description}</p>
                  <p className="text-slate-400 text-sm">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Account Settings */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <Settings className="h-6 w-6 text-slate-400" />
          <span>Account Settings</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Privacy</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-slate-300">Show online status</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-slate-300">Allow friend requests</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-300">Show gaming statistics publicly</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-slate-300">Tournament invitations</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-slate-300">Community updates</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-300">Prayer time reminders</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
