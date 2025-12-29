import { useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { motion } from 'framer-motion'
import { 
  Recycle, 
  Trash2, 
  Leaf, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  Trophy,
  Star
} from 'lucide-react'

const WasteSortingGame = ({ onComplete, onBack }) => {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameState, setGameState] = useState('playing') // playing, completed, failed
  const [feedback, setFeedback] = useState('')
  const [correctSorts, setCorrectSorts] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)

  const wasteItems = [
    // Recyclable items
    { id: 1, name: 'Plastic Bottle', type: 'recyclable', emoji: '🍼', color: 'blue' },
    { id: 2, name: 'Newspaper', type: 'recyclable', emoji: '📰', color: 'blue' },
    { id: 3, name: 'Glass Jar', type: 'recyclable', emoji: '🫙', color: 'blue' },
    { id: 4, name: 'Aluminum Can', type: 'recyclable', emoji: '🥤', color: 'blue' },
    { id: 5, name: 'Cardboard Box', type: 'recyclable', emoji: '📦', color: 'blue' },
    { id: 6, name: 'Plastic Container', type: 'recyclable', emoji: '🥡', color: 'blue' },
    { id: 7, name: 'Metal Can', type: 'recyclable', emoji: '🥫', color: 'blue' },
    { id: 8, name: 'Paper Bag', type: 'recyclable', emoji: '🛍️', color: 'blue' },
    
    // Organic waste
    { id: 9, name: 'Banana Peel', type: 'organic', emoji: '🍌', color: 'green' },
    { id: 10, name: 'Apple Core', type: 'organic', emoji: '🍎', color: 'green' },
    { id: 11, name: 'Coffee Grounds', type: 'organic', emoji: '☕', color: 'green' },
    { id: 12, name: 'Vegetable Scraps', type: 'organic', emoji: '🥬', color: 'green' },
    { id: 13, name: 'Eggshells', type: 'organic', emoji: '🥚', color: 'green' },
    { id: 14, name: 'Tea Leaves', type: 'organic', emoji: '🍃', color: 'green' },
    { id: 15, name: 'Orange Peel', type: 'organic', emoji: '🍊', color: 'green' },
    { id: 16, name: 'Bread Crumbs', type: 'organic', emoji: '🍞', color: 'green' },
    
    // Hazardous waste
    { id: 17, name: 'Battery', type: 'hazardous', emoji: '🔋', color: 'red' },
    { id: 18, name: 'Old Phone', type: 'hazardous', emoji: '📱', color: 'red' },
    { id: 19, name: 'Light Bulb', type: 'hazardous', emoji: '💡', color: 'red' },
    { id: 20, name: 'Paint Can', type: 'hazardous', emoji: '🎨', color: 'red' },
    { id: 21, name: 'Medicine', type: 'hazardous', emoji: '💊', color: 'red' },
    { id: 22, name: 'Cleaning Spray', type: 'hazardous', emoji: '🧴', color: 'red' },
    { id: 23, name: 'Thermometer', type: 'hazardous', emoji: '🌡️', color: 'red' },
    { id: 24, name: 'Computer Parts', type: 'hazardous', emoji: '💻', color: 'red' },
    
    // General waste
    { id: 25, name: 'Candy Wrapper', type: 'general', emoji: '🍬', color: 'gray' },
    { id: 26, name: 'Tissue Paper', type: 'general', emoji: '🧻', color: 'gray' },
    { id: 27, name: 'Broken Toy', type: 'general', emoji: '🧸', color: 'gray' },
    { id: 28, name: 'Cigarette Butt', type: 'general', emoji: '🚬', color: 'gray' },
    { id: 29, name: 'Rubber Gloves', type: 'general', emoji: '🧤', color: 'gray' },
    { id: 30, name: 'Styrofoam', type: 'general', emoji: '📦', color: 'gray' },
    { id: 31, name: 'Chewing Gum', type: 'general', emoji: '🍃', color: 'gray' },
    { id: 32, name: 'Dirty Diaper', type: 'general', emoji: '👶', color: 'gray' }
  ]

  const bins = [
    { id: 'recyclable', name: 'Recyclable', color: 'blue', icon: Recycle },
    { id: 'organic', name: 'Organic', color: 'green', icon: Leaf },
    { id: 'hazardous', name: 'Hazardous', color: 'red', icon: XCircle },
    { id: 'general', name: 'General Waste', color: 'gray', icon: Trash2 }
  ]

  const [currentItems, setCurrentItems] = useState([])
  const [sortedItems, setSortedItems] = useState({})

  useEffect(() => {
    // Initialize game with random items, ensuring no repetition across levels
    const getRandomItems = (count) => {
      const availableItems = wasteItems.filter(item => !Object.keys(sortedItems).includes(item.id.toString()))
      const shuffled = [...availableItems].sort(() => Math.random() - 0.5)
      return shuffled.slice(0, Math.min(count, availableItems.length))
    }
    
    setCurrentItems(getRandomItems(4 + level))
  }, [level, sortedItems])

  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameState('failed')
    }
  }, [timeLeft, gameState])

  const handleDrop = (item, binType) => {
    setTotalAttempts(prev => prev + 1)
    
    if (item.type === binType) {
      setScore(prev => prev + 10)
      setCorrectSorts(prev => prev + 1)
      setFeedback(`Correct! ${item.name} goes in ${binType} waste.`)
      
      setSortedItems(prev => ({
        ...prev,
        [item.id]: binType
      }))

      // Remove item from current items
      setCurrentItems(prev => prev.filter(i => i.id !== item.id))
      
      // Check if level completed
      if (currentItems.length === 1) {
        if (level < 3) {
          setLevel(prev => prev + 1)
          setTimeLeft(60)
          setFeedback(`Level ${level} completed! Moving to next level.`)
        } else {
          setGameState('completed')
          onComplete(score + 50) // Bonus for completion
        }
      }
    } else {
      setScore(prev => Math.max(0, prev - 5))
      setFeedback(`Incorrect! ${item.name} should go in ${item.type} waste.`)
    }

    setTimeout(() => setFeedback(''), 2000)
  }

  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setTimeLeft(60)
    setGameState('playing')
    setCorrectSorts(0)
    setTotalAttempts(0)
    setSortedItems({})
    const shuffled = [...wasteItems].sort(() => Math.random() - 0.5)
    setCurrentItems(shuffled.slice(0, 5))
  }

  const accuracy = totalAttempts > 0 ? Math.round((correctSorts / totalAttempts) * 100) : 0

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Congratulations!</h2>
          <p className="text-gray-600 mb-6">You've mastered waste sorting!</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Final Score:</span>
              <span className="font-bold text-green-600">{score} points</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-bold text-blue-600">{accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span>Levels Completed:</span>
              <span className="font-bold text-purple-600">{level}</span>
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

  if (gameState === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Time's Up!</h2>
          <p className="text-gray-600 mb-6">Don't worry, practice makes perfect!</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="font-bold text-green-600">{score} points</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-bold text-blue-600">{accuracy}%</span>
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
            <h1 className="text-3xl font-bold text-gray-900">Waste Sorting Challenge</h1>
            <p className="text-gray-600">Level {level} - Sort the waste correctly!</p>
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
            <div className="text-2xl font-bold text-purple-600">{level}</div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-orange-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <motion.div 
            className="bg-white rounded-lg p-4 mb-6 text-center shadow-md border-l-4 border-green-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-gray-800">{feedback}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Waste Items */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Items to Sort</h3>
            <div className="grid grid-cols-2 gap-4">
              {currentItems.map((item) => (
                <WasteItem key={item.id} item={item} onDrop={handleDrop} />
              ))}
            </div>
          </div>

          {/* Waste Bins */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Waste Bins</h3>
            <div className="grid grid-cols-2 gap-4">
              {bins.map((bin) => (
                <WasteBin key={bin.id} bin={bin} onDrop={handleDrop} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WasteItem = ({ item, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'waste',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <motion.div
      ref={drag}
      className={`p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-move text-center transition-all duration-300 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md hover:border-gray-400'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-3xl mb-2">{item.emoji}</div>
      <div className="text-sm font-medium text-gray-700">{item.name}</div>
    </motion.div>
  )
}

const WasteBin = ({ bin, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'waste',
    drop: (item) => onDrop(item, bin.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  const colorClasses = {
    blue: 'from-blue-400 to-blue-600 border-blue-300',
    green: 'from-green-400 to-green-600 border-green-300',
    red: 'from-red-400 to-red-600 border-red-300',
    gray: 'from-gray-400 to-gray-600 border-gray-300'
  }

  return (
    <motion.div
      ref={drop}
      className={`p-6 rounded-lg border-4 border-dashed text-white text-center transition-all duration-300 bg-gradient-to-br ${
        colorClasses[bin.color]
      } ${isOver ? 'scale-105 shadow-lg' : ''}`}
      whileHover={{ scale: 1.02 }}
    >
      <bin.icon className="h-8 w-8 mx-auto mb-2" />
      <div className="font-bold">{bin.name}</div>
    </motion.div>
  )
}

export default WasteSortingGame