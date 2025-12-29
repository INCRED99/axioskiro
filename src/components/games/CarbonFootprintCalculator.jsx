import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Car, 
  Home, 
  Utensils, 
  Plane, 
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  Leaf,
  Target,
  Award,
  BarChart3
} from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CarbonFootprintCalculator = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    transport: {
      carKm: 0,
      publicTransport: 0,
      flights: 0
    },
    home: {
      electricity: 0,
      gas: 0,
      heating: 'gas'
    },
    food: {
      meat: 'moderate',
      dairy: 'moderate',
      localFood: 50
    },
    lifestyle: {
      shopping: 'moderate',
      recycling: 80,
      waterUsage: 'moderate'
    }
  })
  
  const [results, setResults] = useState(null)
  const [recommendations, setRecommendations] = useState([])

  const steps = [
    {
      title: 'Transportation',
      icon: Car,
      color: 'from-blue-500 to-cyan-500',
      description: 'How do you get around?'
    },
    {
      title: 'Home Energy',
      icon: Home,
      color: 'from-green-500 to-emerald-500',
      description: 'Your home energy usage'
    },
    {
      title: 'Food & Diet',
      icon: Utensils,
      color: 'from-orange-500 to-red-500',
      description: 'What do you eat?'
    },
    {
      title: 'Lifestyle',
      icon: Leaf,
      color: 'from-purple-500 to-pink-500',
      description: 'Your daily habits'
    }
  ]

  const calculateFootprint = () => {
    // Carbon footprint calculation (simplified)
    const transport = (formData.transport.carKm * 0.2) + 
                     (formData.transport.publicTransport * 0.05) + 
                     (formData.transport.flights * 0.5)
    
    const home = (formData.home.electricity * 0.4) + 
                 (formData.home.gas * 0.2)
    
    const foodMultiplier = {
      high: 2.5,
      moderate: 1.5,
      low: 0.8,
      vegetarian: 0.5
    }
    
    const food = (foodMultiplier[formData.food.meat] || 1.5) * 365 * 0.01
    
    const lifestyleMultiplier = {
      high: 1.5,
      moderate: 1.0,
      low: 0.7
    }
    
    const lifestyle = (lifestyleMultiplier[formData.lifestyle.shopping] || 1.0) * 500
    
    const total = transport + home + food + lifestyle
    const recyclingReduction = (formData.lifestyle.recycling / 100) * 200
    const localFoodReduction = (formData.food.localFood / 100) * 150
    
    const finalFootprint = Math.max(0, total - recyclingReduction - localFoodReduction)
    
    return {
      total: Math.round(finalFootprint),
      breakdown: {
        transport: Math.round(transport),
        home: Math.round(home),
        food: Math.round(food),
        lifestyle: Math.round(lifestyle)
      },
      reductions: {
        recycling: Math.round(recyclingReduction),
        localFood: Math.round(localFoodReduction)
      }
    }
  }

  const generateRecommendations = (footprint) => {
    const recs = []
    
    if (footprint.breakdown.transport > 500) {
      recs.push({
        category: 'Transport',
        action: 'Use public transport or cycle more often',
        impact: 'Save 200-400 kg CO₂/year',
        difficulty: 'Medium'
      })
    }
    
    if (footprint.breakdown.home > 300) {
      recs.push({
        category: 'Home',
        action: 'Switch to LED bulbs and unplug devices',
        impact: 'Save 150-250 kg CO₂/year',
        difficulty: 'Easy'
      })
    }
    
    if (formData.food.meat === 'high') {
      recs.push({
        category: 'Diet',
        action: 'Try "Meatless Mondays" or reduce meat consumption',
        impact: 'Save 300-500 kg CO₂/year',
        difficulty: 'Medium'
      })
    }
    
    if (formData.lifestyle.recycling < 70) {
      recs.push({
        category: 'Lifestyle',
        action: 'Increase recycling and composting',
        impact: 'Save 100-200 kg CO₂/year',
        difficulty: 'Easy'
      })
    }
    
    recs.push({
      category: 'Energy',
      action: 'Consider solar panels or renewable energy',
      impact: 'Save 500-1000 kg CO₂/year',
      difficulty: 'Hard'
    })
    
    return recs.slice(0, 4) // Return top 4 recommendations
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const footprint = calculateFootprint()
      const recs = generateRecommendations(footprint)
      setResults(footprint)
      setRecommendations(recs)
      onComplete(Math.max(100 - footprint.total / 10, 10)) // Score based on footprint
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  if (results) {
    const avgFootprint = 2000 // Average Indian carbon footprint
    const isGood = results.total < avgFootprint
    
    // Prepare data for charts
    const pieData = Object.entries(results.breakdown).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
      color: {
        transport: '#3B82F6',
        home: '#10B981', 
        food: '#F59E0B',
        lifestyle: '#8B5CF6'
      }[key]
    }))

    const barData = [
      { category: 'Transport', yours: results.breakdown.transport, average: 600 },
      { category: 'Home', yours: results.breakdown.home, average: 500 },
      { category: 'Food', yours: results.breakdown.food, average: 400 },
      { category: 'Lifestyle', yours: results.breakdown.lifestyle, average: 500 }
    ]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700 mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Games
          </button>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                isGood ? 'bg-green-500' : 'bg-orange-500'
              }`}
            >
              {isGood ? (
                <TrendingDown className="h-12 w-12 text-white" />
              ) : (
                <TrendingUp className="h-12 w-12 text-white" />
              )}
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Carbon Footprint</h1>
            <p className="text-2xl text-gray-600 font-semibold">
              {results.total} kg CO₂ per year
            </p>
            <p className={`text-lg ${isGood ? 'text-green-600' : 'text-orange-600'}`}>
              {isGood ? '🎉 Below' : '⚠️ Above'} average Indian footprint ({avgFootprint} kg CO₂/year)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2" />
                Footprint Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Comparison with Average</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} kg CO₂`, '']} />
                  <Bar dataKey="yours" fill="#3B82F6" name="Your Footprint" />
                  <Bar dataKey="average" fill="#E5E7EB" name="Average" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(results.breakdown).map(([category, value]) => {
                  const percentage = (value / results.total) * 100
                  const colors = {
                    transport: 'bg-blue-500',
                    home: 'bg-green-500', 
                    food: 'bg-yellow-500',
                    lifestyle: 'bg-purple-500'
                  }
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="capitalize font-medium text-gray-700">{category}</span>
                        <span className="text-lg font-bold text-gray-900">{value} kg CO₂</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`${colors[category]} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500">{percentage.toFixed(1)}% of total</div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-green-600 mb-3">🌱 Reductions Applied</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Recycling efforts:</span>
                    <span className="text-green-600 font-semibold">-{results.reductions.recycling} kg CO₂</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Local food choices:</span>
                    <span className="text-green-600 font-semibold">-{results.reductions.localFood} kg CO₂</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">🎯 Action Plan</h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{rec.category}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        rec.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        rec.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {rec.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{rec.action}</p>
                    <p className="text-sm text-green-600 font-semibold">💡 {rec.impact}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center space-x-4">
            <button 
              onClick={() => {
                setCurrentStep(0)
                setResults(null)
                setFormData({
                  transport: { carKm: 0, publicTransport: 0, flights: 0 },
                  home: { electricity: 0, gas: 0, heating: 'gas' },
                  food: { meat: 'moderate', dairy: 'moderate', localFood: 50 },
                  lifestyle: { shopping: 'moderate', recycling: 80, waterUsage: 'moderate' }
                })
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              🔄 Calculate Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Games
        </button>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-8 shadow-lg"
        >
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${currentStepData.color} flex items-center justify-center mb-6`}>
            <currentStepData.icon className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600 mb-8">{currentStepData.description}</p>

          {/* Step-specific forms */}
          {currentStep === 0 && (
            <TransportForm formData={formData.transport} updateFormData={updateFormData} />
          )}
          {currentStep === 1 && (
            <HomeEnergyForm formData={formData.home} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <FoodForm formData={formData.food} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <LifestyleForm formData={formData.lifestyle} updateFormData={updateFormData} />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button onClick={handleNext} className="btn-primary">
              {currentStep === steps.length - 1 ? 'Calculate Footprint' : 'Next'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Form Components
const TransportForm = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Car/Motorcycle (km per week)
      </label>
      <input
        type="number"
        value={formData.carKm}
        onChange={(e) => updateFormData('transport', 'carKm', parseInt(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="0"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Public Transport (km per week)
      </label>
      <input
        type="number"
        value={formData.publicTransport}
        onChange={(e) => updateFormData('transport', 'publicTransport', parseInt(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="0"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Flights per year
      </label>
      <input
        type="number"
        value={formData.flights}
        onChange={(e) => updateFormData('transport', 'flights', parseInt(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="0"
      />
    </div>
  </div>
)

const HomeEnergyForm = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Monthly Electricity Bill (₹)
      </label>
      <input
        type="number"
        value={formData.electricity}
        onChange={(e) => updateFormData('home', 'electricity', parseInt(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="0"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Monthly Gas Bill (₹)
      </label>
      <input
        type="number"
        value={formData.gas}
        onChange={(e) => updateFormData('home', 'gas', parseInt(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="0"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Primary Heating Source
      </label>
      <select
        value={formData.heating}
        onChange={(e) => updateFormData('home', 'heating', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="gas">Natural Gas</option>
        <option value="electric">Electric</option>
        <option value="solar">Solar</option>
        <option value="none">No Heating</option>
      </select>
    </div>
  </div>
)

const FoodForm = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Meat Consumption
      </label>
      <select
        value={formData.meat}
        onChange={(e) => updateFormData('food', 'meat', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="high">High (Daily)</option>
        <option value="moderate">Moderate (Few times a week)</option>
        <option value="low">Low (Once a week)</option>
        <option value="vegetarian">Vegetarian</option>
      </select>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Local Food Percentage: {formData.localFood}%
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={formData.localFood}
        onChange={(e) => updateFormData('food', 'localFood', parseInt(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Imported</span>
        <span>Local</span>
      </div>
    </div>
  </div>
)

const LifestyleForm = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Shopping Habits
      </label>
      <select
        value={formData.shopping}
        onChange={(e) => updateFormData('lifestyle', 'shopping', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="high">High (Frequent new purchases)</option>
        <option value="moderate">Moderate (Occasional purchases)</option>
        <option value="low">Low (Only when necessary)</option>
      </select>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Recycling Rate: {formData.recycling}%
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={formData.recycling}
        onChange={(e) => updateFormData('lifestyle', 'recycling', parseInt(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Never</span>
        <span>Always</span>
      </div>
    </div>
  </div>
)

export default CarbonFootprintCalculator