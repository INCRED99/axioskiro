import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Medal, 
  Award, 
  Crown, 
  Users,
  School,
  User,
  Star,
  Leaf,
  Target
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useEcoPoints } from '../contexts/EcoPointsContext'

const Leaderboard = () => {
  const { user } = useAuth()
  const { leaderboard, schoolLeaderboard, getUserRank } = useEcoPoints()
  const [activeTab, setActiveTab] = useState('individual')
  const [timeFilter, setTimeFilter] = useState('all-time')

  const userRank = getUserRank()

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
    return 'bg-white border border-gray-200'
  }

  const getAchievementColor = (achievement) => {
    const colors = {
      'Top Recycler': 'bg-green-100 text-green-700',
      'Carbon Neutral': 'bg-blue-100 text-blue-700',
      'Water Saver': 'bg-cyan-100 text-cyan-700',
      'Green Campus': 'bg-emerald-100 text-emerald-700',
      'Solar Pioneer': 'bg-yellow-100 text-yellow-700',
      'Waste Warrior': 'bg-purple-100 text-purple-700',
      'Biodiversity Champion': 'bg-green-100 text-green-700',
      'Clean Air Advocate': 'bg-blue-100 text-blue-700'
    }
    return colors[achievement] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            EcoLearn Leaderboard
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how you rank among India's eco-warriors
          </motion.p>
        </div>

        {/* User Stats Card */}
        {user && (
          <motion.div 
            className="card bg-gradient-to-r from-green-500 to-blue-500 text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-4 border-white/30"
                />
                <div>
                  <h3 className="text-2xl font-bold">{user.name}</h3>
                  <p className="text-green-100">{user.school || 'Individual Learner'}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{user.ecoPoints || 0}</div>
                <div className="text-green-100">Eco Points</div>
                {userRank && (
                  <div className="text-yellow-300 font-semibold">Rank #{userRank}</div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'individual'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Individual
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'schools'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <School className="h-4 w-4 inline mr-2" />
              Schools
            </button>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {['all-time', 'monthly', 'weekly'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeFilter === filter
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {filter === 'all-time' ? 'All Time' : filter === 'monthly' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'individual' ? (
          /* Individual Leaderboard */
          leaderboard.length === 0 ? (
            /* Empty State */
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white rounded-xl p-12 shadow-lg max-w-2xl mx-auto">
                <div className="mb-8">
                  <Crown className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Be the First Champion!</h3>
                  <p className="text-xl text-gray-600 mb-8">
                    The leaderboard is waiting for its first eco-warrior. Start your journey and claim the top spot!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Take Quizzes</h4>
                    <p className="text-sm text-gray-600">Earn 5-10 points per quiz</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Play Games</h4>
                    <p className="text-sm text-gray-600">Get 8 points per game</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Leaf className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Learn & Participate</h4>
                    <p className="text-sm text-gray-600">Earn up to 20 points</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  {user?.userType !== 'school' && (
                    <>
                      <button 
                        onClick={() => window.location.href = '/quiz'}
                        className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                      >
                        Start with a Quiz
                      </button>
                      <button 
                        onClick={() => window.location.href = '/games'}
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                      >
                        Play Games
                      </button>
                    </>
                  )}
                  {user?.userType === 'school' && (
                    <button 
                      onClick={() => window.location.href = '/challenges'}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                    >
                      Create Challenges
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Top 3 Podium */}
            <div className="lg:col-span-3">
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-lg mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Eco Warriors</h3>
                
                {leaderboard.length >= 3 && (
                  <div className="flex items-end justify-center space-x-4 mb-8">
                    {/* Second Place */}
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <div className="bg-gradient-to-t from-gray-300 to-gray-500 rounded-t-lg p-4 h-24 flex items-end justify-center">
                        <Medal className="h-8 w-8 text-white" />
                      </div>
                      <div className="bg-white p-4 rounded-b-lg border-2 border-gray-300">
                        <img
                          src={leaderboard[1].avatar}
                          alt={leaderboard[1].name}
                          className="w-12 h-12 rounded-full mx-auto mb-2"
                        />
                        <div className="font-bold text-sm">{leaderboard[1].name}</div>
                        <div className="text-xs text-gray-600">{leaderboard[1].school}</div>
                        <div className="text-lg font-bold text-gray-700">{leaderboard[1].ecoPoints}</div>
                      </div>
                    </motion.div>

                    {/* First Place */}
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <div className="bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-t-lg p-4 h-32 flex items-end justify-center">
                        <Crown className="h-10 w-10 text-white" />
                      </div>
                      <div className="bg-white p-4 rounded-b-lg border-2 border-yellow-400">
                        <img
                          src={leaderboard[0].avatar}
                          alt={leaderboard[0].name}
                          className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-yellow-400"
                        />
                        <div className="font-bold">{leaderboard[0].name}</div>
                        <div className="text-sm text-gray-600">{leaderboard[0].school}</div>
                        <div className="text-xl font-bold text-yellow-600">{leaderboard[0].ecoPoints}</div>
                      </div>
                    </motion.div>

                    {/* Third Place */}
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <div className="bg-gradient-to-t from-orange-400 to-orange-600 rounded-t-lg p-4 h-20 flex items-end justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="bg-white p-4 rounded-b-lg border-2 border-orange-400">
                        <img
                          src={leaderboard[2].avatar}
                          alt={leaderboard[2].name}
                          className="w-10 h-10 rounded-full mx-auto mb-2"
                        />
                        <div className="font-bold text-sm">{leaderboard[2].name}</div>
                        <div className="text-xs text-gray-600">{leaderboard[2].school}</div>
                        <div className="text-lg font-bold text-orange-600">{leaderboard[2].ecoPoints}</div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Full Leaderboard */}
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <motion.div
                      key={player.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        user && player.id === user.id
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadge(index + 1)}`}>
                          {getRankIcon(index + 1)}
                        </div>
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{player.name}</div>
                          <div className="text-sm text-gray-600">{player.school}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">{player.ecoPoints}</div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <motion.div 
                className="card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h4 className="font-bold text-gray-900 mb-4">Leaderboard Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Players</span>
                    <span className="font-semibold">{leaderboard.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Points</span>
                    <span className="font-semibold">
                      {Math.round(leaderboard.reduce((acc, p) => acc + p.ecoPoints, 0) / leaderboard.length)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top Score</span>
                    <span className="font-semibold text-green-600">
                      {leaderboard[0]?.ecoPoints || 0}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h4 className="font-bold text-gray-900 mb-4">Achievements</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>Top 10 Player</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Leaf className="h-4 w-4 text-green-500 mr-2" />
                    <span>Eco Warrior</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="h-4 w-4 text-blue-500 mr-2" />
                    <span>Quiz Master</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          )
        ) : (
          /* School Leaderboard */
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Schools</h3>
            
            {schoolLeaderboard.length === 0 ? (
              <div className="text-center py-12">
                <School className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-4">No Schools Registered Yet</h4>
                <p className="text-gray-600 mb-6">
                  Schools can register to compete and track their students' environmental learning progress.
                </p>
                <button 
                  onClick={() => window.location.href = '/register'}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                >
                  Register Your School
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {schoolLeaderboard.map((school, index) => (
                  <motion.div
                    key={school.id}
                    className={`flex items-center justify-between p-6 rounded-lg transition-all duration-300 ${
                      user && school.id === user.id
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(index + 1)}`}>
                        {getRankIcon(index + 1)}
                      </div>
                      <img
                        src={school.avatar}
                        alt={school.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{school.name}</h4>
                        <p className="text-gray-600">Educational Institution</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">
                            <Users className="h-4 w-4 inline mr-1" />
                            {school.studentCount || 0} students
                          </span>
                          {school.studentCount > 0 && (
                            <span className="text-sm text-gray-500">
                              Avg: {Math.round(school.ecoPoints / school.studentCount)} pts/student
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{school.ecoPoints}</div>
                      <div className="text-sm text-gray-500">total points</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="mt-12 card bg-gradient-to-r from-green-500 to-blue-500 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold mb-4">Climb the Leaderboard!</h3>
          <p className="text-green-100 mb-6">
            Complete quizzes, play games, and participate in challenges to earn more eco points and improve your ranking.
          </p>
          <div className="flex justify-center space-x-4">
            {user?.userType !== 'school' && (
              <>
                <button 
                  onClick={() => window.location.href = '/quiz'}
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Take a Quiz
                </button>
                <button 
                  onClick={() => window.location.href = '/games'}
                  className="bg-white/20 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors duration-300"
                >
                  Play Games
                </button>
              </>
            )}
            {user?.userType === 'school' && (
              <button 
                onClick={() => window.location.href = '/challenges'}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Manage Challenges
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Leaderboard