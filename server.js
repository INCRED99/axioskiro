import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is required in .env file');
  process.exit(1);
}

// Initialize Gemini AI with environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://your-app-name.vercel.app', // Replace with your actual Vercel URL
    /\.vercel\.app$/ // Allow any Vercel subdomain
  ],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('✅ Health check requested');
  res.json({ 
    status: 'OK', 
    message: 'EcoLearn India Server is running',
    timestamp: new Date().toISOString()
  });
});

// Helper function for offline responses
function getOfflineResponse(question) {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('climate change')) {
    return "🌡️ Climate change refers to long-term shifts in global temperatures and weather patterns. In India, we're seeing increased temperatures, irregular monsoons, and extreme weather events. Key causes include greenhouse gas emissions from burning fossil fuels. You can help by using renewable energy, reducing waste, and participating in our platform's challenges to earn eco-points!";
  }
  
  if (lowerQuestion.includes('renewable energy')) {
    return "⚡ Renewable energy comes from natural sources like sunlight, wind, and water. India is a leader in solar energy with ambitious targets! Solar panels, wind turbines, and hydroelectric plants help reduce our dependence on fossil fuels. Try our Carbon Footprint Calculator game to see how renewable energy choices impact your environmental footprint!";
  }
  
  if (lowerQuestion.includes('pollution') || lowerQuestion.includes('air quality')) {
    return "🏭 Air pollution is a major challenge in Indian cities like Delhi and Mumbai. Main sources include vehicle emissions, industrial activities, and crop burning. Solutions include using public transport, supporting clean energy, and planting trees. Check out our learning modules to discover more about pollution and its solutions!";
  }
  
  if (lowerQuestion.includes('water') || lowerQuestion.includes('conservation')) {
    return "💧 Water conservation is crucial in India where many regions face water scarcity. Simple actions like fixing leaks, rainwater harvesting, and using water-efficient appliances make a big difference. Traditional methods like stepwells and tank systems show India's rich water conservation heritage. Play our games to learn more!";
  }
  
  if (lowerQuestion.includes('forest') || lowerQuestion.includes('deforestation')) {
    return "🌳 Forests are vital for climate regulation and biodiversity. India has diverse forests from the Western Ghats to the Himalayas. Deforestation threatens wildlife and increases carbon emissions. You can help by supporting reforestation projects and learning about forest conservation through our interactive modules!";
  }
  
  return "🌿 I'm here to help you learn about environmental topics! I can discuss climate change, renewable energy, conservation, pollution, and India's environmental challenges. Try exploring our learning modules, playing our environmental games, or taking quizzes to earn eco-points. What would you like to know about the environment?";
}

// Single Chatbot endpoint - POST /api/chatbot
app.post('/api/chatbot', async (req, res) => {
  console.log('🤖 Chatbot request received');
  
  try {
    const { message } = req.body;
    
    if (!message) {
      console.log('❌ No message provided');
      return res.status(400).json({ 
        error: 'Message is required',
        example: { message: 'What is climate change?' }
      });
    }

    console.log(`📝 Question: "${message}"`);

    // Enhanced prompt for environmental education
    const systemPrompt = `You are an environmental education assistant for EcoLearn India. 

Guidelines:
- Focus on climate change, environmental conservation, and sustainability topics relevant to India
- Keep responses educational, engaging, and appropriate for students (ages 12-18) and teachers
- Use examples from Indian context when possible (Indian cities, wildlife, environmental policies, etc.)
- Encourage practical actions students can take
- Be encouraging and positive about environmental solutions
- Keep responses concise but informative (2-3 paragraphs max)
- Use emojis appropriately to make responses engaging

User question: ${message}`;

    // Try Gemini models in order of preference
    const modelsToTry = [
      'gemini-2.5-pro',
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    let response = null;
    let usedModel = null;

    console.log('🔄 Trying Gemini models...');
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`   Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(systemPrompt);
        const aiResponse = await result.response;
        response = aiResponse.text();
        usedModel = modelName;
        console.log(`   ✅ Success with: ${modelName}`);
        break;
      } catch (modelError) {
        console.log(`   ❌ ${modelName} failed: ${modelError.message}`);
        continue;
      }
    }

    // Fallback to offline response if all models fail
    if (!response) {
      console.log('🔄 Using offline response');
      response = getOfflineResponse(message);
      usedModel = 'offline';
    }

    console.log(`📤 Responding with ${usedModel}`);
    
    res.json({
      success: true,
      response: response,
      model: usedModel,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('💥 Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your question',
      response: getOfflineResponse(req.body.message || 'general question'),
      model: 'offline-fallback'
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EcoLearn India API Server', 
    status: 'Running',
    endpoints: [
      'GET /api/health - Server health check',
      'POST /api/chatbot - Ask environmental questions'
    ],
    usage: {
      chatbot: {
        url: '/api/chatbot',
        method: 'POST',
        body: { message: 'Your question here' }
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 EcoLearn India Server running on port ${PORT}`);
  console.log(`🚀 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Chatbot API: http://localhost:${PORT}/api/chatbot`);
  console.log(`📖 Usage: POST to /api/chatbot with { "message": "your question" }`);
});

export default app;