import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Leaf, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Trophy, 
  Gamepad2,
  BookOpen,
  Users,
  Award
} from 'lucide-react'

const Navbar = () => {
  const { user, logout, clearAllData } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const navItems = user && user.userType === 'school' 
    ? [
        { path: '/', label: 'Home', icon: Leaf },
        { path: '/challenges', label: 'Challenges', icon: Users },
        { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { path: '/school-dashboard', label: 'Performance', icon: Award }
      ]
    : [
        { path: '/', label: 'Home', icon: Leaf },
        { path: '/learning', label: 'Learning', icon: BookOpen },
        { path: '/games', label: 'Games', icon: Gamepad2 },
        { path: '/quiz', label: 'Quiz', icon: Award },
        { path: '/challenges', label: 'Challenges', icon: Users },
        { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { path: '/participate', label: 'Participate', icon: Users }
      ]

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EcoLearn India</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === path
                    ? 'bg-green-100 text-green-700 shadow-md'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Eco Points Display */}
                <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1 rounded-full">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    {user.ecoPoints || 0} Points
                  </span>
                </div>

                {/* User Avatar */}
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border-2 border-green-200"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>

                {/* School Dashboard Link (if school user) */}
                {user.userType === 'school' && (
                  <div className="hidden sm:block text-xs text-blue-600 font-medium">
                    School Account
                  </div>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block text-sm">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-secondary text-sm px-4 py-2">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
              
              {user && (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">
                      {user.ecoPoints || 0} Eco Points
                    </span>
                  </div>
                  
                  {user.userType === 'school' && (
                    <div className="text-xs text-blue-600 font-medium px-3 py-2 bg-blue-50 rounded-lg text-center">
                      School Account
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar