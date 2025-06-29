import React, { useState } from 'react'
import { BookOpen, Play, Download, Heart, Share2, Clock, User, Star, Filter, Search } from 'lucide-react'

const IslamicContent = () => {
  const [activeTab, setActiveTab] = useState('articles')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const content = {
    articles: [
      {
        id: 1,
        title: 'Gaming and Islamic Ethics: Finding Balance',
        excerpt: 'Exploring how to maintain Islamic values while enjoying modern gaming',
        author: 'Sheikh Ahmad Al-Ghadeer',
        readTime: '8 min read',
        category: 'Ethics',
        date: '2024-02-15',
        likes: 245,
        featured: true
      },
      {
        id: 2,
        title: 'The Importance of Prayer Times in Gaming',
        excerpt: 'How to structure gaming sessions around the five daily prayers',
        author: 'Imam Hassan Al-Karbalai',
        readTime: '5 min read',
        category: 'Worship',
        date: '2024-02-10',
        likes: 189,
        featured: false
      },
      {
        id: 3,
        title: 'Building Character Through Competitive Gaming',
        excerpt: 'Lessons from Islamic teachings on sportsmanship and fair play',
        author: 'Dr. Fatima Al-Zahra',
        readTime: '12 min read',
        category: 'Character',
        date: '2024-02-08',
        likes: 156,
        featured: true
      },
      {
        id: 4,
        title: 'Community and Brotherhood in Online Gaming',
        excerpt: 'Creating meaningful connections with fellow Muslim gamers',
        author: 'Ustadh Ali Al-Najafi',
        readTime: '7 min read',
        category: 'Community',
        date: '2024-02-05',
        likes: 203,
        featured: false
      }
    ],
    videos: [
      {
        id: 1,
        title: 'Islamic Gaming Guidelines - Complete Guide',
        description: 'Comprehensive video on maintaining Islamic values while gaming',
        duration: '25:30',
        speaker: 'Sheikh Ahmad Al-Ghadeer',
        category: 'Guidelines',
        date: '2024-02-12',
        views: 12500,
        featured: true
      },
      {
        id: 2,
        title: 'Balancing Gaming and Religious Duties',
        description: 'Practical tips for managing time between gaming and worship',
        duration: '18:45',
        speaker: 'Imam Hassan Al-Karbalai',
        category: 'Time Management',
        date: '2024-02-08',
        views: 8900,
        featured: false
      },
      {
        id: 3,
        title: 'Building Islamic Character in Competitive Gaming',
        description: 'How to maintain good character and ethics in competitive environments',
        duration: '22:15',
        speaker: 'Dr. Fatima Al-Zahra',
        category: 'Character',
        date: '2024-02-01',
        views: 6700,
        featured: true
      }
    ],
    resources: [
      {
        id: 1,
        title: 'Islamic Gaming Code of Conduct',
        description: 'Downloadable guide for Islamic gaming principles',
        type: 'PDF',
        size: '2.5 MB',
        category: 'Guidelines',
        downloads: 1250,
        featured: true
      },
      {
        id: 2,
        title: 'Prayer Time Gaming Schedule Template',
        description: 'Customizable schedule to balance gaming with prayer times',
        type: 'PDF',
        size: '1.2 MB',
        category: 'Tools',
        downloads: 890,
        featured: false
      },
      {
        id: 3,
        title: 'Islamic Gaming Community Charter',
        description: 'Community guidelines and principles for Islamic gaming groups',
        type: 'PDF',
        size: '3.1 MB',
        category: 'Community',
        downloads: 567,
        featured: false
      }
    ]
  }

  const categories = {
    articles: ['all', 'Ethics', 'Worship', 'Character', 'Community'],
    videos: ['all', 'Guidelines', 'Time Management', 'Character'],
    resources: ['all', 'Guidelines', 'Tools', 'Community']
  }

  const filteredContent = content[activeTab].filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category) => {
    const colors = {
      'Ethics': 'text-blue-400 bg-blue-400/20 border-blue-400/30',
      'Worship': 'text-green-400 bg-green-400/20 border-green-400/30',
      'Character': 'text-purple-400 bg-purple-400/20 border-purple-400/30',
      'Community': 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30',
      'Guidelines': 'text-red-400 bg-red-400/20 border-red-400/30',
      'Time Management': 'text-cyan-400 bg-cyan-400/20 border-cyan-400/30',
      'Tools': 'text-orange-400 bg-orange-400/20 border-orange-400/30'
    }
    return colors[category] || 'text-slate-400 bg-slate-400/20 border-slate-400/30'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Islamic Gaming Content</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Educational resources, articles, and videos to help you balance gaming with Islamic values and principles
        </p>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <BookOpen className="h-8 w-8 text-primary-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{content.articles.length}</div>
          <div className="text-slate-400 text-sm">Articles</div>
        </div>
        <div className="card text-center">
          <Play className="h-8 w-8 text-red-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{content.videos.length}</div>
          <div className="text-slate-400 text-sm">Videos</div>
        </div>
        <div className="card text-center">
          <Download className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{content.resources.length}</div>
          <div className="text-slate-400 text-sm">Resources</div>
        </div>
        <div className="card text-center">
          <Heart className="h-8 w-8 text-pink-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">2.5K</div>
          <div className="text-slate-400 text-sm">Total Likes</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
        {[
          { id: 'articles', label: 'Articles', icon: BookOpen },
          { id: 'videos', label: 'Videos', icon: Play },
          { id: 'resources', label: 'Resources', icon: Download }
        ].map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSelectedCategory('all')
                setSearchTerm('')
              }}
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

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select-field"
        >
          {categories[activeTab].map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Content */}
      {filteredContent.some(item => item.featured) && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Featured {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredContent.filter(item => item.featured).map(item => (
              <div key={item.id} className="card-premium relative">
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-400/30">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 leading-relaxed">
                      {item.excerpt || item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-slate-400">
                      {activeTab === 'articles' && (
                        <>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{item.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{item.readTime}</span>
                          </div>
                        </>
                      )}
                      {activeTab === 'videos' && (
                        <>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{item.speaker}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{item.duration}</span>
                          </div>
                        </>
                      )}
                      {activeTab === 'resources' && (
                        <>
                          <span>{item.type}</span>
                          <span>{item.size}</span>
                        </>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex items-center space-x-4 text-slate-400">
                      {activeTab === 'articles' && (
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{item.likes}</span>
                        </div>
                      )}
                      {activeTab === 'videos' && (
                        <div className="flex items-center space-x-1">
                          <Play className="h-4 w-4" />
                          <span>{item.views.toLocaleString()} views</span>
                        </div>
                      )}
                      {activeTab === 'resources' && (
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{item.downloads} downloads</span>
                        </div>
                      )}
                    </div>
                    <button className="btn-primary">
                      {activeTab === 'articles' ? 'Read Article' :
                       activeTab === 'videos' ? 'Watch Video' : 'Download'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Content */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        
        <div className="space-y-4">
          {filteredContent.map(item => (
            <div key={item.id} className="card hover:bg-slate-800/80 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.excerpt || item.description}
                      </p>
                    </div>
                    {item.featured && (
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    {activeTab === 'articles' && (
                      <>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{item.likes} likes</span>
                        </div>
                      </>
                    )}
                    {activeTab === 'videos' && (
                      <>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{item.speaker}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Play className="h-4 w-4" />
                          <span>{item.views.toLocaleString()} views</span>
                        </div>
                      </>
                    )}
                    {activeTab === 'resources' && (
                      <>
                        <span>{item.type} • {item.size}</span>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{item.downloads} downloads</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-slate-400 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="btn-secondary flex items-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button className="btn-primary">
                    {activeTab === 'articles' ? 'Read' :
                     activeTab === 'videos' ? 'Watch' : 'Download'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">No content found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default IslamicContent
