import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader, Leaf } from 'lucide-react'

const GeminiChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🌱 Hello! I'm your EcoLearn AI assistant. I can help you with questions about climate change, environmental conservation, sustainability, and India's environmental challenges. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Quick suggestion buttons for common environmental topics
  const quickSuggestions = [
    "What is climate change?",
    "How can I reduce my carbon footprint?",
    "Tell me about renewable energy in India",
    "What are the main environmental challenges in India?",
    "How does deforestation affect the environment?",
    "What is the greenhouse effect?"
  ]

  const [showSuggestions, setShowSuggestions] = useState(true)

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || inputMessage
    if (!textToSend.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      // Call our backend API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        model: data.model
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error calling chatbot API:', error)
      
      // Fallback to offline response
      const offlineResponse = getOfflineResponse(textToSend)
      const errorMessage = {
        id: Date.now() + 1,
        text: offlineResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion)
  }

  const getOfflineResponse = (question) => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('climate change')) {
      return "🌡️ Climate change refers to long-term shifts in global temperatures and weather patterns. In India, we're seeing increased temperatures, irregular monsoons, and extreme weather events. Key causes include greenhouse gas emissions from burning fossil fuels. You can help by using renewable energy, reducing waste, and participating in our platform's challenges to earn eco-points!"
    }
    
    if (lowerQuestion.includes('renewable energy')) {
      return "⚡ Renewable energy comes from natural sources like sunlight, wind, and water. India is a leader in solar energy with ambitious targets! Solar panels, wind turbines, and hydroelectric plants help reduce our dependence on fossil fuels. Try our Carbon Footprint Calculator game to see how renewable energy choices impact your environmental footprint!"
    }
    
    if (lowerQuestion.includes('pollution') || lowerQuestion.includes('air quality')) {
      return "🏭 Air pollution is a major challenge in Indian cities like Delhi and Mumbai. Main sources include vehicle emissions, industrial activities, and crop burning. Solutions include using public transport, supporting clean energy, and planting trees. Check out our learning modules to discover more about pollution and its solutions!"
    }
    
    if (lowerQuestion.includes('water') || lowerQuestion.includes('conservation')) {
      return "💧 Water conservation is crucial in India where many regions face water scarcity. Simple actions like fixing leaks, rainwater harvesting, and using water-efficient appliances make a big difference. Traditional methods like stepwells and tank systems show India's rich water conservation heritage. Play our games to learn more!"
    }
    
    if (lowerQuestion.includes('forest') || lowerQuestion.includes('deforestation')) {
      return "🌳 Forests are vital for climate regulation and biodiversity. India has diverse forests from the Western Ghats to the Himalayas. Deforestation threatens wildlife and increases carbon emissions. You can help by supporting reforestation projects and learning about forest conservation through our interactive modules!"
    }
    
    return "🌿 I'm currently offline, but I'd love to help you learn about environmental topics! Try exploring our learning modules, playing our environmental games, or taking quizzes to earn eco-points. You can also join challenges with friends or participate in real NGO activities. When I'm back online, feel free to ask about climate change, renewable energy, conservation, or any environmental topic!"
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6" />
          <div>
            <h3 className="font-semibold">EcoLearn AI Assistant</h3>
            <p className="text-sm text-green-100">Your environmental education companion</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
            }`}>
              {message.sender === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>
            
            <div className={`flex-1 max-w-xs sm:max-w-md ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}>
              <div className={`inline-block p-3 rounded-lg shadow-sm ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-900 rounded-bl-none border border-green-100'
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white p-3 rounded-lg rounded-bl-none border border-green-100 shadow-sm">
              <div className="flex items-center space-x-2">
                <Loader className="h-4 w-4 animate-spin text-green-600" />
                <span className="text-sm text-gray-600">Thinking about your question...</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Suggestions */}
        {showSuggestions && messages.length === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 font-medium">💡 Try asking me about:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 bg-white border border-green-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all duration-200 text-sm text-gray-700 shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 rounded-b-xl">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about environmental topics..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          🌱 Ask me about climate change, renewable energy, conservation, and India's environmental challenges!
        </p>
      </div>
    </div>
  )
}

export default GeminiChatbot