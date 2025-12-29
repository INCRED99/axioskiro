import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEcoPoints } from '../contexts/EcoPointsContext';
import toast from 'react-hot-toast';

const Challenges = () => {
  const { user } = useAuth();
  const { addEcoPoints } = useEcoPoints();
  const [activeTab, setActiveTab] = useState('create');
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('ecolearn_challenges');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeChallenges, setActiveChallenges] = useState(() => {
    const saved = localStorage.getItem('ecolearn_active_challenges');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ecolearn_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('ecolearn_active_challenges', JSON.stringify(activeChallenges));
  }, [activeChallenges]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with animated background */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-10 animate-pulse"></div>
          <div className="relative z-10 py-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🏆 Environmental Challenges
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Challenge friends and compete in real-world environmental activities across India
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">🌱</div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-green-100">Active Challenges</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-blue-100">Participants</div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold">89</div>
            <div className="text-purple-100">Completed Today</div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold">12,450</div>
            <div className="text-orange-100">Points Earned</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              🚀 Create Challenge
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              ⚡ Active Challenges
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-purple-600 hover:bg-purple-50'
              }`}
            >
              ✅ Completed
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'create' && <CreateChallenge challenges={challenges} setChallenges={setChallenges} activeChallenges={activeChallenges} setActiveChallenges={setActiveChallenges} user={user} />}
        {activeTab === 'active' && <ActiveChallenges activeChallenges={activeChallenges} setActiveChallenges={setActiveChallenges} />}
        {activeTab === 'completed' && <CompletedChallenges />}
      </div>
    </div>
  );
};

const CreateChallenge = ({ challenges, setChallenges, activeChallenges, setActiveChallenges, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'quiz',
    reward: 50,
    deadline: '',
    category: 'general'
  });
  const [generatedCode, setGeneratedCode] = useState('');

  // Debug: Log when generatedCode changes
  useEffect(() => {
    console.log('Generated code state changed:', generatedCode);
  }, [generatedCode]);

  const challengeTypes = [
    { id: 'quiz', name: 'Quiz Challenge', icon: '🧠', color: 'blue', description: 'Challenge friends to environmental knowledge quiz' },
    { id: 'real-world', name: 'Real-world Activity', icon: '🌍', color: 'green', description: 'Time-based environmental activities' }
  ];

  const generateChallengeCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted!'); // Debug log
    console.log('Form data:', formData); // Debug log
    
    // Validate form data
    if (!formData.title.trim()) {
      toast.error('Please enter a challenge title');
      return;
    }
    
    if (!formData.deadline) {
      toast.error('Please select a deadline');
      return;
    }
    
    const challengeCode = generateChallengeCode();
    console.log('Generated code:', challengeCode); // Debug log
    
    const newChallenge = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      reward: formData.reward,
      deadline: formData.deadline,
      code: challengeCode,
      participants: [],
      checkIns: {},
      status: 'active',
      creator: user?.name || 'You',
      createdAt: new Date().toISOString()
    };
    
    console.log('New challenge:', newChallenge); // Debug log
    console.log('Setting generated code to:', challengeCode); // Debug log
    
    setChallenges(prev => [...prev, newChallenge]);
    setGeneratedCode(challengeCode);
    toast.success('Challenge created successfully!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      type: 'quiz',
      reward: 50,
      deadline: '',
      category: 'general'
    });
  };

  if (generatedCode) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Challenge Created!</h2>
          <p className="text-gray-600 mb-6">Share this code with your friends to invite them:</p>
          
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">{generatedCode}</div>
            <p className="text-sm text-gray-600">Challenge Code</p>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => navigator.clipboard.writeText(generatedCode)}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all"
            >
              📋 Copy Code
            </button>
            <button
              onClick={() => setGeneratedCode('')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all"
            >
              ➕ Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Create Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
          🚀 Create New Challenge
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter an inspiring challenge title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent h-24"
              placeholder="Describe your challenge in detail..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Challenge Type</label>
            <div className="grid grid-cols-1 gap-3">
              {challengeTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({...formData, type: type.id})}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.type === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{type.icon}</div>
                    <div className="text-left">
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Eco Points Reward</label>
              <input
                type="number"
                value={formData.reward}
                onChange={(e) => setFormData({...formData, reward: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                min="10"
                max="500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
          >
            🚀 Create Challenge & Generate Code
          </button>
        </form>
      </div>

      {/* Join Challenge */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🔗 Join a Challenge</h3>
        <JoinChallengeForm challenges={challenges} setChallenges={setChallenges} activeChallenges={activeChallenges} setActiveChallenges={setActiveChallenges} />
      </div>
    </div>
  );
};
const ActiveChallenges = ({ activeChallenges, setActiveChallenges }) => {
  const { user } = useAuth();
  const { addEcoPoints } = useEcoPoints();
  const navigate = useNavigate();

  const handleQuizChallenge = (challenge) => {
    // For quiz challenges, redirect to quiz page
    if (challenge.type === 'quiz') {
      navigate('/quiz', { 
        state: { 
          challengeId: challenge.id,
          challengeTitle: challenge.title,
          isChallenge: true 
        } 
      });
    }
  };

  const handleCompleteChallenge = (challenge) => {
    let accuracy;
    
    // Check if there's a stored challenge result from quiz
    const storedResult = localStorage.getItem('challenge_result');
    if (storedResult && challenge.type === 'quiz') {
      try {
        const result = JSON.parse(storedResult);
        if (result.challengeId === challenge.id) {
          accuracy = result.accuracy;
          // Clear the stored result after using it
          localStorage.removeItem('challenge_result');
        } else {
          // Fallback for manual completion
          accuracy = Math.floor(Math.random() * 40) + 60; // 60-100% accuracy for simulation
        }
      } catch (error) {
        accuracy = Math.floor(Math.random() * 40) + 60; // 60-100% accuracy for simulation
      }
    } else if (challenge.type === 'quiz') {
      // Manual completion fallback
      accuracy = Math.floor(Math.random() * 40) + 60; // 60-100% accuracy for simulation
    }
    
    const updatedChallenges = activeChallenges.map(c => 
      c.id === challenge.id 
        ? { 
            ...c, 
            checkIns: { 
              ...c.checkIns, 
              [user?.name || 'You']: { 
                accuracy: challenge.type === 'quiz' ? accuracy : undefined,
                timestamp: new Date().toISOString(),
                completed: true
              } 
            }
          }
        : c
    );
    
    setActiveChallenges(updatedChallenges);
    addEcoPoints(challenge.reward, `Completed challenge: ${challenge.title}`);
    
    // Check if all participants have completed
    const updatedChallenge = updatedChallenges.find(c => c.id === challenge.id);
    const totalParticipants = updatedChallenge.participants.length;
    const completedParticipants = Object.keys(updatedChallenge.checkIns).length;
    
    if (challenge.type === 'quiz') {
      toast.success(`Quiz completed with ${accuracy}% accuracy! Earned ${challenge.reward} points!`);
    } else {
      toast.success(`Challenge completed! Earned ${challenge.reward} points!`);
    }
    
    // Declare results if all completed
    if (completedParticipants === totalParticipants && totalParticipants > 1) {
      declareResults(updatedChallenge);
    }
  };

  const declareResults = (challenge) => {
    const checkIns = challenge.checkIns;
    let winner;
    
    if (challenge.type === 'quiz') {
      // For quiz: highest accuracy wins
      winner = Object.entries(checkIns).reduce((prev, current) => 
        (current[1].accuracy || 0) > (prev[1].accuracy || 0) ? current : prev
      );
      toast.success(`🏆 Challenge Results: ${winner[0]} wins with ${winner[1].accuracy}% accuracy!`, {
        duration: 5000
      });
    } else {
      // For real-world: earliest completion wins
      winner = Object.entries(checkIns).reduce((prev, current) => 
        new Date(current[1].timestamp) < new Date(prev[1].timestamp) ? current : prev
      );
      toast.success(`🏆 Challenge Results: ${winner[0]} wins by completing first!`, {
        duration: 5000
      });
    }
  };

  if (activeChallenges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Active Challenges</h3>
        <p className="text-gray-600 mb-6">Join a challenge using a friend's code to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeChallenges.map((challenge) => {
          const userCheckIn = challenge.checkIns && challenge.checkIns[user?.name || 'You'];
          const totalParticipants = challenge.participants.length;
          const completedParticipants = Object.keys(challenge.checkIns || {}).length;
          
          return (
            <div key={challenge.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                  </div>
                  <div className="text-2xl">
                    {challenge.type === 'quiz' ? '🧠' : '🌍'}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="font-semibold text-gray-800 capitalize">{challenge.type}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Reward</span>
                    <span className="font-bold text-blue-600">+{challenge.reward} points</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="font-semibold text-gray-800">{completedParticipants}/{totalParticipants} completed</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Deadline</span>
                    <span className="font-semibold text-gray-800">{new Date(challenge.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {userCheckIn ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center mb-4">
                    <span className="text-green-600 font-semibold">✅ Completed!</span>
                    {challenge.type === 'quiz' && userCheckIn.accuracy && (
                      <div className="text-sm text-green-700 mt-1">
                        Accuracy: {userCheckIn.accuracy}%
                      </div>
                    )}
                    <div className="text-xs text-green-600 mt-1">
                      Waiting for other participants...
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    {challenge.type === 'quiz' ? (
                      <button
                        onClick={() => handleQuizChallenge(challenge)}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                      >
                        🧠 Take Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleteChallenge(challenge)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                      >
                        ✅ Mark as Complete
                      </button>
                    )}
                    
                    {challenge.type === 'quiz' && (
                      <button
                        onClick={() => handleCompleteChallenge(challenge)}
                        className="w-full bg-gray-500 text-white py-2 rounded-xl font-semibold hover:bg-gray-600 transition-all text-sm"
                      >
                        📝 Submit Results Manually
                      </button>
                    )}
                  </div>
                )}

                {/* Leaderboard for this challenge */}
                {challenge.checkIns && Object.keys(challenge.checkIns).length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <h4 className="font-semibold text-gray-700 mb-2">🏆 Participants</h4>
                    <div className="space-y-1">
                      {Object.entries(challenge.checkIns)
                        .sort((a, b) => {
                          if (challenge.type === 'quiz') {
                            return (b[1].accuracy || 0) - (a[1].accuracy || 0);
                          } else {
                            return new Date(a[1].timestamp) - new Date(b[1].timestamp);
                          }
                        })
                        .map(([name, data], index) => (
                          <div key={name} className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <span className="mr-2">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '✅'}
                              </span>
                              {name}
                            </span>
                            <span className="font-semibold">
                              {challenge.type === 'quiz' && data.accuracy ? `${data.accuracy}%` : '✅'}
                            </span>
                          </div>
                        ))}
                    </div>
                    
                    {/* Show results if all completed */}
                    {completedParticipants === totalParticipants && totalParticipants > 1 && (
                      <div className="mt-3 p-2 bg-yellow-100 rounded-lg">
                        <div className="text-center text-sm font-semibold text-yellow-800">
                          🏆 Challenge Complete! Check notifications for results.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChallengeCard = ({ challenge }) => {
  const [joined, setJoined] = useState(false);
  const { addEcoPoints } = useEcoPoints();

  const handleJoin = () => {
    setJoined(true);
    addEcoPoints(5, 'Joined a challenge'); // Bonus points for joining a challenge
  };

  const getTypeColor = (type) => {
    const colors = {
      'real-world': 'green',
      'lifestyle': 'blue',
      'awareness': 'purple',
      'research': 'orange'
    };
    return colors[type] || 'gray';
  };

  const color = getTypeColor(challenge.type);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Participants</span>
            <span className="font-semibold text-gray-800">{challenge.participants}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Reward</span>
            <span className="font-bold text-blue-600">+{challenge.reward} points</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Deadline</span>
            <span className="font-semibold text-gray-800">{new Date(challenge.deadline).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Created by</span>
            <span className="font-semibold text-gray-800">{challenge.creator}</span>
          </div>
        </div>

        <div className="mt-6">
          {joined ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <span className="text-green-600 font-semibold">✅ Joined! Good luck!</span>
            </div>
          ) : (
            <button
              onClick={handleJoin}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              🚀 Join Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const CompletedChallenges = () => {
  const completedChallenges = [
    {
      id: 1,
      title: "Clean Ganga Initiative",
      description: "Participated in river cleaning drive",
      pointsEarned: 150,
      completedDate: "2024-01-15",
      participants: 89,
      impact: "Cleaned 2km of riverbank"
    },
    {
      id: 2,
      title: "Solar Panel Installation",
      description: "Installed solar panels in rural schools",
      pointsEarned: 200,
      completedDate: "2024-01-10",
      participants: 45,
      impact: "5 schools now solar powered"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🏆 Completed Challenges</h2>
        <p className="text-gray-600">Celebrate your environmental achievements!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {completedChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm">{challenge.description}</p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+{challenge.pointsEarned}</div>
                <div className="text-sm text-green-700">Eco Points Earned</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Completed</span>
                <span className="font-semibold">{new Date(challenge.completedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Participants</span>
                <span className="font-semibold">{challenge.participants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Impact</span>
                <span className="font-semibold text-green-600">{challenge.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JoinChallengeForm = ({ challenges, setChallenges, activeChallenges, setActiveChallenges }) => {
  const [joinCode, setJoinCode] = useState('');
  const [joinedChallenge, setJoinedChallenge] = useState(null);
  const { user } = useAuth();
  const { addEcoPoints } = useEcoPoints();

  const handleJoinChallenge = (e) => {
    e.preventDefault();
    const challenge = challenges.find(c => c.code === joinCode.toUpperCase());
    
    if (challenge) {
      // Check if already joined
      const alreadyJoined = activeChallenges.find(c => c.id === challenge.id);
      if (alreadyJoined) {
        toast.error('You have already joined this challenge!');
        return;
      }

      // Add to active challenges
      setActiveChallenges([...activeChallenges, { ...challenge, joinedAt: new Date().toISOString() }]);
      
      // Update participants in original challenge
      const updatedChallenges = challenges.map(c => 
        c.id === challenge.id 
          ? { ...c, participants: [...(c.participants || []), user?.name || 'You'] }
          : c
      );
      setChallenges(updatedChallenges);
      
      setJoinedChallenge(challenge);
      addEcoPoints(5, 'Joined a challenge');
      toast.success(`Successfully joined "${challenge.title}"!`);
      setJoinCode('');
    } else {
      toast.error('Invalid challenge code. Please check and try again.');
    }
  };

  if (joinedChallenge) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-bold text-green-800 mb-2">🎉 Successfully Joined!</h4>
          <p className="text-green-700 mb-4">{joinedChallenge.title}</p>
          <button
            onClick={() => setJoinedChallenge(null)}
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            Join Another Challenge
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-4">📋 Challenge Details</h4>
          <div className="space-y-3">
            <div>
              <span className="text-gray-500">Type:</span>
              <span className="ml-2 font-semibold capitalize">{joinedChallenge.type}</span>
            </div>
            <div>
              <span className="text-gray-500">Deadline:</span>
              <span className="ml-2 font-semibold">{new Date(joinedChallenge.deadline).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-500">Reward:</span>
              <span className="ml-2 font-semibold text-green-600">+{joinedChallenge.reward} points</span>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <p className="text-blue-700 text-sm">
              💡 Go to "Active Challenges" tab to participate and check-in when completed!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleJoinChallenge} className="space-y-6">
      <p className="text-gray-600">
        Have a challenge code from a friend? Enter it below to join their challenge!
      </p>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Code</label>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-bold tracking-wider"
          placeholder="ABC123"
          maxLength={6}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all shadow-lg"
      >
        🔗 Join Challenge
      </button>

      <div className="bg-blue-50 rounded-xl p-4">
        <h4 className="font-bold text-blue-800 mb-2">💡 How it works:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Get a challenge code from your friend</li>
          <li>• Enter the code to join their challenge</li>
          <li>• Complete the challenge activity</li>
          <li>• Check-in to earn eco points and compete!</li>
        </ul>
      </div>
    </form>
  );
};
export default Challenges;