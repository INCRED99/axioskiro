import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Gamepad2, 
  Award, 
  Users, 
  Trophy, 
  Leaf,
  Globe,
  Recycle,
  Wind,
  Sun,
  Droplets,
  TreePine,
  MessageCircle,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import NewsMarquee from '../components/NewsMarquee'
import GeminiChatbot from '../components/GeminiChatbot'

const Home = () => {
  const { user } = useAuth()
  const [showChatbot, setShowChatbot] = useState(false)

  // If user is a school, show school-specific home page
  if (user && user.userType === 'school') {
    return <SchoolHome user={user} />
  }

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Explore climate science through engaging simulations and interactive content',
      color: 'from-blue-500 to-cyan-500',
      link: '/learning'
    },
    {
      icon: Gamepad2,
      title: 'Eco Games',
      description: 'Play fun games while learning about environmental conservation',
      color: 'from-green-500 to-emerald-500',
      link: '/games'
    },
    {
      icon: Award,
      title: 'Knowledge Quiz',
      description: 'Test your environmental knowledge with adaptive quizzes',
      color: 'from-purple-500 to-pink-500',
      link: '/quiz'
    },
    {
      icon: Users,
      title: 'Challenges',
      description: 'Compete with friends in real-world environmental challenges',
      color: 'from-orange-500 to-red-500',
      link: '/challenges'
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'See how you rank among eco-warriors across India',
      color: 'from-yellow-500 to-orange-500',
      link: '/leaderboard'
    },
    {
      icon: Globe,
      title: 'Participate',
      description: 'Join real NGO initiatives and make a difference',
      color: 'from-indigo-500 to-purple-500',
      link: '/participate'
    }
  ]

  const ecoStats = [
    { icon: TreePine, label: 'Trees Planted', value: '2,50,000+', color: 'text-green-600' },
    { icon: Recycle, label: 'Waste Recycled', value: '1,20,000 kg', color: 'text-blue-600' },
    { icon: Droplets, label: 'Water Saved', value: '50,00,000 L', color: 'text-cyan-600' },
    { icon: Sun, label: 'Solar Energy', value: '10,000 kWh', color: 'text-yellow-600' }
  ]

  const floatingElements = [
    { icon: Leaf, delay: 0, duration: 4 },
    { icon: Recycle, delay: 1, duration: 5 },
    { icon: Wind, delay: 2, duration: 6 },
    { icon: Sun, delay: 3, duration: 4.5 }
  ]

  return (
    <div className="min-h-screen">
      {/* News Marquee */}
      <NewsMarquee />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className="absolute opacity-20"
              initial={{ y: 100, x: Math.random() * 100 }}
              animate={{ 
                y: -100, 
                x: Math.random() * 100,
                rotate: 360 
              }}
              transition={{ 
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              <element.icon className="h-8 w-8" />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                EcoLearn India
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-green-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Gamifying Environmental Education for a Sustainable Future
            </motion.p>

            {user && (
              <motion.div 
                className="mb-8 p-4 bg-white/20 backdrop-blur-md rounded-xl inline-block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-lg">
                  Welcome back, <span className="font-bold">{user.name}</span>! 
                </p>
                <p className="text-green-200">
                  You have <span className="font-bold text-yellow-300">{user.ecoPoints || 0}</span> Eco Points
                </p>
              </motion.div>
            )}

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {!user ? (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-4">
                    Start Learning Today
                  </Link>
                  <Link to="/login" className="btn-secondary bg-white/20 border-white text-white hover:bg-white/30 text-lg px-8 py-4">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/learning" className="btn-primary text-lg px-8 py-4">
                    Continue Learning
                  </Link>
                  <Link to="/games" className="btn-secondary bg-white/20 border-white text-white hover:bg-white/30 text-lg px-8 py-4">
                    Play Games
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Environmental Impact</h2>
            <p className="text-gray-600 text-lg">Together, we're making a difference across India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ecoStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color === 'text-green-600' ? 'from-green-100 to-green-200' : stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' : stat.color === 'text-cyan-600' ? 'from-cyan-100 to-cyan-200' : 'from-yellow-100 to-yellow-200'} mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Explore Our Platform</h2>
            <p className="text-xl text-gray-600">Discover interactive ways to learn about environmental conservation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link to={feature.link} className="block">
                  <div className="card h-full hover:shadow-2xl transition-all duration-500">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300">
                      <span>Explore Now</span>
                      <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of students across India in learning about environmental conservation through interactive games and challenges.
            </p>
            {!user && (
              <Link to="/register" className="btn-primary bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
                Get Started Today
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Floating Chatbot Button */}
      <motion.button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 chatbot-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Gemini Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">EcoLearn AI Assistant</h3>
              <button
                onClick={() => setShowChatbot(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <GeminiChatbot />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// School-specific home page component
const SchoolHome = ({ user }) => {
  const [showChatbot, setShowChatbot] = useState(false)

  const schoolFeatures = [
    {
      icon: Users,
      title: 'Organize Challenge',
      description: 'Create environmental challenges for your students and other schools',
      color: 'from-blue-500 to-cyan-500',
      link: '/challenges'
    },
    {
      icon: Award,
      title: 'Accept Challenge',
      description: 'Join challenges from other schools and compete',
      color: 'from-green-500 to-emerald-500',
      link: '/challenges'
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'View school rankings and student performance',
      color: 'from-yellow-500 to-orange-500',
      link: '/leaderboard'
    },
    {
      icon: Globe,
      title: 'Performance Overview',
      description: 'Track your school\'s environmental impact and progress',
      color: 'from-purple-500 to-pink-500',
      link: '/school-dashboard'
    }
  ]

  const schoolStats = [
    { icon: Users, label: 'Active Students', value: '250+', color: 'text-blue-600' },
    { icon: Award, label: 'Challenges Won', value: '15', color: 'text-green-600' },
    { icon: Trophy, label: 'School Rank', value: '#3', color: 'text-yellow-600' },
    { icon: Leaf, label: 'Eco Points', value: '12,500', color: 'text-purple-600' }
  ]

  return (
    <div className="min-h-screen">
      {/* News Marquee */}
      <NewsMarquee />

      {/* Hero Section for Schools */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-green-600 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {user.name}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              School Dashboard - Environmental Education Management
            </motion.p>

            <motion.div 
              className="mb-8 p-4 bg-white/20 backdrop-blur-md rounded-xl inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg">
                Total School Eco Points: <span className="font-bold text-yellow-300">{user.ecoPoints || 0}</span>
              </p>
              <p className="text-blue-200">
                Leading environmental education in your region
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/challenges" className="btn-primary text-lg px-8 py-4">
                Organize Challenge
              </Link>
              <Link to="/school-dashboard" className="btn-secondary bg-white/20 border-white text-white hover:bg-white/30 text-lg px-8 py-4">
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">School Performance</h2>
            <p className="text-gray-600 text-lg">Your school's environmental education impact</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {schoolStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' : stat.color === 'text-green-600' ? 'from-green-100 to-green-200' : stat.color === 'text-yellow-600' ? 'from-yellow-100 to-yellow-200' : 'from-purple-100 to-purple-200'} mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* School Features Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">School Management Tools</h2>
            <p className="text-xl text-gray-600">Manage your school's environmental education program</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link to={feature.link} className="block">
                  <div className="card h-full hover:shadow-2xl transition-all duration-500">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                      <span>Access Now</span>
                      <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for Schools */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Lead Environmental Education</h2>
            <p className="text-xl mb-8 text-blue-100">
              Organize challenges, track progress, and inspire your students to become environmental champions.
            </p>
            <Link to="/challenges" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Create Your First Challenge
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Floating Chatbot Button */}
      <motion.button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 chatbot-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Gemini Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">EcoLearn AI Assistant</h3>
              <button
                onClick={() => setShowChatbot(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <GeminiChatbot />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Home