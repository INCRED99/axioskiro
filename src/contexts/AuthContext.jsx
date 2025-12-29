import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export { AuthContext }

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('ecolearn_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('ecolearn_user');
      }
    }
    setLoading(false);
  }, [])

  const login = async (email, password) => {
    try {
      // Check if user already exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('ecolearn_users') || '[]');
      const existingUser = existingUsers.find(u => u.email === email);
      
      if (existingUser && existingUser.password === password) {
        // User exists, log them in with their current eco points
        setUser(existingUser);
        localStorage.setItem('ecolearn_user', JSON.stringify(existingUser));
        toast.success(`Welcome back, ${existingUser.name}! You have ${existingUser.ecoPoints || 0} eco points.`);
        return existingUser;
      } else if (existingUser) {
        // User exists but wrong password
        toast.error('Invalid password');
        throw new Error('Invalid password');
      } else {
        // User doesn't exist
        toast.error('User not found. Please register first.');
        throw new Error('User not found');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('ecolearn_users') || '[]');
      const existingUser = existingUsers.find(u => u.email === userData.email);
      
      if (existingUser) {
        toast.error('User already exists. Please login instead.');
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        userType: userData.type,
        school: userData.school || userData.name, // For schools, use name as school
        grade: userData.grade,
        ecoPoints: userData.type === 'school' ? 10 : 1, // Schools start with 10 points
        students: userData.type === 'school' ? [] : undefined,
        joinDate: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=10b981&textColor=ffffff` // Single icon for all users
      };

      // If it's a student, add them to their school's student list
      let updatedUsers = [...existingUsers, newUser];
      if (userData.type === 'student' && userData.school) {
        updatedUsers = updatedUsers.map(user => {
          if (user.userType === 'school' && user.name === userData.school) {
            return {
              ...user,
              students: [...(user.students || []), {
                id: newUser.id,
                name: newUser.name,
                grade: newUser.grade,
                ecoPoints: newUser.ecoPoints,
                joinDate: newUser.joinDate
              }]
            };
          }
          return user;
        });
      }

      // Save to users list
      localStorage.setItem('ecolearn_users', JSON.stringify(updatedUsers));
      
      // If it's a school, add to school leaderboard
      if (userData.type === 'school') {
        const savedSchoolLeaderboard = JSON.parse(localStorage.getItem('ecolearn_school_leaderboard') || '[]');
        const schoolEntry = {
          id: newUser.id,
          name: newUser.name,
          school: newUser.name,
          ecoPoints: newUser.ecoPoints,
          avatar: newUser.avatar,
          userType: 'school',
          students: []
        };
        
        const updatedSchoolLeaderboard = [...savedSchoolLeaderboard, schoolEntry]
          .sort((a, b) => b.ecoPoints - a.ecoPoints);
        
        localStorage.setItem('ecolearn_school_leaderboard', JSON.stringify(updatedSchoolLeaderboard));
      }
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('ecolearn_user', JSON.stringify(newUser));
      
      toast.success(`Welcome to EcoLearn India, ${newUser.name}! You earned ${newUser.ecoPoints} eco point${newUser.ecoPoints > 1 ? 's' : ''} for joining!`);
      return newUser;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ecolearn_user')
    toast.success('Logged out successfully!')
  }

  const clearAllData = () => {
    // Clear all localStorage data for fresh start
    localStorage.removeItem('ecolearn_user');
    localStorage.removeItem('ecolearn_users');
    localStorage.removeItem('ecolearn_challenges');
    localStorage.removeItem('ecolearn_active_challenges');
    localStorage.removeItem('ecolearn_completed_modules');
    localStorage.removeItem('ecolearn_leaderboard');
    setUser(null);
    toast.success('All data cleared! Starting fresh.');
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('ecolearn_user', JSON.stringify(updatedUser))
    
    // Also update the user in the users list
    const existingUsers = JSON.parse(localStorage.getItem('ecolearn_users') || '[]');
    const updatedUsers = existingUsers.map(u => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('ecolearn_users', JSON.stringify(updatedUsers));
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    clearAllData,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}