# EcoLearn India 🌱

A gamified environmental education platform for Indian schools and colleges, featuring interactive learning modules, games, quizzes, challenges, and real NGO participation opportunities.

## Problem Statement

Environmental education in Indian schools and colleges faces several critical challenges:

- **Lack of Engagement**: Traditional environmental education is often theoretical and fails to engage students actively
- **Limited Practical Application**: Students learn concepts but lack opportunities to apply knowledge in real-world scenarios
- **Insufficient Awareness**: Many students are unaware of local environmental issues like Aravalli deforestation and Delhi pollution
- **No Incentive System**: Students lack motivation to continue learning about environmental topics
- **Disconnected Learning**: No platform connects students with actual environmental organizations for meaningful participation
- **School Competition Gap**: Limited inter-school environmental competitions and challenges

## How Kiro IDE Helped

Kiro IDE was instrumental in the development of EcoLearn India through:

### Ideation Phase
- **AI-Powered Brainstorming**: Kiro's AI assistant helped generate innovative features like the challenge system with friend codes
- **Real-time Research**: Integrated web search capabilities helped identify current environmental issues in India
- **Documentation Creation**: Kiro's file management system organized planning notes, architecture designs, and prototypes

### Development Phase
- **Intelligent Code Generation**: Kiro accelerated development by generating React components, context providers, and API endpoints
- **Error Detection**: Built-in diagnostics helped identify and fix issues in real-time during development
- **File Management**: Seamless navigation between multiple files and components streamlined the development workflow
- **Git Integration**: Simplified version control and deployment processes

### Problem-Solving Phase
- **Debugging Assistance**: Kiro helped troubleshoot complex issues like authentication persistence and learning progress tracking
- **API Integration**: Guided the secure implementation of Google Gemini AI integration with proper environment variable handling
- **Deployment Support**: Assisted with GitHub deployment and backend hosting on Render

## Project Uniqueness

EcoLearn India stands out through several innovative features:

### 🎯 **Indian Environmental Context**
- Focuses specifically on Indian environmental challenges (Aravalli hills, Delhi pollution, monsoon patterns)
- Real news integration from Indian sources (Indian Express, Hindustan Times, UN reports)
- Culturally relevant content and examples

### 🏫 **Dual User System**
- **Student Interface**: Gamified learning with eco-points, challenges, and NGO participation
- **School Interface**: Administrative dashboard for organizing challenges, tracking student performance, and inter-school competitions

### 🤖 **AI-Powered Learning Assistant**
- Google Gemini 2.0 integration for personalized environmental education
- Context-aware responses about Indian environmental policies and issues
- Real-time assistance for students and educators

### 🎮 **Comprehensive Gamification**
- **Challenge System**: Friend codes for peer-to-peer environmental challenges
- **Eco-Points Rewards**: Persistent point system across all activities
- **Interactive Simulations**: Climate feedback loops, carbon footprint calculators
- **Leaderboards**: Separate rankings for students and schools

### 🌐 **Real-World Integration**
- **Live NGO Connections**: Direct links to environmental organizations for volunteering and donations
- **Current News Feed**: Real-time environmental news from credible Indian sources
- **Practical Applications**: Waste sorting games, renewable energy calculators

### 📊 **Data-Driven Insights**
- **Progress Tracking**: Individual learning module completion tracking
- **Performance Analytics**: School-wise student performance overview
- **Challenge Analytics**: Success rates and participation metrics

### 🔒 **Secure & Scalable Architecture**
- Environment variable-based API key management
- Separate backend deployment for security
- CORS-configured API endpoints
- Persistent user data with localStorage

## Features

- 🎮 **Interactive Games**: Carbon footprint calculator, waste sorting, plant species quiz
- 📚 **Learning Modules**: Climate change, renewable energy, biodiversity, water conservation
- 🧠 **Adaptive Quizzes**: 10/15/20 question options with real scoring
- 🏆 **Challenge System**: Friend codes, school competitions, leaderboards
- 🤝 **NGO Participation**: Real volunteer and donation opportunities
- 🤖 **AI Chatbot**: Gemini-powered environmental education assistant
- 🏫 **School Dashboard**: Organize challenges, track performance, manage students

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini 2.0 Flash
- **Drag & Drop**: React DnD
- **Icons**: Lucide React
- **Charts**: Recharts

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eco-learn-india
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Gemini API key
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development servers**
   
   **Backend Server (Terminal 1):**
   ```bash
   npm run server
   # Runs on http://localhost:3002
   ```
   
   **Frontend Server (Terminal 2):**
   ```bash
   npm run dev
   # Runs on http://localhost:3001
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3002
NODE_ENV=development

# Frontend Configuration
VITE_API_URL=http://localhost:3002
FRONTEND_URL=http://localhost:3001

# Application Settings
APP_NAME=EcoLearn India
APP_VERSION=1.0.0
```

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend API server
- `npm run server:dev` - Start backend with auto-restart (nodemon)
- `npm run build` - Build frontend for production
- `npm run build:server` - Build and start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Backend Server (Port 3002)

- `GET /api/health` - Server health check
- `POST /api/chat` - Gemini AI chat endpoint
- `GET /api/environmental-data` - Environmental statistics
- `GET /` - Server information

### Frontend (Port 3001)

- All React routes with proxy to backend API

## Project Structure

```
eco-learn-india/
├── src/
│   ├── components/
│   │   ├── games/           # Game components
│   │   ├── GeminiChatbot.jsx
│   │   ├── Navbar.jsx
│   │   └── NewsMarquee.jsx
│   ├── contexts/            # React contexts
│   ├── pages/               # Page components
│   └── main.jsx
├── server.js                # Express backend server
├── .env                     # Environment variables (not in git)
├── .env.example            # Environment template
└── package.json
```

## Features Overview

### For Students
- Interactive environmental learning modules
- Gamified quizzes and challenges
- Eco-points reward system
- Real NGO participation opportunities
- AI-powered learning assistant

### For Schools
- Organize inter-school challenges
- Track student performance
- School leaderboards
- Performance analytics
- Challenge approval system

## Security

- API keys stored securely in environment variables
- CORS configured for specific origins
- Input validation on all endpoints
- No sensitive data in frontend code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository.

---

Built with ❤️ for environmental education in India 🇮🇳