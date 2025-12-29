import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEcoPoints } from '../contexts/EcoPointsContext';

const SchoolDashboard = () => {
  const { user } = useAuth();
  const { leaderboard } = useEcoPoints();
  const [activeTab, setActiveTab] = useState('overview');
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Inter-School Quiz Competition",
      type: "quiz",
      status: "pending_approval",
      creator: "Green Valley School",
      participants: 5,
      deadline: "2024-02-15",
      reward: 100
    },
    {
      id: 2,
      title: "Tree Plantation Challenge",
      type: "activity",
      status: "active",
      creator: user?.name || "Your School",
      participants: 12,
      deadline: "2024-02-20",
      reward: 150
    }
  ]);

  // Calculate real stats from actual data
  const schoolLeaderboard = leaderboard.filter(student => 
    student.school === user?.school || student.school === user?.name
  );
  
  const totalStudents = schoolLeaderboard.length || 0;
  const totalEcoPoints = schoolLeaderboard.reduce((sum, student) => sum + (student.ecoPoints || 0), 0);
  const activeChallenges = challenges.filter(c => c.status === 'active').length;
  const pendingApprovals = challenges.filter(c => c.status === 'pending_approval').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-10 animate-pulse"></div>
          <div className="relative z-10 py-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🏫 School Dashboard
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Welcome {user?.name} - Manage your school's environmental challenges and track performance
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <div className="text-green-100">Registered Students</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">🌱</div>
            <div className="text-2xl font-bold">{totalEcoPoints}</div>
            <div className="text-blue-100">Total Eco Points</div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold">{activeChallenges}</div>
            <div className="text-purple-100">Active Challenges</div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-2xl font-bold">{pendingApprovals}</div>
            <div className="text-orange-100">Pending Approvals</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              📊 Performance Overview
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'challenges'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              🎯 Organize Challenges
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'approvals'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-purple-600 hover:bg-purple-50'
              }`}
            >
              ✅ Approve Challenges
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'leaderboard'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                  : 'text-orange-600 hover:bg-orange-50'
              }`}
            >
              🏆 Leaderboard
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && <PerformanceOverview schoolLeaderboard={schoolLeaderboard} totalEcoPoints={totalEcoPoints} />}
        {activeTab === 'challenges' && <OrganizeChallenges challenges={challenges} setChallenges={setChallenges} />}
        {activeTab === 'approvals' && <ApproveChallenges challenges={challenges} setChallenges={setChallenges} />}
        {activeTab === 'leaderboard' && <SchoolLeaderboard schoolLeaderboard={schoolLeaderboard} />}
      </div>
    </div>
  );
};

const PerformanceOverview = ({ schoolLeaderboard, totalEcoPoints }) => {
  const averagePoints = schoolLeaderboard.length > 0 ? Math.round(totalEcoPoints / schoolLeaderboard.length) : 0;
  const topPerformer = schoolLeaderboard.length > 0 ? schoolLeaderboard[0] : null;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📈 School Performance</h3>
        <div className="space-y-6">
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-green-800">Student Engagement</h4>
              <span className="text-2xl">📚</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{schoolLeaderboard.length}</div>
            <div className="text-green-700">Students actively participating in environmental activities</div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-blue-800">Average Performance</h4>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{averagePoints}</div>
            <div className="text-blue-700">Average eco points per student</div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-purple-800">Environmental Impact</h4>
              <span className="text-2xl">🌱</span>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">{totalEcoPoints}</div>
            <div className="text-purple-700">Total eco points earned by school</div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🏆 Top Performers</h3>
        {schoolLeaderboard.length > 0 ? (
          <div className="space-y-4">
            {schoolLeaderboard.slice(0, 5).map((student, index) => (
              <div key={student.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.ecoPoints} eco points</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600">No students registered yet. Encourage your students to join EcoLearn India!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const OrganizeChallenges = ({ challenges, setChallenges }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'quiz',
    deadline: '',
    reward: 100
  });

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    const newChallenge = {
      id: challenges.length + 1,
      ...formData,
      status: 'active',
      creator: 'Your School',
      participants: 0,
      code: Math.random().toString(36).substring(2, 8).toUpperCase()
    };
    setChallenges([...challenges, newChallenge]);
    setFormData({ title: '', type: 'quiz', deadline: '', reward: 100 });
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">🎯 Organize School Challenges</h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
        >
          {showCreateForm ? '❌ Cancel' : '➕ Create Challenge'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h4 className="text-xl font-bold text-gray-800 mb-6">Create New Challenge</h4>
          <form onSubmit={handleCreateChallenge} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="Enter challenge title..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Challenge Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              >
                <option value="quiz">Quiz Competition</option>
                <option value="game">Game Challenge</option>
                <option value="activity">Environmental Activity</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reward Points</label>
                <input
                  type="number"
                  value={formData.reward}
                  onChange={(e) => setFormData({...formData, reward: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  min="50"
                  max="500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
            >
              🚀 Create Challenge
            </button>
          </form>
        </div>
      )}

      {/* Active Challenges */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h4 className="text-xl font-bold text-gray-800 mb-6">Your School's Challenges</h4>
        <div className="space-y-4">
          {challenges.filter(c => c.creator === 'Your School' || c.creator === 'Green Valley School').map((challenge) => (
            <div key={challenge.id} className="p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-gray-800">{challenge.title}</h5>
                  <p className="text-sm text-gray-600">
                    Type: {challenge.type} • Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">+{challenge.reward} points</div>
                  <div className="text-sm text-gray-500">{challenge.participants} participants</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ApproveChallenges = ({ challenges, setChallenges }) => {
  const pendingChallenges = challenges.filter(c => c.status === 'pending_approval');

  const handleApprove = (challengeId) => {
    setChallenges(challenges.map(c => 
      c.id === challengeId ? { ...c, status: 'active' } : c
    ));
  };

  const handleReject = (challengeId) => {
    setChallenges(challenges.filter(c => c.id !== challengeId));
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-800">✅ Approve Challenge Requests</h3>
      
      {pendingChallenges.length > 0 ? (
        <div className="space-y-6">
          {pendingChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h4>
                  <p className="text-gray-600 mb-4">Requested by: {challenge.creator}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-semibold capitalize">{challenge.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Deadline:</span>
                      <span className="ml-2 font-semibold">{new Date(challenge.deadline).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Reward:</span>
                      <span className="ml-2 font-semibold text-green-600">+{challenge.reward} points</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Participants:</span>
                      <span className="ml-2 font-semibold">{challenge.participants}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApprove(challenge.id)}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReject(challenge.id)}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">No Pending Approvals</h4>
          <p className="text-gray-600">All challenge requests have been reviewed.</p>
        </div>
      )}
    </div>
  );
};

const SchoolLeaderboard = ({ schoolLeaderboard }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">🏆 School Leaderboard</h3>
      
      {schoolLeaderboard.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Rank</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Student</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Eco Points</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {schoolLeaderboard.map((student, index) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-semibold text-gray-800">{student.name}</div>
                        <div className="text-sm text-gray-500">Student</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-green-600">{student.ecoPoints}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">No Students Yet</h4>
          <p className="text-gray-600">Encourage your students to register and start earning eco points!</p>
        </div>
      )}
    </div>
  );
};

export default SchoolDashboard;