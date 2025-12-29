import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEcoPoints } from '../contexts/EcoPointsContext';

const Participate = () => {
  const { user } = useAuth();
  const { addEcoPoints } = useEcoPoints();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-10 animate-pulse"></div>
          <div className="relative z-10 py-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🤝 Participate & Contribute
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join hands with leading NGOs across India to make a real difference in climate action and environmental conservation
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">🌱</div>
            <div className="text-2xl font-bold">50,000+</div>
            <div className="text-green-100">Trees Planted</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold">15,000+</div>
            <div className="text-blue-100">Active Members</div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">🏫</div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-purple-100">Schools Involved</div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold">₹2.5Cr+</div>
            <div className="text-orange-100">Funds Raised</div>
          </div>
        </div>

        {/* Tab Navigation - Removed, only NGOs now */}
        
        {/* Content - Only NGOs */}
        <NGOsSection />
      </div>
    </div>
  );
};

const NGOsSection = () => {
  const ngos = [
    {
      id: 1,
      name: "Greenpeace India",
      description: "Leading environmental organization working on climate change, renewable energy, and forest conservation",
      focus: ["Climate Change", "Renewable Energy", "Forest Conservation"],
      location: "Pan India",
      members: "50,000+",
      established: "2001",
      website: "https://www.greenpeace.org/india/",
      donateLink: "https://www.greenpeace.org/india/act/donate/",
      volunteerLink: "https://www.greenpeace.org/india/act/volunteer/",
      logo: "🌍",
      color: "green"
    },
    {
      id: 2,
      name: "Centre for Science and Environment",
      description: "Research and advocacy organization working on sustainable development and environmental governance",
      focus: ["Water Management", "Air Pollution", "Waste Management"],
      location: "New Delhi",
      members: "25,000+",
      established: "1980",
      website: "https://www.cseindia.org/",
      donateLink: "https://www.cseindia.org/donate",
      volunteerLink: "https://www.cseindia.org/get-involved",
      logo: "🔬",
      color: "blue"
    },
    {
      id: 3,
      name: "Bhumi",
      description: "Volunteer-driven organization focusing on education and environment through community engagement",
      focus: ["Education", "Environment", "Community Development"],
      location: "Chennai, Mumbai, Bangalore",
      members: "15,000+",
      established: "2006",
      website: "https://www.bhumi.ngo/",
      donateLink: "https://www.bhumi.ngo/donate",
      volunteerLink: "https://www.bhumi.ngo/volunteer",
      logo: "🌱",
      color: "purple"
    },
    {
      id: 4,
      name: "Isha Foundation",
      description: "Spiritual and environmental organization working on soil conservation and river rejuvenation",
      focus: ["Soil Conservation", "River Rejuvenation", "Biodiversity"],
      location: "Coimbatore",
      members: "100,000+",
      established: "1992",
      website: "https://isha.sadhguru.org/",
      donateLink: "https://isha.sadhguru.org/us/en/donate",
      volunteerLink: "https://isha.sadhguru.org/us/en/volunteer",
      logo: "🕉️",
      color: "orange"
    },
    {
      id: 5,
      name: "Wildlife Trust of India",
      description: "Conservation organization dedicated to protecting India's wildlife and natural habitats",
      focus: ["Wildlife Conservation", "Habitat Protection", "Human-Wildlife Conflict"],
      location: "New Delhi",
      members: "30,000+",
      established: "1998",
      website: "https://www.wti.org.in/",
      donateLink: "https://www.wti.org.in/donate/",
      volunteerLink: "https://www.wti.org.in/get-involved/",
      logo: "🐅",
      color: "green"
    },
    {
      id: 6,
      name: "Chintan Environmental Research and Action Group",
      description: "Working on waste management, environmental justice, and sustainable livelihoods",
      focus: ["Waste Management", "Environmental Justice", "Sustainable Livelihoods"],
      location: "New Delhi",
      members: "10,000+",
      established: "1999",
      website: "https://www.chintan-india.org/",
      donateLink: "https://www.chintan-india.org/donate",
      volunteerLink: "https://www.chintan-india.org/volunteer",
      logo: "♻️",
      color: "teal"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {ngos.map((ngo) => (
        <div key={ngo.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
          
          <div className="p-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="text-4xl">{ngo.logo}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{ngo.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{ngo.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Focus Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {ngo.focus.map((area, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Location:</span>
                  <div className="font-semibold">{ngo.location}</div>
                </div>
                <div>
                  <span className="text-gray-500">Members:</span>
                  <div className="font-semibold">{ngo.members}</div>
                </div>
                <div>
                  <span className="text-gray-500">Established:</span>
                  <div className="font-semibold">{ngo.established}</div>
                </div>
                <div>
                  <span className="text-gray-500">Website:</span>
                  <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">
                    Visit Site
                  </a>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <a
                  href={ngo.volunteerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all text-center"
                >
                  🤝 Volunteer
                </a>
                <a
                  href={ngo.donateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all text-center"
                >
                  💝 Donate
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Participate;