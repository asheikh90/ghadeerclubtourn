import React, { useState } from 'react'
import { Users, MessageCircle, Trophy, Star, Globe, Calendar, Search, Filter, Heart, Shield } from 'lucide-react'

const Community = ({ user, isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('members')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock community data
  const members = [
    { id: 1, username: 'AliGamer123', country: 'Iraq', games: ['COD', 'FIFA'], rank: 'Champion', joinDate: '2023-01-15', online: true },
    { id: 2, username: 'HussainPro', country: 'Lebanon', games: ['Fortnite', 'Minecraft'], rank: 'Elite', joinDate: '2023-02-20', online: false },
    { id: 3, username: 'FatimaGaming', country: 'Iran', games: ['Roblox', 'Fall Guys'], rank: 'Rising Star', joinDate: '2023-03-10', online: true },
    { id: 4, username: 'ZahraBattles', country: 'Pakistan', games: ['Apex', 'Rocket League'], rank: 'Champion', joinDate: '2023-01-30', online: true },
    { id: 5, username: 'MohammedFPS', country: 'India', games: ['COD', 'Apex'], rank: 'Elite', joinDate: '2023-02-15', online: false },
    { id: 6, username: 'AyeshaMinecraft', country: 'USA', games: ['Minecraft', 'Roblox'], rank: 'Rising Star', joinDate: '2023-03-25', online: true }
  ]

  const discussions = [
    { id: 1, title: 'Best Islamic Gaming Practices', author: 'AliGamer123', replies: 23, lastActivity: '2 hours ago', category: 'Islamic Gaming' },
    { id: 2, title: 'COD Tournament Strategy Discussion', author: 'MohammedFPS', replies: 15, lastActivity: '4 hours ago', category: 'Strategy' },
    { id: 3, title: 'Minecraft Islamic Architecture Builds', author: 'AyeshaMinecraft', replies: 31, lastActivity: '6 hours ago', category: 'Creative' },
    { id: 4, title: 'Balancing Gaming and Prayer Times', author: 'HussainPro', replies: 18, lastActivity: '1 day ago', category: 'Islamic Gaming' },
    { id: 5, title: 'FIFA Ultimate Team Halal Trading', author: 'ZahraBattles', replies: 12, lastActivity: '2 days ago', category: 'Sports Gaming' }
  ]

  const achievements = [
    { id: 1, title: 'Tournament Champion', description: 'Won a major tournament', icon: Trophy, rarity: 'legendary' },
    { id: 2, title: 'Community Helper', description: 'Helped 50+ community members', icon: Heart, rarity: 'epic' },
    { id: 3, title: 'Faith Guardian', description: 'Promoted Islamic values in gaming', icon: Shield, rarity: 'legendary' },
    { id: 4, title: 'Global Connector', description: 'Connected gamers from 10+ countries', icon: Globe, rarity: 'rare' }
  ]

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Champion': return 'text-yellow-400'
      case 'Elite': return 'text-purple-400'
      case 'Rising Star': return 'text-blue-400'
      default: return 'text-slate-400'
    }
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      case 'epic': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
      case 'rare': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
      default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
    }
  }

  const filteredMembers = members.filter(member =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Community Hub</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Connect with fellow Shia gamers, share experiences, and build lasting friendships in our global community
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Users className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">2,547</div>
          <div className="text-slate-400 text-sm">Active Members</div>
        </div>
        <div className="card text-center">
          <MessageCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">1,234</div>
          <div className="text-slate-400 text-sm">Online Now</div>
        </div>
        <div className="card text-center">
          <Globe className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">45</div>
          <div className="text-slate-400 text-sm">Countries</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">156</div>
          <div className="text-slate-400 text-sm">Tournaments</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
        {[
          { id: 'members', label: 'Members', icon: Users },
          { id: 'discussions', label: 'Discussions', icon: MessageCircle },
          { id: 'achievements', label: 'Achievements', icon: Trophy }
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

      {/* Content based on active tab */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search members by name or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <div key={member.id} className="card-premium">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {member.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {member.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{member.username}</h3>
                      <p className="text-slate-400 text-sm">{member.country}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${getRankColor(member.rank)}`}>
                    {member.rank}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Favorite Games:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.games.map(game => (
                        <span key={game} className="game-badge text-xs">
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                    <button className="text-primary-400 hover:text-primary-300 font-medium">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Community Discussions</h2>
            <button className="btn-primary">Start Discussion</button>
          </div>

          <div className="space-y-4">
            {discussions.map(discussion => (
              <div key={discussion.id} className="card hover:bg-slate-800/80 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-white hover:text-primary-400 transition-colors">
                        {discussion.title}
                      </h3>
                      <span className="game-badge text-xs">{discussion.category}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.replies} replies</span>
                      <span>•</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                  <MessageCircle className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Community Achievements</h2>
            <p className="text-slate-400">Unlock achievements by participating in community activities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map(achievement => {
              const Icon = achievement.icon
              return (
                <div key={achievement.id} className={`card-premium bg-gradient-to-br ${getRarityColor(achievement.rarity)}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{achievement.title}</h3>
                      <p className="text-slate-300 text-sm mb-2">{achievement.description}</p>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-400 capitalize">
                          {achievement.rarity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Join Community CTA */}
      {!isAuthenticated && (
        <div className="card-premium text-center py-8">
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Connect with thousands of Shia gamers worldwide. Share your gaming journey, 
            participate in discussions, and grow in faith together.
          </p>
          <button className="btn-primary">
            Create Account
          </button>
        </div>
      )}
    </div>
  )
}

export default Community
