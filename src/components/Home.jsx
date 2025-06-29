import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Users, Calendar, BookOpen, Gamepad2, MessageCircle, Star, Globe, Shield, Heart } from 'lucide-react'

const Home = ({ games, user }) => {
  const featuredGames = games.slice(0, 6)
  
  const stats = [
    { label: 'Active Gamers', value: '2,500+', icon: Users },
    { label: 'Games Supported', value: games.length, icon: Gamepad2 },
    { label: 'Tournaments Held', value: '150+', icon: Trophy },
    { label: 'Countries', value: '45+', icon: Globe }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Islamic Values',
      description: 'Gaming community built on Islamic principles and brotherhood'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with Shia gamers from around the world'
    },
    {
      icon: Trophy,
      title: 'Tournaments',
      description: 'Regular competitive tournaments with prizes and recognition'
    },
    {
      icon: BookOpen,
      title: 'Islamic Content',
      description: 'Educational content combining gaming with Islamic teachings'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                GHADEER CLUB
              </h1>
              <p className="text-lg text-slate-300 font-medium">Unite. Game. Grow in Faith.</p>
            </div>
          </div>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
            Join the world's premier <span className="text-primary-400 font-semibold">Shia gaming community</span> where 
            faith meets gaming. Connect with brothers and sisters globally through age-appropriate games while 
            strengthening your Islamic identity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link to="/community" className="btn-primary inline-flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Explore Community</span>
              </Link>
            ) : (
              <button className="btn-primary inline-flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Join Our Ummah</span>
              </button>
            )}
            
            <Link to="/tournament" className="btn-secondary inline-flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Join Tournament</span>
            </Link>
            
            <a 
              href="https://discord.gg/NmgBkgrn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-discord inline-flex items-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Discord Server</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card text-center">
              <Icon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          )
        })}
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Ghadeer Club?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience gaming like never before in a community that values both competition and Islamic brotherhood
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card-premium text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <Icon className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Games */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Games</h2>
            <p className="text-slate-400">Age-appropriate games approved by our community</p>
          </div>
          <Link to="/games" className="btn-secondary">
            View All Games
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <div key={game.id} className="card group hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <p className="text-slate-400 text-sm">{game.category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="game-badge">{game.rating}</span>
                  {game.ageAppropriate && (
                    <div className="flex items-center space-x-1 text-green-400">
                      <Shield className="h-3 w-3" />
                      <span className="text-xs">Approved</span>
                    </div>
                  )}
                </div>
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="card-premium text-center py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Be part of a growing global community of Shia gamers. Participate in tournaments, 
            make lasting friendships, and grow in your faith while enjoying your favorite games.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community" className="btn-primary inline-flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Join Community</span>
            </Link>
            <Link to="/events" className="btn-secondary inline-flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Events</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
