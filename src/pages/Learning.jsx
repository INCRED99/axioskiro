import { useState, useEffect } from 'react';
import { useEcoPoints } from '../contexts/EcoPointsContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Learning = () => {
  const { addEcoPoints } = useEcoPoints();
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState(null);
  const [completedModules, setCompletedModules] = useState(() => {
    // Initialize with saved data if user exists
    if (user) {
      const saved = localStorage.getItem(`ecolearn_completed_modules_${user.id}`);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  // Load user-specific progress when user changes
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`ecolearn_completed_modules_${user.id}`);
      const savedModules = saved ? new Set(JSON.parse(saved)) : new Set();
      setCompletedModules(savedModules);
    } else {
      setCompletedModules(new Set());
    }
  }, [user]);

  // Save user-specific progress when completedModules changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`ecolearn_completed_modules_${user.id}`, JSON.stringify([...completedModules]));
    }
  }, [completedModules, user]);

  const modules = [
    {
      id: 1,
      title: "Climate Change Basics",
      description: "Understanding the greenhouse effect and global warming",
      icon: "🌡️",
      color: "from-red-500 to-orange-500",
      content: "climate-basics"
    },
    {
      id: 2,
      title: "Renewable Energy",
      description: "Solar, wind, and other clean energy sources",
      icon: "⚡",
      color: "from-yellow-500 to-green-500",
      content: "renewable-energy"
    },
    {
      id: 3,
      title: "Biodiversity Conservation",
      description: "Protecting ecosystems and endangered species",
      icon: "🦋",
      color: "from-green-500 to-blue-500",
      content: "biodiversity",
      externalLink: "https://www.who.int/news-room/fact-sheets/detail/biodiversity-and-health"
    },
    {
      id: 4,
      title: "Water Conservation",
      description: "Managing water resources sustainably",
      icon: "💧",
      color: "from-blue-500 to-cyan-500",
      content: "water-conservation",
      externalLink: "https://www.unwater.org/water-facts/water-scarcity"
    },
    {
      id: 5,
      title: "Waste Management",
      description: "Reduce, reuse, recycle principles",
      icon: "♻️",
      color: "from-green-500 to-teal-500",
      content: "waste-management",
      externalLink: "https://www.unep.org/resources/report/global-waste-management-outlook-2024"
    }
  ];

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.has(moduleId)) {
      setCompletedModules(new Set([...completedModules, moduleId]));
      addEcoPoints(3, 'Completed learning module');
    }
  };

  if (activeModule) {
    return (
      <ModuleContent 
        module={modules.find(m => m.id === activeModule)}
        onBack={() => setActiveModule(null)}
        onComplete={handleModuleComplete}
        isCompleted={completedModules.has(activeModule)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            📚 Environmental Learning Hub
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore interactive modules to understand climate change, sustainability, and environmental conservation
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Learning Progress</h2>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{completedModules.size}/{modules.length}</div>
              <div className="text-sm text-gray-500">Modules Completed</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedModules.size / modules.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => {
                if (module.externalLink) {
                  // Only allow completion once
                  if (!completedModules.has(module.id)) {
                    const newCompletedModules = new Set([...completedModules, module.id]);
                    setCompletedModules(newCompletedModules);
                    addEcoPoints(3, `Completed ${module.title} module`);
                    toast.success(`Module completed! You earned 3 eco points!`);
                    
                    // Force save to localStorage immediately
                    if (user) {
                      localStorage.setItem(`ecolearn_completed_modules_${user.id}`, JSON.stringify([...newCompletedModules]));
                    }
                  } else {
                    // Already completed, just show the link
                    toast.info(`You've already completed this module!`);
                  }
                  window.open(module.externalLink, '_blank');
                } else {
                  setActiveModule(module.id);
                }
              }}
            >
              <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{module.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{module.title}</h3>
                  <p className="text-gray-600">{module.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {completedModules.has(module.id) ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="font-semibold">Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <div className="w-6 h-6 border-2 border-blue-500 rounded-full"></div>
                        <span className="font-semibold">Start Learning</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">+3 points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModuleContent = ({ module, onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const getModuleContent = (contentType) => {
    switch (contentType) {
      case 'climate-basics':
        return <ClimateBasicsContent 
          currentSection={currentSection} 
          setCurrentSection={setCurrentSection}
          onReachEnd={() => setHasReachedEnd(true)}
        />;
      case 'renewable-energy':
        return <RenewableEnergyContent 
          currentSection={currentSection} 
          setCurrentSection={setCurrentSection}
          onReachEnd={() => setHasReachedEnd(true)}
        />;
      default:
        return <DefaultModuleContent 
          module={module}
          currentSection={currentSection} 
          setCurrentSection={setCurrentSection}
          onReachEnd={() => setHasReachedEnd(true)}
        />;
    }
  };

  const handleComplete = () => {
    if (hasReachedEnd && !isCompleted) {
      onComplete(module.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span className="font-semibold">Back to Modules</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{module.title}</h1>
            <p className="text-gray-600">{module.description}</p>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Module Content */}
        {getModuleContent(module.content)}

        {/* Complete Button */}
        {hasReachedEnd && (
          <div className="mt-8 text-center">
            {isCompleted ? (
              <div className="bg-green-100 border border-green-300 rounded-xl p-4">
                <span className="text-green-700 font-semibold">✅ Module Completed! You earned 3 eco points.</span>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
              >
                🎉 Complete Module & Earn 3 Points
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const ClimateBasicsContent = ({ currentSection, setCurrentSection, onReachEnd }) => {
  const [simulationStep, setSimulationStep] = useState(0);
  const [feedbackLoop, setFeedbackLoop] = useState('normal');

  const sections = [
    {
      title: "What is Climate Change?",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Climate change refers to long-term shifts in global temperatures and weather patterns. 
            While climate variations are natural, human activities since the 1800s have been the main driver of climate change.
          </p>
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 mb-3">Key Facts:</h4>
            <ul className="space-y-2 text-blue-700">
              <li>• Global temperature has risen by 1.1°C since pre-industrial times</li>
              <li>• CO2 levels are now over 410 ppm, highest in 3 million years</li>
              <li>• Arctic ice is melting at 13% per decade</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "The Greenhouse Effect Simulation",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Let's understand how greenhouse gases trap heat in our atmosphere:
          </p>
          <GreenhouseSimulation step={simulationStep} setStep={setSimulationStep} />
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSimulationStep(Math.max(0, simulationStep - 1))}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              disabled={simulationStep === 0}
            >
              Previous
            </button>
            <button
              onClick={() => setSimulationStep(Math.min(3, simulationStep + 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={simulationStep === 3}
            >
              Next
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Climate Feedback Loops",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Climate feedback loops can either amplify (positive feedback) or reduce (negative feedback) climate change effects:
          </p>
          <FeedbackLoopSimulation loop={feedbackLoop} setLoop={setFeedbackLoop} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setFeedbackLoop('ice-albedo')}
              className={`p-4 rounded-xl border-2 transition-all ${
                feedbackLoop === 'ice-albedo' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <h4 className="font-bold text-blue-800">Ice-Albedo Feedback</h4>
              <p className="text-sm text-gray-600">Melting ice reduces reflection, increases warming</p>
            </button>
            <button
              onClick={() => setFeedbackLoop('water-vapor')}
              className={`p-4 rounded-xl border-2 transition-all ${
                feedbackLoop === 'water-vapor' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <h4 className="font-bold text-blue-800">Water Vapor Feedback</h4>
              <p className="text-sm text-gray-600">More water vapor traps more heat</p>
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Solutions and Actions",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Understanding climate change is the first step. Here's what we can do:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-green-800 mb-3">Individual Actions</h4>
              <ul className="space-y-2 text-green-700">
                <li>• Use renewable energy</li>
                <li>• Reduce, reuse, recycle</li>
                <li>• Choose sustainable transport</li>
                <li>• Support eco-friendly businesses</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-blue-800 mb-3">Global Solutions</h4>
              <ul className="space-y-2 text-blue-700">
                <li>• Transition to clean energy</li>
                <li>• Protect and restore forests</li>
                <li>• Develop carbon capture technology</li>
                <li>• International cooperation</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={onReachEnd}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
            >
              🎯 I've learned about climate change!
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-700">{currentSection + 1}/{sections.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Section Content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{sections[currentSection].title}</h2>
        {sections[currentSection].content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all"
          disabled={currentSection === 0}
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
          disabled={currentSection === sections.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const GreenhouseSimulation = ({ step, setStep }) => {
  const steps = [
    {
      title: "1. Solar Radiation",
      description: "The Sun sends energy to Earth as solar radiation",
      visual: "☀️ → 🌍"
    },
    {
      title: "2. Earth Absorbs Energy",
      description: "Earth's surface absorbs solar energy and warms up",
      visual: "🌍 (warming up)"
    },
    {
      title: "3. Earth Radiates Heat",
      description: "Earth radiates heat back to space as infrared radiation",
      visual: "🌍 → 🌌 (heat waves)"
    },
    {
      title: "4. Greenhouse Gases Trap Heat",
      description: "Greenhouse gases in the atmosphere trap some heat, keeping Earth warm",
      visual: "🌍 ↔️ ☁️ (trapped heat)"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-100 to-green-100 rounded-xl p-6">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">{steps[step].visual}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{steps[step].title}</h3>
        <p className="text-gray-600">{steps[step].description}</p>
      </div>
      
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeedbackLoopSimulation = ({ loop, setLoop }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const loops = {
    'ice-albedo': {
      title: "Ice-Albedo Feedback Loop",
      steps: [
        "🌡️ Global warming occurs",
        "🧊 Arctic ice melts", 
        "🌊 Dark ocean water exposed",
        "☀️ More heat absorbed (less reflection)",
        "🌡️ More warming occurs"
      ],
      color: "blue"
    },
    'water-vapor': {
      title: "Water Vapor Feedback Loop", 
      steps: [
        "🌡️ Temperature increases",
        "💨 More water evaporates",
        "☁️ More water vapor in atmosphere", 
        "🔥 Water vapor traps more heat",
        "🌡️ Temperature increases further"
      ],
      color: "purple"
    }
  };

  const currentLoop = loops[loop] || loops['ice-albedo'];

  const startSimulation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= currentLoop.steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnimating(false);
            setCurrentStep(0);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className={`bg-gradient-to-br from-${currentLoop.color}-100 to-${currentLoop.color}-200 rounded-xl p-6`}>
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{currentLoop.title}</h3>
      
      <div className="text-center mb-6">
        <button
          onClick={startSimulation}
          disabled={isAnimating}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            isAnimating 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : `bg-${currentLoop.color}-500 hover:bg-${currentLoop.color}-600 text-white`
          }`}
        >
          {isAnimating ? '🔄 Simulation Running...' : '▶️ Start Simulation'}
        </button>
      </div>
      
      <div className="flex flex-col space-y-4">
        {currentLoop.steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
              isAnimating && index <= currentStep 
                ? `bg-${currentLoop.color}-500 text-white scale-110` 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {index + 1}
            </div>
            <div className={`flex-1 rounded-lg p-3 transition-all duration-500 ${
              isAnimating && index <= currentStep 
                ? 'bg-white shadow-lg transform scale-105' 
                : 'bg-gray-100'
            }`}>
              <span className={`${
                isAnimating && index <= currentStep ? 'text-gray-800 font-semibold' : 'text-gray-500'
              }`}>{step}</span>
            </div>
            {index < currentLoop.steps.length - 1 && (
              <div className={`text-2xl transition-all duration-500 ${
                isAnimating && index < currentStep ? 'text-green-500' : 'text-gray-400'
              }`}>↓</div>
            )}
          </div>
        ))}
        <div className={`text-center text-2xl transition-all duration-500 ${
          isAnimating && currentStep >= currentLoop.steps.length - 1 ? 'text-green-500' : 'text-gray-400'
        }`}>🔄</div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg p-4">
        <p className="text-sm text-gray-600 text-center">
          This creates a <strong>positive feedback loop</strong> - the effect amplifies the original cause, 
          leading to accelerated climate change.
        </p>
      </div>
    </div>
  );
};

const RenewableEnergyContent = ({ currentSection, setCurrentSection, onReachEnd }) => {
  // Similar structure for renewable energy module
  const sections = [
    {
      title: "Introduction to Renewable Energy",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Renewable energy comes from natural sources that are constantly replenished, 
            like sunlight, wind, rain, tides, waves, and geothermal heat.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['☀️ Solar', '💨 Wind', '💧 Hydro', '🌋 Geothermal'].map((type, index) => (
              <div key={index} className="bg-yellow-50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{type.split(' ')[0]}</div>
                <div className="font-semibold text-yellow-800">{type.split(' ')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Solar Energy in India",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            India receives about 5,000 trillion kWh of solar energy annually, 
            making it one of the most solar-rich countries in the world.
          </p>
          <div className="bg-yellow-50 rounded-xl p-6">
            <h4 className="font-bold text-yellow-800 mb-3">India's Solar Achievements:</h4>
            <ul className="space-y-2 text-yellow-700">
              <li>• 4th largest solar power capacity globally</li>
              <li>• Target: 100 GW solar capacity by 2022</li>
              <li>• World's largest solar park in Karnataka (2,000 MW)</li>
            </ul>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={onReachEnd}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all"
            >
              🌞 I understand renewable energy!
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-700">{currentSection + 1}/{sections.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{sections[currentSection].title}</h2>
        {sections[currentSection].content}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all"
          disabled={currentSection === 0}
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all"
          disabled={currentSection === sections.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const DefaultModuleContent = ({ module, currentSection, setCurrentSection, onReachEnd }) => {
  const sections = [
    {
      title: `Introduction to ${module.title}`,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            {module.description}
          </p>
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 mb-3">Learning Objectives:</h4>
            <ul className="space-y-2 text-blue-700">
              <li>• Understand the basic concepts</li>
              <li>• Learn practical applications</li>
              <li>• Explore real-world examples</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Key Concepts",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Let's explore the fundamental concepts of {module.title.toLowerCase()}.
          </p>
          <div className="text-center mt-8">
            <button
              onClick={onReachEnd}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
            >
              ✅ I've completed this module!
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-700">{currentSection + 1}/{sections.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{sections[currentSection].title}</h2>
        {sections[currentSection].content}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all"
          disabled={currentSection === 0}
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
          disabled={currentSection === sections.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Learning;