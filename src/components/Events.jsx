import React, { useState } from 'react'
import { Calendar, Clock, Users, Trophy, MapPin, Star, Filter, Plus, ExternalLink } from 'lucide-react'

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const events = [
    {
      id: 1,
      title: 'Ramadan Gaming Tournament',
      description: 'Special tournament during the holy month with Islamic-themed challenges',
      date: '2024-03-15',
      time: '20:00',
      duration: '3 hours',
      participants: 156,
      maxParticipants: 200,
      category: 'Tournament',
      game: 'Multiple Games',
      status: 'upcoming',
      featured: true,
      prize: '$500 + Islamic Books',
      organizer: 'Ghadeer Club Team'
    },
    {
      id: 2,
      title: 'Friday Night FIFA League',
      description: 'Weekly FIFA tournament every Friday after Maghrib prayer',
      date: '2024-02-23',
      time: '19:30',
      duration: '2 hours',
      participants: 32,
      maxParticipants: 32,
      category: 'Weekly',
      game: 'FIFA',
      status: 'upcoming',
      featured: false,
      prize: 'Winner Badge',
      organizer: 'FIFA Community'
    },
    {
      id: 3,
      title: 'Minecraft Islamic Architecture Contest',
      description: 'Build famous Islamic landmarks and mosques in Minecraft',
      date: '2024-03-01',
      time: '15:00',
      duration: '5 hours',
      participants: 89,
      maxParticipants: 100,
      category: 'Contest',
      game: 'Minecraft',
      status: 'upcoming',
      featured: true,
      prize: 'Creative Recognition',
      organizer: 'Minecraft Builders'
    },
    {
      id: 4,
      title: 'Call of Duty Championship',
      description: 'Monthly COD tournament with team-based matches',
      date: '2024-02-15',
      time: '18:00',
      duration: '4 hours',
      participants: 64,
      maxParticipants: 64,
      category: 'Championship',
      game: 'Call of Duty',
      status: 'completed',
      featured: false,
      prize: '$200',
      organizer: 'COD Elite Team',
      winner: 'Team Hussain'
    },
    {
      id: 5,
      title: 'Islamic Gaming Workshop',
      description: 'Learn about balancing gaming with Islamic values and practices',
      date: '2024-02-10',
      time: '16:00',
      duration: '1.5 hours',
      participants: 145,
      maxParticipants: 200,
      category: 'Educational',
      game: 'Discussion',
      status: 'completed',
      featured: false,
      prize: 'Certificate',
      organizer: 'Islamic Scholars'
    }
  ]

  const categories = ['all', ...new Set(events.map(event => event.category))]

  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'all' || event.status === activeTab
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesTab && matchesCategory
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      case 'live': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'completed': return 'text-slate-400 bg-slate-400/20 border-slate-400/30'
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Tournament': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'Championship': return 'text-red-400 bg-red-400/20 border-red-400/30'
      case 'Contest': return 'text-purple-400 bg-purple-400/20 border-purple-400/30'
      case 'Weekly': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'Educational': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Community Events</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Join tournaments, workshops, and community activities that combine gaming with Islamic values
        </p>
      </div>

      {/* Event Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">12</div>
          <div className="text-slate-400 text-sm">This Month</div>
        </div>
        <div className="card text-center">
          <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">1,250</div>
          <div className="text-slate-400 text-sm">Participants</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">$2,500</div>
          <div className="text-slate-400 text-sm">Total Prizes</div>
        </div>
        <div className="card text-center">
          <Star className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">4.9</div>
          <div className="text-slate-400 text-sm">Avg Rating</div>
        </div>
      </div>

      {/* Navigation and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Past Events' },
            { id: 'all', label: 'All Events' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters and Actions */}
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-field"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Featured Events */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Featured Events</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredEvents.filter(event => event.featured && event.status === 'upcoming').map(event => (
              <div key={event.id} className="card-premium relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-400/30">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{event.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{event.participants}/{event.maxParticipants}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm">{event.prize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <span className="text-slate-400 text-sm">{event.game}</span>
                    </div>
                    <button className="btn-primary">
                      Join Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Events List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          {activeTab === 'upcoming' ? 'All Upcoming Events' : 
           activeTab === 'completed' ? 'Past Events' : 'All Events'}
        </h2>
        
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <div key={event.id} className="card hover:bg-slate-800/80 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
                    </div>
                    {event.featured && (
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <MapPin className="h-4 w-4" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="text-slate-400 text-sm">{event.game}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{event.prize}</div>
                    <div className="text-slate-400 text-sm">Prize</div>
                  </div>
                  
                  {event.status === 'upcoming' ? (
                    <button className="btn-primary">
                      Join Event
                    </button>
                  ) : event.status === 'completed' && event.winner ? (
                    <div className="text-center">
                      <div className="text-sm text-slate-400">Winner:</div>
                      <div className="font-bold text-yellow-400">{event.winner}</div>
                    </div>
                  ) : (
                    <button className="btn-secondary flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">No events found</h3>
          <p className="text-slate-500">Try adjusting your filters or check back later for new events</p>
        </div>
      )}
    </div>
  )
}

export default Events
