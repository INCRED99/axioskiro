import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { EcoPointsProvider } from './contexts/EcoPointsContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Learning from './pages/Learning'
import Games from './pages/Games'
import Quiz from './pages/Quiz'
import Challenges from './pages/Challenges'
import Leaderboard from './pages/Leaderboard'
import Participate from './pages/Participate'
import Login from './pages/Login'
import Register from './pages/Register'
import SchoolDashboard from './pages/SchoolDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <EcoPointsProvider>
        <Router future={{ v7_relativeSplatPath: true }}>
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/learning" element={
                <ProtectedRoute>
                  <Learning />
                </ProtectedRoute>
              } />
              <Route path="/games" element={
                <ProtectedRoute>
                  <Games />
                </ProtectedRoute>
              } />
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } />
              <Route path="/challenges" element={
                <ProtectedRoute>
                  <Challenges />
                </ProtectedRoute>
              } />
              <Route path="/leaderboard" element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } />
              <Route path="/participate" element={
                <ProtectedRoute>
                  <Participate />
                </ProtectedRoute>
              } />
              <Route path="/school-dashboard" element={
                <ProtectedRoute>
                  <SchoolDashboard />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </EcoPointsProvider>
    </AuthProvider>
  )
}

export default App