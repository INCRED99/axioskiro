import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const EcoPointsContext = createContext()

export const useEcoPoints = () => {
  const context = useContext(EcoPointsContext)
  if (!context) {
    throw new Error('useEcoPoints must be used within an EcoPointsProvider')
  }
  return context
}

export const EcoPointsProvider = ({ children }) => {
  const { user, updateUser } = useAuth()
  const [leaderboard, setLeaderboard] = useState([])
  const [schoolLeaderboard, setSchoolLeaderboard] = useState([])

  useEffect(() => {
    // Load separate leaderboards from localStorage
    const savedLeaderboard = localStorage.getItem('ecolearn_student_leaderboard')
    
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard))
    } else {
      setLeaderboard([])
    }
    
    // Always recalculate school leaderboard based on current student points
    updateSchoolLeaderboard()
  }, [])

  const updateSchoolLeaderboard = () => {
    const allUsers = JSON.parse(localStorage.getItem('ecolearn_users') || '[]')
    const schools = allUsers.filter(user => user.userType === 'school')
    const students = allUsers.filter(user => user.userType === 'student')
    
    const schoolsWithStudentPoints = schools.map(school => {
      // Find all students belonging to this school
      const schoolStudents = students.filter(student => student.school === school.name)
      
      // Calculate total eco-points from all students
      const totalStudentPoints = schoolStudents.reduce((total, student) => {
        return total + (student.ecoPoints || 0)
      }, 0)
      
      return {
        id: school.id,
        name: school.name,
        school: school.name,
        ecoPoints: totalStudentPoints, // Use student points total
        avatar: school.avatar,
        userType: 'school',
        students: schoolStudents,
        studentCount: schoolStudents.length
      }
    }).sort((a, b) => b.ecoPoints - a.ecoPoints) // Sort by total student points
    
    setSchoolLeaderboard(schoolsWithStudentPoints)
    localStorage.setItem('ecolearn_school_leaderboard', JSON.stringify(schoolsWithStudentPoints))
  }

  const addEcoPoints = (points, reason) => {
    if (!user) return

    const newPoints = (user.ecoPoints || 0) + points
    updateUser({ ecoPoints: newPoints })

    // Update appropriate leaderboard based on user type
    if (user.userType === 'school') {
      // Schools don't earn points directly, but we still update their data
      // School rankings are based on student points, so no leaderboard update needed here
    } else {
      // Update student leaderboard
      const updatedLeaderboard = leaderboard.map(entry => 
        entry.id === user.id 
          ? { ...entry, ecoPoints: newPoints }
          : entry
      )

      // If user not in leaderboard, add them
      if (!updatedLeaderboard.find(entry => entry.id === user.id)) {
        updatedLeaderboard.push({
          id: user.id,
          name: user.name,
          school: user.school || 'Individual',
          ecoPoints: newPoints,
          avatar: user.avatar,
          userType: user.userType || 'student'
        })
      }

      // Sort by points
      updatedLeaderboard.sort((a, b) => b.ecoPoints - a.ecoPoints)
      setLeaderboard(updatedLeaderboard)
      localStorage.setItem('ecolearn_student_leaderboard', JSON.stringify(updatedLeaderboard))
      
      // Recalculate school leaderboard since student points changed
      updateSchoolLeaderboard()
    }

    toast.success(`+${points} Eco Points! ${reason}`, {
      icon: '🌱',
      duration: 3000
    })
  }

  const getEcoPointsBreakdown = () => {
    return {
      login: 1,
      quizComplete: 5,
      perfectQuiz: 10,
      challengeWin: 15,
      gameComplete: 8,
      learningModule: 3,
      participation: 20
    }
  }

  const getUserRank = () => {
    if (!user) return null
    
    // Get rank from appropriate leaderboard
    const targetLeaderboard = user.userType === 'school' ? schoolLeaderboard : leaderboard
    const userIndex = targetLeaderboard.findIndex(entry => entry.id === user.id)
    return userIndex !== -1 ? userIndex + 1 : null
  }

  const value = {
    addEcoPoints,
    leaderboard,
    schoolLeaderboard,
    getEcoPointsBreakdown,
    getUserRank,
    updateSchoolLeaderboard
  }

  return (
    <EcoPointsContext.Provider value={value}>
      {children}
    </EcoPointsContext.Provider>
  )
}