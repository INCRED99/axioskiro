import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TreePine, 
  Fish, 
  Zap, 
  Bird, 
  ArrowLeft,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  RotateCcw
} from 'lucide-react'

const EcosystemBalanceGame = ({ onComplete, onBack }) => {
  const [ecosystem, setEcosystem] = useState({
    producers: 100, // Plants
    primaryConsumers: 50, // Herbivores
    secondaryConsumers: 25, // Carnivores
    decomposers: 30 // Bacteria, fungi
  })
  
  const [gameState, setGameState] = useState('playing') // playing, won, lost
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [events, setEvents] = useState([])
  const [selectedEcosystem, setSelectedEcosystem] = useState('forest')
  const [balance, setBalance] = useState(0)

  const ecosystemTypes = {
    forest: {
      name: 'Forest Ecosystem',
      color: 'from-green-500 to-emerald-600',
      icon: TreePine,
      description: 'Maintain balance in a forest ecosystem'
    },
    aquatic: {
      name: 'Aquatic Ecosystem',
      color: 'from-blue-500 to-cyan-600',
      icon: Fish,
      description: 'Balance marine life in an aquatic environment'
    },
    grassland: {
      name: 'Grassland Ecosystem',
      color: 'from-yellow-500 to-green-500',
      icon: Zap,
      description: 'Manage a grassland ecosystem'
    }
  }

  const species = {
    forest: {
      producers: { name: 'Trees & Plants', icon: TreePine, color: 'green' },
      primaryConsumers: { name: 'Deer & Rabbits', icon: Zap, color: 'brown' },
      secondaryConsumers: { name: 'Wolves & Bears', icon: '🐺', color: 'gray' },
      decomposers: { name: 'Fungi & Bacteria', icon: '🍄', color: 'orange' }
    },
    aquatic: {
      producers: { name: 'Algae & Plankton', icon: '🌱', color: 'green' },
      primaryConsumers: { name: 'Small Fish', icon: Fish, color: 'blue' },
      secondaryConsumers: { name: 'Large Fish', icon: '🦈', color: 'gray' },
      decomposers: { name: 'Bacteria', icon: '🦠', color: 'purple' }
    },
    grassland: {
      producers: { name: 'Grass & Herbs', icon: '🌾', color: 'green' },
      primaryConsumers: { name: 'Zebras & Gazelles', icon: Zap, color: 'brown' },
      secondaryConsumers: { name: 'Lions & Cheetahs', icon: '🦁', color: 'orange' },
      decomposers: { name: 'Insects & Bacteria', icon: '🐛', color: 'black' }
    }
  }

  const randomEvents = [
    {
      name: 'Drought',
      effect: { producers: -20, primaryConsumers: -10 },
      description: 'A severe drought affects plant growth'
    },
    {
      name: 'Disease Outbreak',
      effect: { primaryConsumers: -15, secondaryConsumers: -5 },
      description: 'Disease spreads among animals'
    },
    {
      name: 'Human Interference',
      effect: { producers: -25, secondaryConsumers: -10 },
      description: 'Human activities disrupt the ecosystem'
    },
    {
      name: 'Favorable Weather',
      effect: { producers: 15, primaryConsumers: 10 },
      description: 'Good weather boosts ecosystem health'
    },
    {
      name: 'Conservation Efforts',
      effect: { producers: 20, primaryConsumers: 15, secondaryConsumers: 10 },
      description: 'Conservation programs help the ecosystem'
    }
  ]

  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      if (balance >= -10 && balance <= 10) {
        setGameState('won')
        onComplete(score + 100)
      } else {
        setGameState('lost')
      }
    }
  }, [timeLeft, gameState, balance, score, onComplete])

  useEffect(() => {
    // Calculate ecosystem balance
    const ideal = {
      producers: 100,
      primaryConsumers: 50,
      secondaryConsumers: 25,
      decomposers: 30
    }

    const currentBalance = Object.keys(ideal).reduce((acc, key) => {
      const diff = Math.abs(ecosystem[key] - ideal[key])
      return acc + diff
    }, 0)

    setBalance(currentBalance)

    // Update score based on balance
    if (currentBalance <= 10) {
      setScore(prev => prev + 5)
    } else if (currentBalance <= 20) {
      setScore(prev => prev + 2)
    } else {
      setScore(prev => Math.max(0, prev - 1))
    }

    // Random events
    if (Math.random() < 0.02) { // 2% chance per update
      triggerRandomEvent()
    }
  }, [ecosystem])

  const triggerRandomEvent = () => {
    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)]
    
    setEvents(prev => [...prev, event].slice(-3)) // Keep last 3 events
    
    setEcosystem(prev => {
      const newEcosystem = { ...prev }
      Object.keys(event.effect).forEach(key => {
        newEcosystem[key] = Math.max(0, Math.min(200, prev[key] + event.effect[key]))
      })
      return newEcosystem
    })
  }

  const adjustPopulation = (type, change) => {
    setEcosystem(prev => ({
      ...prev,
      [type]: Math.max(0, Math.min(200, prev[type] + change))
    }))
  }

  const resetGame = () => {
    setEcosystem({
      producers: 100,
      primaryConsumers: 50,
      secondaryConsumers: 25,
      decomposers: 30
    })
    setScore(0)
    setTimeLeft(120)
    setGameState('playing')
    setEvents([])
    setBalance(0)
  }

  const getBalanceStatus = () => {
    if (balance <= 10) return { status: 'Excellent', color: 'text-green-600', icon: CheckCircle }
    if (balance <= 25) return { status: 'Good', color: 'text-yellow-600', icon: AlertTriangle }
    if (balance <= 50) return { status: 'Poor', color: 'text-orange-600', icon: AlertTriangle }
    return { status: 'Critical', color: 'text-red-600', icon: AlertTriangle }
  }

  if (gameState === 'won') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ecosystem Balanced!</h2>
          <p className="text-gray-600 mb-6">You successfully maintained ecosystem balance!</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Final Score:</span>
              <span className="font-bold text-green-600">{score} points</span>
            </div>
            <div className="flex justify-between">
              <span>Balance Score:</span>
              <span className="font-bold text-blue-600">{balance}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button onClick={resetGame} className="btn-secondary flex-1">
              Play Again
            </button>
            <button onClick={onBack} className="btn-primary flex-1">
              Back to Games
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameState === 'lost') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ecosystem Collapsed!</h2>
          <p className="text-gray-600 mb-6">The ecosystem became too unbalanced.</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="font-bold text-green-600">{score} points</span>
            </div>
            <div className="flex justify-between">
              <span>Final Balance:</span>
              <span className="font-bold text-red-600">{balance}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button onClick={resetGame} className="btn-secondary flex-1">
              Try Again
            </button>
            <button onClick={onBack} className="btn-primary flex-1">
              Back to Games
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  const balanceStatus = getBalanceStatus()
  const currentSpecies = species[selectedEcosystem]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Games
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Ecosystem Balance</h1>
            <p className="text-gray-600">{ecosystemTypes[selectedEcosystem].description}</p>
          </div>

          <button onClick={resetGame} className="flex items-center text-blue-600 hover:text-blue-700">
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className={`text-2xl font-bold ${balanceStatus.color}`}>{balance}</div>
            <div className="text-sm text-gray-600">Balance</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <balanceStatus.icon className={`h-8 w-8 mx-auto ${balanceStatus.color}`} />
            <div className={`text-sm font-semibold ${balanceStatus.color}`}>{balanceStatus.status}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ecosystem Controls */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Population Control</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(ecosystem).map(([type, count]) => (
                <div key={type} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {typeof currentSpecies[type].icon === 'string' 
                          ? currentSpecies[type].icon 
                          : React.createElement(currentSpecies[type].icon, { className: "h-6 w-6" })
                        }
                      </span>
                      <div>
                        <h4 className="font-semibold">{currentSpecies[type].name}</h4>
                        <p className="text-sm text-gray-600">Population: {count}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => adjustPopulation(type, -5)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-${currentSpecies[type].color}-500`}
                          style={{ width: `${Math.min(100, (count / 200) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => adjustPopulation(type, 5)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events and Info */}
          <div className="space-y-6">
            {/* Recent Events */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Events</h3>
              <div className="space-y-3">
                {events.length === 0 ? (
                  <p className="text-gray-500 text-sm">No recent events</p>
                ) : (
                  events.map((event, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h4 className="font-semibold text-sm">{event.name}</h4>
                      <p className="text-xs text-gray-600">{event.description}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Ecosystem Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ecosystem Guide</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong>Producers:</strong> Form the base of the food chain</p>
                <p><strong>Primary Consumers:</strong> Eat producers, need balanced plant life</p>
                <p><strong>Secondary Consumers:</strong> Eat primary consumers, need prey</p>
                <p><strong>Decomposers:</strong> Break down dead matter, recycle nutrients</p>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Tip:</strong> Maintain balance by keeping populations within natural ratios. 
                  Too many predators will reduce prey, too few will cause overpopulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcosystemBalanceGame